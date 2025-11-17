export type User = typeof tables.user.$inferSelect;

const store = defineStore(
  "auth",
  () => {
    const auth = ref<{ token: string; user: User }>();

    async function login(email: string, password: string) {
      const toast = useToast();
      const { $i18n } = useNuxtApp();

      try {
        const res = await $fetch("/api/login", {
          method: "POST",
          body: { email, password },
        });

        auth.value = {
          token: res.token,
          user: res.user as any,
        };
      } catch (error: any) {
        let message = "login.errors.global";

        if (error.data?.statusMessage) {
          message = error.data.statusMessage;
        }

        toast.add({
          description: $i18n.t(message),
          icon: "i-lucide-bug",
          color: "error",
        });
      }
    }

    function logout() {
      auth.value = undefined;
      Use.router.push(Use.localePath({ name: "auth-login" }));
    }

    return {
      auth,
      login,
      logout,
    };
  },
  { persist: true }
);

export default store;
