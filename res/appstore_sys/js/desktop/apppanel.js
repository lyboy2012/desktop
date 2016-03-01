/**
 * author by liying for apppanel
 */
(function ($,window){
	/**
	 * 应用面板期望的功能
	 * 添加app应用
	 * 移除一个app
	 * 支持右键菜单（级联菜单关闭最大化最小化等功能）
	 * @return
	 */


	function AppPanel(initObj){
		var appPanelDom;//面板的dom引用
		this.setAppPanelDom = function (dom){
			appPanelDom = dom;
		};
		this.getAppPanelDom = function (){
			return appPanelDom;
		};
		/**
		 * 注释掉说明：
		 * 由于在desktop中调用各个模块式以call的方式调用的，出入的this对象就为desktop本身
		*/
		var desktop=null;//给一个desktop的引用便于访问
		this.setDesktop = function (vDesktop){
			desktop = vDesktop;
		};
		this.getDesktop = function (){
			return desktop;
		};
		var state =0;//0 普通状态、1 编辑中 
		this.setState = function (vState){
			state = vState;
		};
		this.getState = function (){
			return state;
		};

		
		
	
	}
	
	AppPanel.prototype = {
			/**
			 * 初始应用面板页面
			 * 这个方法调用一定要注意，通过call方式调用已经改变的this对象
			 * @return
			 */
			init : function() {
				var desktop = this;//以desktop 作为this 传入，这样就拿到了desktop的引用
				var _this = desktop.getAppPanel();//目前这种调用方式感觉有些繁琐，主要原因是this改变的原有的对象
				_this.setDesktop(desktop);
		

			},
			delayInit : function (){
				var desktop = this;
				var _this = desktop.getAppPanel();
				var doms = initSelf();
				var appPanel = doms.appPanel;
				_this.setAppPanelDom(appPanel);

			},
			/**
			 * 通过window的宽高来重绘apppanel的宽高容
			 * @param wHeight
			 * @param wWidth
			 */
			resetSelf :function (wHeight,wWidth){//通过参数主要是为了减少计算window 宽高来提升性能
				var _this = this;
				var appPanel = _this.getAppPanelDom();
				appPanel.height(wHeight);
				appPanel.width(wWidth);
				var helper = appPanel.find(".app_panel_helper");
				helper.height(wHeight);
				var len = vAppCache.getModulesSize();
				helper.width(len*wWidth);
				helper.find(".app_container").height(wHeight);
				helper.find(".app_container").width(wWidth);
				

				var modules = vAppCache.getModules();
				for(var i in modules){
					_this.drawModuleApps(modules[i],i,wHeight,wWidth);
				}
				
				_this.scrollToCurrent(_this.getDesktop().getNavBar().getCurrentModule());
				appPanel.off('contextmenu.item').on("contextmenu.item",".app_item",function (event){//右键菜单
					event.stopPropagation();
					var index = $(this).data("app").index;
					if(index==41){
						return false;
					}
					var appCode = $(this).data("app").id;
					
					$.log("右键菜单");
					var popDialog = _this.getDesktop().getPopDialog();
					var html = _this.getPopMenuContent(appCode);
					popDialog.show(html,$(this));
					
					return false;
				});
				//绑定右键菜单
				_this.getDesktop().getPopDialog().getPopDom().off("click.menuClick").on("click.menuClick",".p_b_item",function (){
					var appCode = $(this).attr("app_code");
					
					var type = $(this).attr("type");
					if("open"==type){
						ExternalFun.openAppById(appCode);//打开应用
					}else if("update"==type){
						$("#app_item_"+appCode).find(".new_opt").trigger("click.new");
					}else if("delete"==type){
						$("#app_item_"+appCode).find(".del_opt").trigger("click.del");
						
					}else if("uninstall"==type){
						var moduleIndex= $(this).attr("module_index");
						_this.getDesktop().uninstallApp(appCode,moduleIndex);
					}
					else if("recycle"==type){
						var moduleId= $(this).attr("module_index");
						_this.getDesktop().recycleApp(appCode,moduleId)
						
					}
					$("#pop_dialog").hide();
				});
				
				
				
				
				
				
				
				//callback, time,otherCallback,clazz
				appPanel.longPress(function (){//左键长按
					$.log("长按点击");
					var index = $(this).data("app").index;
					if(index==41){
						return;
					}
					appPanel.find(".app_item").each(function (){
						var index = $(this).data("app").index;
						
						if(index!=41){//非添加按钮
							$(this).find(".new_opt").hide();
							$(this).find(".del_opt").show();
							_this.setState(1);
						}
					});
					U.isMouseDownInO('del_opt',function (){
						appPanel.find(".del_opt").hide();
						appPanel.find(".new_opt").show();
						_this.setState(0);
					},appPanel);
					
					
				},750,function (){
						var id = $(this).data("app").id;
						var index =$(this).data("app").index;
						var moduleIndex = $(this).data("app").moduleIndex;
						if(index==41){//添加应用
							 ExternalFun.openAppStore(moduleIndex);
							//_this.getDesktop().addApp(moduleIndex);
						}else{
							ExternalFun.openAppById(id);//打开应用
						}
				},'.app_item','del_opt','new_opt');
				appPanel.off('click.del').on("click.del",".del_opt",function (event){
					
					event.stopPropagation();					
					var id = $(this).attr("app_code");

					var moduleIndex= $(this).attr("module_index");
					_this.getDesktop().removeApp(id,moduleIndex);
					return false;
				});
				appPanel.off('click.new').on('click.new',".new_opt",function (event){
					
					event.stopPropagation();
					var id = $(this).attr("app_code");
					ExternalFun.updateAppById(id);//更新应用

					return false;
				});


			},
			getPopMenuContent : function (appCode){
				var html= '<div class="p_btns_panel" style="width:204;height:68px;">'+
								'<dl class="p_b_item" app_code="'+appCode+'" type="open">'+
									'<dt><img src="res/appstore_sys/img/desktop/open.png"/></dt>'+
									'<dd>打开</dd>'+
								'</dl>'+
								/*'<dl class="p_b_item" app_code="'+appCode+'" type="update">'+
									'<dt><img src="res/appstore_sys/img/desktop/update.png"/></dt>'+
									'<dd>更新</dd>'+
								'</dl>'+*/
								/*'<dl class="p_b_item">'+
									'<dt><img src="res/appstore_sys/img/app/diskexplorer.png"/></dt>'+
									'<dd>移动到</dd>'+
								'</dl>'+
								'<dl class="p_b_item">'+
									'<dt><img src="res/appstore_sys/img/app/diskexplorer.png"/></dt>'+
									'<dd>删除快捷</dd>'+
								'</dl>'+*/
								'<dl class="p_b_item" app_code="'+appCode+'" type="delete">'+
									'<dt><img src="res/appstore_sys/img/desktop/uninstall.png"/></dt>'+
									'<dd>删除</dd>'+
								'</dl>'+
							'</div>';

				return html;
			}
			,
			drawModuleApps : function(apps,moduleId,wHeight,wWidth){//画每个模块的下的app
				var _this  = this;
				var appPanel = _this.getAppPanelDom();
				var containerDom = appPanel.find(".app_container_"+moduleId);
				containerDom.empty();
				
				
				var lineSpace=20,columnSpace =20;//每个应用的行间距和列间距是固定的20px
				var lines = Math.floor((wHeight-64-lineSpace) / (Constants.APP_SIZE.height+lineSpace)); //可显示行数
				var columns = Math.floor((wWidth-73-columnSpace) / (Constants.APP_SIZE.width+columnSpace)); //可显示列数
				
				//初始值
				var line = 1,col = 1,top = 20,left = 20;
				
				var appItemDom='';
				var newHtml = '';
				var delHtml = '';

				for(var i in apps){
					if(lines==0){return;}//如果屏幕分辨率 一行都不够现实就不绘app直接跳出
					if(columns==0){return;}//如果屏幕分辨率 一列都不够现实就不绘app直接跳出
					if (col > columns) {//当列数自加后大于可显示的最大列就行数加一
						col = 1;
						left = 20;
						top += Constants.APP_SIZE.height + lineSpace;
						line++;
					}
					appItemDom = $('#app_item_'+apps[i].id);
					var state = _this.getState();
					//$.log(state);
					if(appItemDom.size()==0){
						if(apps[i].index!=41&&apps[i].state==2){
							if(state==1){
								newHtml = '<a href="javascript:;" class="new_opt" app_code="'+apps[i].id+'" style="display:none;"></a>';
							}else{
								newHtml = '<a href="javascript:;" class="new_opt" app_code="'+apps[i].id+'" style="display:inline;"></a>';
								
							}
							
						}else{
							newHtml='';
						}
						
						if(apps[i].index!=41){
							if(state==1){
								delHtml = '<a href="javascript:;" class="del_opt" app_code="'+apps[i].id+'" module_index="'+moduleId+'" style="display:inline;"></a>';
								
							}else{
								delHtml = '<a href="javascript:;" class="del_opt" app_code="'+apps[i].id+'" module_index="'+moduleId+'" style="display:none;"></a>';
							}
							
						}else{
							delHtml='';
						}
						
						
						appItemDom = $('<div class="app_item" id="app_item_'+apps[i].id+'">'+
								'<div class="app_item_icon">'+
								delHtml+
								newHtml+
							    '<img src="'+apps[i].icon+'" >'+
							    '</div>'+
							    '<div class="app_item_name">'+
									'<span class="font_info">'+apps[i].name+'</span>'+
									'<span>'+apps[i].name+'</span>'+
							    
							    '</div>'+
						    '</div>');
						appItemDom.appendTo(containerDom);
					}
					appItemDom.data("app",apps[i]);
					//appItemDom.data("moduleIndex",moduleId);
					
					
					appItemDom.css({
						left : left,
						top : top
					});
					left += Constants.APP_SIZE.width+columnSpace;
					col++;
					
					
				}

				
			},

			
			scrollToCurrent : function (index){
				var width = $(window).width();
				width = (index-1)*width;
				
				$('.app_panel_helper').stop(true,true).animate({left: -width+30}, 350,function (){
					$(this).animate({left: -width-30}, 250,function (){
						$(this).animate({left: -width}, 250,function (){
							
						});
					});
				});
			},
			addAppContainer:function (moduleIndex){
				
				var _this = this;
				
				var helper = _this.getAppPanelDom().find("#app_panel_helper");
				helper.append(U.getTarget({type:"div",clazz:["app_container","app_container_"+moduleIndex]}));
			}
			
		
			
	};
	
		

	var sortAppByIndex = function (a,b){//排序的参数函数
		return a.getIndex() - b.getIndex();

	};
	var initSelf = function (){//这个方法存在的问题是绑定的特定的class，但是这个完全可以通过class 制定解决改变不同样式问题
		//初始化apppanel 页面渲染
		var target = getTarget("div","app_panel").attr("id","app_panel"); 
		var helper = getTarget("div","app_panel_helper").attr("id","app_panel_helper"); 
		//初始化需要根据不同模块添加不同的应用面板
		var modules = vAppCache.getModules();
		for(var i in modules){
			helper.append(U.getTarget({type:"div",clazz:["app_container","app_container_"+i]}));
			
		}
		
		target.append(helper);
		target.appendTo('body');
		
		return {appPanel:target};
	};
	var getTarget = function (type,clazz){
		 return $("<"+type+"/>").addClass(clazz);
	};
	
	AppPanel.prototype.constructor = AppPanel;
	window.AppPanel = AppPanel;
})(jQuery,window);
