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
import { mapGetters } from 'vuex';
import moment from 'moment';
import {
  // NEmpty,
  NButton,
  NDataTable,
} from 'naive-ui';

const createColumns = ({ deletePlayer }) => [
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
          onClick: () => deletePlayer(row),
        },
        { default: () => h('i', { class: 'fas fa-trash' }) },
      );
    },
  },
];

export default {
  name: 'GamePlayersView',
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
      columns: createColumns({
        deletePlayer(row) {
          this.deletePlayer(row);
        },
      }),
    };
  },
  computed: {
    ...mapGetters('games', [
      'getGameById',
      'getPlayers',
    ]),
  },
  methods: {
    deletePlayer(player) {
      console.log('delete', player);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
