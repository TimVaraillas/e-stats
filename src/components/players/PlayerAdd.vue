<template>
  <n-form class="player-add" inline :model="player">
    <n-form-item
      class="number"
      label="Numéro"
      path="number"
      :validation-status="v.player.number.$errors.length ? 'error' : 'success'">
      <n-input-number
        v-model:value="player.number"
        :min="min"
        :max="max"
        :on-blur="v.player.number.$touch" />
    </n-form-item>

    <n-form-item
      class="name"
      label="Nom"
      path="name"
      :validation-status="v.player.name.$errors.length ? 'error' : 'success'">
      <n-input v-model:value="player.name" :on-blur="v.player.name.$touch"/>
    </n-form-item>

    <n-form-item>
      <n-button type="primary" circle ghost @click="add">
        <i class="fas fa-plus"></i>
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import useVuelidate from '@vuelidate/core';
import { required, minValue, maxValue } from '@vuelidate/validators';

import {
  NButton,
  NForm,
  NFormItem,
  NInputNumber,
  NInput,
  useMessage,
} from 'naive-ui';

export default {
  name: 'PlayerAdd',
  components: {
    NButton,
    NForm,
    NFormItem,
    NInputNumber,
    NInput,
  },
  props: {
    gameId: String,
    team: String,
  },
  setup() {
    return {
      v: useVuelidate(),
      toaster: useMessage(),
    };
  },
  data() {
    return {
      player: { number: 0, name: '' },
    };
  },
  validations() {
    return {
      player: {
        number: { required, minValue: minValue(0), maxValue: maxValue(99) },
        name: { required },
      },
    };
  },
  computed: {
    ...mapGetters('games', [
      'getPlayers',
    ]),
    getPlayersNumbers() {
      return this.getPlayers(this.gameId, this.team).map((player) => player.number);
    },
    min() {
      for (let i = 0; i <= 99; i += 1) {
        if (!this.getPlayersNumbers.includes(i)) {
          return i;
        }
      }
      return 0;
    },
    max() {
      for (let i = 99; i >= 0; i -= 1) {
        if (!this.getPlayersNumbers.includes(i)) {
          return i;
        }
      }
      return 99;
    },
  },
  watch: {
    // eslint-disable-next-line
    'player.number'(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.getPlayersNumbers.includes(newVal)) {
          if (newVal > oldVal) {
            this.player.number += 1;
          }
          if (newVal < oldVal) {
            this.player.number -= 1;
          }
        }
      }
    },
  },
  mounted() {
    if (this.getPlayersNumbers.includes(this.player.number)) {
      this.player.number += 1;
    }
  },
  methods: {
    ...mapActions('games', [
      'addPlayer',
    ]),
    add() {
      this.v.$touch();
      if (!this.v.$invalid) {
        this.addPlayer({ gameId: this.gameId, team: this.team, player: this.player }).then(() => {
          this.player = { number: this.player.number += 1, name: '' };
          this.v.$reset();
          this.toaster.success('Le joueur a bien été ajouté');
        });
      } else {
        this.toaster.error('Le formulaire est invalide ou incomplet');
      }
    },
    test() {
      console.log('test');
    },
  },
};
</script>

<style lang="scss" scoped>
.player-add {
  display: flex;

  .number {
    flex: 1;
  }
  .name {
    flex: 3;
  }
}
</style>
