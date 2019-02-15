<template>
  <div ref="dialog" :style="{display:isShow?'block':'none'}"  class="mod-wrap">
    <div class="ui-layer-mask ui-layer-mask-hover"></div>
    <div :class="['ui-box', 'ui-pop', 'ui-animated', 'ui-speed-fast', popClass]" ref="pop">
      <div class="inner">
        <div class="pop-close iconfontcom tap-lt"  @click="hide" v-if="hideClose"></div>
        <div class="pop-hd" > {{title}} </div>
        <div class="pop-bd" v-html="ctn" v-if="ctn.length>0">
        </div>
        <div class="pop-ft">
          <a class="btn tap-lt" @click="cancelFun">{{cancelValue}}</a>
          <a class="btn tap-lt" @click="okFun">{{okValue}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStyle, setStyle } from './dom'
export default {
  name: 'pop',
  data () {
    return {
      showClass:'ui-ani-bounceIn',
      hideClass:'ui-ani-bounceOut',
      speedClass:'ui-speed-fast',
      title:'title',
      cancelValue:'取消',
      okValue:'确定',
      ctn:'',
      hideClose: false,
      popClass:'',
      isShow:false,
      top:'' // 20%
    }
  },
  methods:{
    hide(flag){
      this.popClass=this.hideClass;
      setTimeout(()=>{
        this.isShow = false;	
        this.$emit('hidden', this);
      }, 200);
    },
    cancelFun(){
      this.$emit('cancel', this);
      this.hide();
    },
    okFun(){
      this.$emit('sure', this);
      this.hide();
    },
    setPos(){
      this.$nextTick(()=>{
        var pop = this.$refs.pop;
        var height = getStyle(pop, 'height').replace('px', '');
        var width = getStyle(pop, 'width').replace('px', '');
        setStyle(pop, 'top', (this.top.length!=0?this.top:'50%'));	
        setStyle(pop, 'left', '50%');	
        setStyle(pop, 'margin-left', '-' + (width/2) + 'px');	
        setStyle(pop, 'margin-top', '-' + (height/2) + 'px');	
        this.$emit('show', this);
      });
    },
    show(){
      console.log(this.$data,888)
      document.body.appendChild(this.$refs.dialog)
      this.isShow = true;
      this.popClass=this.showClass;
      this.setPos();
    }
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
	.ui-box {
		box-sizing: border-box;
		font: 300 1rem/1rem "Helvetica Neue", Helvetica, Arial,STHeiTi, sans-serif, "microsoft yahei";
    position: fixed;
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // @include transform(translate(-50%,-50%));
	}
	.ui-pop {
		background: #fff;
		border-radius: rem(10);
		min-width: rem(500);
		font-size:rem(28);
		padding-top:rem(30);
		.inner {
			//margin-top:rem(40);
		}
		.pop-close {
			width: rem(44);
      height: rem(44);
      text-align:center;
      line-height: rem(44);
      position: absolute;
      top: rem(20);
      right: rem(20);
      &:after {
        display:inline-block;
        font-size: rem(30);
        color: #ccc;
        font-weight: 100;
        margin-top:rem(4);
        font-family:'iconfontcom';
        content:'\e76a';
      }
		}
		.pop-hd {
			text-align:center;
      margin-bottom:rem(10);
      font-size: rem(28)
		}
		.pop-bd {
			margin: 0px rem(40) rem(40);
			font-size:rem(30);
			line-height:rem(40);
			text-align:center;
			color:#666666;
		}
		.pop-ft {
			margin: 0px auto;
			@include flexbox((display: box));
			border-top:1px solid #f6f6f6;
			.ui-button {
				border-radius: rem(10);
				margin-top: rem(30);
				font-size:rem(30);
				height:rem(90);
				line-height:rem(90);
			}
			.btn {
				@include flexbox((box-flex:1));
				width:100%;
				display:block;
				text-align:center;
				font-size:rem(30);
				height:rem(80);
				line-height:rem(80);
				color: #333;
				&:nth-child(2), &.only {
					border-left:1px solid #f6f6f6;
					color: #f95d5b;
				}
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
	.tap-lt:active {
		background-color:#f5f6f8;
		text-decoration:none
	}
</style>

