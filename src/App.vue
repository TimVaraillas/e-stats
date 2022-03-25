<template>
  <el-container class="layout-container">
    <el-aside>
      <el-scrollbar>
        <el-menu default-active="1">
          <router-link to="/">
            <el-menu-item index="1">
            <i class="fas fa-home"></i>
            <span>Accueil</span>
            </el-menu-item>
          </router-link>
          <router-link to="/games/add">
            <el-menu-item index="2">
              <i class="fas fa-plus"></i>
              <span>Nouveau match</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header>
        <div class="toolbar">
          <span>Tim</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>

      <el-footer>
        <span>© {{ new Date().getFullYear() }}, <b>E-Stats</b></span>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style scoped lang="scss">
  @import "./styles/variables.scss";

  .layout-container {
    font-family: 'Roboto Slab', serif;
    background-color: $color-secondary;
    color: $color-white;

    .el-aside {
      width: 200px;
      height: 100vh;
      color: var(--el-text-color-primary);
      background-color: $color-primary;

      .el-scrollbar {
        background-color: transparent;

        .el-menu {
          border-right: none;
          background-color: transparent;

          a {
            color: $color-black;
            text-decoration: none;

            span {
              margin: 0 5px;
            }
          }
          .el-menu-item {
            &:hover {
              background-color: darken($color-primary, 5%);
            }
            &.is-active {
              background-color: darken($color-primary, 5%);
              color: $color-white;
            }
          }
        }
      }
    }

    .el-header {
      height: 60px;
      position: relative;
      background-color: $color-tertiary;
      color: $color-white;

      .toolbar {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }

  .el-footer {
    height: 40px;
    background-color: $color-tertiary;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

</style>
