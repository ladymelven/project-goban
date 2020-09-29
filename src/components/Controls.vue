<template>
  <div class="my-2">
    <b-button-toolbar class="d-flex justify-content-center" aria-label="Меню гобана">
      <b-button-group class="mr-2">
        <b-button variant="info" @click="newGame">Новая игра</b-button>
        <b-button variant="info" @click="revert">Вернуть ход</b-button>
      </b-button-group>
      <b-dropdown variant="info" right text="Выбрать пресет">
        <b-dropdown-item @click="preset('atari')">Атари-го</b-dropdown-item>
        <b-dropdown-item @click="preset('corner')">Выживание в углу</b-dropdown-item>
        <b-dropdown-item @click="preset('full')">Выживание по всей доске</b-dropdown-item>
        <b-dropdown-item @click="preset('center')">Выживание в центре</b-dropdown-item>
      </b-dropdown>
    </b-button-toolbar>
  </div>
</template>

<script>
import eventBus from '../event-bus';

export default {
  name: 'Controls',
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
              eventBus.$emit('new-game');
              resolve(true);
            }
            resolve(false);
          });
      });
    },
    revert() {
      eventBus.$emit('revert');
    },
    preset(variant) {
      this.newGame()
        .then(confirm => {
          if (confirm) {
            eventBus.$emit('preset', variant);
          }
        });
    }
  }
};

</script>

<style scoped>

</style>
