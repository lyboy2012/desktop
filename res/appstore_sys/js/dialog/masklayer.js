/**
 * author by liying for mask layer
 */
(function ($,window){
	function init(obj){
		var opts = $.data(obj, "WMaskLayer").options;
		var jq = $(obj);
		var WMaskLayer = $("<div class=\"w_ui_masklayer\"/>");
		opts.mask = WMaskLayer;
		opts.mask.css("zIndex",opts.zIndex);
		WMaskLayer.insertAfter(jq);
		setTimeout(function (){
			setHeightWidth(obj);		 
		},50);//延迟让dom操作完成
		
		
		$(window).bind("resize.WMaskLayer",function (){
			setHeightWidth(obj);
		});
		
	};
	function setHeightWidth(obj){//设置宽高
	
		var opts = $.data(obj, "WMaskLayer").options;
		var mask = opts.mask;
		mask.css({
				width : $(window).width(),
				height : $(window).height()
		});
		setTimeout(function (){
			mask.css(getWidthHeight());

		},30);


	}
	function getWidthHeight(){//获得宽高 文档宽高作为宽高 
		
		if (document.compatMode == "CSS1Compat") {
			return {
				width : Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
				height : Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
			};
		} else {
			return {
				width : Math.max(document.body.scrollWidth,document.body.clientWidth),
				height : Math.max(document.body.scrollHeight,document.body.clientHeight)
			};
		}
	};
	function hideMask (obj){//隐藏遮罩层
		var opts = $.data(obj, "WMaskLayer").options;
		opts.mask.hide();
	};
	function showMask(obj){//显示遮罩层
		var opts = $.data(obj, "WMaskLayer").options;
		opts.mask.show();
	};
	function destroy(obj){//销毁mask
		var opts = $.data(obj, "WMaskLayer").options;
		var mask = opts.mask;
		$(window).unbind(".WMaskLayer");
		mask.remove();
	};
	$.fn.WMaskLayer = function (options, param){
		
		if (typeof options == "string") {
			return $.fn.WMaskLayer.methods[options](this, param);
		}
		options = options || {};
		return this.each(function() {
				var opts;
				var data = $.data(this, "WMaskLayer");
				if (data) {
					$.extend(data.options, options);
					opts = $.extend(data.options, options);
				} else {
					opts = $.data(this, "WMaskLayer", {
						options : $.extend({}, $.fn.WMaskLayer.defaults, $.fn.WMaskLayer
						.parseOptions(this),options)
					});
				}
				$.data(this, "WMaskLayer", opts);
				init(this);
			});
	};
	
	$.fn.WMaskLayer.methods = {
		open : function (jq,param){
			return jq.each(function() {
				showMask(this);
			});
		
		},
		close : function (jq){
			return jq.each(function() {
				hideMask(this);
			});
		},
		destroy : function (jq){
			return jq.each(function() {
				destroy(this);
			});
		}
	
	};
	$.fn.WMaskLayer.parseOptions = function(target) {
		var t = $(target);
		return $.extend({},{zIndex : (t.attr("zIndex") ? t.attr("zIndex") : 999)});
	};
	$.fn.WMaskLayer.defaults = {
		zIndex : 999,
		mask : null
	};

})(jQuery,window);