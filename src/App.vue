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
import * as actions from '@/store/constants';

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
        setBoard: this.setBoard,
        askRevert: '',
        confirmRevert: '',
        move: this.move
      })
    };
  },
  methods: {
    setSeat(color, name) {
      const payload = { color, name };
      this.$store.dispatch(actions.TOGGLE_SEAT, payload);
    },
    setSize(size) {
      this.$store.dispatch(actions.CHANGE_SIZE, size);
    },
    setBoard(condition) {
      this.setSize(condition.size);
      if (condition.players.black) { this.setSeat(condition.players.black); }
      if (condition.players.white) { this.setSeat(condition.players.white); }

      if (condition.preset !== 'standard') {
        this.$store.dispatch(actions.SET_PRESETS, condition.preset);
      } else if (condition.handicap > 0) {
        this.$store.dispatch(actions.SET_PRESETS, condition.handicap);
      }
      if (condition.log) {
        condition.log.forEach(move => {
          this.move(move.color, move.coords);
        });
      }
    },
    move(color, coords) {
      console.log(color, coords);
      if ((color === 'black' && this.isBlacksMove) || (color === 'white' && !this.isBlacksMove)) {
        this.$refs.goban.placeStone(coords.row, coords.cell);
      } else {
        this.$store.dispatch('switchMove');
        this.$refs.goban.placeStone(coords.row, coords.cell);
      }
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
