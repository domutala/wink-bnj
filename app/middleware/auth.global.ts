export default defineNuxtRouteMiddleware((to, from) => {
  console.log("++++++++");
  const { $localePath } = useNuxtApp();

  if (!Store.auth.auth && !to.path.startsWith("/auth")) {
    return navigateTo($localePath({ name: "auth-login" }));
  }
});
