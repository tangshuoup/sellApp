<template>

	<div class="header">
		<div class="header-warpper">
				<div class="hwt-left">
					<img :src="seller.avatar" alt="">
				</div>
				<div class="hwt_right">
					<div class="hwr_top">
						<span class="brand"></span>
						<span class="name">{{seller.name}}</span>
					</div>
					<div class="hwr_center">
						{{seller.description}}/{{seller.deliveryTime}}分钟送达
					</div>
					<div class="hwr_bottom" v-if='seller.supports'>
						<span class="icon" :class="classTab[seller.supports[0].type]">
							
						</span>
						<span class="text">{{seller.supports[0].description}}</span>
					</div>
					<div class="support-count" v-if="seller.supports">
						<span class="count">{{seller.supports.length}}个</span>
						<i class="iconfont icon-keyboard_arrow_right"></i>
					</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
	   name: 'header',
	   props: {
	    seller: {
	   	 type: Object
	    }  
	  },
	  created() {
	    	this.classTab = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; 
       }	
};
</script>
<style lang="scss" rel="stylesheet/scss">
	.header{		
		background: rgba(7,17,24,0.5);		
		color: #fff;
		.header-warpper{
			padding: 0.48rem 0.24rem 0.36rem 0.48rem;
			overflow: hidden;
			position: relative;
		   .hwt-left{
			display: inline-block;
			width: 1.28rem;
			height: 1.28rem;
			img{
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 4px;

			}
		  }
		  .hwt_right{
		  	display: inline-block;
		  	margin-left: 0.32rem;
		  	.hwr_top{
				margin-bottom: 0.16rem;
		  	.brand{
		  		display:inline-block;
		  		width: 0.6rem;
		  		height: 0.36rem;
		  		background: url('images/brand@2x.png') no-repeat;
		  		background-size: 100% 100%;
		  	}
		  	.name{
		  		font-size: 0.32rem;
		  		color:rgb(255,255,255);
		  		font-weight: bold;
		  		line-height: 0.36rem;
		  		vertical-align: top;
		  	}
		  }
		  .hwr_center{
		  	margin-bottom: 0.2rem;
		  	font-size: 0.24rem;
		  	color:rgb(255,255,255);
		  	font-weight: 200;
		  	line-height: 0.24rem;
		  }
		  .hwr_bottom{
		  	.icon{
		  		display: inline-block;
		  		width: 0.24rem;
		  		height: 0.24rem;
		  		vertical-align: top;
		  		background-repeat:no-repeat;
		  		background-size: 100% 100%;
		  		&.decrease{
		  			background-image: url("images/decrease_1@2x.png");
		  		}
		  		&.discount{
		  			background-image: url('images/discount_1@2x.png');
		  		}
		  		&.guarantee{
		  			background-image: url('images/guarantee_1@2x.png');
		  		}
		  		&.invoice{
		  			background-image: url('images/invoice_1@2x.png');
		  		}
		  		&.special{
		  			background-image: url('images/special_1@2x.png');
		  		}

		  	}
		  	.text{
		  		font-size: 0.2rem;
		  		color:rgb(255,255,255);
		  		font-weight: 200;
		  		line-height: 0.24rem;

		  	}
		  }
		  .support-count{
		  	position: absolute;
		  	right: 0.24rem;
		  	bottom:0.36rem;
		  	height: 0.48rem;
		  	padding: 0 0.16rem;
		  	background:rgba(0,0,0,0.2);
		  	border-radius: 0.16rem;
		  	.count{
		  		vertical-align: top;
		  		font-size: 0.2rem;
		  		color:rgb(255,255,255);
		  		font-weight: 200;
		  		line-height: 0.48rem;

		  	}
		  	.icon-keyboard_arrow_right{
		  		background: none;
		  		line-height: 0.48rem;
		  	}
		  }
		}
	  }
	}
</style>
