<template>
	<div class="cartcontrol">
	 <transition name="move">
		<div class="cart-decrease " v-show="food.count>0" @click="decreaseCart">
			<span class="inner iconfont icon-remove_circle_outline"></span>
		</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add iconfont icon-add_circle" @click.stop.prevent="addCart($event)">		
		</div>
	</div>

</template>
<script>
import Vue from 'vue';
	export default{
		props: {
			food: {
				type: Object
			}
		},
		created() {
			
		},
		methods: {
			addCart(event) {				
			if (!event._constructed) {
  				return
  			}  			
  			if (!this.food.count) {
  				Vue.set(this.food, 'count', 1);
				this.food.count = 1;
			} else {
				this.food.count++;
		    }
		    this.$emit('add', event.target);						
		},
		decreaseCart(event) {
			if (!event._constructed) {
  				return
  			} 
  			if (this.food.count) {
  				this.food.count--;
  			} 	
		}
	}
}
</script>
<style lang="scss" rel="stylesheet/scss">
.cartcontrol{
	font-size: 0;
	.cart-decrease{
		display: inline-block;
		padding: 0.12rem;
		opacity: 1;
		transform:transition3d(0,0,0);
		.inner{
			line-height: 0.48rem;
			font-size: 0.48rem;
			color: rgb(0,160,220);
			transition: all 0.4s linear;
        	transform: rotate(0);
		}
		&.move-enter-active,&.move-leave-active{
			transition: all 0.4s linear;
		}
		&.move-enter,&.move-leave-active{
			opacity: 0;
			transform:transition3d(0.48rem,0,0);
			.inner{
				transform: rotate(180deg);
			}
			
		}		
	}
	.cart-count{
		display: inline-block;
		vertical-align: top;
		width: 0.48rem;
		font-size: 0.4rem;
		padding-top: 0.12rem;
		line-height: 0.48rem;
		text-align: center;
		color:rgb(147,153,159);
	}
	.cart-add{
		display: inline-block;
		padding: 0.12rem;
		line-height: 0.48rem;
		font-size: 0.48rem;
		color: rgb(0,160,220);
	}
}
</style>
