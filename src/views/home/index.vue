<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >
        搜索
      </van-button>
    </van-nav-bar>

    <van-tabs v-model="active" animated swipeabl class="channel-tabs">
      <van-tab
            :title="channel.name"
            v-for="channel in channels"
            :key="channel.id">
        <Article-list :channel="channel"/>
      </van-tab>

      <div slot="nav-right" class="placeholder">

      </div>
      <div slot="nav-right" class="hamburger-btn">
          <i class="toutiao toutiao-gengduo"></i>
      </div>

    </van-tabs>

  </div>
</template>

<script>

import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async  loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
    padding-top: 162px;
    padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  background-color: cornflowerblue;
  .search-btn {
    color: #fff;
    width: 400px;
    height: 64px;
    background-color: #5babfb;
    .van-icon {
      font-size: 32px;
    }
  }
  .van-icon-search::before {
    color: #fff;
  }

  /deep/.channel-tabs{
      .van-tabs__wrap{
          height: 82px;
          position: fixed;
          top: 82px;
          left: 0;
          right: 0;
          z-index: 1;
      }
      .van-tab{
          min-width: 200px;
          border-right: 1px solid #edeff3;
          font-size: 30px;
          color: #777;
      }
      .van-tab--active{
          color: #333;
      }
      .van-tabs__nav{
          padding-bottom: 0;
      }
      .van-tabs__line{
          width: 31px !important;
          height: 6px;
          background-color: #3296fa;
          bottom: 8px;
      }
      .placeholder{
          width: 66px;
          height: 82px;
          flex-shrink: 0;
      }
      .hamburger-btn{
          position: fixed;
          right: 0;
          width: 66px;
          height: 82px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          opacity: 0.902;
        i.toutiao{
            font-size: 33px;
        }
        &::before{
            content:'';
            position: absolute;
            left: 0;
            width:1px ;
            height: 100%;
            background-image: url('~@/assets/gradient-gray-line.png');
            background-size: contain;
        }
      }
  }
}
</style>
