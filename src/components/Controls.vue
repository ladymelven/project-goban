<template>
  <div class="col col-12 col-lg-5">
    <p class="text-center h5">
      Пленники: <span aria-label="белых">⚫</span>{{ captives.black }}
      <span aria-label="черных">⚪</span>{{ captives.white }}
    </p>
    <div class="my-2 controls">
      <b-button-toolbar class="d-flex justify-content-start" aria-label="Меню гобана">
        <b-button class="m-1" variant="dark" @click="newGame">Новая игра</b-button>
        <b-button class="m-1" variant="dark" @click="revert">Вернуть ход</b-button>
        <b-button class="m-1" variant="dark" @click="changeName">Поменять ник</b-button>
        <b-dropdown class="m-1" variant="dark" right text="Выбрать пресет">
          <b-dropdown-item @click="preset('atari')">Атари-го</b-dropdown-item>
          <b-dropdown-item @click="preset('corner')">Выживание в углу</b-dropdown-item>
          <b-dropdown-item @click="preset('full')">Выживание по всей доске</b-dropdown-item>
          <b-dropdown-item @click="preset('center')">Выживание в центре</b-dropdown-item>
          <b-dropdown-item @click="preset('colorless')">Одноцветное го</b-dropdown-item>
        </b-dropdown>
        <b-form-checkbox
          class="m-1 d-none d-md-block"
          v-model="showCoords"
          @change="toggleCoords"
          name="check-button"
          size="lg"
          switch>
          Показывать координаты
        </b-form-checkbox>
        <b-form-checkbox
          class="m-1 d-none d-md-block"
          v-model="blind"
          @change="toggleBlind"
          name="check-button"
          size="lg"
          switch>
          Игра вслепую
        </b-form-checkbox>
      </b-button-toolbar>
      <div>
        Черный: {{ names.black || 'свободно' }}
        <b-button class="m-1" variant="dark" @click="toggleSeat('black')">
          {{ names.black ? 'Покинуть место' : 'Занять место' }}
        </b-button>
      </div>
      <div>
        Белый: {{ names.white || 'свободно' }}
        <b-button class="m-1" variant="light" @click="toggleSeat('white')">
          {{ names.white ? 'Покинуть место' : 'Занять место' }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Controls',
  computed: {
    ...mapGetters(['showCoords', 'blind', 'captives', 'currName', 'names'])
  },
  methods: {
    newGame() {
      return new Promise(resolve => {
        this.$bvModal.msgBoxConfirm('Вы уверены?', {
          okVariant: 'info',
          cancelVariant: 'outline-dark',
          okTitle: 'Да, начать новую игру',
          cancelTitle: 'Нет, вернуться',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(confirmation => {
            if (confirmation) {
              this.$store.dispatch('resetGame');
              resolve(true);
            }
            resolve(false);
          });
      });
    },
    revert() {
      this.$store.dispatch('revertMove');
    },
    changeName() {
      this.$bvModal.show('welcome-modal');
    },
    preset(variant) {
      this.newGame()
        .then(confirm => {
          if (confirm) {
            this.$store.dispatch('setPresets', variant);
          }
        });
    },
    toggleCoords() {
      this.$store.dispatch('toggleCoords');
    },
    toggleBlind() {
      this.$store.dispatch('toggleBlind');
    },
    toggleSeat(color) {
      let name = 'Неопознанная антилопа';
      if (this.currName) {
        name = this.currName;
      } else {
        this.$store.dispatch('changeName', name);
      }
      this.$store.dispatch('toggleSeat', { color, name });
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
