import type { StoryOutPut } from "@/api";
import { useDark } from "@vueuse/core";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useQuasar } from "quasar";

export const useGlobalStore = defineStore("global", () => {
  const scrollRef = useState<any>();

  const date = new Date();

  date.setFullYear(date.getFullYear() + 1);

  function changeDarkModeSelectors() {
    const html = document.querySelector("html");
    const body = document.body;
    if (dark.value) {
      html?.classList.remove("light");
      body?.classList.remove("body--light");
      html?.classList.add("dark");
      body.classList.add("body--dark");
    } else {
      html?.classList.remove("dark");
      body?.classList.remove("body--dark");
      html?.classList.add("light");
      body.classList.add("body--light");
    }
  }

  const $q = useQuasar();
  $q.dark.set(true);
  const dark = useDark();
  if (dark.value) {
    $q.dark.set(true);
  }
  // ARBITARY TIME OUT TIME
  // changeDarkModeSelectors();
  function toggleDark() {
    dark.value = !dark.value;
    $q.dark.set(dark.value);
    changeDarkModeSelectors();
  }

  const currentStorySource = ref<StoryOutPut>();

  type Schema = {
    label: string;
    to: string;
  };

  const currentSchema = ref<Schema[]>([]);

  return {
    dark,
    toggleDark,
    scrollRef,
    currentSchema,
    setScrollRef: (el: Ref<any>) => (scrollRef.value = el),
    setCurrentTextName: (el: Schema[]) => (currentSchema.value = el),
    getCurrentStorySource: () => currentStorySource.value,
    setCurrentStorySource: (el: StoryOutPut) => (currentStorySource.value = el),
    currentStorySource,
    scrollToTop: () => {
      setTimeout(() => {
        const position = ref(0);
        scrollRef.value?.setScrollPosition("vertical", position.value);
      }, 100);
    },
    changeDarkModeSelectors,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
