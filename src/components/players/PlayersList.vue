<template>
  <div class="players-list">
     <n-data-table
      :columns="columns"
      :data="getPlayers(gameId, team)">
        <!-- <template #empty> -->
          <!-- <n-empty
            v-if="!getGameById(gameId)[team]?.players[0]"
            description="Aucun joueur">
            <template #icon>
              <i class="fas fa-basketball"></i>
            </template>
          </n-empty> -->
        <!-- </template> -->
      </n-data-table>
  </div>
</template>

<script>
import { h } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import {
  // NEmpty,
  NButton,
  NDataTable,
  useMessage,
} from 'naive-ui';

// const createColumns = ({ removePlayer }) =>

export default {
  name: 'PlayersList',
  components: {
    // NEmpty,
    NDataTable,
  },
  props: {
    gameId: String,
    team: String,
  },
  setup() {
    return {
      moment,
      toaster: useMessage(),
    };
  },
  computed: {
    ...mapGetters('games', [
      'getGameById',
      'getPlayers',
    ]),
    columns() {
      const parent = this;
      return [
        {
          title: 'N°',
          key: 'number',
          sorter: (a, b) => a.number - b.number,
          width: 80,
        },
        {
          title: 'Nom',
          key: 'name',
          sorter: (a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          },
        },
        {
          align: 'right',
          width: 80,
          render(row) {
            return h(
              NButton,
              {
                ghost: true,
                circle: true,
                type: 'error',
                size: 'small',
                onClick: () => parent.remove(row),
              },
              { default: () => h('i', { class: 'fas fa-trash' }) },
            );
          },
        },
      ];
    },
  },
  methods: {
    ...mapActions('games', [
      'removePlayer',
    ]),
    remove(player) {
      this.removePlayer({ gameId: this.gameId, team: this.team, number: player.number })
        .then(() => {
          this.toaster.success('Le joueur a bien été supprimé');
        })
        .catch(() => {
          this.toaster.error("Le joueur n'a pas pu être supprimé");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
