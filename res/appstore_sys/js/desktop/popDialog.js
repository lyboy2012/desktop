/**
 * author by liying for pop dialog
 */
(function ($,window){
	/**
	 * 每个应用右键先出现操作功能框
	 *
	 * */


	function PopDialog(initObj){
		var popDom;//
		this.setPopDom= function (dom){
			popDom = dom;
		};
		this.getPopDom = function (){
			return popDom;
		};
		var desktop = false;//给一个desktop的引用便于访问
		this.setDesktop = function (vDesktop){
			desktop = vDesktop;
		};
		this.getDesktop = function (){
			return desktop;
		};
	}
	
	PopDialog.prototype = {
			/**
			 * 初始化任务栏
			 * @return
			 */
			init : function() {
				var desktop = this;//以desktop 作为this 传入，这样就拿到了desktop的引用
				var _this = desktop.getPopDialog();//目前这种调用方式感觉有些繁琐，主要原因是this改变的原有的对象
				_this.setDesktop(desktop);
				var container = initSelf();
				_this.setPopDom(container);
				_this.bindEvent();

			},
			show : function (html,dom){
				var _this = this;
				var popDialog = _this.getPopDom();
				var content = popDialog.find(".p_m_center");
				
				content.html(html);//测试的时候注释掉，真正用的时候需要把注释去掉
				popDialog.show();
				var btnsPanle = content.find(".p_btns_panel");
				var height = btnsPanle.height();
				var width = btnsPanle.width();

				content.height(height);
				content.width(width);
				
				popDialog.width(width+32);
				popDialog.find(".p_m_t_b").width(width);
				popDialog.find(".p_m_l_r,.p_m_content").height(height);

				
				
				var pos = _this.calculatArrowPosition(popDialog,dom,height+32,width+32);
				//所有与箭头相关的清零
				popDialog.find(".pop_arrow").hide();
				var tBRest = popDialog.find(".p_m_t_b>.p_m_t_b_bg");
		
				$(tBRest.get(0)).width(width);
				$(tBRest.get(1)).width(0);
				$(tBRest.get(2)).width(width);
				$(tBRest.get(3)).width(0);
				
				
				var lRRest = popDialog.find(".p_m_l_r>.p_m_l_r_bg");
				$(lRRest.get(0)).height(height);
				$(lRRest.get(1)).height(0);
				$(lRRest.get(2)).height(height);
				$(lRRest.get(3)).height(0);
				
				
				if(pos == Constants.LEFT_TOP){//左上
					var lRBg = popDialog.find(".p_m_left").find(".p_m_l_r_bg");
					$(lRBg.get(0)).height(10);
					$(lRBg.get(1)).height(height-27);
					popDialog.find(".p_m_left").find(".pop_arrow").show();

				}else if(pos == Constants.LEFT_BOTTOM){//左下
					var lRBg = popDialog.find(".p_m_left").find(".p_m_l_r_bg");
					$(lRBg.get(0)).height(height-27);
					$(lRBg.get(1)).height(10);
					popDialog.find(".p_m_left").find(".pop_arrow").show();
				}else if(pos == Constants.TOP_LEFT){//上左
					var tbBg = popDialog.find(".p_m_top").find(".p_m_t_b_bg");
					$(tbBg.get(0)).width(10);
					$(tbBg.get(1)).width(width-27);
					popDialog.find(".p_m_top").find(".pop_arrow").show();
				}else if(pos == Constants.TOP_RIGHT){//上右
					var tbBg = popDialog.find(".p_m_top").find(".p_m_t_b_bg");
					$(tbBg.get(0)).width(width-27);
					$(tbBg.get(1)).width(10);
					popDialog.find(".p_m_top").find(".pop_arrow").show();
				}else if(pos == Constants.RIGHT_TOP){//右上
					var lRBg = popDialog.find(".p_m_right").find(".p_m_l_r_bg");
					$(lRBg.get(0)).height(10);
					$(lRBg.get(1)).height(height-27);
					popDialog.find(".p_m_right").find(".pop_arrow").show();
				}else if(pos == Constants.RIGHT_BOTTOM){//右下
					var lRBg = popDialog.find(".p_m_right").find(".p_m_l_r_bg");
					$(lRBg.get(0)).height(height-27);
					$(lRBg.get(1)).height(10);
					popDialog.find(".p_m_right").find(".pop_arrow").show();
				}else if(pos == Constants.BOTTOM_LEFT){//下左
					var tbBg = popDialog.find(".p_m_bottom").find(".p_m_t_b_bg");
					$(tbBg.get(0)).width(10);
					$(tbBg.get(1)).width(width-27);
					popDialog.find(".p_m_bottom").find(".pop_arrow").show();
				}else if(pos == Constants.BOTTOM_RIGHT){//下右
					var tbBg = popDialog.find(".p_m_bottom").find(".p_m_t_b_bg");
					$(tbBg.get(0)).width(width-27);
					$(tbBg.get(1)).width(10);
					popDialog.find(".p_m_bottom").find(".pop_arrow").show();
				}

				
			},
			
			
			calculatArrowPosition : function(popDialog,target,dHeight,dWidth){
				
				var _this = this;
				var position ;
				var pos = target.offset();
				var top = pos.top;
	
				var left = pos.left;
				var halfTWidth = Constants.APP_SIZE.width/2;
				var halfTHeight = Constants.APP_SIZE.height/2;
				
				
				var halfWWidth = $(window).width()/2;
				var halfWHeight = $(window).height()/2;
				var cPointer = {x:left+halfTWidth,y:top+halfTHeight};
//$.log("halfWWidth:"+halfWWidth + " halfWHeight:"+halfWHeight+" cPointer.x:"+cPointer.x+" cPointer.y:"+cPointer.y);


				var dLeft = 0,dTop=0;
				
				if(cPointer.x<=halfWWidth &&cPointer.y<= halfWHeight){
					dLeft = left+Constants.APP_SIZE.width;
					dTop  = top;
					position= Constants.LEFT_TOP;//左上
				}
				
				if(cPointer.x>=halfWWidth &&cPointer.y<= halfWHeight){
					dLeft = left-dWidth;
					dTop  = top;
					position= Constants.RIGHT_TOP;//右上
				}
				
				if(cPointer.x<=halfWWidth &&cPointer.y>= halfWHeight){
					dLeft = left+Constants.APP_SIZE.width;
					dTop  = top-dHeight+Constants.APP_SIZE.height;
					position = Constants.LEFT_BOTTOM;//左下
				}
				
				if(cPointer.x>=halfWWidth &&cPointer.y>= halfWHeight){
					dLeft = left-dWidth;
					dTop  = top-dHeight+Constants.APP_SIZE.height;
					position = Constants.RIGHT_BOTTOM;//右下
				}
				
				
				//$.log(position);
				
				//return Constants.LEFT_BOTTOM;//左下
				//return Constants.TOP_LEFT;//上左
				//return Constants.TOP_RIGHT;//上右
				//return Constants.RIGHT_TOP;//右上
				//return Constants.RIGHT_BOTTOM;//右下
				//return Constants.BOTTOM_LEFT;//下左
				//return Constants.BOTTOM_RIGHT;//下右
				
				//$.log(dTop+"-----------");
				popDialog.css({left:dLeft,top:dTop});
				return position;
			},
			bindEvent : function (){
				U.isMouseDownIn('pop_dialog','p_m_center',function (){
					$("#pop_dialog").hide();
				});	
			}
	};
	/**
	 * 初始化dom
	 */
	var initSelf = function (){
		
		
		
		var target =$('<div id="pop_dialog" class="pop_menu" >'+
							'<div class="p_m_top">'+
							'<div class="radius_border r_b_l"></div>'+
							'<div class="p_m_t_b">'+
								'<div class="p_m_t_b_bg" style="width:141px"></div>'+
								'<div class="pop_arrow"></div>'+
								'<div class="p_m_t_b_bg" style="width:50px"></div>'+
							'</div>'+
							
							'<div class="radius_border r_b_r"></div>'+
						'</div>'+
						'<div class="p_m_content">'+
						
							'<div class="p_m_left">'+
								'<div class="p_m_l_r">'+
									'<div class="p_m_l_r_bg" style="height:115px;"></div>'+
									'<div class="pop_arrow"></div>'+
									'<div class="p_m_l_r_bg" style="height:50px;"></div>'+
								'</div>'+
							'</div>'+
							'<div class="p_m_center" style="width:136px;height:200px;">'+
								
								
							
							'</div>'+
							'<div class="p_m_right">'+
								'<div class="p_m_l_r" >'+
									'<div class="p_m_l_r_bg" style="height:115px;"></div>'+
									'<div class="pop_arrow"></div>'+
									'<div class="p_m_l_r_bg" style="height:50px;"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="p_m_bottom">'+
							'<div class="radius_border r_b_l"></div>'+
							'<div class="p_m_t_b">'+
								'<div class="p_m_t_b_bg" style="width:141px"></div>'+
								'<div class="pop_arrow"></div>'+
								'<div class="p_m_t_b_bg" style="width:50px"></div>'+
							'</div>'+
							'<div class="radius_border r_b_r"></div>'+
						'</div>'+
					'</div>');
		
		target.appendTo('body');
		return target;//此时改变了下navbar的dom 主要是为了操作dom方便直接指向panel 而不是外层的navbar 以减少dom的查找
		
	};

	
	PopDialog.prototype.constructor = PopDialog;
	window.PopDialog = PopDialog;
})(jQuery,window);
