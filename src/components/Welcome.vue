<template>
  <b-modal id="welcome-modal" @ok="submit">
    Ваш ник:
    <form @submit.prevent="submit">
      <b-form-input v-model="value" placeholder="Ник"></b-form-input>
    </form>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    socket: Object
  },
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
      if (this.currName && this.names.black === this.currName) {
        this.$store.dispatch('toggleSeat', { color: 'black' });
        this.$store.dispatch('toggleSeat', { color: 'black', name: this.value });
      } else if (this.currName && this.names.white === this.currName) {
        this.$store.dispatch('toggleSeat', { color: 'white' });
        this.$store.dispatch('toggleSeat', { color: 'white', name: this.value });
      }
      if (this.value) {
        this.$store.dispatch('changeName', this.value);
        this.socket.sendName(this.value);
      } else {
        this.$store.dispatch('changeName', 'sai');
        this.socket.sendName(this.value, 'sai');
      }
      console.log(this.value);
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
