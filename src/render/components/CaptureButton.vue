<template>
  <n-dropdown @select="handleSelect" v-model:show="showDropdown" trigger="hover" :options="options">
    <n-button @click="hideAndCapture">{{ $t('capture') }}</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import {HIDE_MAIN_WINDOW, START_CAPTURE} from "@/common/constant/event";
import {nextTick, ref} from 'vue'

export default {
  name: "CaptureButton",
  setup() {
    const showDropdown = ref(false)
    const hideAndCapture = ()=>{
      hideMainWindow().then(()=>{
        console.log('hide window')
        startCapture()
      })
    }
    const hideMainWindow  = ()=>{
      return window.ipcRenderer.invoke(HIDE_MAIN_WINDOW)
    }
    const startCapture = async () => {
      showDropdown.value = false
      const sources = await window.desktopCapturer.getSources({
        types: ['screen']
      })
      const stream = await (<any>navigator.mediaDevices).getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[0].id,
            minWidth: 1280,
            minHeight: 720,
            maxWidth: 8000,
            maxHeight: 8000,
          },
        },
      })
      let video = document.createElement('video')
      video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;'
      let loaded = false
      video.onloadedmetadata = () => {
        if (loaded) {
          return
        }
        loaded = true
        video.pause()
        video.style.height = video.videoHeight + 'px' // videoHeight
        video.style.width = video.videoWidth + 'px' // videoWidth
        let canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        let ctx = canvas.getContext('2d')
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
        window.ipcRenderer.send(START_CAPTURE, canvas.toDataURL('image/png'))
        video.remove()
      }
      video.srcObject = stream
      video.play()
      document.body.appendChild(video)
    }
    const handleSelect = () => {

    }
    const options = [{
      label: '截图并隐藏窗口',
      key: 'hideAndCapture'
    }, {
      label: '屏幕截图',
      key: 'capture'
    }]
    return {
      showDropdown,
      startCapture,
      options,
      handleSelect,
      hideMainWindow,
      hideAndCapture
    }
  }
}
</script>

<style scoped>

</style>
