<template>
  <transition name="move">	
	<div v-show="showFlag" class="food" ref="food">
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
			</div>
			<div class="cartcontrol-wrapper">
				<cartcontrol :food="food" @add="addFood"></cartcontrol>
			</div>
			<div class="buy" v-show="!food.count || food.count===0" @click="addFirst">加入购物车</div>
		</div>
	</div>
  </transition>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false
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
     	  }
		},
		components: {
			cartcontrol
		}
	};
</script>
<style lang="scss" rel="stylesheet/scss">
	.food {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0.96rem;
		z-index: 30;
		width: 100%;
		background: #fff;
		transition: all 0.2s linear;
		transform: translate3d(0,0,0);
		&.move-enter-active,&.move-leave-active{
			transform: translate3d(100%,0,0);
		}
		.image-header{
			position: relative;
			width: 100%;
			height: 0;
			padding-top:100%;
			img{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			} 
			.back{
				position: absolute;
				top: 0.2rem;
				left: 0;
				.icon-arrow_lift{
					display: block;
					padding:0.2rem;
					font-size: 0.2rem;
					font-size: 0.4rem;
					color: #fff;
				}
			}
		}
		.content{
			padding:0.36rem;
			.title{
				line-height: 0.28rem;
				margin-bottom: 0.16rem;
				font-size: 0.28rem;
				font-weight: 700;
				color: rgb(7,17,27);
			}
			.detail{
				margin-bottom: 0.36rem;
				line-height: 0.2rem;
				font-size: 0;
				.sell-count,.rating{
					font-size: 0.2rem;
					color: rgb(147,153,159);
				}
				.sell-count{
					margin-right: 0.24rem;
				}
			}
			.price{
				font-weight: 700;
				line-height: 0.48rem;
				.now{
					margin-right: 0.16rem;
					font-size: 0.28rem;
					color: rgb(240,20,20);						
				}
				.old{
					text-decoration: line-through;
					font-size: 0.2rem;
					color:rgb(147,153,159);
				}
			}
		}
		.cartcontrol-wrapper{
			position: absolute;
			right: 0.24rem;
			bottom:0.24rem;
		}
		.buy{
			position: absolute;
			right: 0.36rem;
			bottom: 0.36rem;
			z-index: 10;
			height: 0.48rem;
			line-height: 0.48rem;
			box-sizing: border-box;
			border-radius: 0.24rem;
			color: #fff;
			padding: 0 0.24rem;
			font-size: 0.2rem;
			background: rgb(0,160,220);
		}
	}
</style>
