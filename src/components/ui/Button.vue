<script setup lang="ts">
import { AutoDimensionTransition } from "../transitions";
import { LoadingIcon } from "../icons";
import { useSmoothReflow } from "../composition";
import { onMounted, ref } from "vue";

type Variant = "primary" | "secondary" | "ghost";
interface Props {
  variant?: Variant;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["click"]);

// Use the primary variant by default.
const variant = props.variant ?? "primary";

const buttonClasses = {
  primary: "bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-300",
  secondary:
    "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  ghost: "bg-transparent text-blue-500 hover:underline",
};

const buttonText = ref<HTMLElement>();
useSmoothReflow(buttonText);
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="text-center rounded-md px-4 py-2 font-semibold transition-colors flex h-12 items-center"
    :href="href"
    :class="buttonClasses[variant]"
    :disabled="disabled || loading"
    @click="emit('click')"
  >
    <span ref="buttonText" class="flex-1">
      <slot />
    </span>
    <AutoDimensionTransition dimension="width">
      <span v-show="loading" class="">
        <span class="block ml-4 h-6 w-6">
          <LoadingIcon />
        </span>
      </span>
    </AutoDimensionTransition>
  </component>
</template>
