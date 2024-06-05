import { acceptHMRUpdate, defineStore } from "pinia";

export const useRouterStore = defineStore("router", () => {
  const routerStack = useState<string[]>("routerStack", () => []);

  return {
    routerStack,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useRouterStore, import.meta.hot));
