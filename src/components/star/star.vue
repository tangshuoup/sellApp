<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>
<script>
const LENGTH=5;
const CLS_ON='on';
const CLS_HALF='half';
const CLS_OFF='off';
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size;
			},
			itemClasses() {
				let result=[];
				let score = Math.floor(this.score*2)/2;
				let hasDecimal= score % 1!==0;
				let integer= Math.floor(score);
				for (let i = 0; i < integer; i++) {
					result.push(CLS_ON);
				}
				if (hasDecimal) {
					result.push(CLS_HALF);
				}
				if (result.length < LENGTH) {
					result.push(CLS_OFF);	
				}
				return result;
			}
		}
	};
</script>
<style lang="scss" rel="stylesheet/scss">
	.star{
		font-size: 0;
	&.star-48{
		.star-item{
			display: inline-block;
			background-repeat: no-repeat;
			width: 0.4rem;
			height: 0.4rem;
			margin-right: 0.44rem;
			background-size: 0.4rem 0.4rem;
			&:last-child{
				margin-right: 0;

			}
			&.on{
				background-image: url('images/star48_on@2x.png');
			}
			&.half{
				background-image: url('images/star48_half@2x.png');
			}
			&.off{
				background-image: url('images/star48_off@2x.png');
			}
		}
	}
	&.star-36{
		.star-item{
			display: inline-block;
			background-repeat: no-repeat;
			width: 0.3rem;
			height: 0.3rem;
			margin-right: 0.32rem;
			background-size: 0.3rem 0.3rem;
			&:last-child{
				margin-right: 0;
			}
			&.on{
				background-image: url('images/star36_on@2x.png');
			}
			&.half{
				background-image: url('images/star36_half@2x.png');
			}
			&.off{
				background-image: url('images/star36_off@2x.png');
			}
		}
	}
	&.star-24{
		.star-item{
			display: inline-block;
			background-repeat: no-repeat;
			width: 0.2rem;
			height: 0.2rem;
			margin-right: 0.06rem;
			background-size: 0.2rem 0.2rem;
			&:last-child{
				margin-right: 0;
			}
			&.on{
				background-image: url('images/star24_on@2x.png');
				
			}
			&.half{
				background-image: url('images/star24_half@2x.png');
				
			}
			&.off{
				background-image: url('images/star24_off@2x.png');

			}
		}
	}
  }

</style>
