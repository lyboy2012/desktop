/**
 * author by liying for dialog
 */
(function ($,window){
	function init(obj){
		var opts = $.data(obj, "WDialog").options;
		var jq = $(obj);
		opts.dialog = jq;
		var dialog = opts.dialog;
		if(!dialog.hasClass("dialog_w")){
			dialog.addClass("dialog_w");
		}
		if(opts.dWidth){
			dialog.width(opts.dWidth);
		}
		if(opts.remote){//采用远程加载
			_CAjax.sendData({
			  url: opts.url,
			  type: "get",
			  dataType:"html",
			  async: false,
			  success: function(content){
				dialog.html(content);
			  }
			});
		}else{
			dialog.html(opts.content);
		}
		
		opts.confirmBtn = dialog.find(".w_d_confirm");
		opts.cancelBtn = dialog.find(".w_d_cancel");
		opts.closeBtn = dialog.find(".w_d_close");
		bindBtnEvent(obj);
		var zIndex = opts.zIndex;

		var mask = jq.WMaskLayer({zIndex:zIndex});
		opts.mask = mask;
		dialog.css("zIndex",zIndex+1);
		/*setTimeout(function (){
			setCenter(obj);		 
		},10);//延迟让dom操作完成
		*/
		if(opts.callBack){
			opts.callBack();
		}
		
	};
	function bindBtnEvent(obj){//绑定按钮的事件
		var opts = $.data(obj, "WDialog").options;
		//点击事件
		opts.closeBtn.bind("click.dialog",function (){
			var cancelCallBack = opts.cancelCallBack;
			hide(obj);
			if(opts.cancelCallBack){
				if(cancelCallBack()){
					return ;
				};
			}
			
		});
		opts.confirmBtn.bind("click.dialog",function (){
			var confirmCallBack = opts.confirmCallBack
			
			if(opts.confirmCallBack){
				confirmCallBack();
			}
			//hide(obj);
		});
		opts.cancelBtn.bind("click.dialog",function (){
			var cancelCallBack = opts.cancelCallBack;
			hide(obj);
			if(opts.cancelCallBack){
				if(cancelCallBack()){
					return ;
				};
			}
			
		});
	};
	
	function setCenter(obj){//设置宽高
		var opts = $.data(obj, "WDialog").options;
		//if (!opts.left){
			
			var width = opts.dialog.outerWidth();
				opts.left = ($(window).width() - width) / 2
						+ $.getScrollLeft();
			
		//}
		//if(!opts.top){
			var height = opts.dialog.outerHeight();
			var tmpTop = $(window).height() - height ;
			tmpTop = tmpTop > 0 ? tmpTop :0;
				opts.top = (tmpTop) / 2
						+  $.getScrollTop();
		//}
		move(obj);
	}
	function move(obj){
		var opts = $.data(obj, "WDialog").options;
		var dialog = opts.dialog;

		dialog.css({
				top : opts.top,
				left :opts.left
		});
	};
	function hide(obj){//隐藏遮罩层
		if(!obj)return;
		var opts = $.data(obj, "WDialog").options;
		opts.dialog.hide();
		if(opts.modal){
			opts.mask.WMaskLayer("close");
		}
	};
	function show(obj){//显示遮罩层
		var opts = $.data(obj, "WDialog").options;
		if(opts.modal){//如果是模式的打开遮罩层
			opts.mask.WMaskLayer("open");
		}
		setCenter(obj);	//让弹出框居中显现
		opts.dialog.show();
	};
	function destroy(obj){//销毁mask
		var opts = $.data(obj, "WDialog").options;
		var dialog = opts.dialog;
		if(opts.modal){
			opts.mask.WMaskLayer("destroy");
		}
		dialog.remove();
	};
	function resetConfirm(obj,param){
		var opts = $.data(obj, "WDialog").options;
		opts.confirmCallBack = param.confirmCallBack
	}
	$.fn.WDialog = function (options, param){
		
		if (typeof options == "string") {
			return $.fn.WDialog.methods[options](this, param);
		}
		options = options || {};
		return this.each(function() {
				var opts;
				var data = $.data(this, "WDialog");

				if (data) {
					$.extend(data.options, options);
					opts = $.extend(data.options, options);
				} else {
					opts = $.data(this, "WDialog", {
						options : $.extend({}, $.fn.WDialog.defaults, $.fn.WDialog
						.parseOptions(this), options)
					});
				}
				$.data(this, "WDialog", opts);
				init(this);
			});
	};
	
	$.fn.WDialog.methods = {
		open : function (jq,param){//打开弹出框
			return jq.each(function() {
				show(this);
			});
		},
		close : function (jq){//关闭弹出框
			return jq.each(function() {
				hide(this);
			});
		},
		destroy : function (jq){//销毁弹出框
			return jq.each(function() {
				destroy(this);
			});
		},
		resetConfirmFun : function (jq,param){//重新设置确定事件
			return jq.each(function() {
				resetConfirm(this,param);
			});
		}
	
	};
	$.fn.WDialog.parseOptions = function(target) {
		var t = $(target);
		return $.extend({},{zIndex : (t.attr("zIndex") ? t.attr("zIndex") : 9999)});
	};
	$.fn.WDialog.defaults = {
		dWidth:378,
		zIndex : 9999,
		remote:false,//是否远程加载
		dialog : false,//对话框本身的引用用于方便 操作
		left : false,
		top:false,//
		confirmBtn :false,//确认按钮
		cancelBtn : false,//取消按钮
		closeBtn : false,//关闭按钮
		confirmCallBack:false,//确定按钮点击后的回调方法
		cancelCallBack:false,//取消按钮点击后的回调方法
		mask:false,//遮罩层 和modal 配合使用
		modal:true,//是否开启模式对话框 默认true 是开启的
		callBack:false//初始化弹出框后回调方法
	};

})(jQuery,window);