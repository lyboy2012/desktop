/**
 * author by liying for navigation bar
 */
(function ($,window){
	/**
	 * 导航栏功能
	 * 主要是各个应用面板的相互切换效果
	 *
	 * */


	function NavBar(initObj){
		var navBarDom;//导航栏的dom引用
		this.setNavBarDom = function (dom){
			navBarDom = dom;
		};
		this.getNavBarDom = function (){
			return navBarDom;
		};
		var desktop = false;//给一个desktop的引用便于访问
		this.setDesktop = function (vDesktop){
			desktop = vDesktop;
		};
		this.getDesktop = function (){
			return desktop;
		};
		var currentModule = 1;//在navigation中 默认从1开始
		this.setCurrentModule = function (vCurrentModule){
			currentModule = vCurrentModule;
		};
		this.getCurrentModule = function (){
			return currentModule;
		};
		
		
		
	}
	
	NavBar.prototype = {
			/**
			 * 初始化任务栏
			 * @return
			 */
			init : function() {
				var desktop = this;//以desktop 作为this 传入，这样就拿到了desktop的引用
				var _this = desktop.getNavBar();//目前这种调用方式感觉有些繁琐，主要原因是this改变的原有的对象
				_this.setDesktop(desktop);
				
				
				
	
				
				//_this.addNavIndex();//添加index的内容包括分类和首页的导航
					/*_
				//这一项的初始化不应该放到这个位置，
				//因为要想后台取数据，可能造成延迟，页面展示效果不能及时展现出来。
*/				
			},
			delayInit : function (){
				var desktop = this;
				var _this = desktop.getNavBar();
				var container = initSelf();
				_this.setNavBarDom(container);
				
				
				_this.restSelf();
				
				
				_this.bindEvent();//绑定navbar上面的事件
			},
			/**
			 * 初始化模块，这数据时从cache中取得的
			 */
			initModules : function (){
				var _this = this;
				var navbarC = _this.getNavBarDom().find(".navbar_c");
				var modules = vAppCache.getModules();
				navbarC.empty();
				for(var i in modules){

					
					if(i==_this.getCurrentModule()){
						U.getTarget({type:"li",clazz : ["current"]}).attr("moduleIndex",i).appendTo(navbarC).text(i);
					}else{
						$("<li>"+i+"</li>").attr("moduleIndex",i).appendTo(navbarC);
					}
					
				}
				
			},
			
			/**
			 * 绑定事件，包括鼠标的hover 和每个元素点击后的切换事件
			 */
			
			bindEvent : function (){
				var _this = this;
				//绑定index 切换的事件
				_this.bindItemEvent();

			},
			/**
			 * 绑定点击和滚轮事件
			 */
			bindItemEvent:function (){
				var _this = this;
				var dom = _this.getNavBarDom();
	
				dom.on("click.scrol","li",function(e){//代理方式绑定事件
					var width = $(window).width();
					var index = $(this).attr("moduleIndex");
					var current = _this.getCurrentModule();
					if(index==current)return;
					$(this).closest("ul").find(".current").removeClass("current");
					 $(this).addClass('current');
					_this.setCurrentModule(index);
					_this.getDesktop().getAppPanel().scrollToCurrent(index);
				});
				/**
				 * 监听滚轮滚动情况
				 *//*
				var ele = $('.navIndex_panel')[0];
				if(document.addEventListener){
					ele.addEventListener('mousewheel',function (e){mouseScrollFun(e);},false);
					ele.addEventListener('DOMMouseScroll',function (e){mouseScrollFun(e);},false);
					
					
				}else{
					ele.onmousewheel= function (e){mouseScrollFun(e);};//IE/Opera/Chrome/Safari
				}//W3C
				var mouseScrollFun = function(e){
					var direct=0;//
				   var evt = e || window.event;
				
					if(evt.wheelDelta){//IE/Opera/Chrome 120 up -120 down
						direct = evt.wheelDelta;
					}else if(evt.detail){//Firefox -3 up 3 down
						direct = evt.detail;
					}
					//
					 var currentIndex = _this.getCurrentModule();
					// $.log(currentIndex);
					 var nextIndex =currentIndex;
				   if(direct == 120 || direct ==-3){//up
					   $.log(direct+"up");
					  	if(currentIndex!=5){
					  		nextIndex++;
					  	}
					  	
					   
					}else {//down
						$.log(direct+"down");
						if(currentIndex!=0){
							nextIndex--;
						}
						
					}
				   var liDom = dom.find('.navIndex_item').get(nextIndex);
				   $(liDom).triggerHandler("click");
				};*/
			},
			/**
			 * 给外部调用导航栏的暴露个接口
			 * 主要功能是通过点击其他地方的应用，需要跳转回对应模块的 同时打开应用窗口
			 */
			navClickCall : function (nextIndex){

				var _this = this;
				 var liDom = _this.getNavBarDom().find('li').get(nextIndex);
				   $(liDom).triggerHandler("click");
			},
			restSelf : function (){//计算位置和显示的导航数
				var _this  =this;
				_this.initModules();
				var panelWidth = $(window).width();;
				var left =(panelWidth-((30*vAppCache.getModulesSize())+22))/2;
				var bottom = 50;
				_this.getNavBarDom().css({left:left,bottom:bottom});
				
			}
	};
	/**
	 * 初始化dom
	 */
	var initSelf = function (){
		var target =U.getTarget({type:"div",clazz : ["navbar"]});
		//var toosbar = getTarget("div","toolsbar");
		var navbarPanel = U.getTarget({type:"div",clazz : ["navbar_panel"]});
		var navbarL = U.getTarget({type:"div",clazz : ["navbar_l"]});
		var navbarR = U.getTarget({type:"div",clazz : ["navbar_r"]});
		var navbarC = U.getTarget({type:"ul",clazz : ["navbar_c"]});
		
		
	
		
		navbarL.appendTo(navbarPanel);
		navbarC.appendTo(navbarPanel);
		navbarR.appendTo(navbarPanel);
		
		navbarPanel.appendTo(target);
		
		target.appendTo('body');
		return target;//此时改变了下navbar的dom 主要是为了操作dom方便直接指向panel 而不是外层的navbar 以减少dom的查找
	};
	
	
	NavBar.prototype.constructor = NavBar;
	window.NavBar = NavBar;
})(jQuery,window);
