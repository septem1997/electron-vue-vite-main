<template>
  <n-button @click="capture">截图</n-button>
</template>

<script lang="ts">
import {START_CAPTURE} from "@/common/constant/event";

export default {
  name: "test",
  setup(){
    const capture = ()=>{
      window.ipcRenderer.send(START_CAPTURE)
    }
    return{
      capture
    }
  }
}
</script>

<style scoped>

</style>
