<template>
	<div ref="loading" :style="{display: isShow?'block':'none'}" class="mod-wrap">
		<div :class="['ui-layer-mask', maskClass]" @click="maskClose"></div>
		<div :class="['ui-pop-loading', 'ui-animated', speedClass, popClass]" ref="pop">
			<div class="inner">
				<div class="pop-bd">
					<div class="img"><img src="data:image/gif;base64,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"/></div>	
				 <div class="text" v-html="ctn" v-if="ctn.length!=0"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { getStyle, setStyle } from './dom'
	export default {
		name: 'mk-pop-loading',
		props:['options'],
		data(){
			return {
				id:'',
				top:'30%',
				showClass:'ui-ani-bounceIn',
				hideClass:'ui-ani-bounceOut',
				speedClass:'ui-speed-fast',
				ctn:'',
				isMaskClose:false,
				//
				maskClass:'',
				popClass:'',
				isShow:false
			}	
		},
		methods:{
			setPos(){
				this.$nextTick(()=>{
					var pop = this.$refs.pop;
					var height = getStyle(pop, 'height').replace('px', '');
					var width = getStyle(pop, 'width').replace('px', '');
					setStyle(pop, 'top', (this.top.length!=0?this.top:'50%'));	
					setStyle(pop, 'left', '50%');	
					setStyle(pop, 'margin-left', '-' + (width/2) + 'px');	
					this.top.length==0 && setStyle(pop, 'margin-top', '-' + (height/2) + 'px');	
				});
			},
			show(){
                document.body.appendChild(this.$refs.loading)
				this.maskClass = 'ui-layer-mask-hover';
				this.popClass=this.showClass;
				this.isShow = true;
				this.setPos();
				this.$emit('shown', this);
			},
			hide(){
				this.maskClass = '';
				this.popClass=this.hideClass;
				setTimeout(()=>{
					this.isShow = false;	
					this.$refs.loading.remove();
					this.$emit('hidden', this);
				}, 200);
			},
			maskClose(){
				this.isMaskClose && this.hide();
			}
		},
		mounted(){
			Object.assign(this.$data, this.options);
		}
	}
</script>
<style lang="scss" scoped>
	.mod-wrap {
		position:fixed;
		top:0px;
		left:0px;
		right:0px;
		bottom:0px;
	}
	.ui-pop-loading {
		box-sizing: border-box;
		font: 300 1rem/1rem "Helvetica Neue", Helvetica, Arial,STHeiTi, sans-serif, "microsoft yahei";
		border-radius: rem(10);
		font-size:rem(28);
		position:fixed;
		overflow:hidden;
		background:#f2f3f7;
		padding:0px;
		min-width:auto;
		max-width:rem(600);
		.inner {
			margin-top:rem(20);
		}
		.pop-bd {
			color:#333;
			margin:0px rem(30) rem(20) rem(30);
			.img {
				display:inline-block;
				vertical-align:middle;
				line-height:rem(32);
				img {
					width:rem(32);
					height:rem(32);
					overflow:hidden;
				}
			}
			.text {
				display:inline-block;
				//vertical-align:middle;
				line-height:rem(32);
				margin-left:rem(8);
			}
		}
	}

	.ui-layer-mask {
		opacity:0;
		transition:opacity 0.2s linear;
		position: fixed;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		overflow: hidden;
		user-select: none;
		background-color: rgb(0, 0, 0);
	}

	.ui-layer-mask-hover {
		opacity:0.3;
	}
</style>
