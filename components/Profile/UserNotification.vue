<template>
  <div>
    <QCard class="shadow-none bg-background-primary min-h-120 pa-sm">
      <QScrollArea style="height: 30rem">
        <div class="grid lg:grid-cols-2 gap-3 px-4" v-auto-animate>
          <Notification
            v-for="item in unfilteredNotifications"
            :name="item.message.title"
            :description="item.message.passage"
            @close="updateNotification(item.id)"
          />
        </div>
      </QScrollArea>
    </QCard>
  </div>
</template>

<script setup lang="ts">
import {
  apiGeneralMessageListUserRetrieve,
  type UserMessageOutPut,
  apiGeneralSeenMessageReportUpdate
} from '@/api'
import { vAutoAnimate } from '@formkit/auto-animate'

const { data: notifications, execute } = useAsyncData(
  'user-notifs',
  async () =>
    (await apiGeneralMessageListUserRetrieve()) as any as UserMessageOutPut[]
)

function updateNotification(id: number) {
  apiGeneralSeenMessageReportUpdate(id).then((r: any) => {
    if (!r) return
    refreshNuxtData('user-notifs')
  })
}

const unfilteredNotifications = computed(() =>
  notifications.value?.filter(el => !el.is_seen)
)
</script>
