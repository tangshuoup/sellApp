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
					<div class="support-count" v-if="seller.supports" @click="showMask">
						<span class="count">{{seller.supports.length}}个</span>
						<i class="iconfont icon-keyboard_arrow_right"></i>
					</div>
			</div>
		</div>	
		<div class="notice-wrapper">
			<span class="notice-title"></span><span class="notice-text">{{seller.bulletin}}</span>
			<i class="iconfont icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
		<div v-show="maskShow" class="mask">
			<div class="mask-wrapper clearfix">
				<div class="mask-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="seller.supports" class="supports">
						<li class="support-item" v-for="(item,i) in seller.supports">
						<span class="icon" :class="classTab[seller.supports[i].type]">
						</span>
						<span class="text">{{seller.supports[i].description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
				</div>
				<div class="bulletin">
					<p class="content">{{seller.bulletin}}</p>
				</div>
			</div>
			<div class="mask-close">
				<i class="iconfont icon-close" @click="maskClose"></i>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
import star from 'components/star/star';
	export default {
	   name: 'header',
	   props: {
	    seller: {
	   	 type: Object
	    }  
	  },
	  data() {
	  	return {
	  		maskShow: false

	  	}
	  },
	  methods: {
	  	showMask() {
	  		this.maskShow = true;
	  	},
	  	maskClose() {
	  		this.maskShow = false;
	  	}
	  },
	  created() {
	    	this.classTab = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; 
       },
       components: {
       	 star
       }	
};
</script>
<style lang="scss" rel="stylesheet/scss">
	.header{
		position: relative;
		background:rgba(7,17,27,0.5);			
		color: #fff;
		overflow: hidden;
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
	  .notice-wrapper{
	  	height: 0.56rem;
	  	line-height: 0.56rem;
	  	padding: 0 0.4rem 0 0.24rem;
	  	white-space: nowrap;
	  	overflow: hidden;
	  	text-overflow:ellipsis;
	  	.notice-title{
	  		display: inline-block;
	  		width: 0.44rem;
	  		height: 0.24rem;
	  		background: url('images/bulletin@2x.png') no-repeat;
		  	background-size: 100% 100%;
		  	margin-right: 0.08rem;
	  	} 
	  	.notice-text{
	  		font-size: 0.2rem;
	  		color:rgb(255,255,255);
	  		font-weight: 200;
	  	}
	  	.icon-keyboard_arrow_right{
			position: absolute;
			font-size: 0.26rem;
			right: 0.24rem;
			bottom:0.01rem;
	  	}
	  }
	  .background{
	  	position: absolute;
	  	top: 0;
	  	left: 0;
	  	z-index: -1;
		width: 100%;
		height: 100%;
		filter:blur(10px);
		-ms-filter: blur(10px);
		-webkit-filter:blur(10px);
	  }
	  .mask{
	  	position: fixed;
	  	top: 0;
	  	left: 0;
	  	z-index: 100;
	  	width: 100%;
	  	height: 100%;
	  	overflow: auto;
	  	background: rgba(7,17,27,0.8);
	  	transition:all 0.5s;
	  	&.fade-transition{
	  		opacity: 1;
	  		background:rgba(7,17,27,0.8);
	  	}
	  	&.fade-enter, &.fade-leave-active{
	  		opacity: 0;
	  		background:rgba(7,17,27,0);
	  	}
	  	.mask-wrapper{
	  		width: 100%;
	 		min-height: 100%;
	 		.mask-main{
				margin-top: 1.28rem;
				padding-bottom: 1.28rem;
				.name{
					line-height: 0.32rem;
					text-align: center;
					font-size: 0.32rem;
					font-weight: 700;
				}
				.star-wrapper{
					margin-top: 0.36rem;
					padding: 0.02rem 0;
					text-align: center;
				}
				.title{
					display: flex;
					width: 80%;
					margin: 0.56rem auto 0.48rem auto;
					.line{
						flex:1;
						border-bottom: 1px solid rgba(255,255,255,0.2);
						position: relative;
						top: -0.12rem;
					}
					.text{
						padding:0 0.24rem;
						font-size: 0.28rem;
						font-weight: 700;
					}
				}
			.supports{
				width: 80%;
				margin: 0 auto;
				.support-item{
					padding: 0 0.24rem;
					margin-bottom: 0.24rem;
					font-size:0;
					&:last-child{
						margin-bottom: 0;
					}
					.icon{
						display: inline-block;
						width: 0.32rem;
						height: 0.32rem;
						vertical-align: top;
						margin-right: 0.12rem;
						background-size: 0.32rem 0.32rem;
						background-repeat: no-repeat;
						&.decrease{
		  					background-image: url("images/decrease_2@2x.png");
		  		 		}
		  				&.discount{
		  					background-image: url('images/discount_2@2x.png');
		  				}
		  				&.guarantee{
		  					background-image: url('images/guarantee_2@2x.png');
		  				}
		  				&.invoice{
		  					background-image: url('images/invoice_2@2x.png');
		  				}
		  				&.special{
		  					background-image: url('images/special_2@2x.png');
		  				}	
					}
					.text{
						line-height: 0.24rem;
						font-size: 0.24rem;
					}
				}
	 		}
			.bulletin{
				width: 80%;
				margin: 0 auto;
				.content{
					padding: 0 0.24rem;
					line-height: 0.48rem;
					font-size: 0.24rem;
				}
			}
	  	}
	  }
	  	.mask-close{
	 			position: relative;
	 			width: 0.64rem;
	 			height: 0.64rem;
	 			margin: 0.72rem auto 0 auto;
	 			clear: both;
	 			font-size: 0.64rem;
	 			.icon-close{
	 				font-size: 0.58rem;
	 			}
	 	}
	  }
	}
</style>
