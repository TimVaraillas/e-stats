<template>
  <div class="edit-game">
    <n-form :model="game">
      <n-grid span="24" x-gap="20">

        <n-form-item-gi span="24" label="Lieu" path="place">
          <n-input v-model:value="game.place" type="text"/>
        </n-form-item-gi>

        <n-form-item-gi span="24" label="Date et heure du match" path="datetime">
          <n-date-picker
            v-model:value="game.datetime"
            type="datetime"
            :time-picker-props="{ minutes: 10, seconds: [0] }"
            clearable />
        </n-form-item-gi>

        <n-form-item-gi span="16" label="Équipe locale" path="localeTeam.name">
          <n-input v-model:value="game.localeTeam.name" type="text"/>
        </n-form-item-gi>

        <n-form-item-gi span="8" label="Couleur" path="localeTeam.color">
          <n-color-picker v-model:value="game.localeTeam.color" :show-alpha="false" />
        </n-form-item-gi>

        <n-form-item-gi span="16" label="Équipe visiteuse" path="awayTeam.name">
          <n-input v-model:value="game.awayTeam.name" type="text"/>
        </n-form-item-gi>

        <n-form-item-gi span="8" label="Couleur" path="awayTeam.color">
          <n-color-picker v-model:value="game.awayTeam.color" :show-alpha="false" />
        </n-form-item-gi>

      </n-grid>
    </n-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import _cloneDeep from 'lodash/cloneDeep';
import {
  NGrid,
  NForm,
  NFormItemGi,
  NInput,
  NDatePicker,
  NColorPicker,
} from 'naive-ui';

export default {
  name: 'AddGameView',
  components: {
    NGrid,
    NForm,
    NFormItemGi,
    NInput,
    NDatePicker,
    NColorPicker,
  },
  props: {
    editId: String,
  },
  data() {
    return {
      game: {
        place: '',
        datetime: this.getDefaultDatetime(),
        localeTeam: {
          name: '',
          color: '#FFCC33',
        },
        awayTeam: {
          name: '',
          color: '#FF6680',
        },
      },
    };
  },
  computed: {
    ...mapGetters('games', [
      'getGameById',
    ]),
  },
  mounted() {
    if (this.editId) {
      this.game = _cloneDeep(this.getGameById(this.editId));
    }
  },
  methods: {
    ...mapActions('games', [
      'addGame',
      'updateGame',
    ]),

    getDefaultDatetime() {
      let start = moment();
      start = start.endOf('hour');
      start = start.set({ minute: 0, second: 0, millisecond: 0 });
      return start.valueOf();
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-game {
  .n-date-picker {
    flex: 1;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
