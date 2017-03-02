<template>
  <transition name="move">	
	<div v-show="showFlag" class="food" ref="food" >
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image">
				<div class="back" @click="hide">
					<i class="iconfont icon-arrow_lift"></i>
				</div>			
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<cartcontrol :food="food" @add="addFood"></cartcontrol>
				</div>
				<div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
		 	</div>
			<split></split>
			<div class="info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" @select="ratingtypeSelect" @toggle="toggleContent" :ratings="food.ratings"></ratingselect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" width="12" height="12">
							</div>
							 <div class="time">{{rating.rateTime | formatDate}}</div>
					 			<p class="text">
					 			<span class="iconfont" :class="{'icon-thumb_up' :rating.rateType===0,'icon-thumb_down' :rating.rateType===1}"></span>{{rating.text}}
					 			</p>
						</li>
					</ul>					
					
					  <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
	  </div>
	</div>
  </transition>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import {formatDate} from 'common/js/data';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import ratingselect from 'components/ratingselect/ratingselect';
import split from 'components/split/split';

const ALL = 2;
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					postive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show() {
				this.showFlag = true;				
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						})
					} else {
						this.scroll.refresh();
					}
				})
			},
			hide() {
				this.showFlag = false;
			},
			
			addFirst(event) {
			if (!event._constructed) {
  				return;
  			}
			this.$emit('add', event.target);
			Vue.set(this.food, 'count', 1);
		  },
		  addFood(target) {
        	this.$emit('add', target);
     	  },
     	  ratingtypeSelect(type) {
     	  		this.selectType = type;
     	  		this.$nextTick(() => {
     	  			this.scroll.refresh();
     	  		})
     	  },
     	  toggleContent() {
     	  		this.onlyContent = !this.onlyContent;
     	  		this.$nextTick(() => {
     	  			this.scroll.refresh();
     	  		})
     	  },
     	  needShow(type, text) {
     	  	if (this.onlyContent && !text) {
     	  		return false;
     	  	}
     	  	if (this.selectType === ALL) {
     	  		return true;
     	  	} else {
     	  		return type === this.selectType;
     	  	}
     	  }
		},
		filters: {
			formatDate(time) {
				let date =new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			cartcontrol,
			ratingselect,
			split
		}
	};
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/sass/mixin.scss';
@import './food.scss';
</style>
