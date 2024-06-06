import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  sensitive: true,
  routes(_routes) {
    return _routes.map((el) => ({
      ...el,
      path: el.path.toLowerCase(),
    }));
  },
};
