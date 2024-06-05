// @ts-ignore
import { useToast as toast } from 'vue-toastification/dist/index.mjs'
import type { ToastInterface } from 'vue-toastification/dist/types'

export const useToast = toast as () => ToastInterface
