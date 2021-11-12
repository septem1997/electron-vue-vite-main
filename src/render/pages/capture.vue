<template>
  <img style="width: 100%;height: 100%;position: absolute;left: 0;top: 0" :src="src">
</template>

<script>
import { SetCaptureImg, SHOW_CAPTURE_WINDOW} from "@/common/constant/event";
import {ref,nextTick} from 'vue'
export default {
  name: "capture",
  setup(){
    const src = ref('')
    window.ipcRenderer.on(SetCaptureImg,(e, base64Data)=>{
      src.value=base64Data
      nextTick(()=>{
        window.ipcRenderer.send(SHOW_CAPTURE_WINDOW)
      })
    })
    return {src}
  }
}
</script>

<style scoped>

</style>
