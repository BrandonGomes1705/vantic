<script setup lang="ts">
import { Button } from "./components/ui";
import { ref } from "vue";
import { useSmoothReflow } from "./components/composition";
const loading = ref(false);
const buttonMsg = ref("Save");
const startLoading = () => {
  loading.value = true;
  buttonMsg.value = "Saving";

  setTimeout(() => {
    loading.value = false;
    buttonMsg.value = "Saved";
  }, 2000);
};
const count = ref(0);
const container = ref<HTMLElement>();
useSmoothReflow(container);
</script>

<template>
  <div class="py-24 flex items-center justify-center">
    <Button variant="ghost" @click="count++">Add</Button>
    <Button variant="ghost" @click="count--">Remove</Button>
    <Button variant="primary" :loading="loading" @click="startLoading">
      {{ buttonMsg }}
    </Button>
  </div>
  <div class="p-2 shadow mx-10 rounded bg-slate-200 space-y-2" ref="container">
    <div v-for="n in count" class="bg-white rounded h-10"></div>
  </div>
</template>

