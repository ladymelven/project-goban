<template>
  <div class="container justify-content-center">
    <h2 class="h2 w-100 text-center">Ход {{ isBlacksMove ? 'черных' : 'белых' }}</h2>
    <p class="w-100 text-center">
      Пленники: ⚫{{ this.captives.black }} ⚪{{ this.captives.white }}
    </p>
    <div class="my-3 row justify-content-center">
      <div class="d-flex w-auto" v-for="row of 19" :key="row">
        <goban-cell
          v-for="cell of 19"
          :move="isBlacksMove"
          :row="row"
          :cell="cell"
          :stone="hasStone(row, cell)"
          :key="row + cell"
          @stone="placeStone"></goban-cell>
      </div>
    </div>
  </div>
</template>

<script>
import presets from '@/presets';
import GobanCell from './GobanCell.vue';
import eventBus from '../event-bus';

export default {
  name: 'Goban.vue',
  components: {
    'goban-cell': GobanCell
  },
  data() {
    return {
      isBlacksMove: true,
      black: [],
      white: [],
      captives: {
        black: 0,
        white: 0
      },
      currentGroup: [],
      log: []
    };
  },
  methods: {
    newGame() {
      this.black = [];
      this.white = [];
      this.captives.black = 0;
      this.captives.white = 0;
      this.isBlacksMove = true;
      this.currentGroup = [];
      this.log = [];
    },
    placeStone(row, cell) {
      if (this.hasStone(row, cell)) { return; }

      const color = this.isBlacksMove ? 'black' : 'white';
      const opponentColor = this.isBlacksMove ? 'white' : 'black';
      this[color].push({ row, cell });
      // first check if the stone kills adjacent enemy stones
      const surrounding = this.getConnectedCoords(row, cell, opponentColor);
      surrounding.forEach(stone => {
        this.currentGroup = [];
        if (this.isSurrounded(stone.row, stone.cell, opponentColor)) {
          this.removeGroup(this.currentGroup, opponentColor, color);
        }
      });
      // then we check if the move is a suicide and thus illegal
      this.currentGroup = [];
      if (this.isSurrounded(row, cell, color)) {
        this[color].pop();
        return;
      }
      // if the move is prohibited by ko rule, we revert it
      if (this.log.length > 6 && this.isKo()) {
        this.black = [...this.log[this.log.length - 1].black];
        this.white = [...this.log[this.log.length - 1].white];
        this.captives = { ...this.log[this.log.length - 1].captives };
        return;
      }
      // give the turn to the opponent
      this.log.push({
        black: [...this.black],
        white: [...this.white],
        captives: { ...this.captives }
      });
      this.isBlacksMove = !this.isBlacksMove;
    },
    hasBlackStone(row, cell) {
      return !!this.black
        .filter(blackStone => blackStone.row === row && blackStone.cell === cell).length;
    },
    hasWhiteStone(row, cell) {
      return !!this.white
        .filter(whiteStone => whiteStone.row === row && whiteStone.cell === cell).length;
    },
    hasStone(row, cell) {
      if (this.hasWhiteStone(row, cell)) {
        return 'white';
      }
      if (this.hasBlackStone(row, cell)) {
        return 'black';
      }
      if (row > 19 || row < 1 || cell > 19 || cell < 1) {
        return 'edge';
      }
      return null;
    },
    getConnectedCoords(row, cell, color) {
      return this[color].filter(stone => ((stone.row === row && (stone.cell === cell + 1))
          || ((stone.row === row + 1) && stone.cell === cell)
          || ((stone.row === row - 1) && stone.cell === cell)
          || (stone.row === row && (stone.cell === cell - 1))));
    },
    isSurrounded(row, cell, color) {
      this.currentGroup.push({ row, cell });
      const hasBreath = !this.hasStone(row + 1, cell)
        || !this.hasStone(row, cell + 1)
        || !this.hasStone(row - 1, cell)
        || !this.hasStone(row, cell - 1);
      if (hasBreath) {
        return false;
      }

      // if the stone itself does not have breath, we search for its group members
      const group = this.getConnectedCoords(row, cell, color);
      // if no connected stones & no breath => surrounded by enemy stones
      if (group.length === 0) {
        return true;
      }
      return group.every(stone => (!this.currentGroup
        .find(item => item.row === stone.row && item.cell === stone.cell)
        ? this.isSurrounded(stone.row, stone.cell, color) : true));
    },
    removeGroup(group, color, opponentColor) {
      group.forEach(stone => {
        const indexToRemove = this[color].findIndex(item => (item.row === stone.row
          && item.cell === stone.cell));
        this[color].splice(indexToRemove, 1);
        this.captives[opponentColor] += 1;
      });
    },
    isKo() {
      const prevBlack = this.log[this.log.length - 2].black;
      const prevWhite = this.log[this.log.length - 2].white;
      if (this.black.length !== prevBlack.length
        || this.white.length !== prevWhite.length) {
        return false;
      }
      for (let i = 0; i < this.black.length; i++) {
        if (!prevBlack.find(move => move.row === this.black[i].row
          && move.cell === this.black[i].cell)) {
          return false;
        }
      }
      for (let i = 0; i < this.white; i++) {
        if (!prevWhite.find(move => move.row === this.white[i].row
          && move.cell === this.black[i].cell)) {
          return false;
        }
      }
      return true;
    },
    revert() {
      if (this.log.length > 1) {
        this.black = [...this.log[this.log.length - 2].black];
        this.white = [...this.log[this.log.length - 2].white];
        this.captives = { ...this.log[this.log.length - 2].captives };
      } else {
        this.black = [];
        this.white = [];
        this.captives.white = 0;
        this.captives.black = 0;
      }
      this.log.pop();
      this.isBlacksMove = !this.isBlacksMove;
    },
    setExercise(variant) {
      if (this.log.length || this.black.length || this.white.length) { return; }

      switch (variant) {
        case 'atari':
          this.black = [...presets.atari.black];
          this.white = [...presets.atari.white];
          break;
        case 'corner':
          this.black = [...presets.corner.black];
          this.white = [];
          this.isBlacksMove = false;
          break;
        case 'center':
          this.black = [...presets.center.black];
          this.white = [];
          this.isBlacksMove = false;
          break;
        case 'full':
          this.black = [...presets.full.black];
          this.white = [];
          this.isBlacksMove = false;
          break;
        default:
          this.black = [];
          this.white = [];
      }
      this.captives.white = 0;
      this.captives.black = 0;
      this.log.push({
        black: [...this.black],
        white: [...this.white],
        captives: { ...this.captives }
      });
    }
  },
  created() {
    eventBus.$on('new-game', this.newGame);
    eventBus.$on('preset', variant => {
      this.setExercise(variant);
    });
    eventBus.$on('revert', this.revert);
  }
};
</script>

<style scoped>
</style>
