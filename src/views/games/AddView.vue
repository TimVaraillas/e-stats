<template>
  <div class="about">
    <h1>Nouveau match</h1>
    <el-form label-position="top" :model="game">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Lieu">
            <el-input v-model="game.place" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="Date et heure du match">
            <el-date-picker
              v-model="game.datetime"
              type="datetime"
              format="DD/MM/YYYY hh:mm"
              placeholder=""/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="Équipe locale">
              <el-input v-model="game.localeTeam.name" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="Couleur">
            <el-color-picker v-model="game.localeTeam.color" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="Équipe visiteuse">
              <el-input v-model="game.awayTeam.name" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="Couleur">
            <el-color-picker v-model="game.awayTeam.color" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="addGame(game)">Créer</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddGameView',
  data() {
    return {
      game: {
        place: '',
        datetime: new Date(),
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
  methods: {
    ...mapActions('games', [
      'addGame',
    ]),
  },
};
</script>
