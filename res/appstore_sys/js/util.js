jQuery.extend({
    log: function(msg) {//日志终端输出
        if (window.console) {
            if (typeof msg == "object") {
                var html = [];
                for (var i in msg) {
                    html[html.length] = 'name: ' + i + " value: " + msg[i] + '\n';
                }
                window.console.log(html.join(""));
            } else {
                window.console.log(msg);
            }
        }
    },
    getEvt: function(e) {//获得事件和事件源
        var evt = e || window.event;
        var evtTar = evt.target || evt.srcElement;
        if (evtTar.nodeType == 3) {
            evtTar = evtTar.parentNode;
        }
        return [evt, evtTar];
    },
    stopB: function(e) {//阻止事件冒泡
        var evt = e || window.event;
        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            evt.cancelBubble = true;
        }
    },
	getScrollTop : function (){
		return  document.documentElement.scrollTop || document.body.scrollTop;
	},
	setScrollTop : function (top){
		var de = document.documentElement || document.body;
    	de.scrollTop = top;
	},
	getScrollLeft : function (){
		return document.documentElement.scrollLeft || document.body.scrollLeft;
	}
});


var StringBuffer = function (){
	this.content = [];
};
StringBuffer.prototype.append = function (str){
	 this.content.push(str);
	return this;
};

StringBuffer.prototype.toString = function (splitStr){
	if(splitStr){
		return this.content.join(splitStr);
	}else{
		return this.content.join("");
	}
};

$.extend($.fn, {
	longPress: function(callback, time,otherCallback,clazz,delClazz,newClazz) {
		time = time || 1000;
		var timer = null;
		$(this).off('mousedown.long').on('mousedown.long',clazz,function(event) {
			
			if(event.which!=1)return;
			if($(event.target).hasClass(delClazz))return;
			if($(event.target).hasClass(newClazz))return;
			var _this = $(this);
			event.stopPropagation();
			var i = 0;
			timer = setInterval(function() {
				i += 10;
				if (i >= time) {
					clearInterval(timer);
					timer=null;
					typeof callback == 'function' && callback.call(_this);
				}
			}, 10);
			return false;
		});
		
		$(this).off('mouseup.long').on("mouseup.long",clazz,function(event) {
			if(event.which!=1)return;
			if($(event.target).hasClass(delClazz))return;
			if($(event.target).hasClass(newClazz))return;
			var _this = $(this);
			event.stopPropagation();
			if(timer){
				clearInterval(timer);
				timer=null;
				typeof otherCallback == 'function' && otherCallback.call(_this);
			}
			return false;
		});
	}
});


(function (window){
	var u = {
		addFavorite : function (url,name){
			if(document.all){
				window.external.addFavorite(url,name);
		   	}else if (window.sidebar.addPanel){
			  	window.sidebar.addPanel(name,url,"");	
		   }
		},
		getUrlParam : function (name){//给定URL参数名称取得对应的参数
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)", "i"); 
			if (reg.test(location.search.substr(1))){
				return decodeURIComponent(RegExp.$2);
			}else{
				return "";
			}
		},
		isMouseDownIn: function (id,subClass,callBack){
			$(document).unbind('mousedown.'+id).bind('mousedown.'+id,function (event){
				if($('#'+id).css('display') == 'none'){return;}
				var target = $(event.target);

				if(target[0].id != id && target.parents('#'+id).length==0 && !target.hasClass(subClass)){
					callBack();
					
				}
			}); 
		},
		isMouseDownInO: function (clazz,callBack,parentDom){

			$(document).unbind('mousedown.'+clazz).bind('mousedown.'+clazz,function (event){
				if(parentDom.find('.'+clazz).css('display') == 'none'){return;}
				var target = $(event.target);
				if(!target.hasClass(clazz)){
					callBack();
				}
			}); 
		},
		
		loadImg : function (url,callBack){
			 //var img = new Image(); //创建一个Image对象，实现图片的预下载
			   // img.src = url;
			   
			   /* if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
			    	callback(url);
			        return; // 直接返回，不用再处理onload事件
			    }*/

			   $("<img src="+url+"/>").load(function () { //图片下载完毕时异步调用callback函数。
			        callback(url);//将回调函数的this替换为Image对象
			    });
			
		},
		/**
		 * 获得指定class 
		 * id 标签类型type的jquery dom对象
		 *参数{type:"div",clazz:["classname","classname"],id:"idName"}
		 * @param obj
		 * @returns
		 */
		getTarget : function (obj){
			obj = obj || {};
			var target = $("<"+obj.type+"/>");
			if(obj.clazz){
				for(var i in obj.clazz){
					target.addClass(obj.clazz[i]);
				}
				
				//target.addClass(obj.clazz);
			}
			if(obj.id){
				target.attr("id",obj.id);
			}
			 return target;
			 
			 
		},
		/**
		 * 用于针对ie hover 支持和效率为问题
		 * param 形式
		 * {obj:jqObj,clazz:"className"}
		 * @param param
		 */
		ieHoverEvent : function (param){
			param = param || {};
			if ($.browser.msie) { //兼容ie的hover
				
				param.obj.bind("mouseenter mouseleave",function (){
					$(this).toggleClass(param.clazz);
				});
				
			}
		},
		htmlEncode : function (str){
			str = str.replace(/&/gm, '&amp;');
		    str = str.replace(/</gm, '&lt;');
		    str = str.replace(/>/gm, '&gt;');
		   // str = str.replace(/(?:\t| |\v|\r)*\n/g, '<br />');
		    str = str.replace(/\t/gm, '&nbsp;&nbsp;');
		    str = str.replace(/x22/gm, '&quot;');
		    str = str.replace(/x27/gm, '&#39;');
		    return str;
		}
	};
	window.U = u;
})(window);


/* Author by liying for ajax*/
(function(window) {
	/**
	 * 这个js对象主要封装ajax访问后台后台 
	 */
	var ajax = {		
		sendData : function (param){
			if(!param.data){
				param.data = {};
			}
			param.data.ajx = "true";//识别是ajax请求，权限处理
			param.data.ts = new Date().getTime();//解决只请求一次问题
			//var sid = ExternalFun.getUserSId();
			//if(sid){
			//	param.sid=sid;
			//}
			
			param.statusCode = {				
			    601: function () { //会话过期
			    	//top.location.href = ctx+"/member/login/index.do?code=601"
	            },
	            602: function () { //账户重复登陆
	            	//top.location.href = ctx+"/member/login/index.do?code=602"
		        },
		        603: function () { //无权限
		        	//top.location.href = ctx+"/member/login/index.do?code=603"
		        }
	        };
			param.beforeSend = function (XMLHttpRequest){
				//_Masklayer().show();
				//alert("开始");
			};
			param.complete = function (XMLHttpRequest, textStatus){
			//alert("完成")
				//_Masklayer().hide();
			
			};
			param.error = function(XMLHttpRequest, textStatus, errorThrown){$.log("请求失败，请稍后再试!")};
			$.ajax(param);
		}
	};
	window._CAjax = ajax;
})(window);



function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
