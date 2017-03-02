<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">
						高于周边商家{{seller.rankRate}}%
					</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :selectType="selectType" :onlyContent="onlyContent" @select="ratingtypeSelect" @toggle="toggleContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" alt="" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="iconfont icon-thumb_up"></span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import star from 'components/star/star';
import BScroll from 'better-scroll';
import ratingselect from 'components/ratingselect/ratingselect';
import split from 'components/split/split';
import {formatDate} from 'common/js/data';
const ALL = 2;
const ERR_OK = 0;
	export default {
	   props: {
	   	seller: {
	   		type: Object
	   	}
	   },
	   data() {
	   	return {
	   		ratings: [],
			selectType: ALL,
			onlyContent: true
	   	};
	   },
	   created() {
	   		this.$http.get('/api/ratings').then((response) => {	   			
	   			response = response.body;
	   			if (response.errno === ERR_OK) {
	   				this.ratings = response.data;
	   				this.$nextTick(() => {
	   					this.scroll = new BScroll(this.$refs.ratings, {
	   						click: true
	   					});
	   				});	   				
	   			}
	   		});
	   },
	   methods: {
	   	 needShow(type, text) {
     	  	if (this.onlyContent && !text) {
     	  		return false;
     	  	}
     	  	if (this.selectType === ALL) {
     	  		return true;
     	  	} else {
     	  		return type === this.selectType;
     	  	}
     	  },
	   	 ratingtypeSelect(type) {
     	  		this.selectType = type;
     	  		this.$nextTick(() => {
     	  			this.scroll.refresh();
     	  		});
     	  },
     	  toggleContent() {
     	  		this.onlyContent = !this.onlyContent;
     	  		this.$nextTick(() => {
     	  			this.scroll.refresh();
     	  		})
     	  }
	   },
	   filters: {
			formatDate(time) {
				let date =new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
	   components: {
	   		star,
	   		ratingselect,
	   		split
	   }
	};
</script>
<style lang="scss" rel="stylesheet/scss">
@import '../../common/sass/mixin';
@import './ratings.scss';
</style>
