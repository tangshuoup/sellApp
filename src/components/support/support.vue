<template>
		<ul v-if="seller.supports" class="supports">
			<li class="support-item" v-for="(item,i) in seller.supports">
			<span class="icon" :class="classTab[seller.supports[i].type]">
			</span>
			<span class="text">{{seller.supports[i].description}}</span>
			</li>
		</ul>
</template>
<script>
	export default{
		props: {
			seller: Object
		},
		created() {
	    	this.classTab = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; 
       }
	}
</script>

<style lang="scss" rel="stylesheet/scss">
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
</style>
