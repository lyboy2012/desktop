/**
 * author by liying for desktop
 */
(function ($,window){


	function Desktop(initObj){
		/**
		 * initObj 面前为了提高响应速度，属性都是通过set的方式注入的
		 */
		initObj = initObj || {};
		//通过闭包实现对象的私有化
		var appPanel = initObj.appPanel;
		

		
		this.setAppPanel = function (vAppPanel){
			appPanel = vAppPanel;
		};
		this.getAppPanel = function (){
			return appPanel;
		};
		var navBar = initObj.navBar;
		this.setNavBar = function (vNavBar){
			navBar = vNavBar;
		};
		this.getNavBar = function (){
			return navBar;
		};
		var popDialog = initObj || {};
		this.setPopDialog = function (vPopDialog){
			popDialog = vPopDialog;
		};
		this.getPopDialog = function (){
			return popDialog;
		};
		
		
		
	}
	/**
	 * 原型继承的缺点是通过时间来换取空间
	 * （我的想法是可能以后出现大量的数据，
	 * 这样就会耗费大量内存，
	 * 不过Desktop也就只能有一个实例，
	 * 但是为了保持这个原则还是选择的原型继承方式）
	 */
	Desktop.prototype = {
			/**
			 * 初始化桌面
			 * 此处应该从服务器取数据来初始化桌面上的所有应用，
			 * 放到cache中以保证后续的工作能够正常进行。
			 * @return
			 */
			init : function() {
				forbidContextmenu();
				$.log("屏蔽桌面的右键功能");
				
			},
			
			/**
			 * 初始化化界面上的各个面板
			 */
			initOthers : function (){
				var methods = getInitMethods(this);
				excuteMethods(methods,this);
			},
			/**
			 * 延迟加载的目的是为了快速初始化桌面后在初始化其他工作
			 */
			delayInit: function(){
				var methods = getDelayInitMethods(this);
				excuteMethods(methods,this);
			},
			bindResizeEvent  : function (){
				$.log("窗口发生改变时候  绑定 destop 操作  ");
				var _this  = this;
				$(window).bind("resize.destop",function(){
					
					_this.resetSelf();

				}); 
			},
			resetSelf :function (){//通过参数主要是为了减少计算window 宽高来提升性能
				var _this = this;
				var wHeight = $(window).height();
				var wWidth = $(window).width();
				$.log(wHeight+" "+wWidth);
				_this.getAppPanel().resetSelf(wHeight,wWidth);
				_this.getNavBar().restSelf(wHeight,wWidth);
			

			},
			/**
			 * 改变主题背景
			 */
			changeTheme : function (url){
					var _this = this;
				
				$(window.document.body).css({backgroundImage: "url('"+url+"')"});
			},
			initLogout : function (){
				/*var logoutDom = $('<a href="javascript:;" class="logout"></a>');
				logoutDom.appendTo('body');
				logoutDom.bind("click",function (){
					//alert("退出软件！");
					ExternalFun.closeDesktopWindow();
					
				});*/
				
			}
			,
			initRecycle: function (){
				var _this = this;
				var recycleDom = $('<div class="recycle_panel">'+
										'<div class="recycle_container">'+
											'<div class="app_item" >'+
												'<div class="app_item_icon">'+
													'<img src="res/appstore_sys/img/app/recycle.png">'+
												'</div>'+
												'<div class="app_item_name">废纸篓</div>'+
											'</div>'+
										'</div>'+
									'</div>');
				recycleDom.appendTo('body');
				recycleDom.bind("click",function (){
					 var d = new D("login_dialog");
					d.modal({url:"dialog/recycle.html",dWidth:480,callBack:function (dialog){
						
						
					}});
					
					var apps = ExternalFun.getAllRecycleApps();
					var html = [];
					for(var i in apps){
						html.push('<div id="recycle_'+apps[i].id+'"  class="app_item" appCode="'+apps[i].id+'" module_index="'+apps[i].moduleIndex+'">'+
									'<div class="app_item_icon">'+
										'<img src="'+apps[i].icon+'"/>'+
									'</div>'+
									'<div class="app_item_name">'+apps[i].name+'</div>'+
								'</div>');		
								
					}
					d.dialog.find(".d_recycle_content").html(html.join(""));
					
					
					
					d.dialog.off('contextmenu.item').on("contextmenu.item",".app_item",function (event){//右键菜单
					event.stopPropagation();

					var appCode = $(this).attr("appCode");
					var moduleIndex = $(this).attr("module_index");
					
					$.log("右键菜单");
					var popDialog = _this.getPopDialog();
					var html = _this.getPopMenuContent(appCode,moduleIndex);
					popDialog.show(html,$(this));
					
					return false;
				});
				

					
				});
				
			},
			initSpecialApp: function (){
				var _this = this;
				var app = ExternalFun.getSpecialApps();
				var specialDom = $('<div class="special_panel">'+
										'<div class="specail_container">'+
											'<div class="app_item" >'+
												'<div class="app_item_icon">'+
													'<img src="'+app.icon+'">'+
												'</div>'+
												'<div class="app_item_name">'+app.name+'</div>'+
											'</div>'+
										'</div>'+
									'</div>');
				specialDom.appendTo('body');
				specialDom.bind("click",function (){
					ExternalFun.openAppById(app.id);//打开应用
				});
			},
			getPopMenuContent : function (appCode,moduleIndex){
				var html= '<div class="p_btns_panel" style="width:204;height:68px;">'+
								'<dl class="p_b_item" app_code="'+appCode+'" module_index="'+moduleIndex+'" type="recycle">'+
									'<dt><img src="res/appstore_sys/img/desktop/recycle.png"/></dt>'+
									'<dd>还原</dd>'+
								'</dl>'+
								'<dl class="p_b_item" app_code="'+appCode+'" type="uninstall" module_index="'+moduleIndex+'">'+
									'<dt><img src="res/appstore_sys/img/desktop/uninstall.png"/></dt>'+
									'<dd>彻底删除</dd>'+
								'</dl>'+
								
							'</div>';

				return html;
			},
			initLoginInfo:function (){
			
			
			
			
				var path = ExternalFun.getBackgroundImage();
				if(path){
					$("body").css({"backgroundImage":"url('"+path+"')"});
				
				}
				
				
				
				
				//var isUsb = ExternalFun.isUsbToken();
				var logoutHtml = '';
				//if(isUsb==='false'){
					logoutHtml ='<a class="logout_btn" href="javascript:;">注销</a>';
				//}
				
				var loginInfoDom = $('<span  class="login_user_info">'+
										'<a class="theme_btn" href="javascript:;">切换背景</a>'+
										'<a class="feedback_ico_btn" href="javascript:;">联系方式</a>'+
										'<a class="login_btn login_opt_btn" href="javascript:;">登录账号</a>'+
										logoutHtml+
										'<a class="logout_desktop_btn" href="javascript:;" style="display:none;">退出桌面</a>'+
									'</span>');
				loginInfoDom.appendTo('body');
				var result = ExternalFun.isLogin();
				
				if(result.status){
					loginInfoDom.find(".login_opt_btn").removeClass("login_opt_btn").text(result.realname);
					loginInfoDom.find(".logout_btn").show();
				}
				
				
				loginInfoDom.on("click",".theme_btn",function (){
					
					
					var d = new D("theme_dialog");
					d.modal({url:"dialog/theme.html",dWidth:480,callBack:function (dialog){
						
						d.dialog.WDialog("destroy");
						}
					});
					
					var apps = ExternalFun.getBackgroundList();

					
					apps.push({"bg":"","path":"res/appstore_sys/img/app/add_app.png","thumb":"res/appstore_sys/img/app/add_app.png"});
					

				
					
					var html = [],appItemDom,containerDom;
					containerDom = d.dialog.find(".d_recycle_content");
					var addClass="";
					for(var i in apps){
						addClass = apps[i].bg ? "" :"add_item";
					
						appItemDom = $('<div  class="app_item app_item_o '+addClass+'">'+
										'<div class="app_item_icon">'+
											'<a href="javascript:;" class="del_opt"></a>'+
											'<img src="'+apps[i].thumb+'"/>'+
										'</div>'+
									'</div>');
						
						appItemDom.data("bg",apps[i]);								
						appItemDom.appendTo(containerDom);		
					}
	
					
					containerDom.longPress(function (){//左键长按
						$.log("长按点击");
						var index = $(this).data("bg").bg;
						if(index==""){
							return;
						}
						containerDom.find(".app_item").each(function (){
							var index = $(this).data("bg").bg;
							
							if(index!=""){//非添加按钮
								$(this).find(".del_opt").show();
							}
						});
						var parentDom = containerDom;

						U.isMouseDownInO('del_opt',function (){//点击的非删除按钮隐藏所有删除按钮
							containerDom.find(".del_opt").hide();
						},parentDom);
						
						
					},750,function (){

							var index =$(this).data("bg").bg;
							
							if(index==""){//添加背景
								var result = ExternalFun.addBackground();

								if(result){
								
									var appItemDom = $('<div  class="app_item app_item_o">'+
									'<div class="app_item_icon">'+
											'<a href="javascript:;" class="del_opt"></a>'+
											'<img src="'+result.thumb+'"/>'+
										'</div>'+
									'</div>');
									appItemDom.data("bg",result);
									containerDom.find(".add_item").before(appItemDom);										
								}
							}else{
							var path = $(this).data("bg").path;
								var result = ExternalFun.setBackgroundImage(path);
								if(result=="true"){
										$("body").css({"backgroundImage":"url('"+path+"')"});
								}
								
							}
					},'.app_item','del_opt','new_opt');
					
					
					
					
					containerDom.off('click.del').on("click.del",".del_opt",function (event){
					
						event.stopPropagation();	
						var appItem = $(this).closest(".app_item");
						var bg = appItem.data("bg").bg;
						
					
						var result = ExternalFun.deleteBackground(bg);
						if(result=="true"){
							appItem.remove();
						}
						return false;
					});
				});
				
				
				loginInfoDom.on("click",".feedback_ico_btn",function (){
				
					 var d = new D("feedback_info_dialog");
					d.modal({url:"dialog/feedback_info.html"});
				});
				
				loginInfoDom.on("click",".login_opt_btn",function (){
				
					//alert("退出软件！");
					var result = ExternalFun.isLogin();
					
					if(result.status){
					loginInfoDom.find(".login_opt_btn").removeClass("login_opt_btn").text(result.username);
					loginInfoDom.find(".logout_btn").show();
					
						return;
					}
					
					// 如果使用迷彩U锁，不显示；否则，显示
					var isUsb = ExternalFun.isUsbToken();
					if (isUsb === 'false') {
						initLogin();
					}
					
					
				});
				
				
				
				
				loginInfoDom.on("click",".logout_btn",function (){
				
					//alert("退出登录！");
					var result = ExternalFun.logout();
					//alert(result);
					if(result){
						$(".login_user_info").find(".login_btn").addClass("login_opt_btn").text("登录账号");
						$(".login_user_info").find(".logout_btn").hide();
					}
					
				});
				
				
				loginInfoDom.on("click",".logout_desktop_btn",function (){
					//alert("退出软件！");
					ExternalFun.closeDesktopWindow();
					
				});

				var isVirtual = ExternalFun.isVirtualMachine();
				if(isVirtual==='false'){
					$('.logout_desktop_btn').show();
				}else{
					$('.logout_desktop_btn').hide();
				}
				
				
				
			},
			initFeedback : function (){
				var feedbackDom = $('<a href="javascript:;" class="feedback_btn"></a>');
				feedbackDom.appendTo('body');
				feedbackDom.bind("click",function (){
					//alert("退出软件！");
					ExternalFun.feedBackDesktop();
					
				});
			},
			addApp :function (appJson,moduleIndex){
				var _this = this;
				eval("appJson="+appJson);
				//var appJson = {id:moduleIndex+'_13',name:"我的项目",href:"http://www.baidu.com/",icon:"${ctx}/res/appstore_sys/img/app/my_project.png",moduleIndex:moduleIndex,index:13,state:2};
				var moduleSize = vAppCache.getModulesSize();
				var realAppJson = vAppCache.addApp(appJson, moduleIndex);
				var moduleId = realAppJson.moduleIndex;
				if(moduleSize != vAppCache.getModulesSize()){//当前模块不存在就创建新模块
					_this.getAppPanel().addAppContainer(moduleId);
				}
				
				var wHeight = $(window).height();
				var wWidth = $(window).width();
				_this.getAppPanel().drawModuleApps(vAppCache.getAppsByModuleId(moduleId),moduleId,wHeight,wWidth);
				_this.getNavBar().restSelf(wHeight,wWidth);
			},
			removeApp :function (appCode,moduleId){//用于商城卸载给桌面发消息重绘桌面用
				var _this = this;
				var state = ExternalFun.removeAppById(moduleId,appCode);
				
				
				eval("state="+state);
				if(state.value=="true"){
					_this.removeAppComplete(appCode, moduleId);
				}
				//
			},
			uninstallApp :function (appCode,moduleId){//废纸篓卸载
			
				var _this = this;
				var state = ExternalFun.uninstallAppById(moduleId,appCode);
				
				//eval("state="+state);
				//if(state.value==='true'){
				//	
				//	$("#recycle_"+appCode).remove();
				//}
				//
			},removeAppComplete : function (appCode,moduleId){//从桌面删除图片重绘桌面
				var _this = this;
				vAppCache.removeApp(appCode, moduleId);
				var wHeight = $(window).height();
				var wWidth = $(window).width();
				_this.getAppPanel().drawModuleApps(vAppCache.getAppsByModuleId(moduleId),moduleId,wHeight,wWidth);
			},
			recycleApp : function (appCode,moduleId){
				var _this = this;
				var appJson = ExternalFun.recycleApp(moduleId, appCode);
				_this.recycleAppComplete(appJson,moduleId);
				$("#recycle_"+appCode).remove();
			},
			recycleAppComplete :function (appJson,moduleIndex){
				var _this = this;
				//var appJson = {id:moduleIndex+'_13',name:"我的项目",href:"http://www.baidu.com/",icon:"${ctx}/res/appstore_sys/img/app/my_project.png",moduleIndex:moduleIndex,index:13,state:2};
				var moduleSize = vAppCache.getModulesSize();
				var realAppJson = vAppCache.addApp(appJson, moduleIndex);
				var moduleId = realAppJson.moduleIndex;
				if(moduleSize != vAppCache.getModulesSize()){//当前模块不存在就创建新模块
					_this.getAppPanel().addAppContainer(moduleId);
				}
				
				var wHeight = $(window).height();
				var wWidth = $(window).width();
				_this.getAppPanel().drawModuleApps(vAppCache.getAppsByModuleId(moduleId),moduleId,wHeight,wWidth);
				_this.getNavBar().restSelf(wHeight,wWidth);
			},
			uninstallAppComplete : function(appCode) {
				// 从桌面卸载应用，删除废纸缕中的图标。添加该方法支持异步卸载
				$("#recycle_"+appCode).remove();
			}

			
	};
	/**
	 * 屏蔽掉桌面的右键功能
	 */
	var forbidContextmenu = function (){
		setTimeout(function () {
			$(document).bind("contextmenu", function(e){ return false; });
		}, 25);
		/*
		if (typeof(document.onselectstart) != "undefined") {        
		    // IE下禁止元素被选取        
			document.onselectstart = new Function("return false");        
		}
		*/
		//25毫秒主要是针对windows 系统中定是分辨率为15毫秒。
		
	};

	/**
	 *获得初始化方法列表
	 *可以通过改变顺序来先后初始化不同的某块，
	 *可以把数据量比较大的模块放到后面，
	 *以此来提高初始化速度。
	 */
	var getInitMethods = function (target){//目前针对destop专用，以后会扩展成通用的

		return [target.initLoginInfo,target.initLogout,/*target.initFeedback,*/target.getAppPanel().init,target.getNavBar().init,target.getPopDialog().init,target.initRecycle,target.initSpecialApp];
	};
	var getDelayInitMethods = function (target){//目前针对destop专用，以后会扩展成通用的

		return [target.getAppPanel().delayInit,target.getNavBar().delayInit,target.bindResizeEvent,target.resetSelf];
	};
	/**
	 * 执行一个方法列表
	 */
	var excuteMethods = function (methods,target){
		for (var i in methods) {
			var method = methods[i];
				method.call(target);
		}
		
	};
	 
	Desktop.prototype.constructor = Desktop;
	window.Desktop = Desktop;
})(jQuery,window);

