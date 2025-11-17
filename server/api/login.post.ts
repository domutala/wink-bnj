import { defineEventHandler, readBody, createError } from "h3";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig();
  const body = await readBody<{ email: string; password: string }>(event);

  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "login.errors.invalidCredentials",
    });
  }

  const [existingUser] = await dataSource
    .select()
    .from(tables.user)
    .where(eq(tables.user.email, body.email));

  if (!existingUser || !existingUser.password) {
    throw createError({
      statusCode: 401,
      statusMessage: "login.errors.invalidCredentials",
    });
  }

  // 🔑 Vérification du mot de passe
  const passwordMatch = await bcrypt.compare(
    body.password + runtime.passwordPepper,
    existingUser.password
  );
  if (!passwordMatch) {
    throw createError({
      statusCode: 401,
      statusMessage: "login.errors.invalidCredentials",
    });
  }

  const auth = await dataSource
    .insert(tables.auth)
    .values({ userId: existingUser.id })
    .returning({ id: tables.auth.id });

  return {
    user: existingUser,
    token: auth[0].id,
  };
});
