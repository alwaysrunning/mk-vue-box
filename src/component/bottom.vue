<template>
	<div ref="dialog" :style="{display: isShow?'block':'none'}" :id="id" class="mod-wrap">
		<div :class="['ui-pop-bottom', 'ui-animated', speedClass, popClass]" >
			<div class="inner" v-html="ctn" v-if="ctn.length!=0"></div>
			<div class="inner" v-if="ctn.length==0">
				<slot name="ctn"></slot>
			</div>
		</div>
		<div :class="['ui-layer-mask', maskClass]" @click="maskClose"></div>
	</div> 
</template>
<script>
	export default {
		name: 'mk-pop-bottom',
		props:['options'],
		data(){
			return {
				id:'',
				ctn:'',
				showClass:'ui-ani-fadeInUp',
				hideClass:'ui-ani-fadeOutDown',
				speedClass:'ui-speed-fast',
				isShow:false,
				isMaskClose:true,
				maskClass:'',
				popClass:''	
			}
		},
		methods: {
			show(flag){
				document.body.appendChild(this.$refs.dialog)
				this.maskClass = 'ui-layer-mask-hover';
				this.popClass=this.showClass;
				this.isShow = true;
			},
			hide(flag){
				this.maskClass = '';
				this.popClass=this.hideClass;
				setTimeout(()=>{
					this.isShow = false;	
					flag && this.$refs.dialog.remove();
					this.$emit('hidden', this);
				}, 200);
			},
			maskClose(){
				this.isMaskClose && this.hide(this.isRemove);
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
	.ui-pop-bottom {
		//top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background: #fff;
		overflow: auto;
		position:fixed;
		z-index:1;
		.close {
			position: fixed;
			top: rem(20);
			right: rem(20);
			font-size: rem(60);
			background:rgba(204,204,204,0.6);
			width:rem(100);
			height:rem(100);
			line-height:rem(110);
			text-align:center;
			border-radius:rem(50);
			color:#fff;
			&:after {
				font-size:rem(40);
				height:rem(40);
				line-height:rem(40);
				width:rem(40);
				overflow:hidden;
				vertical-align:middle;
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
