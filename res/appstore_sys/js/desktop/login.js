(function ($,window){
	
	window.initLogin = function(){//登录初始化
	
	
	
	
	if($("#reg_dialog").size()>0){
		$("#reg_dialog").WDialog("destroy");
	}
	if($("#login_dialog").size()>0){
		return;
	}
	
	
	
		 var d = new D("login_dialog");
			d.modal({url:"dialog/login.html",callBack:function (dialog){
				var usrNameDom = dialog.find("#usr_name");
				var usrName = usrNameDom.val();
				var pwdDom = dialog.find("#usr_pwd");
				var pwd = pwdDom.val();
	
				if(isEmpty(usrName,usrNameDom.next(".d_l_error"),"请输入用户名")){
					return;
				}
				
				if(!checkUsrName(usrName,usrNameDom.next(".d_l_error"))){
					return ;
				}
				if(isEmpty(pwd,pwdDom.next(".d_l_error"),"请输入密码")){
					return;
				}
				if(!checkPwd(pwd,pwdDom.next(".d_l_error"))){
					return ;
				}
				
				$.log(usrName+" "+pwd);
				var result = ExternalFun.login(usrName,pwd);
				//alert(result.state);
				if(result.state==1){
					
					usrNameDom.hide();
					pwdDom.hide();
					dialog.WDialog("destroy");

					$($(".login_user_info").find(".login_btn").get(0)).text(result.user.userName);
		
					$(".login_user_info").find(".login_opt_btn").removeClass("login_opt_btn");
					$(".login_user_info").find(".logout_btn").show();
				}else if(result.state==2){
					usrNameDom.next(".d_l_error").text("用户名错误").show();
					pwdDom.next(".d_l_error").hide();
				}else if(result.state==3){
					pwdDom.next(".d_l_error").text("密码错误").show();
					usrNameDom.next(".d_l_error").hide();
				}else if(result.state==4){
					dialog.WDialog("destroy");
					alert("连接服务器失败，请检查网络情况！")
				}else if(result.state==5){
					pwdDom.next(".d_l_error").text("您无此权限，如有疑问请联系管理员").show();
					
					
				}else{
					dialog.WDialog("destroy");
					alert("服务器繁忙请稍后再试！")
				}
				
			},cancelCallBack:function(dialog){
				
				var result = ExternalFun.login("guest","123456");

				if(result.state==1){

					dialog.WDialog("destroy");
					$(".login_user_info").find(".login_opt_btn").removeClass("login_opt_btn").text(result.user.userRealName);
					$(".login_user_info").find(".logout_btn").show();
				}else if(result.state==2){
					alert("用户名错误");
				
				}else if(result.state==3){
					alert("密码错误");
					
				}else if(result.state==4){
					dialog.WDialog("destroy");
					alert("连接服务器失败，请检查网络情况！")
				}else{
					dialog.WDialog("destroy");
					alert("服务器繁忙请稍后再试！")
				}
					
			}});
			d.dialog.find("#usr_pwd").bind("keydown.login",function (e){
			
				if (e.keyCode == 13) {
					e.preventDefault();
					d.dialog.find('.w_d_confirm').trigger("click")
					 
					return false;
				}
					
			});

			d.dialog.find("#free_reg").bind("click",function (){//免费注册点击
				d.dialog.WDialog("destroy");
				initReg();
				
			});
			
			d.dialog.find(".d_l_label").off('mousedown.login').on("mousedown",".hint_info",function(){
				  $(this).next("input").trigger("focus.login")
			});
			
			d.dialog.find(".d_l_label").off('focus.login').on("focus.login","input",function(){
				var label = $(this).closest(".d_l_label");
				label.addClass("d_l_label_o");
				$(this).prev(".hint_info").hide();
				
				
			}).off('blur.login').on("blur.login","input",function(){
				var label = $(this).closest(".d_l_label");
				label.removeClass("d_l_label_o");
				if(!$.trim($(this).val())){
					$(this).prev(".hint_info").show();
				}
				
			});
	};
	
	function isEmpty(value,errorDom,errorMsg){
		
		if($.trim(value)==""){
			errorDom.text(errorMsg).show();
			return true;
			
		}else{
			errorDom.text("").hide();
			return false;
		}
	}
	function checkUsrName(value,errorDom){
		  var reg = /^[0-9a-zA-Z_]{6,20}$/i;
		  if(!reg.test(value)){
			errorDom.text("必须由[6-20]个字符、数字或'_'组成").show();
			return false;
		  }
		  errorDom.text("").hide();
		  return true;
	}
	function checkPwd(value,errorDom){
		  var reg = /^[0-9a-zA-Z]{6,20}$/i;
		  if(!reg.test(value)){
			errorDom.text("必须由[6-20]个字符、数字").show();
			return false;
		  }
		  errorDom.text("").hide();
		  return true;
	}
	
	//-------------------------------------------
	window.initReg=function(){//注册
	if($("#reg_dialog").size()>0){
		return;
	}
		 var d = new D("reg_dialog");
			d.modal({url:"dialog/reg.html",callBack:function (dialog){
				
				var usrNameDom = dialog.find("#input_name");
				var usrName = usrNameDom.val();
				var pwdDom = dialog.find("#input_pwd");
				var pwd = pwdDom.val();
				var confirmDom = dialog.find("#confirm_pwd");
				var comfirmPwd = confirmDom.val();
				
	
				if(isEmpty(usrName,usrNameDom.next(".d_l_error"),"请输入用户名")){
					return;
				}
				if(!checkUsrName(usrName,usrNameDom.next(".d_l_error"))){
					return ;
				}
				
				if(isEmpty(pwd,pwdDom.next(".d_l_error"),"请输入密码")){
					return;
				}
				if(!checkPwd(pwd,pwdDom.next(".d_l_error"))){
					return ;
				}
				if(isEmpty(comfirmPwd,confirmDom.next(".d_l_error"),"请确认密码")){
					return;
				}
				
				if($.trim(pwd)!=$.trim(comfirmPwd)){
					confirmDom.next(".d_l_error").text("两次输入密码不一致").show();
					confirmDom.val("");
					return;
					
				}else{
					confirmDom.next(".d_l_error").text("").hide();
				}
				
				var result = ExternalFun.reg(usrName,pwd);
				
				if(result.state==1){
					usrNameDom.hide();
					pwdDom.hide();
					confirmDom.hide();
					dialog.WDialog("destroy");
					
					$(".login_user_info").find(".login_opt_btn").removeClass("login_opt_btn").text(result.user.userName);
					$(".login_user_info").find(".logout_btn").show();
					
				}else if(result.state==2){

					usrNameDom.next(".d_l_error").text("用户重复").show();
					//pwdDom.hide();
					confirmDom.next(".d_l_error").hide();
					
				}else if(result.state==4){
					dialog.WDialog("destroy");
					alert("连接服务器失败，请检查网络情况！")
				}else{
					dialog.WDialog("destroy");
					alert("服务器繁忙请稍后再试！")
				}
				
				
			}});
			
			
			d.dialog.find("#confirm_pwd").bind("keydown.reg",function (e){
			
				if (e.keyCode == 13) {
					e.preventDefault();
					d.dialog.find('.w_d_confirm').trigger("click")
					 
					return false;
				}
					
			});
			d.dialog.find(".d_l_label").off('mousedown.reg').on("mousedown",".hint_info",function(){
				  $(this).next("input").trigger("focus.reg")
			});
			d.dialog.find("#login_now").bind("click",function (){//免费注册点击
				d.dialog.WDialog("destroy");
				initLogin();
				
			});
			
			d.dialog.find(".d_l_label").off('focus.reg').on("focus.reg","input",function(){


				var label = $(this).closest(".d_l_label");
				label.addClass("d_l_label_o");
				$(this).prev(".hint_info").hide();
				
				
			}).off('blur.reg').on("blur.reg","input",function(){
				var label = $(this).closest(".d_l_label");
				label.removeClass("d_l_label_o");
				if(!$.trim($(this).val())){
					$(this).prev(".hint_info").show();
				}
				
			});
	};
	
	//var isLoginState = ExternalFun.isLogin();

	//if(!isLoginState.status){
	//	initLogin();
	//}
	 //
	
	 
	 
	
})(jQuery,window);


function usbCallBack(userName){

	$($(".login_user_info").find(".login_btn").get(0)).text(userName);

	$(".login_user_info").find(".login_opt_btn").removeClass("login_opt_btn");
	$(".login_user_info").find(".logout_btn").show();
}