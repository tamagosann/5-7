<template>
  <v-app>
    <Header />
    <v-main class="grey lighten-3 mt-6">
      <v-container fluid fill-height align-start>
        <v-row justify="center">
          <v-col cols="3" v-if="loginFlag">
          <UserProfile />
          <SideMenu />
          </v-col>
        <v-col cols="9">
          <router-view/>
        </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideMenu from './components/SideMenu';
import Header from './components/Header'
import { mapGetters } from 'vuex';
import UserProfile from './components/UserProfile.vue';

export default {
  name: 'App',
  components: {
    SideMenu,
    Header,
    UserProfile,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(['loginFlag'])
  }
};
</script>

<style lang="scss" scoped>
  .mb {
    margin-top: 20px;
  }
</style>