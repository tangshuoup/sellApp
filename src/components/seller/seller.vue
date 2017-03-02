<template>
	<div class="seller" ref="seller" >
		<div class="seller-content" >
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="iconfont icon-favorite" :class="{'active' : favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<support :seller="seller"></support>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic">
						</li>
					</ul>					
				</div>
			</div>
			<div class="info">
        		<h1 class="title border-1px">商家信息</h1>
        		<ul>
          			<li class="info-item" v-for="info in seller.infos">{{info}}</li>
        		</ul>
      		</div>
    	</div>		
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from 'components/split/split';
import support from 'components/support/support';
import {saveToLocal, loadFromaLocal} from 'common/js/store'
	export default {
	  props: {
		seller: {
			type: Object
		}
	  },
	  data() {
	  	return {
	  		favorite: (() => {
	  			return loadFromaLocal(this.seller.id, 'favorite', false);
	  		})()
	  	}
	  },
	  computed: {
	  	favoriteText() {
	  		return this.favorite ? '已收藏' : '未收藏'
	  	}
	  },
	  watch: {
       seller () {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();        
         });
       }
     },
	  mounted() {
	  	 this.$nextTick(() => {
	  		this._initScroll();
	  		this._initPics();
	  	})
	  },
	  methods: {
	  	_initScroll() {
	  		if (!this.scroll) {
	  			this.scroll = new BScroll(this.$refs.seller, {
	  			click: true
	  			});
	  		} else {
	  			this.scroll.refresh();
	  		}
	  	},
	  	 _initPics() {
	  		if (this.seller.pics) {
	  			let picWidth = 120;
	  			let margin = 6;
	  			let width = (picWidth + margin)* this.seller.pics.length - margin;
	  			this.$refs.picList.style.width = width +'px';
	  			 this.$nextTick(() => {
		            if (!this.picScroll) {
		              this.picScroll = new BScroll(this.$refs.picWrapper, {
		                scrollX: true,
		                eventPassthrough: 'vertical'
		              });
		            } else {
		              this.picScroll.refresh();
		            }
          		});
	  		}
	  	},
	  	toggleFavorite(event) {
	  		 if (!event._constructed) {
          		return;
        	}
	  		this.favorite = !this.favorite;
	  		saveToLocal(this.seller.id, 'favorite', this.favorite)
	  	}
	  },
	 
	  components: {
	  	star,
	  	split,
	  	support
	  }
}

</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/sass/mixin.scss';
.seller{
	position: absolute;
	top: 3.54rem;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	.overview{
		position: relative;
		padding: 0.36rem;
		.title{		
		margin-bottom: 0.16rem;
		height: 0.28rem;
		line-height: 0.28rem;
		color: rgb(7,17,27);
		font-size: 0.28rem;			
		}
		.desc{
				padding-bottom:0.36rem;
				@include border-1px(rgba(7, 17, 27, 0.1));
				font-size: 0;
				.star{
					display: inline-block;
					margin-right: 0.16rem;
					vertical-align: top;
				}
				.text{
					display: inline-block;
					margin-right: 0.24rem;
					line-height: 0.36rem;
					vertical-align: top;
					font-size: 0.2rem;
					color: rgb(77,85,93);
				}
			}
			.remark{
				display: flex;
				padding-top: 0.36rem;
				.block{
					flex:1;
					text-align: center;
					 border-right: 1px solid rgba(7, 17, 27, 0.1);
					 &:last-child{
					 	border:none;
					 }
					 h2{
					 	margin-bottom: 0.08rem;
					 	line-height: 0.2rem;
					 	font-size: 0.2rem;
					 	color: rgb(147, 153, 159);
					 }
					 .content{
						line-height: 0.48rem;
						font-size: 0.2rem;
						color: rgb(7,17,27);
						.stress{
							font-size: 0.48rem;
						}
					 }
				}
			}
			.favorite{
				position: absolute;
				width: 1rem;
				right: 0.22rem;
				top: 0.36rem;
				text-align: center;
				.icon-favorite{
					display: block;
					margin-bottom: 0.08rem;
					line-height: 0.48rem;
					font-size: 0.48rem;
					color: #d4d6d9;
					&.active{
						color: rgb(240,20,20);
					}
				}
				.text{
					line-height: 0.2rem;
					font-size: 0.2rem;
					color: rgb(77,85,93);
				}
			}
		}
		.bulletin{
			padding: 0.36rem 0.36rem 0 0.36rem;
			.title{
				margin-bottom: 0.16rem;
				line-height: 0.28rem;
				color: rgb(7,17,27);
				font-size: 0.28rem;
			}
			.content-wrapper{
				padding: 0 0.24rem 0.32rem 0.24rem;
				@include border-1px(rgba(7, 17, 27, 0.1));
				.content{
					line-height: 0.48rem;
					font-size: 0.24rem;
					color: rgb(240,20,20);
				}
			}
			.supports{
				.support-item{
					padding: 0.32rem 0.24rem;
					border-bottom: 1px solid rgba(7, 17, 27, 0.1);
					font-size: 0;
					&:last-child{
						border: none;
					}
				}
			}
		}
		.pics{
			padding: 0.36rem;
			.title{
				margin-bottom: 0.24rem;
				line-height: 0.28rem;
				color: rgb(7,17,27);
				font-size: 0.28rem;
			}
			.pic-wrapper{
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					.pic-list{
						font-size: 0;
						.pic-item{
							display: inline-block;
							margin-right: 0.12rem;
							width: 2.4rem;
							height: 1.8rem;
							img{
								display: inline-block;
								width: 100%;
								height: 100%;
							}
							&:last-child{
								margin: 0;
							}
						}
					}
				}
		}
		.info{
			padding: 0.36rem 0.36rem 0 0.36rem;
			color: rgb(7, 17, 27);
			.title{
				padding-bottom: 0.24rem;
				line-height: 0.28rem;
				@include border-1px(rgba(7,17,27,0.1));
				font-size: 0.28rem;
			}
			.info-item{
				padding:0.32rem 0.24rem;
				line-height: 0.32rem;
				@include border-1px(rgba(7,17,27,0.1));
				font-size: 0.24rem;
				&:last-child{
					@include border-none();
				}
			}
		}
	}
</style>
