<template>
  <router-view></router-view>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup(){
    const router = useRouter()
    const jump = ()=>{
      router.push('/test')
    }
    return{
      jump
    }
  }
}
</script>

<style>
.logo-box {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
