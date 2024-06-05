import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

// @ts-ignore
import { presetFluid } from "unocss-preset-fluid";

export default defineConfig({
  theme: {
    breakpoints: {
      head: "900px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  shortcuts: [
    ["text_xs", "f-text-8-12"],
    ["text_sm", "f-text-12-16"],
    ["text_md", "f-text-12-16"],
    ["text_lg", "f-text-14-18"],
    ["text_xl", "f-text-16-20"],
    ["text_2xl", "f-text-18-22"],
    ["text_3xl", "f-text-20-24"],
    ["text_4xl", "f-text-22-26"],
    ["text_5xl", "f-text-24-28"],
    ["text_6xl", "f-text-26-30"],
    ["text_7xl", "f-text-28-32"],
    ["text_8xl", "f-text-30-34"],
    ["text_9xl", "f-text-32-36"],
    ["text_10xl", "f-text-34-38"],
    ["text_header", "f-text-22-40"],
    [
      "center-absolute",
      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    ],
    [
      "btn",
      "px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    [
      "icon-btn",
      "inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600",
    ],
    [
      "hide-input-arrows",
      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    ],
  ],
  presets: [
    presetFluid({
      // options
    }),
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: "prose prose-sm m-auto text-left".split(" "),
});
