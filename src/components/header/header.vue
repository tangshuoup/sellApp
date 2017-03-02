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
					<support :seller="seller"></support>
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
				<i class="iconfont icon-close" @click.stop.prevent="maskClose"></i>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
import star from 'components/star/star';
import support from 'components/support/support';
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
	  created() {
	    	this.classTab = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; 
     },
	  methods: {
	  	showMask() {
	  		this.maskShow = true;
	  	},
	  	maskClose() {
	  		this.maskShow = false;
	  	}
	  },
       components: {
       	 star,
       	 support
       }	
};
</script>
<style lang="scss" rel="stylesheet/scss">
	@import './header';
</style>
