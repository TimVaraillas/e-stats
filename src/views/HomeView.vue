<template>
  <div>
    <h1>Mes matchs</h1>
    <div class="games">
      <el-card class="card" v-for="(game, index) of games" :key="index">
        <template #header>
          <div class="card-header">
            <span>{{ game.datetime }}</span>
            <span>{{ game.place }}</span>
            <div class="card-actions">
              <el-tooltip content="Modifier" placement="top">
                <el-button size="small" type="primary" circle>
                  <i class="fas fa-pencil"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="Supprimer" placement="top">
                <el-button size="small" type="danger" circle @click="deleteGame(game.id)">
                  <i class="fas fa-trash"></i>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </template>
        <div class="card-content">
          <div class="team">
            <div :style="{ backgroundColor: game.localeTeam.color }" class="team-color"></div>
            <span>{{ game.localeTeam.name }}</span>
          </div>
          <div>contre</div>
          <div class="team">
            <div :style="{ backgroundColor: game.awayTeam.color }" class="team-color"></div>
            <span>{{ game.awayTeam.name }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters('games', {
      games: 'all',
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
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.games {
  .card {
    margin: 10px 0;
    background-color: $color-tertiary;
    color: $color-white;
    border: none;

    ::v-deep .el-card__header {
      border-bottom: 2px solid $color-secondary;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-content {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .team {
        display: flex;
        align-items: center;
        margin: 5px 0;

        .team-color {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 10px;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>
