<template>
  <b-modal id="welcome-modal" @ok="submit">
    Ваш ник:
    <b-form-input @submit="submit" v-model="value" placeholder="Ник"></b-form-input>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      value: ''
    };
  },
  computed: {
    ...mapGetters(['names', 'currName'])
  },
  methods: {
    submit() {
      if (this.names.black === this.currName) {
        this.$store.dispatch('toggleSeat', { color: 'black' });
        this.$store.dispatch('toggleSeat', { color: 'black', name: this.value });
      } else if (this.names.white === this.currName) {
        this.$store.dispatch('toggleSeat', { color: 'white' });
        this.$store.dispatch('toggleSeat', { color: 'white', name: this.value });
      }
      this.$store.dispatch('changeName', this.value);
      this.$bvModal.hide('welcome-modal');
    }
  },
  mounted() {
    if (!this.currName) {
      this.$bvModal.show('welcome-modal');
    }
  }
};

</script>
