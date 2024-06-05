// import { quasar } from "@quasar/vite-plugin";
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  devServer: {
    port: 4173,
  },
  site: {
    url: "https://cheatsg.ir",
    name: "صفحه لندینگ چیتز گیم",
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
  },
  postcss: {
    plugins: {
      "postcss-rtlcss": {},
    },
  },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: "چیتز گیم",
      url: "https:/cheatsg.ir",
    },
  },
  webVitals: {
    provider: "log",
    debug: true, // debug enable metrics reporting on dev environments
    disabled: false,
  },
  alias: {
    "@": "",
    "~": "",
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    "@unocss/nuxt",
    "nuxt-typed-router",
    "@nuxtjs/critters",
    "@nuxtjs/web-vitals",
    "@nuxtjs/critters",
    "nuxt-simple-robots",
    "nuxt-quasar-ui",
    "nuxt-schema-org",
  ],

  robots: {
    sitemap: "https://cheatsg.ir/sitemap.xml",
    // disallow: [
    //   "/auth/*",
    //   "/Basket/",
    //   "/BasketDateSelect/",

    //   "PaymentMethod",
    //   "PaymentSuccess",
    //   "RepairPaymentSuccess",
    //   "/Repair/Register",
    //   "/Repair/DateSelect",
    //   "/Profile/",
    // ],
    disallow: "/",
  },

  image: {
    quality: 75,
    format: ["webp"],
    domains: ["storage.iran.liara.space"],
  },
  pinia: {
    storesDirs: ["store/**"],
  },
  quasar: {
    sassVariables: "@/assets/scss/quasar-variables.scss",
    plugins: ["Dark", "Loading"],
    lang: "fa-IR",
  },
  imports: {
    dirs: ["composables", "store", "imports"],
    imports: [
      {
        from: "@vueuse/core",
      },
      {
        from: "vue/macros",
      },
      {
        from: "vue",
      },
    ],
  },
  components: [
    {
      path: "components",
      pathPrefix: false,
    },
    // {
    //   path: "node_modules/quasar/src/components/",
    //   pathPrefix: false,
    // },
  ],

  build: {
    // transpile: ["quasar", "@happy-dom/global-registrator"],
  },
  css: ["@/assets/scss/main.scss", "@unocss/reset/tailwind.css"],
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    build: {
      cssMinify: true,
      minify: true,
    },
    ssr: {
      external: ["happy-dom"],
    },
    // plugins: [
    //   quasar({
    //     sassVariables: "@/assets/scss/quasar-variables.scss",
    //   }),
    // ],
  },
});
