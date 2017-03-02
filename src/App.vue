<template>
  <div class="app">
  <v-header :seller="seller"></v-header>
  <div class="tab">
  <router-link to="goods" class="tab-wrapper">
    <div class="tab-item">商品</div>
    </router-link>
     <router-link to="ratings" class="tab-wrapper">
    <div class="tab-item">评论</div>
    </router-link>
     <router-link to="seller" class="tab-wrapper">
    <div class="tab-item">商家</div>
    </router-link>
  </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import {urlParse} from 'common/js/until';
const ERR_OK = 0;
export default{
  name: 'app',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
            return queryParam.id;
        })()
      }   
    };
  },
  created() {
    this.$http.get('/api/seller?id='+ this.seller.id).then((response) => {
      response = response.body;
        if (response.errno === ERR_OK) {
            this.seller = Object.assign({}, this.seller, response.data);                           
        };
    }); 
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import  './common/sass/mixin.scss';
.app{
  font-size: 14px;
  .tab{
      display: flex;
      width: 100%;
      height: 0.8rem;
      @include border-1px(rgba(7,17,27,0.1));
    .tab-wrapper{
      flex:1;
       color: rgb(77,85,93);
      .tab-item{
       font-size: 0.28rem;
       text-align: center;
       line-height: 0.8rem;       
     }

    }
    .active{
          color: rgb(240,20,20);
    }
  }  
}
  
</style>
