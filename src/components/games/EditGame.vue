<template>
  <div class="edit-game">
    <n-form :model="game">
      <n-grid span="24" x-gap="20">

        <n-gi span="24">
          <n-divider>
            Informations générales
          </n-divider>
        </n-gi>

        <n-form-item-gi span="24" label="Date et heure du match" path="datetime">
          <n-date-picker
            v-model:value="game.datetime"
            type="datetime"
            :time-picker-props="{ minutes: 10, seconds: [0] }"
            clearable />
        </n-form-item-gi>

        <n-form-item-gi span="24" label="Lieu" path="place">
          <n-input v-model:value="game.place" type="text"/>
        </n-form-item-gi>

        <n-form-item-gi span="16" label="Catégorie" path="category">
          <n-select v-model:value="game.category" filterable :options="categoryOptions"></n-select>
        </n-form-item-gi>

        <n-form-item-gi span="8" label="Sexe" path="sex">
          <n-switch
            v-model:value="game.sex"
            size="large"
            checked-value="m"
            unchecked-value="f"
            :rail-style="sexRailStyle">
            <template #checked>
              Masculin
            </template>
            <template #unchecked>
              Féminin
            </template>
          </n-switch>
        </n-form-item-gi>

        <n-gi span="24">
          <n-divider>
            Équipes
          </n-divider>
        </n-gi>

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
  NGi,
  NForm,
  NFormItemGi,
  NInput,
  NDatePicker,
  NColorPicker,
  NSwitch,
  NSelect,
  NDivider,
} from 'naive-ui';

export default {
  name: 'AddGameView',
  components: {
    NGrid,
    NGi,
    NForm,
    NFormItemGi,
    NInput,
    NDatePicker,
    NColorPicker,
    NSwitch,
    NSelect,
    NDivider,
  },
  props: {
    editId: String,
  },
  setup() {
    return {
      sexRailStyle: ({ focused, checked }) => {
        const style = {};
        if (!checked) {
          style.background = '#d03050';
          if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040';
          }
        } else {
          style.background = '#2080f0';
          if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040';
          }
        }
        return style;
      },
      categoryOptions: [
        { label: 'U5', value: 'u5' },
        { label: 'U6', value: 'u6' },
        { label: 'U7', value: 'u7' },
        { label: 'U8', value: 'u8' },
        { label: 'U9', value: 'u9' },
        { label: 'U10', value: 'u10' },
        { label: 'U11', value: 'u11' },
        { label: 'U12', value: 'u12' },
        { label: 'U13', value: 'u13' },
        { label: 'U14', value: 'u14' },
        { label: 'U15', value: 'u15' },
        { label: 'U16', value: 'u16' },
        { label: 'U17', value: 'u17' },
        { label: 'U18', value: 'u18' },
        { label: 'U19', value: 'u19' },
        { label: 'U20', value: 'u20' },
        { label: 'U21', value: 'u21' },
        { label: 'U22', value: 'u22' },
        { label: 'U23', value: 'u23' },
        { label: 'Séniors', value: 'adult' },
        { label: 'Vétérans', value: 'senior' },
        { label: 'Handisport', value: 'para' },
      ],
    };
  },
  data() {
    return {
      game: {
        place: '',
        datetime: this.getDefaultDatetime(),
        category: 'adult',
        sex: 'm',
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
