<template>
	<div class="goods">
		<div class="menu-wrapper" ref='menuWrapper'>
			<ul>
				<li v-for="(item,i) in goods" class="menu-item" :class="{'current': currentIndex===i}" @click="selectMenu(i,$event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classTab[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodsWrapper'>
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food" @add="addFood">
										
									</cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods" ref="shopcart"></shopcart>
	</div>
</template>

<script>
import Bscroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol'
const ERR_OK=0;
	export default {
	   name: 'goods',
	   props: {
	   seller: {
	   		type: Object
	   }
	},
	data() {
		return {
			goods: [],
			listHeight: [],
			scrollY: 0
		};
	},
	computed: {
		currentIndex() {
			for (let i =0; i< this.listHeight.length; i++) {
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i+1];
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i;
				}
			}
			return 0;
		},
		selectFoods() {
			let foods =[];
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if (food.count) {
						foods.push(food);
					}
				});
			});
			return foods;
		}
	},
	created() {
		 this.classTab = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; 
		 this.$http.get('/api/goods').then((response) => {
      		response = response.body;
        	if (response.errno === ERR_OK) {
            	this.goods = response.data; 
            	this.$nextTick(() => {
            		this._initScroll();
            		this._calculateHeight(); 
            	});
            	                         
            };
    	}); 
  	},
  	methods: {
  		addFood(target) {
  			this._drop(target);
  		},
  		_drop(target) {
  			this.$refs.shopcart.drop(target);			
  		},
  		_initScroll() {
  			this.meunScroll = new Bscroll(this.$refs.menuWrapper, {
  				click: true
  			});
  			this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {
  				probeType: 3,
  				click: true
  			});
  			this.foodsScroll.on('scroll', (pos) => {
  				this.scrollY = Math.abs(Math.round(pos.y));
  			})
  		},
  		_calculateHeight() {
  			let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
  			let height=0;
  			this.listHeight.push(height);
  			for (let i=0; i<foodList.length; i++) {
  				let item =foodList[i];
  				height += item.clientHeight;
  				this.listHeight.push(height);
  			}
  		},
  		selectMenu(index, event) {
  			if (!event._constructed) {
  				return
  			}
  			let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
  			let el =foodList[index];
  			this.foodsScroll.scrollToElement(el, 300);
  		}
  	},
  	components: {
       	 shopcart,
       	 cartcontrol
    }
    
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/sass/mixin.scss';
.goods{
	display: flex;
	position: absolute;
	top: 3.54rem;
	bottom:0.92rem;
	width: 100%;
	overflow: hidden;
	.menu-wrapper{
		flex:0 0 1.6rem;
		width: 1.6rem;
		background: #f3f5f7;
		.menu-item{
			display: table;
			width: 1.22rem;
			height: 1.08rem;
			line-height: 0.38rem;
			padding: 0 0.24rem;
			&.current{
				position: relative;
				z-index: 10;
				margin-top: -1px;
				background: #fff;
				.text{
					@include border-none();
					font-weight: 700;
				}
			}
			.icon{
		  		display: inline-block;
		  		width: 0.24rem;
		  		height: 0.24rem;
		  		margin-right:0.04rem; 
		  		vertical-align: top;
		  		background-repeat:no-repeat;
		  		background-size: 100% 100%;
		  		&.decrease{
		  			background-image: url("images/decrease_3@2x.png");
		  		}
		  		&.discount{
		  			background-image: url('images/discount_3@2x.png');
		  		}
		  		&.guarantee{
		  			background-image: url('images/guarantee_3@2x.png');
		  		}
		  		&.invoice{
		  			background-image: url('images/invoice_3@2x.png');
		  		}
		  		&.special{
		  			background-image: url('images/special_3@2x.png');
		  		}

		  	}
		  	.text{
		  		display:table-cell;
		  		width: 1.12rem;
		  		font-size: 0.24rem;
		  		vertical-align: middle;
		  		@include border-1px(rgba(7,17,27,0.1));
		  	}
		}
	}
	.foods-wrapper{
		flex:1;
		.title{
			padding-left: 0.28rem;
			height: 0.56rem;
			line-height: 0.56rem;
			border-left: 2px solid #d9dde1;
			font-size: 0.24rem;
			color:rgb(147,153,159);
			background: #f3f5f7;

		}
		.food-item{
				display: flex;
				margin: 0.36rem;
				padding-bottom: 0.36rem;
				@include border-1px(rgba(7,17,27,0.1));
				&:last-child{
					@include border-none();
					margin-bottom: 0;
				}
				.icon{
					flex:0 0 1.14rem;
					margin-right: 0.2rem;
					img{
						display: block;
						width: 1.14rem;
						height: 1.14rem;
					}
				}
				.content{
					flex:1;
					.name{
						margin: 0.04rem 0 0.16rem 0;
						height: 0.28rem;
						line-height: 0.28rem;
						font-size: 0.28rem;
						color:rgb(7,17,27);
					}
					.desc, .extra{						
						line-height: 0.2rem;
						font-size: 0.2rem;
						color:rgb(147,153,159);
					}
					.desc{
						margin-bottom: 0.16rem;
						line-height: 0.34rem;
					}
					.extra{
						.count{
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
					.cartcontrol-wrapper{
						position: absolute;
						right: 0;
						bottom: 0.24rem;
					}
				}
			}
	}
}
</style>
