<template>
  <v-sheet rounded="lg" elevation="2">
    <v-list color="transparent">
      <v-list-item v-for="(item, index) in sideMenuItem" :key="index" link>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
    data() {
        return {
            sideMenuItem: [
                {
                    name: 'トレンド',
                },
                {
                    name: '新着記事'
                },
            ],
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>