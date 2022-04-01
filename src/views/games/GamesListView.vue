<template>
  <div class="games">
    <n-layout-header class="page-header" bordered>
      <n-page-header bordered>
        <template #title>
          {{ $route.name }}
        </template>
        <template #extra>
          <n-space>
            <n-button ghost type="primary" size="small" @click="toogleDisplayDrawer()">
              <i class="fas fa-plus"></i>&nbsp;
              <span>Nouveau match</span>
            </n-button>
          </n-space>
        </template>
      </n-page-header>
    </n-layout-header>
    <n-layout-content class="page-content">
      <div
        v-for="date of Object.keys(getGamesGroupByDate).sort((a, b) => new Date(b) - new Date(a))"
        :key="date">
        <h3 class="date">{{ moment(date).format("dddd LL") }}</h3>
        <n-space vertical>
          <n-card
            size="small"
            v-for="(game, index) of getGamesGroupByDate[date]"
            :key="index"
            :segmented="{ content: true }">
            <template #header>
              <span class="time">{{ game.time }}&nbsp;</span>
              <span class="place"> - {{ game.place }}</span>
            </template>
            <template #header-extra>
              <n-space>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <router-link :to="`/game/${game.id}/players`">
                      <n-button
                        ghost
                        type="primary"
                        size="small"
                        circle>
                        <i class="fas fa-play"></i>
                      </n-button>
                    </router-link>
                  </template>
                  Démarrer
                </n-tooltip>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button
                      ghost
                      type="info"
                      size="small"
                      circle
                      @click="openEditDrawer(game.id)">
                      <i class="fas fa-pencil"></i>
                    </n-button>
                  </template>
                  Modifier
                </n-tooltip>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-popconfirm
                      positive-text="Oui"
                      negative-text="Non"
                      @positive-click="onDeleteGame(game.id)">
                      <template #trigger>
                        <n-button ghost type="error" size="small" circle>
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
      <n-drawer-content :title="editId ? 'Modifier un match' : 'Nouveau match'" closable>
        <edit-game ref="editGame" :edit-id="editId"></edit-game>
        <template #footer>
          <n-space>
            <n-button ghost type="error" @click="toogleDisplayDrawer()">
              Annuler
              </n-button>
            <n-button v-if="!editId" type="primary" @click="onAddGame">
              Créer
            </n-button>
            <n-button v-if="editId" type="primary" @click="onEditGame">
              Modifier
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
  NPageHeader,
  NSpace,
  NButton,
  NCard,
  NTooltip,
  NPopconfirm,
  NAvatar,
  NDrawer,
  NDrawerContent,
  useMessage,
} from 'naive-ui';

import EditGame from '@/components/games/EditGame.vue';

export default {
  name: 'HomeView',
  components: {
    EditGame,
    NLayoutHeader,
    NLayoutContent,
    NPageHeader,
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
      toaster: useMessage(),
    };
  },
  data() {
    return {
      editId: null,
      drawer: false,
    };
  },
  watch: {
    drawer() {
      if (!this.drawer) {
        this.editId = null;
      }
    },
  },
  computed: {
    ...mapGetters('games', [
      'getGamesGroupByDate',
    ]),
  },
  methods: {
    ...mapActions('games', [
      'deleteGame',
    ]),

    toogleDisplayDrawer() {
      this.drawer = !this.drawer;
    },

    openEditDrawer(id) {
      this.editId = id;
      this.drawer = true;
    },

    onAddGame() {
      this.drawer = false;
      this.$refs.editGame.addGame(this.$refs.editGame.game)
        .then(() => this.toaster.success('Le match a bien été créé'))
        .catch(() => this.toaster.error("Une erreur s'est produite. Le match n'a pas pu être créé"));
    },

    onEditGame() {
      this.drawer = false;
      this.$refs.editGame.updateGame(this.$refs.editGame.game)
        .then(() => this.toaster.success('Le match a bien été modifié'))
        .catch(() => this.toaster.error("Une erreur s'est produite. Le match n'a pas pu être modifié"));
      this.editId = null;
    },

    onDeleteGame(gameId) {
      this.deleteGame(gameId)
        .then(() => this.toaster.success('Le match a bien été supprimé'))
        .catch(() => this.toaster.error("Une erreur s'est produite. Le match n'a pas pu être supprimé"));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.games {

  .page-content {
    .date {
      display: flex;
      justify-content: center;
      text-transform: capitalize;
    }

    .n-card {
      .time {
        color: $color-primary;
      }

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
