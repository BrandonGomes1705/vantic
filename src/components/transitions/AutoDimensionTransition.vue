<script setup lang="ts">
interface Props {
  dimension: "height" | "width";
}
const props = defineProps<Props>();
const { dimension } = props;

const enter = (element: HTMLElement) => {
  element.style.position = "absolute";
  element.style[dimension] = "auto";

  const finalValue = getComputedStyle(element)[dimension];

  element.style.position = "";
  element.style[dimension] = "0px";

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element)[dimension];
  requestAnimationFrame(() => {
    element.style[dimension] = finalValue;
  });
};

const afterEnter = (element: HTMLElement) => {
  element.style[dimension] = "";
};

const leave = (element: HTMLElement) => {
  const initialValue = getComputedStyle(element)[dimension];

  element.style[dimension] = initialValue;

  // Force repaint to make sure the
  // animation is triggered correctly.
  getComputedStyle(element)[dimension];

  requestAnimationFrame(() => {
    element.style[dimension] = "0px";
  });
};
</script>
<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<style>
.expand-leave-active {
  transition: height 0.3s ease-in-out, width 0.3s ease-in-out,
    opacity 0.2s ease-in-out;
}

.expand-enter-active {
  transition: height 0.3s ease-in-out, width 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
}
</style>
