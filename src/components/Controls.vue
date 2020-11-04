<template>
  <div class="col col-12 col-lg-5">
    <p class="text-center h5">
      Пленники: <span aria-label="белых">⚫</span>{{ captives.black }}
      <span aria-label="черных">⚪</span>{{ captives.white }}
    </p>
    <div class="my-2 controls">
      <div>
        Черный: {{ names.black || 'свободно' }}
        {{currName && names.black === currName ? '(Вы)' : '' }}
        <b-button
          v-if="!names.black || names.black === currName"
          class="m-1"
          variant="dark"
          @click="toggleSeat('black')">
          {{ names.black ? 'Покинуть место' : 'Занять место' }}
        </b-button>
      </div>
      <div>
        Белый: {{ names.white || 'свободно' }}
        {{currName && names.white === currName ? '(Вы)' : '' }}
        <b-button
          v-if="!names.white || names.white === currName"
          class="m-1" variant="light"
          @click="toggleSeat('white')">
          {{ names.white ? 'Покинуть место' : 'Занять место' }}
        </b-button>
      </div>
<!--        <b-button class="m-1" variant="dark" @click="newGame">Новая игра</b-button>-->
<!--        <b-button class="m-1" variant="dark" @click="revert">Вернуть ход</b-button>-->
<!--        <b-dropdown class="m-1" variant="dark" right text="Выбрать пресет">-->
<!--          <b-dropdown-item @click="preset('atari')">Атари-го</b-dropdown-item>-->
<!--          <b-dropdown-item @click="preset('corner')">Выживание в углу</b-dropdown-item>-->
<!--          <b-dropdown-item @click="preset('full')">Выживание по всей доске</b-dropdown-item>-->
<!--          <b-dropdown-item @click="preset('center')">Выживание в центре</b-dropdown-item>-->
<!--          <b-dropdown-item @click="preset('colorless')">Одноцветное го</b-dropdown-item>-->
<!--        </b-dropdown>-->
<!--        <b-dropdown class="m-1" variant="dark" right text="Выбрать фору">-->
<!--          <b-dropdown-item @click="preset(2)">2</b-dropdown-item>-->
<!--          <b-dropdown-item @click="preset(3)">3</b-dropdown-item>-->
<!--          <b-dropdown-item @click="preset(4)">4</b-dropdown-item>-->
<!--          <b-dropdown-item @click="preset(5)">5</b-dropdown-item>-->
<!--          <b-dropdown-item v-if="size === 19" @click="preset(6)">6</b-dropdown-item>-->
<!--          <b-dropdown-item v-if="size === 19" @click="preset(7)">7</b-dropdown-item>-->
<!--          <b-dropdown-item v-if="size === 19" @click="preset(8)">8</b-dropdown-item>-->
<!--          <b-dropdown-item v-if="size === 19" @click="preset(9)">9</b-dropdown-item>-->
<!--        </b-dropdown>-->
      <b-form-checkbox
        class="m-1 d-none d-md-block mr-auto"
        v-model="showCoords"
        @change="toggleCoords"
        name="check-button"
        size="lg"
        switch>
        Показывать координаты
      </b-form-checkbox>
      <b-form-checkbox
        class="m-1 d-none d-md-block mr-auto"
        v-model="blind"
        @change="toggleBlind"
        name="check-button"
        size="lg"
        switch>
        Игра вслепую
      </b-form-checkbox>
      <b-button class="m-1" variant="dark" @click="changeName">Поменять ник</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Controls',
  props: {
    socket: Object
  },
  computed: {
    ...mapGetters(['showCoords', 'blind', 'captives', 'currName', 'names', 'size'])
  },
  methods: {
    // newGame() {
    //   return new Promise(resolve => {
    //     this.$bvModal.msgBoxConfirm('Вы уверены?', {
    //       okVariant: 'info',
    //       cancelVariant: 'outline-dark',
    //       okTitle: 'Да, начать новую игру',
    //       cancelTitle: 'Нет, вернуться',
    //       footerClass: 'p-2',
    //       hideHeaderClose: false,
    //       centered: true
    //     })
    //       .then(confirmation => {
    //         if (confirmation) {
    //           this.$store.dispatch('resetGame');
    //           resolve(true);
    //         }
    //         resolve(false);
    //       });
    //   });
    // },
    revert() {
      this.$store.dispatch('revertMove');
    },
    changeName() {
      this.$bvModal.show('welcome-modal');
    },
    // preset(variant) {
    //   this.newGame()
    //     .then(confirm => {
    //       if (confirm) {
    //         this.$store.dispatch('setPresets', variant);
    //       }
    //     });
    // },
    toggleCoords() {
      this.$store.dispatch('toggleCoords');
    },
    toggleBlind() {
      this.$store.dispatch('toggleBlind');
    },
    toggleSeat(color) {
      let name = 'sai';
      if (this.currName) {
        name = this.currName;
      } else {
        this.$store.dispatch('changeName', name);
      }
      this.$store.dispatch('toggleSeat', { color, name });
      this.socket.sendSeat(color);
    }
  }
};

</script>

<style scoped>
  @media only screen and (min-width: 1440px) {
    .controls {
      margin-left: 50px;
    }
  }

</style>
