//author by liying  for weeon dialog 

(function ($,window){

	function Dialog(id){
		
		if(!$("#w_dialog_container").size()>0){
			var container = $('<div id="w_dialog_container"></div>').appendTo("body"); 
			
		}else{ 
			var container = $("#w_dialog_container");
		} 
		this.container = container;
		var dialogId = id;
		
		if(!$("#"+dialogId).size()>0){
			$('<div id="'+dialogId+'" class="dialog_w"></div>').appendTo(container);
		}else{
			$("#"+dialogId).WDialog("destroy");
			$('<div id="'+dialogId+'" class="dialog_w"></div>').appendTo(container);
		}
		this.dialog = $("#"+dialogId);
		
	}
	
	Dialog.prototype = {
		modal:  function (parms){
			var _this = this;
			var url = parms.url;
			var dWidth = parms.dWidth || 378;
			var dialog = _this.dialog;
			dialog.WDialog(
					{
						modal:true,//模式对话框（显示遮罩层）
						remote:true,//远程调用html 页面
						url:url,//远程调用的html 地址
						dWidth:dWidth,
						confirmCallBack:function (){
							if(parms.callBack){
								parms.callBack(dialog);
							}else{
									dialog.WDialog("destroy");
							}
						},
						cancelCallBack:function (){
							if(parms.cancelCallBack){
								parms.cancelCallBack(dialog);
							}else{
								dialog.WDialog("destroy");
							}
						}
					
					});	

			dialog.WDialog("open");
		},
			localModal : function (parms){
				var _this = this;
				var dialog = _this.dialog;
				var dWidth = parms.dWidth || 378;
				var content = parms.content;
				dialog.WDialog(
						{
							modal:true,//模式对话框（显示遮罩层）
							//remote:true,//远程调用html 页面
							//url:url,//远程调用的html 地址
							dWidth:dWidth,
							content:content,
							confirmCallBack:function (){
								if(parms.callBack){
									parms.callBack(dialog);
								}else{
									dialog.WDialog("destroy");
								}
									
							},
							cancelCallBack:function (){
								if(parms.cancelCallBack){
									parms.cancelCallBack(dialog);
								}else{
									dialog.WDialog("destroy");
								}
							}
						
						});	

				dialog.WDialog("open");	
			}
	}
	window.D  = Dialog;
})(jQuery,window);

