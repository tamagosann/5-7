<template>
  <v-layout wrap> <!-- wrap属性をつけるのがポイント -->
    <v-flex xs12 class="text-center">
      <h1>{{ articles[0].user.name }}さんの投稿一覧</h1>
      <p>総投稿数：{{ totalArticles }}</p>
    </v-flex>
    <v-flex xs12 class="text-center mb-8">
      良いね順にソート：<v-btn depressed elevation="2" :color=" sortByLikes ? 'primary' : 'error'" @click="sort">{{ sortByLikes ? 'ON' : 'OFF' }}</v-btn>
    </v-flex>
    <v-flex class="v-flex">
      <v-card
        class="mx-auto mb-5"
        max-width="800"
      >
        <v-list three-line>
          <v-list-item-group
          >
          <template v-for="(item, index) in articles">
            <v-list-item :key="item.title.text">
              <v-list-item-content>
                <v-list-item-title>
                  <router-link :to="{ name: 'PageSingle', params: { id: item.title.id }}">
                    <a target="_blank">{{ item.title.text }}</a>
                  </router-link>
                </v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                >
                <v-icon small class="mr-2">mdi-tag</v-icon>
                <a v-for="tag in item.tags" :key="tag.name" href="#" class="tag-space" target="_blank">
                  {{ tag.name }}
                </a>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <span>
                  投稿者：
                  </span>
                  <span>
                  <v-img
                    class="inline"
                    height="16"
                    width="16"
                    :src="item.user.img"
                    cover
                  ></v-img>
                  </span>
                  <a :href="item.user.url" target="_blank">{{ item.user.name }}</a>
                  <span>が{{ item.date.month }}月{{ item.date.day }}日に投稿</span>
                  <span class="ml-8"><span class="good-number mr-3">{{ item.goodCount }}</span>いいね！</span>

                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
            <v-divider
              v-if="index < items.length - 1"
              :key="index"
            ></v-divider>
          </template>
          </v-list-item-group>
        </v-list>
      </v-card>
      <PageNation :page="page"></PageNation>
     
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import PageNation from '../components/PageNation'

  export default {
    name: 'Home',
    components: {
      PageNation,
    },
    data() {
      return {
        page: 4,
        items: [
          {
            title: {
              text: 'aaa',
              url: '#'
            },
            date: {
              month: 4,
              day: 20,
            },
            tags: [
                {
                  name: 'タグ1',
                  url: '#',
                },
                {
                  name: 'タグ2',
                  url: '#',
                },
                {
                  name: 'タグ3',
                  url: '#',
                },
              
            ],
            user: {
              name: '山田さん',
              url: '#',
              img: '#'
            },
            goodCount: 20
          },
        ],
      }
    },
    computed: {
      ...mapGetters(['articles', 'totalArticles', 'sortByLikes'])
    },
    methods: {
      ...mapActions(['sort'])
    },
    created() {
      this.$store.dispatch('load')
    }

  }
</script>

<style scoped>
  .v-flex{
  }
  .inline {
    display: inline-block;
    margin-right: 10px;
    margin-left: 5px;
    border-radius: 50%;
  }
  .tag-space {
    margin-right: 20px;
  }

  .good-number {

    font-size: 20px;
    font-weight: bold;
    color: cornflowerblue;
  }

  a {

  }
</style>
