<template>
  <div class="game-players">
    <n-layout-header class="page-header" bordered>
      <n-page-header bordered @back="$router.push({ path: '/' })">
        <template #title>
          Joueurs
        </template>
      </n-page-header>
    </n-layout-header>
    <n-layout-content class="page-content">
      <n-grid span="24" x-gap="20">
        <n-gi span="12" v-for="team of ['localeTeam', 'awayTeam']" :key="game[team]?.name">
          <n-card :title="game[team]?.name">

            <n-form class="form-new-player" inline :model="newPlayer[team]">
              <n-form-item class="number" label="Numéro" path="number">
                <n-input-number v-model:value="newPlayer[team].number" />
              </n-form-item>

              <n-form-item class="name" label="Nom" path="name">
                <n-input v-model:value="newPlayer[team].name" />
              </n-form-item>

              <n-form-item>
                <n-button type="primary" circle ghost @click="addPlayer(team, newPlayer[team])">
                  <i class="fas fa-plus"></i>
                </n-button>
              </n-form-item>
            </n-form>

            <n-divider>
              Joueurs
            </n-divider>

            <n-empty
              v-if="!game[team]?.players[0]"
              description="Aucun joueur">
              <template #icon>
                <i class="fas fa-basketball"></i>
              </template>
            </n-empty>

            <n-table v-else>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nom</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="player of game[team]?.players" :key="player.name">
                  <td>{{ player.number }}</td>
                  <td>{{ player.name }}</td>
                </tr>
              </tbody>
            </n-table>

          </n-card>
        </n-gi>
      </n-grid>
    </n-layout-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import {
  NLayoutHeader,
  NLayoutContent,
  NPageHeader,
  NGrid,
  NGi,
  NCard,
  NButton,
  NEmpty,
  NForm,
  NFormItem,
  NInputNumber,
  NInput,
  NDivider,
  NTable,
} from 'naive-ui';

export default {
  name: 'GamePlayersView',
  components: {
    NLayoutHeader,
    NLayoutContent,
    NPageHeader,
    NGrid,
    NGi,
    NCard,
    NButton,
    NEmpty,
    NForm,
    NFormItem,
    NInputNumber,
    NInput,
    NDivider,
    NTable,
  },
  setup() {
    return {
      moment,
    };
  },
  data() {
    return {
      game: {},
      newPlayer: {
        localeTeam: { number: 1, name: '' },
        awayTeam: { number: 1, name: '' },
      },
    };
  },
  computed: {
    ...mapGetters('games', [
      'getGameById',
    ]),
  },
  mounted() {
    this.game = _cloneDeep(this.getGameById(this.$route.params.id));
  },
  methods: {
    addPlayer(team) {
      const player = _cloneDeep(this.newPlayer[team]);
      this.newPlayer[team] = { number: 1, name: '' };
      this.game[team].players.push(player);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.game-players {
  .form-new-player {
    display: flex;
    .number {
      flex: 1;
    }
    .name {
      flex: 3;
    }
  }
}
</style>
