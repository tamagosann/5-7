<template>
  <v-card elevation="2" class="mb-8">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-1">{{ `@${loginUser.id}` }}</div>
        <v-list-item-title class="headline mb-4">
          {{ loginUser.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
            {{ loginUser.description }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="50" color="grey" class="rounded-circle">
        <img
            :src="loginUser.img"
            alt="user"
        >
      </v-list-item-avatar>
    </v-list-item>

    <v-divider class="mb-3"></v-divider>
    <v-list-item>
        <v-row>
            <v-col class="text-caption text-center">
                <p>フォロー</p>
                <p>{{ loginUser.followee }}</p>
            </v-col>
            <v-col class="text-caption text-center">
                <p>フォロワー</p>
                <p>{{ loginUser.follower }}</p>
            </v-col>
            <v-col class="text-caption text-center">
                <p>投稿数</p>
                <p>{{ totalArticles }}</p>
            </v-col>
        </v-row>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['loginUser', 'totalArticles'])
    }
};
</script>

<style lang="scss" scoped>
</style>

//   user: {
//     name: '山田さん',
//     url: '#',
//     img: '#'
//     followee: item.user.followees_count,
//     follower: item.user.followers_count,
//     description: item.user.description,
//   },