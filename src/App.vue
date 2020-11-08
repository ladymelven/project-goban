<template>
  <div id="app">
    <div class="container justify-content-center">
      <div class="row">
        <app-goban ref="goban" :socket="socket"></app-goban>
        <app-controls :socket="socket"></app-controls>
      </div>
    </div>
    <welcome-modal :socket="socket"></welcome-modal>
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue';
import Goban from '@/components/Goban.vue';
import Welcome from '@/components/Welcome.vue';
import { mapGetters } from 'vuex';

import Socket from '@/./socket';

export default {
  name: 'App',
  components: {
    'app-goban': Goban,
    'app-controls': Controls,
    'welcome-modal': Welcome
  },
  data() {
    return {
      socket: new Socket({
        setSize: this.setSize,
        setSeat: this.setSeat,
        clearSeat: this.clearSeat,
        setBoard: this.setBoard,
        askRevert: '',
        confirmRevert: '',
        move: this.move
      })
    };
  },
  computed: {
    ...mapGetters(['names', 'isBlacksMove'])
  },
  methods: {
    setSeat(color, name) {
      if (!this.names[color]) {
        const payload = { color, name };
        this.$store.dispatch('toggleSeat', payload);
      }
    },
    clearSeat(color) {
      if (this.names[color]) {
        const payload = { color };
        this.$store.dispatch('toggleSeat', payload);
      }
    },
    setSize(size) {
      this.$store.dispatch('changeSize', size);
    },
    setBoard(condition) {
      this.setSize(condition.size);
      if (condition.players.black) { this.setSeat(condition.players.black); }
      if (condition.players.white) { this.setSeat(condition.players.white); }

      if (condition.preset !== 'standard') {
        this.$store.dispatch('setPresets', condition.preset);
      } else if (condition.handicap > 0) {
        this.$store.dispatch('setPresets', condition.handicap);
      }
      if (condition.log) {
        condition.log.forEach(move => {
          this.move(move.color, move.coords);
        });
      }
    },
    move(color, coords) {
      if ((color === 'black' && !this.isBlacksMove) || (color === 'white' && this.isBlacksMove)) {
        this.$store.dispatch('switchMove');
      }
      this.$refs.goban.placeStone(coords.row, coords.cell, true);
    }
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
