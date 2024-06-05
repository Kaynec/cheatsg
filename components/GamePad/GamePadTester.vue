<template>
  <QCard
    class="min-h-140 py-lg shadow-0 custom flex flex-col w-full justify-center items-center relative w-90vw max-w-350 mx-auto"
  >
    <span class="text-center text-primary"> {{ gamepad?.id }} </span>
    <template v-if="connected">
      <!-- Detail About Current Controller -->
      <div class="w-full !md:w-20% h-max lg:h-full static start-0 !lg:absolute">
        <div
          class="grid grid-cols-2 content-start items-center h-fit !lg:h-full gap-y-xl"
        >
          <div
            class="col-span-2 flex flex-col items-center gap-3 justify-center"
          >
            <!-- Right Analog Stick Desktop -->
            <Circle
              :X="axesMapping.rightAxesX"
              :Y="axesMapping.rightAxesY"
              class="translate-y-21 translate-x-67% lg:translate-x-65% xl:translate-x-55%"
              v-if="$q.screen.width > 1024"
              :transform="'scale(0.95, 0.95)'"
            />
          </div>

          <p class="flex flex-col text-text-secondary text-center">
            index: <span class="text-text-primary">{{ gamepad.index }}</span>
          </p>

          <p class="flex flex-col text-text-secondary text-center">
            vibration:
            <span class="text-text-primary">
              {{ supportsVibration }}
            </span>
          </p>
          <p class="flex flex-col text-text-secondary text-center col-span-2">
            timestamp:
            <span class="text-text-primary">
              {{ gamepad.timestamp }}
            </span>
          </p>
        </div>
      </div>
      <!-- Left Analog Stick Desktop -->
      <Circle
        :X="axesMapping.leftAxesX"
        :Y="axesMapping.leftAxesY"
        v-if="$q.screen.width > 1024"
        class="absolute end-0 top-0 translate-y-21 translate-x-35"
        :transform="'scale(0.95, 0.95)'"
      />
      <div class="flex flex-col justify-center items-center">
        <Ps5Skin
          :connected="connected"
          :buttonMapping="buttonMapping"
          :axesMapping="axesMapping"
          :AxisMultiplier="AxisMultiplier"
          :fillColor="fillColor"
          :isActive="isActive"
        />
        <!--  -->
        <div class="flex !flex-nowrap">
          <div class="flex-1">
            <Circle
              :X="axesMapping.rightAxesX"
              :Y="axesMapping.rightAxesY"
              v-if="$q.screen.width < 1024"
              class="translate-x-50% translate-y-20% !max-w-full"
              :transform="'scale(0.95, 0.95)'"
            />
          </div>
          <div class="flex-1">
            <Circle
              :X="axesMapping.leftAxesX"
              :Y="axesMapping.leftAxesY"
              v-if="$q.screen.width < 1024"
              class="translate-x-50% translate-y-20% !max-w-full"
              :transform="'scale(0.95, 0.95)'"
            />
          </div>
        </div>
        <!--  -->
        <div
          class="mx-auto w-full flex-col md:flex-row flex justify-center items-center gap-3"
        >
          <PrimaryButton
            class="!rounded-lg !max-w-75 flex-1"
            :disabled="!supportsVibration"
            @click="vibrate"
          >
            تست ویبره
          </PrimaryButton>
          <OutlinedButton
            @click="submitController"
            class="!rounded-lg flex-1 !max-w-75 w-full"
          >
            تکمیل تست
          </OutlinedButton>
        </div>
      </div>
    </template>

    <div
      class="h-full flex flex-col items-center justify-center"
      v-if="!connected"
    >
      <QSpinner size="xl" />
      <span class="text-center">
        برای شروع تست دسته خود را متصل کرده و شروع به فشار دادن دکمه ها کنید
      </span>
    </div>
  </QCard>
</template>

<script setup lang="ts">
import type { AxesMapping, ButtonMapping } from "@/types";
import { useGamepad } from "@vueuse/core";
const { gamepads, isActive, onDisconnected, onConnected } = useGamepad();

const connected = ref(false);

onConnected(() => (connected.value = true));
onDisconnected(() => (connected.value = false));

const gamepad = computed(() => gamepads.value[0]);

const fillColor = "red";

const buttonMapping = computed(
  () =>
    ({
      bottomButton: gamepad.value.buttons[0],
      rightButton: gamepad.value.buttons[1],
      leftButton: gamepad.value.buttons[2],
      topButton: gamepad.value.buttons[3],
      leftBumper: gamepad.value.buttons[4],
      rightBumper: gamepad.value.buttons[5],
      leftTrigger: gamepad.value.buttons[6],
      rightTrigger: gamepad.value.buttons[7],
      optionsButton: gamepad.value.buttons[8],
      startButton: gamepad.value.buttons[9],
      leftAnalogButton: gamepad.value.buttons[10],
      rightAnalogButton: gamepad.value.buttons[11],
      DpadUp: gamepad.value.buttons[12],
      DpadDown: gamepad.value.buttons[13],
      DpadLeft: gamepad.value.buttons[14],
      DpadRight: gamepad.value.buttons[15],
      power: gamepad.value.buttons[16],
    }) as ButtonMapping
);

const axesMapping = computed(
  () =>
    ({
      leftAxesX: gamepad.value.axes[0],
      leftAxesY: gamepad.value.axes[1],
      rightAxesX: gamepad.value.axes[2],
      rightAxesY: gamepad.value.axes[3],
    }) as AxesMapping
);

const AxisMultiplier = 20;

const supportsVibration = computed(
  () => gamepad.value?.hapticActuators.length > 0
);
function vibrate() {
  if (!supportsVibration.value) return;
  const actuator: any = gamepad.value.hapticActuators[0];
  actuator.playEffect("dual-rumble", {
    startDelay: 0,
    duration: 1000,
    weakMagnitude: 1,
    strongMagnitude: 1,
  });
}

// const calculateDeadzone = (x: number, y: number, deadzone: number = 0.1) => {
//   let xDeflection = 0,
//     yDeflection = 0;
//   if (x !== 0 || y !== 0) {
//     const distRange = 1 - deadzone;
//     const dist = distRange * Math.sqrt(x * x + y * y) + deadzone;
//     const angle = Math.atan2(x, y);
//     xDeflection = dist * Math.sin(angle);
//     xDeflection = Math.min(1, Math.max(-1, xDeflection));
//     yDeflection = dist * Math.cos(angle);
//     yDeflection = Math.min(1, Math.max(-1, yDeflection));
//   }
//   return { xDeflection, yDeflection };
// };

const store = useAuthStore();

function submitController() {
  if (!store.isAuthenticated)
    return navigateTo({
      name: "auth-login",
    });

  navigateTo({
    name: "Repair-Problems",
    query: {
      type: "gamepad",
      tags: useRouter().currentRoute.value.query.tags,
    },
  });
}
</script>

<style scoped>
.custom {
  background-image: url("../../assets/controller-card-right-img.svg"),
    url("../../assets/controller-card-left-img.svg");
  background-position: left, right;
  background-repeat: no-repeat, no-repeat;
  position: relative;
  background-size: contain;
}

@media screen and (max-width: 1024px) {
  .custom {
    background-image: none;
  }
}
.css-1jxoetp {
  position: relative;
  height: 157px;
  width: 157px;
  display: inline-block;
  border: 10px solid rgba(0, 0, 0, 0);
}
</style>
