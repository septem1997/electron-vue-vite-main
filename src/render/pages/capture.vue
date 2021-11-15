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
      <n-button>取消</n-button>
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
import { SetCaptureImg, SHOW_CAPTURE_WINDOW } from "@/common/constant/event";
import { ref, nextTick, reactive, computed } from "vue";
export default {
  name: "CapturePage",
  setup() {
    const src = ref("");
    const cropper = ref(null);
    const cropInfo = reactive({
      width: 0,
      height: 0,
      x: -1,
      y: -1,
    });
    const toolPosition = reactive({
      x: 0,
      y: 0,
    });
    const cropChange = (e) => {
      const pos = document
        .getElementsByClassName("cropper-crop-box")[0]
        .style.transform.match(/[\d]+px/g);
    };
    window.ipcRenderer.on(SetCaptureImg, (e, base64Data) => {
      console.log("receive base64");
      src.value = base64Data;
      nextTick(() => {
        window.ipcRenderer.send(SHOW_CAPTURE_WINDOW);
        cropper.value.startCrop();
      });
    });
    return { src, cropper, toolPosition, cropChange };
  },
};
</script>

<style scoped></style>
