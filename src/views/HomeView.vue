<template>
  <div class="games">
    <n-layout-header bordered>
      <div class="title">
        <span>{{ $route.name }}</span>
      </div>
      <div class="actions">
        <n-button ghost type="primary" size="small" @click="toogleDisplayDrawer()">
          <i class="fas fa-plus"></i>&nbsp;
          <span>Nouveau match</span>
        </n-button>
      </div>
    </n-layout-header>
    <n-layout-content>
      <div
        v-for="date of Object.keys(gamesGroupByDate).sort((a, b) => new Date(b) - new Date(a))"
        :key="date">
        <h3 class="date">{{ moment(date).format("dddd LL") }}</h3>
        <n-space vertical>
          <n-card
            size="small"
            v-for="(game, index) of gamesGroupByDate[date]"
            :key="index"
            :segmented="{ content: true }">
            <template #header>
              {{ game.datetime }} - <em>{{ game.place }}</em>
            </template>
            <template #header-extra>
              <n-space>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button ghost type="primary" size="small" circle>
                      <i class="fas fa-pencil"></i>
                    </n-button>
                  </template>
                  Modifier
                </n-tooltip>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-popconfirm positive-text="Oui" negative-text="Non">
                      <template #trigger>
                        <n-button
                          ghost
                          type="error"
                          size="small"
                          circle
                          @click="deleteGame(game.id)">
                          <i class="fas fa-trash"></i>
                        </n-button>
                      </template>
                      Êtes-vous sûr de vouloir supprimer ce match ?
                    </n-popconfirm>
                  </template>
                  Supprimer
                </n-tooltip>
              </n-space>
            </template>

            <div class="content">
              <div class="team">
                <n-avatar :style="{ backgroundColor: game.localeTeam.color }" />
                <h3>{{ game.localeTeam.name }}</h3>
              </div>
              <div>contre</div>
              <div class="team">
                <n-avatar :style="{ backgroundColor: game.awayTeam.color }" />
                <h3>{{ game.awayTeam.name }}</h3>
              </div>
            </div>
          </n-card>
        </n-space>
      </div>
    </n-layout-content>
    <n-drawer v-model:show="drawer" width="50%">
      <n-drawer-content title="Nouveau match" closable>
        <edit-game ref="editGame"></edit-game>
        <template #footer>
          <n-space>
            <n-button ghost type="error" @click="toogleDisplayDrawer()">
              Annuler
              </n-button>
            <n-button type="primary" @click="$refs.editGame.addGame($refs.editGame.game)">
              Créer
            </n-button>
          </n-space>
        </template>
      </n-drawer-content>
  </n-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import {
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NButton,
  NCard,
  NTooltip,
  NPopconfirm,
  NAvatar,
  NDrawer,
  NDrawerContent,
} from 'naive-ui';

import EditGame from '@/components/games/EditGame.vue';

export default {
  name: 'HomeView',
  components: {
    EditGame,
    NLayoutHeader,
    NLayoutContent,
    NSpace,
    NButton,
    NCard,
    NTooltip,
    NPopconfirm,
    NAvatar,
    NDrawer,
    NDrawerContent,
  },
  setup() {
    return {
      moment,
    };
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapGetters('games', {
      gamesGroupByDate: 'allGroupByDate',
    }),
  },
  created() {
    this.getAllGames();
  },
  methods: {
    ...mapActions('games', [
      'getAllGames',
      'deleteGame',
    ]),
    toogleDisplayDrawer() {
      this.drawer = !this.drawer;
      console.log(this.$refs.editGame);
    },
    handleClose() {
      console.log('plop');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.games {
  .n-layout-header {
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;

    .title {
      flex: 1;
      font-weight: 700;
    }
  }

  .n-layout-content {
    padding: 10px 15px;

    .date {
      display: flex;
      justify-content: center;
      text-transform: capitalize;
    }

    .n-card {
      .content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px 0;

        .team {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;

          h3 {
            margin: 0 0 0 10px;
          }
        }
      }
    }
  }
}
</style>
