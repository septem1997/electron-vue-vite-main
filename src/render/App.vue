<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
export default {
  name: "App",
  components: {},
  setup() {
    const router = useRouter();
    const jump = () => {
      router.push("/test");
    };
    return {
      jump,
    };
  },
};
</script>
