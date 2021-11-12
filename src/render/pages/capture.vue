<template>
  <img :src="src">
</template>

<script>
import {CAPTURE_SCREEN} from "@/common/constant/event";
import {ref} from 'vue'
export default {
  name: "capture",
  setup(){
    const src = ref('')
    const getScreen = async (callback) => {

      document.body.style.opacity = '0'
      let oldCursor = document.body.style.cursor
      document.body.style.cursor = 'none'

      const handleStream = (stream) => {
        document.body.style.cursor = oldCursor
        document.body.style.opacity = '1'
        // Create hidden video tag
        let video = document.createElement('video')
        video.style.cssText = 'position:absolute;top:-10000px;left:-10000px;'
        // Event connected to stream

        let loaded = false
        video.onloadedmetadata = () => {
          if (loaded) {
            return
          }
          loaded = true
          // Set video ORIGINAL height (screenshot)
          video.style.height = video.videoHeight + 'px' // videoHeight
          video.style.width = video.videoWidth + 'px' // videoWidth

          // Create canvas
          let canvas = document.createElement('canvas')
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          let ctx = canvas.getContext('2d')
          // Draw video on canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

          if (callback) {
            // Save screenshot to png - base64
            callback(canvas.toDataURL('image/png'))
          } else {
            // console.log('Need callback!')
          }

          // Remove hidden video tag
          video.remove()
          try {
            stream.getTracks()[0].stop()
          } catch (e) {
            // nothing
          }
        }
        video.srcObject = stream
        document.body.appendChild(video)
      }


      const sources = await window.desktopCapturer.getSources({
        types: ['screen']
      })
      const stream = await navigator.mediaDevices.getUserMedia({
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
      handleStream(stream)
    }

    window.ipcRenderer.on(CAPTURE_SCREEN,()=>{
      console.log('get screen')
      getScreen((base64)=>{
        console.log('base64',base64)
        src.value = base64
      })
    })
    return {src}
  }
}
</script>

<style scoped>

</style>
