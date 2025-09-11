<script setup lang="ts">
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import Button from '../ui/button/Button.vue'
import { Upload } from 'lucide-vue-next'
import jpegUint8ArrayToRgb from '@/utils/uInt8ToRGB'
import { resizeImage } from '@/utils/imageformat'

import { useDropZone } from '@vueuse/core'
import { ref } from 'vue'
import UploadPreview from './UploadPreview.vue'
import DialogClose from '../ui/dialog/DialogClose.vue'
import splitRGB from '@/utils/splitRGB'
import type { ImageRGB } from '@/types/imageRGB'
import { useconvRGBStore } from '@/stores/convRGB'

const uploadedImage = ref<ImageRGB>()

const convRGBStore = useconvRGBStore()

async function onDrop(files: File[] | null) {
  if (!files) return
  const imageBlob = await files[0].bytes()
  const pixels = await jpegUint8ArrayToRgb(imageBlob)
  const pixelsRGB = splitRGB(Array.from(pixels.data))
  if (pixels.width !== 32) {
    pixelsRGB.R = resizeImage(pixelsRGB.R, pixels.width, pixels.height, 32)
    pixelsRGB.G = resizeImage(pixelsRGB.G, pixels.width, pixels.height, 32)
    pixelsRGB.B = resizeImage(pixelsRGB.B, pixels.width, pixels.height, 32)
  }
  uploadedImage.value = {
    width: 32,
    height: 32,
    R: pixelsRGB.R,
    G: pixelsRGB.G,
    B: pixelsRGB.B,
  }
}

function onSave() {
  convRGBStore.input = uploadedImage.value!
  convRGBStore.isExampleSelected = true
  uploadedImage.value = undefined
}

const dropZoneRef = ref<HTMLDivElement>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['image/jpeg', 'image/png'],
  multiple: false,
  preventDefaultForUnhandled: false,
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="mx-2"> Upload Image </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] md:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Image upload</DialogTitle>
        <DialogDescription>
          <p>Upload your image here. Once it's uploaded, click "Save" button.</p>
          <p>Your image will be converted to grayscale resized to 32x32.</p>
          <p>For best result use 32x32 images.</p>
        </DialogDescription>
      </DialogHeader>
      <div
        ref="dropZoneRef"
        class="flex items-center justify-center w-full aspect-video border border-emerald-800 border-dashed cursor-pointer"
      >
        <UploadPreview v-if="uploadedImage" :image="uploadedImage" />
        <Upload v-else />
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button @click="onSave" type="submit" :disabled="!uploadedImage"> Save </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
