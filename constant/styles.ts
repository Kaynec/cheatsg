import { type VueStyleProp } from "quasar";

export const inputStylesFN = computed<VueStyleProp>(() => ({
  fontSize: "16px",
  color: `var(--q-text-text-primary)`,
}));
