/**
 * author by liying for app cache
 */
(function ($,window){


	/**
	 * 这个类主要存储的是原生的app 对象
	 * 需要和后台进行交互，
	 * 基本的操作，例如
	 * 添加和删除一个新的应用。
	 * 目的是为了替换当前存在apppanel中的数组以达到数据和表现分离的目的
	 */

	function AppCache(){

		var modules={};//模块
	
		
		
		this.addModule = function (moduleId,apps){
			apps.sort(sortByIndex)
			modules[moduleId]=apps;
			return apps;
		};
		this.getModules = function (){
			return modules;
		};
		this.getAppsByModuleId = function(moduleId){
			return modules[moduleId];
		};
		this.getModulesSize = function (){
			var index = 0;
			for(var i in modules){
				index++;
			}
			return index;
		};
		
	}
	
	AppCache.prototype = {
		
			init : function() {
				var _this = this;
				var data = this.getData();
				for(var i in data){
					_this.addModule(data[i].moduleIndex,data[i].apps);//添加模块
				};

			},
			/**
			 * 获得所有服务器应用的数据，是一个无序的数组。
			 * @returns {Array}
			 */
			getData : function (){
				//state 2 表示更新 1 普通状态 3 表示删除
				return ExternalFun.getDesktopData();
				        	
				        	
					
			},
			getAppByAppIdAndModuleId : function (appCode,moduleId){
				var _this  = this;
				var apps = _this.getAppsByModuleId(moduleId);
				for(var i in apps){
					if(apps[i].id==appCode){
						return apps[i];
					}
					
				}
				return null;
			},
			/**
			 * 移除特定模块下的一个应用
			 * @param appCode
			 * @param moduleId
			 * @returns {Boolean}
			 */
			removeApp : function (appCode,moduleId){
				var _this = this;
				var apps = _this.getAppsByModuleId(moduleId);
				for(var i=0,len=apps.length;i<len;i++){
					if(apps[i].id == appCode){
						return apps.splice(i,1);
					}
				}
				return null;
			},
			/**
			 * 添加一个新的应用到cache中
			 * @param appJson
			 * @param moduleId
			 */
			addApp : function (appJson,moduleId){//服务器校验后前端也做一次校验如果当前已满就后移一位直到有空位

				
				var _this = this;
				var apps = _this.getAppsByModuleId(moduleId);
				if(!apps){//如果没有对应模块就创建一个新模块
					apps = _this.addModule(moduleId,[{id:moduleId+'_12',name:"添加应用",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/add_app.png",moduleIndex:moduleId,index:41,state:1}]);
					
				}
				
				if(apps.length>=Constants.ONE_PAANEL_APP_COUNT){//当前已满 后移一个
					
					return _this.addApp(appJson,moduleId+1);
				}else{
					appJson.moduleIndex = moduleId;
					apps.splice(apps.length-1,0,appJson);
				}
				return appJson;
			}

			
			
			
	};

	var sortByIndex = function (a,b){//排序的参数函数
		return a.index - b.index;

	};
	
	AppCache.prototype.constructor = AppCache;
	window.AppCache = AppCache;
})(jQuery,window);
