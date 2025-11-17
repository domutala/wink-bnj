import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig();
  const form = await readMultipartFormData(event);
  if (!form) throw createError({ statusCode: 400 });

  const body = form.reduce((acc, field) => {
    if (field.filename) {
      acc[field.name!] = {
        filename: field.filename,
        data: field.data,
      };
    } else {
      acc[field.name!] = field.data.toString();
    }
    return acc;
  }, {} as Record<string, any>);

  const [existingUser] = await dataSource
    .select()
    .from(tables.user)
    .where(eq(tables.user.email, body.email));

  if (existingUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "register.errors.userWithEmailAlreadyExists",
    });
  }

  const company = await dataSource
    .insert(tables.company)
    .values(body as any)
    .returning({ id: tables.company.id });

  const password = await bcrypt.hash(
    body.password + runtime.passwordPepper,
    10
  );

  const user = await dataSource
    .insert(tables.user)
    .values({ companyId: company[0].id, ...body, password } as any);

  return user;
});
