<template>
    <v-app-bar
      app
      color="green"
    >
      <div class="d-flex align-center" align-content="center">
        <v-toolbar-title>Qiita</v-toolbar-title>
        <v-text-field
          label="Solo"
          solo
          class="mt-8 ml-8"
          autocomplete="off"          
        ></v-text-field>
        <v-btn
          depressed
          color="primary"
          class="ml-8"
        >
          検索
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
        v-if="!loginFlag"

      >
      新規作成
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
        v-if="!loginFlag"

      >
      ログイン
      </v-btn>
      <v-btn
        text
        v-if="loginFlag"
        @click="log_out"
      >
      ログアウト
      </v-btn>
      <v-toolbar-title v-if="loginFlag">ようこそ、{{ loginUser.name }}様！</v-toolbar-title>
    </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loginFlag', 'loginUser'])
  },
  methods: {
    log_out() {
      this.logout();
      this.$router.push('/login');
    
    },
    ...mapActions(['logout'])
  },
  mounted() {
  }
}
</script>


<style lang="scss">

</style>