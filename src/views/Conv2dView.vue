<script setup
  lang="ts">
  import InputFrame from '@/components/InputFrame.vue';
  import SettingsFrame from '@/components/SettingsFrame.vue';
</script>

<template>
  <main>
    <InputFrame />
    <div class="flex justify-center p-2 md:p-0">
      <SettingsFrame />
    </div>
  </main>
</template>
