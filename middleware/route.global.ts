export default defineNuxtRouteMiddleware((to, from) => {
  const routerStoreStack = useRouterStore().routerStack;

  // This line of code insures that the page always starts from the top
  useGlobalStore().scrollToTop();
  useGlobalStore().setCurrentTextName([]);

  if (!routerStoreStack.includes(from.path) && !from.path.includes("auth")) {
    routerStoreStack.push(from.path);
  }
});
