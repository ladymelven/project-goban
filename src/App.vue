<template>
  <div id="app">
    <app-goban></app-goban>
    <app-controls></app-controls>
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue';
import Goban from '@/components/Goban.vue';

export default {
  name: 'App',
  components: {
    'app-goban': Goban,
    'app-controls': Controls
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
