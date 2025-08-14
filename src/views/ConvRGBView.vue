<script setup
  lang="ts">
  import InputFrameRGB from '@/components/InputFrameRGB.vue';
  import SettingsFrame from '@/components/SettingsFrameRGB.vue';
  import { useVisualsStore } from '@/stores/visuals';
  import { onMounted } from 'vue';

  const visualsStore = useVisualsStore()

  onMounted(() => {
    visualsStore.channels = ['R', 'G', 'B']
  })
</script>

<template>
  <main>
    <InputFrameRGB />
    <div class="flex justify-center p-2 md:p-0">
      <SettingsFrame />
    </div>
  </main>
</template>
