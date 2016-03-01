/**
 * author by liying for desktop
 */
var vAppCache = new AppCache();
vAppCache.init();
var desktop;
$(function (){

	desktop = new Desktop();
	$.log("destop初始化开始");
	desktop.init();
	$.log("destop初始化完成");
	
	vPopDialog = new PopDialog();

	desktop.setPopDialog(vPopDialog);
	
	
	
	var vAppPanel = new AppPanel();
	desktop.setAppPanel(vAppPanel);
	var vNavBar = new NavBar();
	desktop.setNavBar(vNavBar);
	
	
	desktop.initOthers();
	desktop.delayInit();
	
	/*$(".feedback_btn").bind("click.feedback",function (){//反馈
		var d = new D("feedback_dialog");
		d.modal({url:"dialog/feedback.html",dWidth:508,callBack:function (dialog){

			dialog.WDialog("destroy");
		}});
		d.dialog.find(".feedback_editor").focus();
	});*/
	

	
	
});