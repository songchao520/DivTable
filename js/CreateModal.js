;(function($,window,document,undefined){
	var initmodal = 0;
	var CreateModal = function(opt,ele){
		this.$element = ele,
		this.defaults = {
			"isscroll":"false",//是否添加滚动条，未实现
			"contentStyle":"false",//是否添加显示样式
			"top":"false",//是否添加top值
			"type":"default",//选择哪种弹窗 默认为提示框
			"isshow":"true",//是否自动显示
			"bodyfont":'',//显示图标
			"bodyhead":'',//显示文字 
			"bodybody":"",//显示内容
			"isCloseAuto":"true",//是否自动关闭
			"topStyle":"background-color:#FFFFFF;",//关闭样式
			"bodyStyle":"background-color:#FFFFFF;",//显示div样式
			"footStyle":"background-color:#FFFFFF;",//按钮div样式
			"titleShow":"",//显示标题
			"isshowClose":"true",//是否显示关闭按钮
			"footShow":"",//没有按钮组以这个为显示内容
			"btn":[]//按钮组
		},
		this.options = $.extend({}, this.defaults, opt)
	}
	
	CreateModal.prototype = {
		
		
		initmodal:function(initoptions){
			this.options = $.extend({},this.defaults, initoptions)
			initmodal = initmodal + 1;
			var modalid = "modal"+initmodal;
			var contentStyle = this.options.contentStyle;
			var bodyfont = this.options.bodyfont;
			var bodyhead = this.options.bodyhead;
			var bodybody = this.options.bodybody;
			var type = this.options.type;
			var isCloseAuto = this.options.isCloseAuto.toString();
			var topStyle = this.options.topStyle;
			var bodyStyle = this.options.bodyStyle;
			var footStyle = this.options.footStyle;
			var titleShow = this.options.titleShow;
			var isshowClose = this.options.isshowClose;
			var backdrop = "";
			var typelgsm = "";
			var widths = "";
			var contentStyles = "";
			var isshowClosehtml = "";
			if(contentStyle != "false"){
				contentStyles = "style='"+contentStyle+"'";
			}
			if(type == "default"){
				typelgsm = "modal-sm";
			}else if(type == "Customlarge"){
				typelgsm = "modal-lg";
			}
			if(isCloseAuto != "true"){
				backdrop = 'data-backdrop="static"';
			}
			if(isshowClose == "true"){
				isshowClosehtml = '<button type="button" class="close" style="height:100%;" data-dismiss="modal" '+
										'aria-hidden="true">×'+
									'</button>'
			}
			var defaultmodal = '<div class="modal fade bs-example-modal-sm alert_extend" id="'+modalid+'" tabindex="-1" role="dialog"  '+backdrop+'>'+
			  '<div class="modal-dialog '+typelgsm+'" role="document">'+
			    '<div class="modal-content" '+contentStyles+'>'+
			      	'<div class="modal-header" style="'+topStyle+'">'+titleShow+
						isshowClosehtml+
					'</div>'+
					'<div class="modal-body" style="'+bodyStyle+'">'+
						'<div class="body-font">'+
							bodyfont+
						'</div>'+
						'<div class="body-heads">'+
							bodyhead+
						'</div>'+
						'<div class="body-body">'+
							bodybody+
						'</div>'+
					'</div>'+
					'<div class="modal-footer" style="'+footStyle+'">'+
					'</div>'+
			    '</div>'+
			  '</div>'+
			'</div>';
			
			var isscroll = this.options.isscroll;
			var width = this.options.width;
			var height = this.options.height;
			var top = this.options.top;
			var footShow = this.options.footShow;
			var isshow = this.options.isshow.toString();
			
			var btn = this.options.btn;
			$("body").prepend(defaultmodal);
			var btnhtml = "";
			for(var i=0;i<btn.length;i++){
				var classbtn = btn[i].classname;
				var classtext = btn[i].showtext;
				if(classbtn.indexOf("cancel")!=-1){
					btnhtml = btnhtml+'<button type="button" class="btn '+classbtn+'" '+
							'data-dismiss="modal">'+classtext+
					'</button>';
					
				}else{
					btnhtml = btnhtml+'<button type="button" class="btn '+classbtn+'">'+
						classtext+
					'</button>'
				}
				
			}
			if(btn.length == 0){
				btnhtml = footShow
			}
			$("#"+modalid).find(".modal-footer").html(btnhtml);
			if(isshow == "true"){					
				$("#"+modalid).modal('show');
			}
			return modalid
		},
		//提示弹框
		initAlertModal:function(tips,zindex,thisopts){
			var initupdate = {
				"type":'default',
				"bodyhead":"操作成功",	
				"bodybody":"<div style='text-align: center;padding-top:10px;'>"+tips+"</div>",	
			}
			var options = $.extend({},initupdate, thisopts)
			var initid = this.initmodal(options);
			if(zindex != null && zindex !=""){
				$("#"+initid).css("z-index",zindex);
			}else{
				$("#"+initid).css("z-index","99999");
			}
			
			return initid;
		},
		//危险弹框
		initDangerModal:function(title,tips,cancelclass,canceltext,successclass,successtext,zindex,thisopts){
			var initupdate = {
				"contentStyle":"width:500px;height: 288px;",
				"topStyle":"background-color:#f85c32;",
				"bodyStyle":"height: 170px;background:#f85c32;",
				"footStyle":"background-color:#FFFFFF;",
				"type":'confirm',
				"bodyfont":'<span class="glyphicon glyphicon-remove-circle" style="color: #FFFFFF;"></span>',	
				"bodyhead":'<span style="color: #FFFFFF;">'+title+'</span>',
				"bodybody":'<div style="color: #FFFFFF;text-align: center;padding-top: 10px;">'+tips+'</div>',
				"isCloseAuto":"false",
				"btn":[{"classname":"cancel btn-hollow-gray btn-alts "+cancelclass,"showtext":canceltext},{"classname":"btn-darkgrey btn-alts "+successclass,"showtext":successtext}]
			}
			var options = $.extend({},initupdate, thisopts)
			var initid = this.initmodal(options);
			$("#"+initid).find(".close").addClass(cancelclass);
			if(zindex != null && zindex !=""){
				$("#"+initid).css("z-index",zindex);
			}else{
				$("#"+initid).css("z-index","99999");
			}
			return initid;
			
		},
		//警告弹框
		initWarningModal:function(title,tips,cancelclass,canceltext,successclass,successtext,zindex,thisopts){
			var initupdate = {
				"contentStyle":"width:500px;height: 288px;",
				"topStyle":"background-color:#f6bb42;",
				"bodyStyle":"height: 170px;background:#f6bb42;",
				"footStyle":"background-color:#FFFFFF;",
				"type":'confirm',
				"bodyfont":'<span class="glyphicon glyphicon-question-sign" style="color: #FFFFFF;"></span>',	
				"bodyhead":'<span style="color: #FFFFFF;">'+title+'</span>',
				"bodybody":'<div style="color: #FFFFFF;text-align: center;padding-top: 10px;">'+tips+'</div>',
				"isCloseAuto":"false",
				"btn":[{"classname":"cancel btn-hollow-gray btn-alts "+cancelclass,"showtext":canceltext},{"classname":"btn-darkgrey btn-alts "+successclass,"showtext":successtext}]
			}
			var options = $.extend({},initupdate, thisopts)
			var initid = this.initmodal(options);
			$("#"+initid).find(".close").addClass(cancelclass);
			$("#"+initid).find(".close").addClass(cancelclass);
			if(zindex != null && zindex !=""){
				$("#"+initid).css("z-index",zindex);
			}else{
				$("#"+initid).css("z-index","99999");
			}
			return initid;
			
		},
		//修改弹框
		initUpdateModal:function(titleShow,showtype,bodybody,cancelclass,canceltext,saveclass,savetext,zindex,thisopts){
			var initupdate = {
				"topStyle":"text-align: center;height:50px;line-height:27px;border-bottom: 1px solid #cccccc;font-size:16px;",
				"titleShow":titleShow,
				"type":showtype,
				"bodybody":bodybody,
				"footStyle":"border-top: 1px solid #cccccc;font-size:16px;height:50px;",
				"footShow":"<div style='float:right;padding-left:50px;padding-right:50px;' class='font font_sl font_ft "+saveclass+"'>"+savetext+"</div><div style='float:right;height:30px;margin-top:-5px;width:1px;background:#eaeaea;'></div><div style='float:right;padding-left:50px;padding-right:50px;' class='font font_lg font_ft "+cancelclass+"' data-dismiss='modal' >"+canceltext+"</div>"
			};
			var options = $.extend({},initupdate, thisopts)
			var initid = this.initmodal(options);
			$("#"+initid).find(".close").addClass(cancelclass);
			$("#"+initid).find(".close").addClass(cancelclass);
			if(zindex != null && zindex !=""){
				$("#"+initid).css("z-index",zindex);
			}else{
				$("#"+initid).css("z-index","99999");
			}
			return initid;
		},
		destroyModal:function(initid){
			$('#'+initid).remove();
		},
		//赋值X号监听样式
		AddClickClose:function(initid,closeClass){
			$("#"+initid).find(".close").addClass(closeClass);
		},
	}
	
	$.fn.toCreateModal = function(options){
  	var createModal = new CreateModal(options,this);
  	return createModal;
  }
})(jQuery,window,document);
