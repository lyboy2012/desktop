(function (window,$){
	window.ExternalFun = {
			closeDesktopWindow : function (){//关闭桌面窗口
				if(window.external.closeDesktopWindow){
					window.external.closeDesktopWindow();
				}
				$.log("关闭桌面窗口！");
			},
			openAppStore:function (moduleIndex){//打开应用商城
				if(window.external.openAppStore){
					window.external.openAppStore(moduleIndex);
				}else{
					alert("打开商城");
				}
				$.log("打开应用商城！"+moduleIndex);
				
			},
			getDesktopData:function (){
				var result;
				if(window.external.getDesktopData){
					result =  window.external.getDesktopData();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
					
				}
				return [
					
							{
								moduleIndex:1,
								apps:[
								{id:'1_12',name:"添加应用",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/add_app.png",moduleIndex:1,index:41,state:1},
										{id:'1_1',name:"审计热点新闻",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/audit_hot_news.png",moduleIndex:1,index:0,state:2},
										{id:'1_2',name:"财务数据采集",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/collection_data.png",moduleIndex:1,index:1,state:1},
										{id:'1_3',name:"word2pdf",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/word2pdf.png",moduleIndex:1,index:2,state:1},
										{id:'1_4',name:"云笔记",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/cloud_note.png",moduleIndex:1,index:3,state:1},
										{id:'1_5',name:"云经验库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/experience.png",moduleIndex:1,index:4,state:1},
										{id:'1_6',name:"模版大全",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/template_all.png",moduleIndex:1,index:5,state:1},
										{id:'1_7',name:"底稿管理",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/paper_manager.png",moduleIndex:1,index:6,state:1},
										{id:'1_8',name:"法规库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/laws.png",moduleIndex:1,index:7,state:1},
										{id:'1_9',name:"万元表转换",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:1,index:8,state:2}
										
								     ]
							},
							{
								moduleIndex:2,
								apps:[
										{id:'2_1',name:"审计热点新闻",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/audit_hot_news.png",moduleIndex:2,index:0,state:1},
										{id:'2_2',name:"财务数据采集",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/collection_data.png",moduleIndex:2,index:1,state:1},
										{id:'2_3',name:"word2pdf",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/word2pdf.png",moduleIndex:2,index:2,state:1},
										{id:'2_4',name:"云笔记",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/cloud_note.png",moduleIndex:2,index:3,state:1},
										{id:'2_5',name:"云经验库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/experience.png",moduleIndex:2,index:4,state:1},
										{id:'2_6',name:"模版大全",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/template_all.png",moduleIndex:2,index:5,state:1},
										{id:'2_7',name:"底稿管理",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/paper_manager.png",moduleIndex:2,index:6,state:1},
										{id:'2_8',name:"法规库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/laws.png",moduleIndex:2,index:7,state:2},
										{id:'2_9',name:"万元表转换",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:2,index:8,state:1},
										{id:'2_12',name:"添加应用",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/add_app.png",moduleIndex:2,index:41,state:1}
								     ]
							},
							{
								moduleIndex:3,
								apps:[
										{id:'3_1',name:"审计热点新闻",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/audit_hot_news.png",moduleIndex:3,index:0,state:2},
										{id:'3_2',name:"财务数据采集",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/collection_data.png",moduleIndex:3,index:1,state:1},
										{id:'3_3',name:"word2pdf",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/word2pdf.png",moduleIndex:3,index:2,state:1},
										{id:'3_4',name:"云笔记",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/cloud_note.png",moduleIndex:3,index:3,state:1},
										{id:'3_5',name:"云经验库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/experience.png",moduleIndex:3,index:4,state:1},
										{id:'3_6',name:"模版大全",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/template_all.png",moduleIndex:3,index:5,state:1},
										{id:'3_7',name:"底稿管理",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/paper_manager.png",moduleIndex:3,index:6,state:1},
										{id:'3_8',name:"法规库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/laws.png",moduleIndex:3,index:7,state:1},
										{id:'3_9',name:"万元表转换",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:3,index:8,state:2},
										{id:'3_12',name:"添加应用",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/add_app.png",moduleIndex:3,index:41,state:1}
								     ]
							},
							{
								moduleIndex:4,
								apps:[
										{id:'4_1',name:"审计热点新闻",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/audit_hot_news.png",moduleIndex:4,index:0,state:2},
										{id:'4_2',name:"财务数据采集",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/collection_data.png",moduleIndex:4,index:1,state:1},
										{id:'4_3',name:"word2pdf",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/word2pdf.png",moduleIndex:4,index:2,state:1},
										{id:'4_4',name:"云笔记",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/cloud_note.png",moduleIndex:4,index:3,state:1},
										{id:'4_5',name:"云经验库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/experience.png",moduleIndex:4,index:4,state:1},
										{id:'4_6',name:"模版大全",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/template_all.png",moduleIndex:4,index:5,state:2},
										{id:'4_7',name:"底稿管理",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/paper_manager.png",moduleIndex:4,index:6,state:1},
										{id:'4_8',name:"法规库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/laws.png",moduleIndex:4,index:7,state:1},
										{id:'4_9',name:"万元表转换",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:4,index:8,state:1},
										{id:'4_12',name:"添加应用",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/add_app.png",moduleIndex:4,index:41,state:1}
								     ]
							},
							{
								moduleIndex:5,
								apps:[
										{id:'5_1',name:"审计热点新闻",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/audit_hot_news.png",moduleIndex:5,index:0,state:2},
										{id:'5_2',name:"财务数据采集",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/collection_data.png",moduleIndex:5,index:1,state:1},
										{id:'5_3',name:"word2pdf",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/word2pdf.png",moduleIndex:5,index:2,state:1},
										{id:'5_4',name:"云笔记",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/cloud_note.png",moduleIndex:5,index:3,state:1},
										{id:'5_5',name:"云经验库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/experience.png",moduleIndex:5,index:4,state:1},
										{id:'5_6',name:"模版大全",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/template_all.png",moduleIndex:5,index:5,state:2},
										{id:'5_7',name:"底稿管理",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/paper_manager.png",moduleIndex:5,index:6,state:1},
										{id:'5_8',name:"法规库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/laws.png",moduleIndex:5,index:7,state:1},
										{id:'5_9',name:"万元表转换",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:5,index:8,state:1},
										{id:'5_12',name:"添加应用",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/add_app.png",moduleIndex:5,index:41,state:1}
								     ]
							}
					
						];
			},
			removeAppById : function (moduleIndex,appCode){//index, appid, uninstall
				if(window.external.removeAppById){
					return window.external.removeAppById(moduleIndex, appCode, 0);
				}
				$.log("删除应用"+appCode);
				return '{"errcode":"","errmsg":"","value":"true"}';
			},
			recycleApp:function (moduleIndex, appCode){
				var result;
				if(window.external.platform_recovery_appicon){
					result = window.external.platform_recovery_appicon(moduleIndex, appCode);
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return {id:'1_10',name:"万元表转换",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:1,index:9,state:1}
				}
				
			}
			,
			uninstallAppById : function (moduleIndex,appCode){//index, appid, uninstall
				if(window.external.removeAppById){
					return window.external.removeAppById(moduleIndex, appCode, 1);
				}
				$.log("卸载应用"+appCode);
				return '{"errcode":"","errmsg":"","value":"true"}';
			},
			uninstallAppById_1 : function (appCode){
				if(window.external.uninstallAppById){
					window.external.uninstallAppById(appCode);
				}
			},
			getAllRecycleApps:function (){
				var result;
				if(window.external.platform_get_recycle_bin_data){
					result = window.external.platform_get_recycle_bin_data();
					eval("result="+result);
					return result.value;
				}else{
					return [{id:'1_12',name:"添加应用",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/add_app.png",moduleIndex:1,index:41,state:1},
										{id:'1_1',name:"审计热点新闻",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/audit_hot_news.png",moduleIndex:1,index:0,state:2},
										{id:'1_2',name:"财务数据采集",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/collection_data.png",moduleIndex:1,index:1,state:1},
										{id:'1_3',name:"word2pdf",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/word2pdf.png",moduleIndex:1,index:2,state:1},
										{id:'1_4',name:"云笔记",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/cloud_note.png",moduleIndex:1,index:3,state:1},
										{id:'1_5',name:"云经验库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/experience.png",moduleIndex:1,index:4,state:1},
										{id:'1_6',name:"模版大全",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/template_all.png",moduleIndex:1,index:5,state:1},
										{id:'1_7',name:"底稿管理",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/paper_manager.png",moduleIndex:1,index:6,state:1},
										{id:'1_8',name:"法规库",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/laws.png",moduleIndex:1,index:7,state:1},
										{id:'1_9',name:"万元表转换",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:1,index:8,state:2},
										{id:'1_10',name:"测试1",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:1,index:9,state:2},
										{id:'1_11',name:"测试1",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:1,index:10,state:2},
										{id:'1_12',name:"测试1",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:1,index:11,state:2},
										{id:'1_13',name:"测试1",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/transform.png",moduleIndex:1,index:12,state:2}
										
								     ];
				}
				
			},
			getSpecialApps:function (){
				var result;
				if(window.external.getSpecialApps){
					result = window.external.getSpecialApps();
					eval("result="+result);
					
					return result.value[0];
				}else{
					return {id:'1_33',name:"大数据查询",href:"http://www.baidu.com/",icon:"res/appstore_sys/img/app/template_all.png",moduleIndex:1,index:41,state:1};
				}
				
			},updateAppById : function (appCode){
				if(window.external.updateAppById){
					window.external.updateAppById(appCode);
				}
				$.log("更新"+appCode);
			},
			openAppById:function (appCode){
				if(window.external.openAppById){
					window.external.openAppById(appCode);
				}
				$.log("打开应用"+appCode);
			},
			downLoadByUrl:function (url,appCode,appName,appType,flag){
				
				if(window.external.downLoadByUrl){
					if(flag){
						window.external.downLoadByUrl(url,appCode,appName,appType,"1");
					}else{
						window.external.downLoadByUrl(url,appCode,appName,appType,"2");
					}
					
				}
				
			/*	var i=0;
				var timer = setInterval(function (){
					i++;
					storeDownLoad(appId,i);
					if(i>=100){
						clearInterval(timer);
					}
				},100);*/
				
				$.log("下载"+appCode);
			}
			,
			feedBackDesktop : function (){
				if(window.external.feedBackDesktop){
					window.external.feedBackDesktop();
				}
				$.log("反馈");
			},
			checkInstallInfo : function (appCode,appName,version){
				var result;
				if(window.external.CheckInstallState){
					result = window.external.CheckInstallState(appCode,appName,version);
					eval("result="+result);
					return result.value;
				}
				//Math.random()*(n-m)+m  m-n直接数字
				//return Math.floor(Math.random()*3);
				return Constants.APP_BTN_STATE.DOWNLOAD;
				$.log("检查安装状态");
			},installAppById : function (appCode){
				if(window.external.installAppById){
					window.external.installAppById(appCode);
				}
				$.log("安装");
				
			},getAllAppInstallID : function (){
				var result;
				if(window.external.GetAllAppInstallID){
					result  =window.external.GetAllAppInstallID();
					eval("result="+result);

					var appIds = result.value.split(",")
					return appIds;
				}else{
					return ['4028e4c842352f560142355497630002','4028e4c84244e3fe014244f75b770002','4028e4c84226cef7014226d5ed6f0002'];
				}
				$.log("获得所有id");
				
			},checkAppVersion :function(appCode){
				if(window.external.checkAppVersion){
					return window.external.checkAppVersion(appCode);
				}
				
			},pauseDownLoad:function (appCode,appName,appType){//暂停下载
				if(window.external.pauseDownLoad){
					window.external.pauseDownLoad(appCode,appName,appType);
				}
			},
			cancelDownLoad:function (appCode,appName,appType){//取消下载
				if(window.external.cancelDownLoad){
					window.external.cancelDownLoad(appCode,appName,appType);
				}
			},
			login:function (usrName,pwd){
			/*
			来自服务器
			0,"用户名不能为空"
			1,"用户密码不能为空"
			2,"用户名不能重复"
				
			3,"用户名错误"
			4,"密码错误"
			5,"验证码错误"
				
			6,"服务器错误"
			*/
				var result;
				if(window.external.platform_login){
					
					result = window.external.platform_login(usrName,pwd);
					eval("result="+result);
					//alert(result.errcode);
					if(result.errcode==1){
						return {state:1 ,user :result.value};//登录成功
					}else if(result.errcode==-5){
						return {state:4};//服务器连接失败
					}else if(result.errcode==0){
						//alert(result.value.errcode);
						if(result.value.errcode==3){//用户名错误
							return {state:2};
						}else if(result.value.errcode==4){//密码错误
							return {state:3};
						}else if(result.value.errcode==7){
							return {state:5};
						}else{
							return {state:-1};
						}
					}else{
						return {state:-1};
					}

				}
			
				return {state:1};
				
				
				
				$.log("登录");
			},
			reg:function (usrName,pwd){

				var result;
				if(window.external.platform_register_user){
					result = window.external.platform_register_user(usrName,pwd);
					eval("result="+result);
					if(result.errcode==1){
						return {state:1,user:result.value};//注册成功
					}else if(result.errcode==-6){
						return {state:4};//服务器连接失败
					}else if(result.errcode==0){

						if(result.value.errcode==2){//用户名重复
							return {state:2};
						}else{
							return {state:-1};
						}
					}else{
						return {state:-1};
					}
				}
				
				return {state:1}
			
				$.log("注册");
			},
			isLogin:function (){
				//return {status:true,username:"张会计员"};
				var result;
				if(window.external.platform_get_sid){

					
					result  = window.external.platform_get_sid();
					eval("result="+result);

					if(result.errcode==0){
						
							result.value.status=true;
						

						return result.value;
					}else{
						return {status:false,username:"1111"};
					}
					
				}else{
					return {status:true,username:"张会计员"};
				}
				
			
			},
			logout:function (){
				if(window.external.platform_logout){
					result = window.external.platform_logout();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}else{
						return false;
					}
					
				}else{
					return true;
				}
				
			},
			getUserSId : function (){
				var result;
				//alert(window.external.platform_get_sid);
				if(window.external.platform_get_sid){
					result  = window.external.platform_get_sid();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return {sid:"45b0a6318b4dc04ef347e326d18e740c3ae265dcdc75ac479bbe1235884471e467e7fe49fdec486e903a6ed90e9993f7f980d7aee02bf0c9bcd815a56c4affd41393791966f1823c7e6754a41911f0c2108b5e64f2fad039ec93df5f0a69d6671bfc9bd78c28e2f9"};
				}
				
			}
			
			,
			getVersion : function (){
				var result;
				if(window.external.getVersion){
					result  = window.external.getVersion();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return "1.1.1.0";
				}
				
			},
			getNeedInstallSoftWare : function (appCode){
				var result;
				if(window.external.CheckMustBeInstallSoftware){
					result  = window.external.CheckMustBeInstallSoftware(appCode);
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return "测试显示";
				}
				
			}
			
			,
			openAppDir:function (appCode){

				if(window.external.openAppDir){
					window.external.openAppDir(appCode);
					
				}else{
					//alert("打开目录");
				}
			},
			setJsessionId:function (jseessionId){
				if(window.external.platform_set_jsessionid){
					window.external.platform_set_jsessionid(jseessionId);
				}else{
					//alert("打开目录");
				}
			},
			isVirtualMachine : function (){
		
				
				var result;
				if(window.external.isVirtualMachine){
					result  = window.external.isVirtualMachine();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return 'false';
				}
			},
			isUsbToken : function (){
			
				var result;
				if(window.external.isUsbToken){
					result  = window.external.isUsbToken();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return 'false';
				}
			
			},setBackgroundImage: function (clazz){
				if(window.external.setBackgroundImage){
					window.external.setBackgroundImage(clazz);
				}
				
			
			},getBackgroundList:function(){
				var result;
				if(window.external.getBackgroundList){
					result  = window.external.getBackgroundList();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return [{"bg":"bg1.jpg","path":"res/appstore_sys/img/bg/bg1.jpg","thumb":"res/appstore_sys/img/bg/bg1.jpg"},{"bg":"bg2.jpg","path":"res/appstore_sys/img/bg/cloud.jpg","thumb":"res/appstore_sys/img/bg/cloud.jpg"}];
				}
			},
			deleteBackground:function (bg){
				var result;
				if(window.external.deleteBackground){
					result  = window.external.deleteBackground(bg);
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return "true"
				}
			
			},getBackgroundImage:function (){
				var result;
				if(window.external.getBackgroundImage){
					result  = window.external.getBackgroundImage();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
					
				}else{
					return "res/appstore_sys/img/bg/bg1.jpg";
				}
			},setBackgroundImage:function(path){
				var result;
				if(window.external.setBackgroundImage){
					result  = window.external.setBackgroundImage(path);
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return "true"
				}
			},addBackground:function (){
				var result;
				if(window.external.addBackground){
					result  = window.external.addBackground();
					eval("result="+result);
					if(result.errcode==0){
						return result.value;
					}
				}else{
					return {"bg":"bg1.jpg","path":"res/appstore_sys/img/bg/bg1.jpg","thumb":"res/appstore_sys/img/bg/bg1.jpg"};
				}
			}
			
						
	};
	
	function getJsonByString(jsonStr){
		//jsonStr
	}
	
})(window,jQuery);
/*
 * 
*/