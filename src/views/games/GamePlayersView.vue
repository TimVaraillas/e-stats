<template>
  <div class="games">
    <n-layout-header bordered>
      <div class="title">
        <span>Mon match : {{ game.place }}</span>
      </div>
    </n-layout-header>
    <n-layout-content>

    </n-layout-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _cloneDeep from 'lodash/cloneDeep';
import {
  NLayoutHeader,
  NLayoutContent,
} from 'naive-ui';

export default {
  name: 'GamePlayersView',
  components: {
    NLayoutHeader,
    NLayoutContent,
  },
  data() {
    return {
      game: {},
    };
  },
  mounted() {
    console.log(this.getGameById(this.$route.params.id));
    this.game = _cloneDeep(this.getGameById(this.$route.params.id));
  },
  methods: {
    ...mapGetters('games', [
      'getGameById',
    ]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

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
