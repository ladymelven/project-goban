<template>
  <div id="app">
    <div class="container justify-content-center">
      <div class="row">
        <app-goban></app-goban>
        <app-controls></app-controls>
      </div>
    </div>
    <welcome-modal></welcome-modal>
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue';
import Goban from '@/components/Goban.vue';
import Welcome from '@/components/Welcome.vue';

export default {
  name: 'App',
  components: {
    'app-goban': Goban,
    'app-controls': Controls,
    'welcome-modal': Welcome
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
