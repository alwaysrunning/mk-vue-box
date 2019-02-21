<template>
	<div ref="tips" :style="{display: isShow?'block':'none'}" >
		<div :class="['ui-pop-tips', 'ui-animated', speedClass, popClass]" ref="pop">
			<div class="inner">
				<div class="pop-bd">
					<div :class="['icon', 'iconfontcom', type]" v-if="type.length!=0"></div>	
				 <div class="text" v-html="ctn" v-if="ctn.length!=0"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { getStyle, setStyle } from './dom'
	export default {
		name: 'tips',
		data(){
			return {
				id:'',
				top:'30%',
				type:'',
				showClass:'ui-ani-fadeInUp',
				hideClass:'ui-ani-fadeOut',
				speedClass:'ui-speed-normal',
				ctn:'',
				delay:3000,
				//
				popClass:'',
				delayItem:'',
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
				document.body.appendChild(this.$refs.tips);
				this.popClass=this.showClass;
				this.isShow = true;
				this.setPos();
				this.$emit('shown', this);
				clearTimeout(this.delayItem);
				this.delayItem = setTimeout(()=>{
					this.hide();	
				}, this.delay);
			},
			hide(){
				this.popClass=this.hideClass;
				setTimeout(()=>{
					this.isShow = false;	
					this.$refs.tips.remove();
					this.$emit('hidden', this);
				}, 200);
			}
		},
		mounted(){

		}
	}
</script>
<style lang="scss" scoped>
	.ui-pop-tips {
		box-sizing: border-box;
		font: 300 1rem/1rem "Helvetica Neue", Helvetica, Arial,STHeiTi, sans-serif, "microsoft yahei";
		border-radius: rem(10);
		font-size:rem(28);
		position:fixed;
		overflow:hidden;
		background:rgba(81,81,83,0.8);
		padding:0px;
		min-width:auto;
		max-width:rem(600);
		.inner {
			margin-top:rem(20);
		}
		.pop-bd {
			color:#fff;
			margin:0px rem(30) rem(20) rem(30);
			.text {
				display:inline-block;
				//vertical-align:middle;
			}
			.icon {
				font-size:rem(40);
				width:rem(40);
				height:rem(40);
				line-height:rem(40);
				overflow:hidden;
				display:inline-block;
				vertical-align:middle;
				margin-top:rem(0);
				//margin-right:rem(10);
				&.success {
					&:after {
						content:'\e617';
						//color:#67c23a;
					}	
				}
				&.error{
					&:after {
						content:'\e61b';
						//color:#f56c6c;
					}	
				}
				&.warn{
					&:after {
						content:'\e7f2';
						//color:#e6a23c;
					}	
				}
			}
		}
	}
</style>
