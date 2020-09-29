<template>
  <div :class="classes" @click="placeStone">
    <div v-if="stone" class="stone" :class="stone"></div>
    <div v-else class="preview" :class="previewClass"></div>
    <div v-if="star" class="star"></div>
  </div>
</template>

<script>

export default {
  name: 'GobanCell.vue',
  props: {
    row: Number,
    cell: Number,
    stone: String,
    move: Boolean
  },
  data() {
    return {
      classes: ['cell'],
      star: false
    };
  },
  methods: {
    placeStone() {
      this.$emit('stone', this.row, this.cell);
    }
  },
  computed: {
    previewClass() {
      if (this.move) {
        return 'preview_black';
      }
      return 'preview_white';
    }
  },
  created() {
    if (this.row === 1) {
      this.classes.push('top');
    } else if (this.row === 19) {
      this.classes.push('bottom');
    }
    if (this.cell === 1) {
      this.classes.push('left');
    } else if (this.cell === 19) {
      this.classes.push('right');
    }
    if ((this.row === 4 && this.cell === 4)
      || (this.row === 4 && this.cell === 16)
      || (this.row === 16 && this.cell === 4)
      || (this.row === 16 && this.cell === 16)
      || (this.row === 10 && this.cell === 10)
      || (this.row === 10 && this.cell === 4)
      || (this.row === 10 && this.cell === 16)
      || (this.row === 4 && this.cell === 10)
      || (this.row === 16 && this.cell === 10)) {
      this.star = true;
    }
  }
};
</script>

<style scoped>
  .cell {
    width: 20px;
    height: 20px;
    position: relative;
    background-color: bisque;
  }

  .cell::before {
    content: '';
    width: 20px;
    height: 1px;
    background-color: #333;
    position: absolute;
    top: calc(50% - .5px);
    left: 0;
    z-index: 10;
  }

  .left::before {
    width: 10px;
    left: 10px;
  }

  .right::before {
    width: 10px;
  }

  .cell::after {
    content: '';
    width: 1px;
    height: 20px;
    background-color: #333;
    position: absolute;
    top: 0;
    left: calc(50% - .5px);
    z-index: 10;
  }

  .top::after {
    height: 10px;
    top: 10px;
  }

  .bottom::after {
    height: 10px;
  }

  .star {
    background-color: #000;
    border-radius: 50%;
    position: absolute;
    height: 5px;
    width: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
  }

  .stone {
    height: 96%;
    width: 96%;
    margin-top: 2%;
    margin-left: 2%;
    border-radius: 50%;
    position: relative;
    z-index: 100;
  }

  .white {
    background-image: radial-gradient(#f1f1f1, #999);
  }

  .black {
    background-image: radial-gradient(#555, #000);
  }

  .preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    border-radius: 50%;
    z-index: 75;
  }

  .preview_black:hover {
    background-image: radial-gradient(#555, #000);
  }

  .preview_white:hover {
    background-image: radial-gradient(#f1f1f1, #999);
  }
</style>
