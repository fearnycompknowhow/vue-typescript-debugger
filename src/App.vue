<template>
  <div class="container" @click="onClick">
    <div class="logo">ckh</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    onClick() {
      console.log('Clicked!');
    }
  }
});
</script>

<style>
/* Some basic styles to center the content */
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #063267;
  border-radius: 10px;
  cursor: pointer;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: white;
  font-size: 48px;
  border: 3px white solid;
  padding: 0;
  line-height: 34px;
  padding-left: 2px;
  padding-top: 8px;
  padding-bottom: 2px;
}
</style>