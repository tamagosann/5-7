<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="length"
      circle
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      page: 1,
    }
  },
  watch: {
    page() {
      this.$store.dispatch('pageChanged', this.page)
    }
  },
  computed: {
    ...mapGetters(['totalArticles']),
    length() {
      const length = Math.floor((this.totalArticles / 20) + 1 );
      return length
    },
  },
  mounted() {
    console.log(this.length)
  }
}
</script>

<style lang="scss" scoped>

</style>