import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: '',
    loginUser: {},
    totalArticles: 0,
    articles: [],
    sortByLikes: false, 
    loginMissedFlag: false,
    loginFlag: false,
    currentPage: 1,

  },
  getters: {
    sortByLikes: state => state.sortByLikes,
    articles(state) {
      if(state.sortByLikes === false) {
        return state.articles
      } else {
        const array = state.articles;
        
        const sortedArticles = array.slice().sort((a, b) => {
          if( a.goodCount < b.goodCount ) return 1;
          if( a.goodCount > b.goodCount ) return -1;
          return 0;
        });

        return sortedArticles

      }
    },
    articleBody(state) {
      const articleBody = {
        title: state.articles[0].title.text,
        body: state.articles[0].title.body,
        id: state.articles[0].title.id
      }
      return articleBody
    },
    loginMissedFlag(state) {
      return state.loginMissedFlag
    },
    loginFlag: state => state.loginFlag,
    currentPage: state => state.currentPage,
    totalArticles: state => state.totalArticles,
    loginUser: state => state.loginUser,
  },
  mutations: {
    sort(state) {
      state.sortByLikes = !state.sortByLikes;
    },
    login(state, {articles: articles, user: user}) {
      state.articles = articles;
      state.loginUser = user;
      state.loginFlag = true;
    },
    loginMissed(state) {
      state.loginMissedFlag = true;
    },
    loginMissedCancel(state) {
      state.loginMissedFlag = false;
    },
    articleChange(state, articles) {
      state.articles = articles
    },
    pageChanged(state, page) {
      state.currentPage = page;
    },
    totalArticles(state, totalArticlesCount) {
      state.totalArticles = totalArticlesCount;
    },
    logout(state) {
      state.loginUser = {};
      state.totalArticles = 0;
      state.articles = [];
      state.loginFlag = false;
      state.currentPage = 1;
    }
  },
  actions: {
    sort(state) {
      console.log('ここまでは出る')
      state.commit('sort');
    },
    pageChanged(state, page) {
      state.commit('pageChanged', page);
      const userName = state.getters.articles[0].user.id;
      console.log(state.getters.currentPage)
      console.log('ページ目')

      Vue.axios.get(`https://qiita.com/api/v2/users/${userName}/items`,
      {
        params: {
          page: state.getters.currentPage,
          per_page: 20,
        }
      })
      .then(res => {
        console.log(res)
        const articles = [];
        res.data.forEach(item => {
          const newArticle = {};

          newArticle.title = {
            text: item.title,
            url: item.url,
            body: item.rendered_body,
            id: item.id,
          };

          newArticle.date = {
            month: item.created_at.substr(5, 2),
            day: item.created_at.substr(8, 2),
          };
          newArticle.tags = [];

          item.tags.forEach(tag => {
            const eachTag = {}
            eachTag.name = tag.name;
            newArticle.tags.push(eachTag);
          });

          newArticle.user = {
            name: item.user.name,
            img: item.user.profile_image_url,
            url: `https://qiita.com/${item.user.id}`,
            id: userName,
            followee: item.user.followees_count,
            follower: item.user.followers_count,
            description: item.user.description,
          };

          newArticle.goodCount = item.likes_count;
          
          articles.push(newArticle)
        });
        state.commit('articleChange', articles);

      })
      .catch(() => {
        console.log('ページ切り替えできなかったすまん')
      })
    },
    loginMissed(state) {
      state.commit('loginMissed');
    },
    loginMissedCancel(state) {
      state.commit('loginMissedCancel');
    },
    login(state, user) {
      const userName = user;
      Vue.axios.get(`https://qiita.com/api/v2/users/${userName}/items`,
      {
        params: {
          // page: state.getters.currentPage,
          // per_page: 20,
        }
      })
      .then(res => {
        console.log(res)
        const totalArticlesCount = res.data[0].user.items_count;
        state.commit('totalArticles', totalArticlesCount) 
        const articles = [];
        res.data.forEach(item => {
          const newArticle = {};

          newArticle.title = {
            text: item.title,
            url: item.url,
            body: item.rendered_body,
            id: item.id,
          };

          newArticle.date = {
            month: item.created_at.substr(5, 2),
            day: item.created_at.substr(8, 2),
          };
          newArticle.tags = [];

          item.tags.forEach(tag => {
            const eachTag = {}
            eachTag.name = tag.name;
            newArticle.tags.push(eachTag);
          });

          newArticle.user = {
            name: item.user.name,
            img: item.user.profile_image_url,
            url: `https://qiita.com/${item.user.id}`,
            id: userName,
            followee: item.user.followees_count,
            follower: item.user.followers_count,
            description: item.user.description,
          };

          newArticle.goodCount = item.likes_count;
          articles.push(newArticle)
        });

        const user = articles[0].user;
        state.commit('login', {articles: articles, user: user});
        router.push({ name: "Home", params: { username: user.id}});
        console.log(articles)

      })
      .catch(() => {
        state.commit('loginMissed');

      })
    },
    logout(state) {
      state.commit('logout')
    },
    load() {
      // 残っている謎、アクセストークン、認証、パスワードとログインイdどこに入れるの？
      // 方向性としては、ログインしたら、記事一覧、限定記事一覧、タイムライン、みたいな？
      // アカウント名入れたら、その人の記事一覧が表示される、戻るボタンとか。
      // トレンドページ、タグ検索とか
      //次にやる事： 1、記事ページを作る  2、タグ一覧とその記事一覧、記事ページとか
    }
  },
  modules: {
  }
})

// {
//   title: {
//     text: 'aaa',
//     url: '#'
//     body: 'item.rendered_body',
//     id: item.id,
//   },
//   date: {
//     month: 4,
//     day: 20,
//   },
//   tags: [
//       {
//         name: 'タグ1',
//         url: '#',
//       },
//       {
//         name: 'タグ2',
//         url: '#',
//       },
//       {
//         name: 'タグ3',
//         url: '#',
//       },
    
//   ],
//   user: {
//     name: '山田さん',
//     url: '#',
//     img: '#'
//     followee: item.user.followees_count,
//     follower: item.user.followers_count,
//     description: item.user.description,
//   },
//   goodCount: 20
// },
