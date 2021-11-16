<template>
  <div style="width: 100vw; height: 100vh">
    <div
      :style="{
        position: 'fixed',
        left: toolPosition.x + 'px',
        top: toolPosition.y + 'px',
        zIndex: 9999999999,
        background: 'white',
      }"
    >
      <n-button @click="hideCaptureWindow">取消</n-button>
      <n-button>完成</n-button>
    </div>
    <vueCropper
      ref="cropper"
      :can-move="false"
      :img="src"
      @realTime="cropChange"
    ></vueCropper>
  </div>
</template>

<script>
import {
  HIDE_CAPTURE_WINDOW,
  SetCaptureImg,
  SHOW_CAPTURE_WINDOW,
} from "@/common/constant/event";
import { ref, nextTick, reactive, computed } from "vue";
export default {
  name: "CapturePage",
  setup() {
    const src = ref("");
    const cropper = ref(null);
    const toolPosition = reactive({
      x: 0,
      y: 0,
    });
    const cropChange = (e) => {
      const pos = document
        .getElementsByClassName("cropper-crop-box")[0]
        .style.transform.match(/[\d]+px/g);
      toolPosition.x = parseFloat(pos[0]) + e.w;
      toolPosition.y = parseFloat(pos[1]) + e.h;
    };
    const hideCaptureWindow = () => {
      window.ipcRenderer.send(HIDE_CAPTURE_WINDOW);
    };
    window.ipcRenderer.on(SetCaptureImg, (e, base64Data) => {
      console.log("receive base64");
      src.value = base64Data;
      nextTick(() => {
        window.ipcRenderer.send(SHOW_CAPTURE_WINDOW);
        cropper.value.startCrop();
      });
    });
    return { src, cropper, toolPosition, cropChange, hideCaptureWindow };
  },
};
</script>

<style scoped></style>
