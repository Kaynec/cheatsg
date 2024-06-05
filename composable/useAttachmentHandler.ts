import { AttachmentTypeEnum, type ProductDetailOutPut } from "@/api";
import type { Attachment } from "@/types";

export function useAttachmentHandler(data: ProductDetailOutPut) {
  const garranties = ref(
    (
      (data as any).attachments.map((attch: Attachment) => ({
        ...attch,
        selected: false,
      })) as Attachment[]
    ).filter((attach) => attach.attachment_type === AttachmentTypeEnum.NUMBER_1)
  );
  const insurance = ref(
    (
      (data as any).attachments.map((attch: Attachment) => ({
        ...attch,
        selected: false,
      })) as Attachment[]
    ).filter((attach) => attach.attachment_type === AttachmentTypeEnum.NUMBER_2)
  );
  const capacities = ref(
    (
      (data as any).attachments.map((attch: Attachment) => ({
        ...attch,
        selected: false,
      })) as Attachment[]
    ).filter((attach) => attach.attachment_type === AttachmentTypeEnum.NUMBER_3)
  );

  const currentSelectedAttachments = ref<Attachment[]>([]);
  const currentLabel = ref("بیمه");
  const selectedInsurance = ref("");
  const selectedGarranty = ref("");
  const selectedcapacity = ref("");
  const allSelectedAttachments = computed(() => [
    selectedInsurance.value,
    selectedGarranty.value,
    selectedcapacity.value,
  ]);
  const showDialog = ref(false);

  return {
    showDialog,
    currentLabel,
    currentSelectedAttachments,
    allSelectedAttachments,
    selectedGarranty,
    selectedInsurance,
    selectedcapacity,
    garranties,
    insurance,
    capacities,
  };
}
