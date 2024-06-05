<script setup lang="ts">
const box = ref();

let isDown = ref(false);
let startX = 0;
let scrollLeft = 0;

let time = new Date();

let timeEnd = new Date().getTime() - time.getTime();

let oldXValSlider = 0;

function mousedown(e) {
  if (!box.value) return;
  time = new Date();
  isDown.value = true;
  canClick.value = false;

  startX = e.pageX - box.value.offsetLeft;
  scrollLeft = box.value.scrollLeft;
  oldXValSlider = box.value.scrollLeft;
  box.value.style.cursor = "grabbing";
  cancelMomentumTracking(); // Stop the drag momentum loop
}

function mouseleave() {
  if (!box.value) return;

  isDown.value = false;
  box.value.style.cursor = "grab";
  cancelMomentumTracking(); // Stop the drag momentum loop
}

let canClick = ref(true);

function mouseup() {
  if (!box.value) return;

  isDown.value = false;

  timeEnd = new Date().getTime() - time.getTime();

  if (
    Math.abs(box.value.scrollLeft) - Math.abs(oldXValSlider) < 100 &&
    timeEnd < 100
  )
    canClick.value = true;

  box.value.style.cursor = "grab";
  beginMomentumTracking();
}
let velX = 0;
function mousemove(e) {
  if (!box.value) return;
  if (!isDown.value) return;
  e.preventDefault();
  const x = e.pageX - box.value.offsetLeft;

  const prevScrollLeft = box.value.scrollLeft;

  const walkX = (x - startX) * 1.25; // Change this number to adjust the scroll speed
  box.value.scrollLeft = scrollLeft - walkX;
  velX = box.value.scrollLeft - prevScrollLeft;
}

// Momentum

var momentumID = null as any;

function beginMomentumTracking() {
  cancelMomentumTracking();
  momentumID = requestAnimationFrame(momentumLoop);
}

function cancelMomentumTracking() {
  cancelAnimationFrame(momentumID);
}

function momentumLoop() {
  if (!box.value) return;

  box.value.scrollLeft += velX; // Apply the velocity to the scroll position
  velX *= 0.95; // Slow the velocity slightly
  if (Math.abs(velX) > 0.5) {
    // Still moving?
    momentumID = requestAnimationFrame(momentumLoop); // Keep looping
  }
}

onMounted(() => {
  document.addEventListener("mousemove", mousemove);
});
</script>

<template>
  <!-- <div class="w-full"> -->
  <div
    class="!flex bvox w-full !flex-nowrap gap-8px pb-4 overflow-y-hidden overflow-x-auto relative pb-2rem"
    ref="box"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mouseleave="mouseleave"
  >
    <slot :canClick="canClick" />
  </div>
</template>
<style scoped>
.bvox::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.bvox {
  scrollbar-width: none; /* Firefox */
}
</style>
