import Vue from 'vue';
import Router from 'vue-router';
import Goods from 'components/goods/goods';
import Seller from 'components/seller/seller.vue';
import Ratings from 'components/ratings/ratings.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    }
  ],
    'linkActiveClass': 'active'
});
