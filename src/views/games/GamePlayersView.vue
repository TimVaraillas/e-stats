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
      <n-grid :span="24" :x-gap="20">
        <n-gi
          :span="12"
          v-for="team of ['localeTeam', 'awayTeam']"
          :key="getGameById($route.params.id)[team]?.name">
          <n-card :title="getGameById($route.params.id)[team]?.name">
            <player-add :gameId="$route.params.id" :team="team"></player-add>
            <players-list :gameId="$route.params.id" :team="team"></players-list>
          </n-card>
        </n-gi>
      </n-grid>
    </n-layout-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import {
  NLayoutHeader,
  NLayoutContent,
  NPageHeader,
  NGrid,
  NGi,
  NCard,
} from 'naive-ui';

import PlayerAdd from '@/components/players/PlayerAdd.vue';
import PlayersList from '@/components/players/PlayersList.vue';

export default {
  name: 'GamePlayersView',
  components: {
    NLayoutHeader,
    NLayoutContent,
    NPageHeader,
    NGrid,
    NGi,
    NCard,
    PlayerAdd,
    PlayersList,
  },
  setup() {
    return {
      moment,
    };
  },
  computed: {
    ...mapGetters('games', [
      'getGameById',
      'getPlayers',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.game-players {

}
</style>
