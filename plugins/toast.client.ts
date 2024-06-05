// @ts-ignore
import Toast from "vue-toastification/dist/index.mjs";

import type { PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  // You can set your default options here
  toastClassName: "Font-Vazirmatn",
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
