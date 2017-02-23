<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight': totalCount>0}">
						<span class="iconfont icon-shopping_cart":class="{'highlight': totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">
						{{totalCount}}
					</div>
				</div>
				<div class="price" :class="{'highlight': totalCount>0}">
				￥{{totalPrice}}元
				</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>			
		</div>
		<div class="ball-container">
			<div v-for="ball in balls">				
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<div v-show="ball.show" class="ball">
					<div class="inner"></div>
					</div>
				</transition>						
			</div>
	</div>
</template>
<script>
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
				
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				balls: [
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
				],
				dropBalls: []
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;

				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				} else {
					return `去结算`;
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			}
		},
		methods: {
			drop(el) {
				for (let i=0; i<this.balls.length; i++) {
					let ball =this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
		},
		beforeEnter(el) {

		},
		enter(el) {

		},
		afterEnter(el) {

		}

	}
};
</script>
<style lang="scss" rel="stylesheet/scss">
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 0.96rem;
		background: #141d27;
		.content{
			display: flex;
			background: #141d27;
			color:rgba(255,255,255,0.4);
			.content-left{
				flex:1;
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top:-0.1rem;
					margin: 0 0.24rem;
					padding: 0.12rem;
					width: 1.12rem;
					height: 1.12rem;
					box-sizing: border-box;
					vertical-align: top;
					border-radius: 50%;
					background: #141d27;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						text-align: center;
						background: #2b343c;
						&.highlight{
							background:  rgb(0,160,220);
						}
						.icon-shopping_cart{
							font-size: 0.48rem;
							color: #80858a;
							line-height: 0.88rem;
							&.highlight{
								color:#fff;
							}
						}
					}
					.num{
						position: absolute;
						top: 0;
						right: 0;
						width: 0.48rem;
						height: 0.32rem;
						line-height: 0.32rem;
						text-align: center;
						border-radius: 0.32rem;
						font-size:  0.18rem;
						font-weight: 700;
						color:#fff;
						background: rgb(240,20,20);
						box-shadow: 0 0.04rem 0.08rem 0 rgba(0,0,0,0.4);
					}
				}
				.price{
						display: inline-block;
						vertical-align: top;
						margin-top: 0.24rem;
						padding-right: 0.24rem;
						line-height: 0.48rem;
						box-sizing: border-box;
						border-right: 1px solid rgba(255,255,255,0.1);						
						font-size: 0.32rem;
						font-weight: 700;
						&.highlight{
							color: #fff;
						}
				}
					.desc{
						display: inline-block;
						vertical-align: top;
						line-height: 0.48rem;
						margin: 0.24rem 0 0 0.24rem;						
						font-size: 0.24rem;
				}
			}
			.content-right{
				flex:0 0 2.1rem;
				width: 2.1rem;
				.pay{
					height: 0.96rem;
					line-height: 0.96rem;
					text-align: center;
					font-size: 0.24rem;
					font-weight: 700;
					background: #2b333b;
					&.not-enough{
						background: #2b333b;
					}
					&.enough{
						background: #00b43c;
						color: #fff;
					}
				}
			}
			
		}
		.ball-container{
			.ball{
				position: fixed;
				left:0.64rem;
				bottom: 0.44rem;
				z-index: 200;
				&.drop-transiton {
					transition: all 0.4s;
					.inner{
						width: 0.32rem;
						height: 0.32rem;
						border-radius: 50%;
						background: rgb(0,160,220);
						transition: all 0.4s;
					}
				}
			}
		}
	}
</style>
