/**
 * @author 宋超
 * @desc 一款div表格
 */
;(function($,window,document,undefined){
  var inittableindex = 0;
  var CreateZcTable = function(ele,opt){
  	this.$element = ele,
  	this.defaults = {
  		"indexwidth" : "58",//序号表格宽度
  		"iconwidth": "56",//图标表格宽度
  		"checkboxwidth":"50",
  		"contentwidth" : "140",//内容表格宽度 		
  		"titleheight" : "37",//标题表格高度
  		"contentheight" : "37",//内容表格高度 
  		"titlebackgroundcolor" : "#f0f5f9",//标题表格背景
  		"tdbackgroundcolor" : "#f8f8f8",//内容表格背景颜色
  		"isShowIndex" : "true",//是否显示序列号
  		"isShowIcon" : "true",//是否显示图标
  		"isShowCheckbox":"true",
  		"rowsnumber" : "0",//传入显示多少行数 
  		"classdiv":"contentdiv",//默认加载div的宽度
  		"colsname":[],//表格标题名称集合
  		"colclassname":[],//表格标题样式
  		"isShowSum":"false",//是否显示合计，默认为否
  		"datainto":[],//传入数据一集合形式
  		"isauto":"false",
  		"oddbackgroundcolor":"false",
  		"evenbackgroundcolor":"false"
  	},
  	this.options = $.extend({}, this.defaults, opt)
  }
  CreateZcTable.prototype = {
  	initTable:function(){
  		inittableindex = inittableindex+1;
  		//将传过来的参数进行变量赋值
  		var indexwidth = this.options.indexwidth;
  		var iconwidth = this.options.iconwidth;
  		var titleheight = this.options.titleheight;
  		var contentwidth = this.options.contentwidth;
  		var contentheight = this.options.contentheight;
  		var titlebackgroundcolor = this.options.titlebackgroundcolor;
  		var tdbackgroundcolor = this.options.tdbackgroundcolor;
  		var isShowIndex = this.options.isShowIndex;
  		var isShowIcon = this.options.isShowIcon;
  		var colsnumber = parseInt(this.options.colsname.length);
  		var rowsnumber = parseInt(this.options.rowsnumber);
  		var classdiv = this.options.classdiv;
  		var colsname = this.options.colsname;
  		var colclassname = this.options.colclassname;
  		var isShowSum = this.options.isShowSum;
  		var datainto = this.options.datainto;
  		var isauto = this.options.isauto;
		var oddbackgroundcolor = this.options.oddbackgroundcolor;
		var evenbackgroundcolor = this.options.evenbackgroundcolor;
		var isShowCheckbox = this.options.isShowCheckbox;
		var checkboxwidth = this.options.checkboxwidth;
		
  		//判断表格的总宽度
  	
  		//判断传过来class所在div的宽度来进行是否展示左右滚动条。
  		var sumwidth = 0
		sumwidth = sumwidth + parseFloat(colsnumber*parseFloat(contentwidth)) +2;
		if(isauto=="false"){
			if(isShowIndex == "true"){
				sumwidth = sumwidth+parseFloat(indexwidth);
			}
			if(isShowIcon == "true"){
				sumwidth = sumwidth+parseFloat(iconwidth);
			}
			if(isShowCheckbox == "true"){
				sumwidth = sumwidth+parseFloat(checkboxwidth);
			}
		}
  		
  		
  		
  		
  		var conwidth = parseFloat($("."+classdiv).width());
  		var parentdiv = this.$element.parent().width();
  		if(isauto=="false"){
  			this.$element.css({
	  			"width":sumwidth+"px",
	  			"overflow":"hidden",
	  			"text-align":"center"
	  		})
  		}else{
  			this.$element.css({
	  			"width":parentdiv+"px",
	  			"overflow":"hidden",
	  			"text-align":"center"
	  		})
  		}
  		if(sumwidth>conwidth && isauto=="false"){
  			
  			this.$element.parent().css({"overflow-x":"scroll"})
  		}
  		var parentdiv = this.$element.parent().width();
  		
  		
		var thiswidth = parentdiv;
		if(isauto == "true"){
			if(isShowIndex == "true"){
				thiswidth = thiswidth - indexwidth;
			}
			if(isShowIcon == "true"){
				thiswidth = thiswidth - iconwidth;
			}
			if(isShowCheckbox == "true"){
				thiswidth = thiswidth - checkboxwidth ;
			}
			contentwidth = thiswidth/colsnumber;
		}
  		
  		//创建表格div为0
  		var sumhtml = '';
  		//创建一行标题div
  		var thdiv = '<div style="width:100%;height:'+titleheight+'px;float:left;background:'+titlebackgroundcolor+';border:1px solid #e4e8ed;line-height:'+titleheight+'px;" class="tableth" >';
  		if(isShowIndex == "true"){
  			thdiv = thdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+titleheight+'px;border-right:1px solid #e4e8ed;" class="indexth">序号</div>'
  		}else{
  			thdiv = thdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+titleheight+'px;border-right:1px solid #e4e8ed;display:none;" class="indexth">序号</div>'
  		}
  		if(isShowCheckbox == "true"){
  			thdiv = thdiv+'<div style="float:left;width:'+checkboxwidth+'px;height:'+titleheight+'px;border-right:1px solid #e4e8ed;" class="checkboxth"><input type="checkbox" class="checkboxthinput"></div>'
  		}
  		if(isShowIcon == "true"){
  			thdiv = thdiv+'<div style="float:left;width:'+iconwidth+'px;height:'+titleheight+'px;border-right:1px solid #e4e8ed;" class="iconth">&nbsp;</div>'
  		}
  		//循环遍历输入的标题和标题样式
  		var thinputdiv = "";
  		for(var i=0;i<colsname.length;i++){
  			var borderline = "";
  		
  			borderline = "border-right:1px solid #e4e8ed;"
  			
  			thinputdiv = thinputdiv + '<div style="float:left;width:'+contentwidth+'px;height:'+titleheight+'px;'+borderline+'" class="th'+i+' '+colclassname[i]+'th zctablethtd" i="'+i+'">'+colsname[i]+'</div>';
  		}
  		thdiv = thdiv+thinputdiv+"</div>";
  		//循环遍历表体
  		var sumtrdiv = "";
  			
  			
		//创建一行内容div
		var oddeven = "";
		if(oddbackgroundcolor !="false" && evenbackgroundcolor !="false"){
			tdbackgroundcolor = oddbackgroundcolor;
			oddeven = 'oddbackgroundcolor="'+oddbackgroundcolor+'" evenbackgroundcolor="'+evenbackgroundcolor+'" '
  		}
  		var trzerodiv = '<div style="width:100%;height:'+contentheight+'px;float:left;background:'+tdbackgroundcolor+';line-height:'+contentheight+'px;display:none" class="tabletr'+0+' zctabletr hidezctabletr" '+oddeven+'>';
  		var borderwidth = "";
  		
  		
  		if(isShowIndex == "true"){
  			trzerodiv = trzerodiv+'<div style="float:left;width:'+indexwidth+'px;height:'+contentheight+'px;" class="indextr">0</div>'
  		}else{
  			trzerodiv = trzerodiv+'<div style="float:left;width:'+indexwidth+'px;height:'+contentheight+'px;display:none;" class="indextr">0</div>'
  		}
  		
  		if(isShowCheckbox == "true"){
  			trzerodiv = trzerodiv+'<div style="float:left;width:'+checkboxwidth+'px;height:'+contentheight+'px;" class="checkboxtr"><input type="checkbox" class="checkboxtrinput"></div>'
  		}
  		
  		if(isShowIcon == "true"){
  			trzerodiv = trzerodiv+'<div style="float:left;width:'+iconwidth+'px;height:'+contentheight+'px;" class="icontr"><span class="glyphicon glyphicon-plus zctable_glyphicon-plus" style="cursor:pointer"></span><span class="glyphicon glyphicon-trash zctable_glyphicon-trash" style="cursor:pointer"></span></div>'
  		}
  		
  		
  		var trinputdiv = "";
  		for(var h=0;h<colclassname.length;h++){
				trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;height:'+contentheight+'px;'+borderwidth+'" class="tr'+i+' '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" ></div>'
			}
  			
  			
  			
  		trzerodiv = trzerodiv+trinputdiv+"</div>";
			sumtrdiv = sumtrdiv+trzerodiv;
  		

  		for(var i=0;i<rowsnumber;i++){
  			
  			if(oddbackgroundcolor !="false" && evenbackgroundcolor !="false"){
  				if(i%2 == 0){
  					tdbackgroundcolor=evenbackgroundcolor;
  				}else{
  					tdbackgroundcolor=oddbackgroundcolor;
  				}
  			}
  			//创建一行内容div
	  		var trdiv = '<div style="width:99.9%;height:'+contentheight+'px;float:left;background:'+tdbackgroundcolor+';line-height:'+contentheight+'px;" class="tabletr'+i+' zctabletr" '+oddeven+'>';
	  		
	  		if(isShowIndex == "true"){
	  			trdiv = trdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+contentheight+'px;" class="indextr">'+(parseInt(i)+1)+'</div>'
	  		}else{
	  			trdiv = trdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+contentheight+'px;display:none;" class="indextr">'+(parseInt(i)+1)+'</div>'
	  		}
	  		
	  		if(isShowCheckbox == "true"){
	  			trdiv = trdiv+'<div style="float:left;width:'+checkboxwidth+'px;height:'+contentheight+'px;" class="checkboxtr"><input type="checkbox" class="checkboxtrinput"></div>'
	  		}
	  		
	  		if(isShowIcon == "true"){
	  			trdiv = trdiv+'<div style="float:left;width:'+iconwidth+'px;height:'+contentheight+'px;" class="icontr"><span class="glyphicon glyphicon-plus zctable_glyphicon-plus" style="cursor:pointer"></span><span class="glyphicon glyphicon-trash zctable_glyphicon-trash" style="cursor:pointer"></span></div>'
	  		}
	  		
	  		
	  		
	  		var trinputdiv = "";
	  		if(datainto.length>i){
	  			var borderline = "";
	  			for(var h=0;h<datainto[i].length;h++){
	  				trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" >'+datainto[i][h]+'</div>'
	  			}
	  		}else{
	  			for(var h=0;h<colclassname.length;h++){
	  				trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd table_isblankline"  i="'+h+'" classname="'+colclassname[h]+'" ></div>'
	  			}
	  			
	  		}
	  			
	  			
	  			
	  		trdiv = trdiv+trinputdiv+"</div>";
  			sumtrdiv = sumtrdiv+trdiv;
  		}
  		//合计
  		var hejisum = "";
  		tdbackgroundcolor = this.options.tdbackgroundcolor;
  		if(isShowSum == "true"){
  			hejisum ='<div style="width:100%;height:'+contentheight+'px;float:left;background:'+tdbackgroundcolor+';line-height:'+contentheight+'px;" class="sumtr">'
  			if(isShowIndex == "true"){
	  			hejisum = hejisum+'<div style="float:left;width:'+indexwidth+'px;height:'+contentheight+'px;">合计：</div>'
	  		}
	  		if(isShowIcon == "true"){
	  			hejisum = hejisum+'<div style="float:left;width:'+iconwidth+'px;height:'+contentheight+'px;"></div>'
	  		}
	  		if(isShowCheckbox == "true"){
	  			hejisum = hejisum+'<div style="float:left;width:'+checkboxwidth+'px;height:'+contentheight+'px;" class="checkboxtr"></div>'
	  		}
	  		for(var j=0;j<colsname.length;j++){
	  			var borderline = "";
	  				hejisum = hejisum + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;'+borderline+'" class="'+colclassname[j]+'sum sumtd" classname="'+colclassname[j]+'" i="'+j+'"></div>';
	  		}
	  		hejisum = hejisum+"</div>";
  		}
  		sumhtml = thdiv+sumtrdiv+hejisum;
  		this.$element.html(sumhtml);
  		
  		
		//监听+号方法
		if(inittableindex==1){
			$(document).on("click",".zctable_glyphicon-plus",function(){
				if(!$(this).hasClass("icon_no_method")){
					
					var html = $(this).parent().parent().prop("outerHTML");
					$(this).parent().parent().after(html);
					$(this).parent().parent().next().children(".zctabletd").addClass("table_isblankline");
					$(this).parent().parent().next().children(".zctabletd").html("");
					var oddback = $(this).parent().parent().attr("oddbackgroundcolor");
					var evenback = $(this).parent().parent().attr("evenbackgroundcolor");
					var trdivs = $(this).parent().parent().nextAll().children(".indextr");
					trdivs.each(function(){
						var indextd = $(this).text();
						$(this).text(parseInt(indextd)+1)
						if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
							if(indextd%2==0){
								$(this).parent().css("background-color",evenback);
							}else{
								$(this).parent().css("background-color",oddback);
							}
						}
					})
					
					
				}
				
			});
			//监听删除方法
			$(document).on("click",".zctable_glyphicon-trash",function(){
				if(!$(this).hasClass("icon_no_method")){
					
					var oddback = $(this).parent().parent().attr("oddbackgroundcolor");
					var evenback = $(this).parent().parent().attr("evenbackgroundcolor");
					var trdivs = $(this).parent().parent().nextAll().children(".indextr");
					trdivs.each(function(){
						var indextd = $(this).text();
						$(this).text(parseInt(indextd)-1);
						if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
							if(indextd%2==0){
								$(this).parent().css("background-color",evenback);
							}else{
								$(this).parent().css("background-color",oddback);
							}
						}
					})
					
					$(this).parent().parent().children("div").each(function(){
						if($(this).hasClass("create_table_Sum")){
						
							var addnum = 0;
							if($(this).text().trim() != ""){
								addnum = -$(this).text();
							}
						
							var i = $(this).attr("i");
							$(this).parent().parent().children(".sumtr").children(".sumtd").each(function(){
			  					if($(this).attr("i") == i){
			  						var sumnum = $(this).text();
			  						$(this).text(parseFloat(parseFloat(sumnum)+parseFloat(addnum)));
			  					}
			  				});
						}
					})
					
					$(this).parent().parent().remove();
					
				}
				
				
			})
		
		}
		
  	},
  	
  	//统计合计
  	setSumCol:function(names){
  		for(var i=0;i<names.length;i++){
  			var elements = this.$element;
	  		elements.children(".tableth").children(".zctablethtd").each(function(){
	  			var $classname = $(this).attr("class");
	  			var $titlename = $(this).text();
	  			var $index = $(this).attr("i");
	  			
	  			
	  			if($(this).hasClass(names[i]+"th") || $titlename==names[i] ){
	  				if($(this).attr("i") == $index){
						var sumheji = 0;
						elements.children(".zctabletr").children(".zctabletd").each(function(){
							if($(this).attr("i") == $index){
								if($(this).text().trim()==""){
									sumheji = sumheji+0;
								}else{
									sumheji = sumheji+parseFloat($(this).text());
								}
								
								$(this).addClass("create_table_Sum");
							}
						})
					}
	  				elements.children(".sumtr").children(".sumtd").each(function(){
	  					if($(this).attr("i") == $index){
	  						if(isNaN(sumheji)){
	  							alert("传入的值【"+names[i]+"】无数字，请校验!");
	  						}else{
	  							$(this).text(sumheji);
	  						}
	  						
	  					}
	  				});
	  				
	  			}
	  		});	
  		}
  	},
  	
  	//赋予编辑
  	setEditCol:function(names){
  		for(var i=0;i<names.length;i++){
	  		var elements = this.$element;
	  		elements.children(".tableth").children(".zctablethtd").each(function(){
	  			var $classname = $(this).attr("class");
	  			var $titlename = $(this).text();
	  			var $index = $(this).attr("i");
	  			
	  			
	  			if($(this).hasClass(names[i]+"th")|| $titlename==names[i] ){
	  				if($(this).attr("i") == $index){
						elements.children(".zctabletr").children(".zctabletd").each(function(){
							if($(this).attr("i") == $index){
								$(this).addClass("create_table_Edit");
								$(this).css("cursor","pointer");
								
							}
						})
					}
	  				
	  			}
	  		});
		}
  		if(inittableindex==1){
	  		//监听表格编辑方法
			$(document).on("dblclick",".create_table_Edit",function(){
				if($(this).hasClass("table_isblankline")){
					return false;
				}
				var $text = $(this).text().trim();
				var width = $(this).width()*0.95;
				var height = $(this).parent().height();
				var marginheight = height/4;
				var inputheight = height/2;
				var inputhtml = '<input type="text" class="create_table_Edit_input" style="height:'+inputheight+'px;margin-top:'+marginheight+'px;border:1px solid #77BCAB;line-height:'+marginheight+'px;width:'+width+'px" />';
				$(this).html(inputhtml);
				var $children = $(this).children(".create_table_Edit_input");
				$children.focus().val($text);
				$children.attr("beforevalue",$text)
			});
			//组织冒泡
			$(document).on("dblclick",".create_table_Edit_input",function(e){
				e.stopPropagation();
			});
			//监听表格编辑input光标离开
			$(document).on("blur",".create_table_Edit_input",function(e){
				var value = $(this).val();
				var $parent = $(this).parent();
				
			
				if($parent.hasClass("create_table_Sum")){
					var plusfloat = 0;
					if($(this).attr("beforevalue") != ""){
						plusfloat = $(this).attr("beforevalue");
					}
					
					var addnum = parseFloat(value)-parseFloat(plusfloat);
					if(value == ""){
						addnum = -parseFloat(plusfloat);
					}else if(isNaN(value)){
						alert("合计的值编辑后不是数字！");
						return;
					}
					var i = $parent.attr("i");
					$parent.parent().parent().children(".sumtr").children(".sumtd").each(function(){
	  					if($(this).attr("i") == i){
	  						var sumnum = $(this).text();
	  						$(this).text(parseFloat(parseFloat(sumnum)+parseFloat(addnum)));
	  					}
	  				});
				}
					$parent.html(value);
			});
		}
  	},
  	//取消某行编辑
  	cancelColEdit:function(names){
  		for(var i=0;i<names.length;i++){
	  		var elements = this.$element;
	  		elements.children(".tableth").children(".zctablethtd").each(function(){
	  			var $classname = $(this).attr("class");
	  			var $titlename = $(this).text();
	  			var $index = $(this).attr("i");
	  			
	  			
	  			if($(this).hasClass(names[i]+"th")|| $titlename==names[i] ){
	  				if($(this).attr("i") == $index){
						elements.children(".zctabletr").children(".zctabletd").each(function(){
							if($(this).attr("i") == $index ){
								$(this).removeClass("create_table_Edit");
								$(this).css("cursor","");
								
							}
						})
					}
	  				
	  			}
	  		});
		}
  	},
  	//赋值左右对齐
  	setColposition : function(positionobj){
  		var positionobj = eval(positionobj);
  		for(var i in positionobj){
	  		var elements = this.$element;
	  		elements.children(".tableth").children(".zctablethtd").each(function(){
	  			var $classname = $(this).attr("class");
	  			var $titlename = $(this).text();
	  			var $index = $(this).attr("i");
	  			
	  			
	  			if($(this).hasClass(i+"th") || $titlename==i ){
	  				if($(this).attr("i") == $index){
						elements.children(".zctabletr").children(".zctabletd").each(function(){
							if($(this).attr("i") == $index){
								$(this).css("text-align",positionobj[i]);
							}
						})
					}
	  				
	  			}
	  		});
		}
  	},
  	//覆盖加号方法
  	setPlusMethod:function(callback){
  		this.$element.children(".zctabletr").children(".icontr").children(".zctable_glyphicon-plus").addClass("icon_no_method");  
  		$(document).on("click",".zctable_glyphicon-plus",eval(callback))
  	},
  	
  		//覆盖删除图标方法
  	setPlusMethod:function(callback){
  		this.$element.children(".zctabletr").children(".icontr").children(".zctable_glyphicon-plus").addClass("icon_no_method");  
  		$(document).on("click",".zctable_glyphicon-trash",eval(callback))
  	},
  	//隐藏列的方法
  	setHideCol:function(colclass){
  		for(var i=0;i<colclass.length;i++){
  			var elements = this.$element;
  			var options = this.options;
	  		elements.children(".tableth").children(".zctablethtd").each(function(){
	  			var $classname = $(this).attr("class");
	  			var $titlename = $(this).text();
	  			var $index = $(this).attr("i");
	  			if($(this).hasClass(colclass[i]+"th")|| $titlename==colclass[i] ){
	  				
	  				var sumwidth = $(this).parent().parent().width();
	  				var thiswidth = $(this).width();
	  				var nowwidth = sumwidth-thiswidth;
	  				$(this).parent().css("width",nowwidth-1+"px");
	  				$(this).parent().parent().css("width",nowwidth+"px");
	  				
	  			
  					//如果是自适应模式将重新赋值；
	  				if(options.isauto == "true"){
	  					var indextr = $(".indextr").width();
	  					var icontr = $(".icontr").width();
	  					var widthnow = sumwidth-4;
	  					if(options.isShowIcon == "true" && options.isShowIndex == "true"){
	  						widthnow = widthnow-indextr-icontr;
	  					}else if(options.isShowIcon == "true" && options.isShowIndex == "false" ){
	  						widthnow = widthnow-icontr;
	  					}else if(options.isShowIcon == "false" && options.isShowIndex == "true" ){
	  						widthnow = widthnow-indextr;
	  					}
	  					var trsum = $(this).parent().children(".zctablethtd").length;
							var hidesum = $(this).parent().children(".create_table_hide").length;
							nowwidths = widthnow/(trsum-hidesum-1);
							//alert((trsum-hidesum)*thiswidth);
							$(this).parent().css("width",sumwidth+"px");
							$(this).parent().parent().css("width",sumwidth+"px");
							$(this).parent().children(".zctablethtd").css("width",nowwidths+"px");
							$(this).parent().parent().children(".zctabletr").children(".zctabletd").css("width",nowwidths+"px");
							$(this).parent().parent().children(".sumtr").children(".sumtd").css("width",nowwidths+"px");
	  				}
	  				
	  				
	  				if($(this).attr("i") == $index){	  					
							elements.children("div").children("div").each(function(){
								if($(this).attr("i") == $index ){
									$(this).css("display","none");
									$(this).addClass("create_table_hide");
								}
							})
						}
	  			
	  				
	  			
	  				
	  			}
	  		});	
  		}
  	},
  	//显示列的方法
  	setShowCol:function(colclass){
  		for(var i=0;i<colclass.length;i++){
  			var elements = this.$element;
  			var options = this.options;
	  		elements.children(".tableth").children(".zctablethtd").each(function(){
	  			var $classname = $(this).attr("class");
	  			var $titlename = $(this).text();
	  			var $index = $(this).attr("i");
	  			
	  			
	  			if($(this).hasClass(colclass[i]+"th") || $titlename==colclass[i] ){
	  				var sumwidth = $(this).parent().parent().width();
	  				var thiswidth = $(this).width();
	  				var nowwidth = sumwidth+thiswidth;
	  				$(this).parent().css("width",nowwidth+"px");
	  				$(this).parent().parent().css("width",nowwidth+1+"px");
	  				//如果是自适应模式将重新赋值；
	  				
	  				if(options.isauto == "true"){
	  					var indextr = $(".indextr").width();
	  					var icontr = $(".icontr").width();
	  					var widthnow = sumwidth-4;
	  					if(options.isShowIcon == "true" && options.isShowIndex == "true"){
	  						widthnow = widthnow-indextr-icontr;
	  					}else if(options.isShowIcon == "true" && options.isShowIndex == "false" ){
	  						widthnow = widthnow-icontr;
	  					}else if(options.isShowIcon == "false" && options.isShowIndex == "true" ){
	  						widthnow = widthnow-indextr;
	  					}
	  					var trsum = $(this).parent().children(".zctablethtd").length;
							var hidesum = $(this).parent().children(".create_table_hide").length;
							var nowwidths = widthnow/(trsum-hidesum+1);
							//alert((trsum-hidesum)*thiswidth);
							$(this).parent().css("width",sumwidth+"px");
							$(this).parent().parent().css("width",sumwidth+"px");
							$(this).parent().children(".zctablethtd").css("width",nowwidths+"px");
							$(this).parent().parent().children(".zctabletr").children(".zctabletd").css("width",nowwidths+"px");
							$(this).parent().parent().children(".sumtr").children(".sumtd").css("width",nowwidths+"px");
	  				}
	  				
	  				if($(this).attr("i") == $index){
							elements.children("div").children("div").each(function(){
								if($(this).attr("i") == $index){
									$(this).css("display","block");
									$(this).removeClass("create_table_hide");
								}
							})
						}
	  				
	  			}
	  		});	
  		}
  	},
  	//指定ID
  	SpecifyId:function(colclass){
		var elements = this.$element;
  		elements.children(".tableth").children(".zctablethtd").each(function(){
  			var $titlename = $(this).text();
  			var $index = $(this).attr("i");
  			if($(this).hasClass(colclass+"th")|| $titlename==colclass ){
  				if($(this).attr("i") == $index){	  					
					elements.children("div").children("div").each(function(){
						if($(this).attr("i") == $index && $(this).text().trim()!=""){
							$(this).addClass("TABLE_ID_COL");
							
						}
					})
				}
  			
  				
  			}
  		});	 
  	},
  	//赋予某列排序方法
	setSortCol:function(names){
  		for(var i=0;i<names.length;i++){
  			var elements = this.$element;
	  		elements.children(".tableth").children(".zctablethtd").each(function(){
	  			var $classname = $(this).attr("class");
	  			var $titlename = $(this).text();
	  			var $index = $(this).attr("i");
	  			
	  			
	  			if($(this).hasClass(names[i]+"th") || $titlename==names[i] ){
	  				if($(this).attr("i") == $index){
	  					var thistext = $(this).text();
	  					$(this).html($(this).text()+"<span class='glyphicon glyphicon-sort'></span>")
	  					$(this).css("cursor","pointer");
	  					$(this).addClass("create_table_Sort_th")
							/*elements.children(".zctabletr").children(".zctabletd").each(function(){
								if($(this).attr("i") == $index && $(this).text().trim()!=""){
									$(this).addClass("create_table_Sort");
								}
							})*/
						}	  				
	  			}
	  		});	
  		}
  		if(inittableindex==1){
  			//监听第一次排序
	  		$(document).on("click",".create_table_Sort_th",function(){
	  			$(this).addClass("create_table_Sort_big");
	  			$(this).removeClass("create_table_Sort_th");
	  			var thistext = $(this).text();
	  			$(this).html(thistext+"<span class='glyphicon glyphicon glyphicon-sort-by-attributes-alt'></span>");
	  			var $index = $(this).attr("i");
	  			var newobjects = [];
	  			var novaluehtml = "";
	  			$(this).parent().parent().children(".zctabletr").children(".zctabletd").each(function(){
	  				if($(this).parent().hasClass("hidezctabletr")){
	  					return true;
	  				}
						if($(this).attr("i") == $index){
							var newobject = new Object();
							var $thisnum = parseFloat($(this).text());
							if($(this).text()==""){
								novaluehtml = novaluehtml+$(this).parent().prop("outerHTML");
							}else{
								var outerHTML = $(this).parent().prop("outerHTML");
								newobject["sortnum"] = $thisnum;
								newobject["outerHTML"] = outerHTML;
								newobjects.push(newobject);
							}
							
						}
						$(this).parent().remove();
					});
					newobjects.sort(function(a,b){
						return b.sortnum-a.sortnum;
					})
					$(this).parent().parent().children(".hidezctabletr").after(novaluehtml);
					for(var i=newobjects.length-1;i>-1;i--){

						$(this).parent().parent().children(".hidezctabletr").after(newobjects[i].outerHTML);
					}
					$(this).parent().parent().children(".zctabletr").each(function(index){
						$(this).children(".indextr").text(index);
						var oddback = $(this).attr("oddbackgroundcolor");
						var evenback = $(this).attr("evenbackgroundcolor");
						if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
							if((index+1)%2==0){
								$(this).css("background-color",evenback);
							}else{
								$(this).css("background-color",oddback);
							}
						}
					});
					
	  		});
	  		//监听从小到大排序
	  		$(document).on("click",".create_table_Sort_big",function(){
	  			$(this).addClass("create_table_Sort_th");
	  			$(this).removeClass("create_table_Sort_big");
	  			var thistext = $(this).text();
	  			$(this).html(thistext+"<span class='glyphicon glyphicon glyphicon-sort-by-attributes'></span>");
	  			var $index = $(this).attr("i");
	  			var newobjects = [];
	  			var novaluehtml = "";
	  			$(this).parent().parent().children(".zctabletr").children(".zctabletd").each(function(){
	  				if($(this).parent().hasClass("hidezctabletr")){
	  					return true;
	  				}
						if($(this).attr("i") == $index){
							var newobject = new Object();
							
							var $thisnum = parseFloat($(this).text());
						if($(this).text()==""){
								novaluehtml = novaluehtml+$(this).parent().prop("outerHTML");
							}else{
								var outerHTML = $(this).parent().prop("outerHTML");
								newobject["sortnum"] = $thisnum;
								newobject["outerHTML"] = outerHTML;
								newobjects.push(newobject);
							}
						}
						$(this).parent().remove();
					});
					newobjects.sort(function(a,b){
						return a.sortnum-b.sortnum;
					})
					
					for(var i=newobjects.length-1;i>-1;i--){

						$(this).parent().parent().children(".hidezctabletr").after(newobjects[i].outerHTML);
					}
					$(this).parent().parent().children(".hidezctabletr").after(novaluehtml);
					$(this).parent().parent().children(".zctabletr").each(function(index){
						$(this).children(".indextr").text(index);
						var oddback = $(this).attr("oddbackgroundcolor");
						var evenback = $(this).attr("evenbackgroundcolor");
						if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
							if((index+1)%2==0){
								$(this).css("background-color",evenback);
							}else{
								$(this).css("background-color",oddback);
							}
						}
					});
	  		});
	  		
  		}
  		
  	},
  	//通过指定ID获取值
  	getColDataInfoById:function(jsonobj){
  		var jsonobj = eval(jsonobj);
  		var returnobjs = "{";
  		for(var i in jsonobj){
	  		var elements = this.$element;
	  		elements.children(".zctabletr").children(".TABLE_ID_COL").each(function(){
	  			var $titlename = $(this).text().trim();	  			
	  			if($titlename==i){
	  				returnobjs=returnobjs+'"'+i+'":{';
	  				for(var j in jsonobj[i]){						
								$(this).parent().children(".zctabletd").each(function(){
									if($(this).hasClass(jsonobj[i][j]+"td")){
										var $thistext = $(this).text();
										returnobjs=returnobjs+'"'+jsonobj[i][j]+'":"'+$thistext+'",'
									}
								});
						}
	  				returnobjs=returnobjs.substring(0,returnobjs.length-1)+'},';
						
	  			}
	  		});
			}
  		returnobjs = returnobjs.substring(0,returnobjs.length-1)+"}";
  		return JSON.parse(returnobjs);
  	},
  	//通过指定ID获取一行值
  	getRowsDataInfoById:function(ids){
  		var returnobjs = "{";
  		for(var i=0;i<ids.length;i++){
	  		var elements = this.$element;
	  		elements.children(".zctabletr").children(".TABLE_ID_COL").each(function(){
	  			var $titlename = $(this).text().trim();	  			
	  			if($titlename==ids[i]){
	  				returnobjs=returnobjs+'"'+ids[i]+'":{';					
							$(this).parent().children(".zctabletd").each(function(){
									var $thistext = $(this).text();
									var $classname = $(this).attr("classname");
									returnobjs=returnobjs+'"'+$classname+'":"'+$thistext+'",'
							});
	  				returnobjs=returnobjs.substring(0,returnobjs.length-1)+'},';
						
	  			}
	  		});
			}
  		returnobjs = returnobjs.substring(0,returnobjs.length-1)+"}";
  		return JSON.parse(returnobjs);
  	},
  	//获取全部数据
  	getAllData:function(){
  		
  		var returnobjs = "{";
  		var elements = this.$element;
  		elements.children(".zctabletr").children(".TABLE_ID_COL").each(function(){
  			var $titlename = $(this).text().trim();	  			
  				returnobjs=returnobjs+'"'+$titlename+'":{';					
						$(this).parent().children(".zctabletd").each(function(){
								var $thistext = $(this).text();
								var $classname = $(this).attr("classname");
								returnobjs=returnobjs+'"'+$classname+'":"'+$thistext+'",'
						});
  				returnobjs=returnobjs.substring(0,returnobjs.length-1)+'},';
					
  		});
  		returnobjs = returnobjs.substring(0,returnobjs.length-1)+"}";
  		return JSON.parse(returnobjs);
  	
  	},
  	//通过ID塞某个值
  	setColDataInfoById:function(jsonobj){
  		var jsonobj = eval(jsonobj);
  		var tipinfo = "";
  		var danlei = "";
  		for(var i in jsonobj){
	  		var elements = this.$element;
	  		danlei = "没有创建指定ID";
	  		elements.children(".zctabletr").children(".TABLE_ID_COL").each(function(){
	  			var $titlename = $(this).text().trim();	 
	  			danlei = "指定ID没有"+i+"这个字段";
	  			if($titlename==i){
	  				for(var j in jsonobj[i]){						
								$(this).parent().children(".zctabletd").each(function(){
									danlei = "没有这个"+j+"列";
									if($(this).hasClass(j+"td")){
										
										$(this).text(jsonobj[i][j]);
										danlei = j+":success,";
									}
								});
						}
						
	  			}
	  		});
	  		tipinfo = tipinfo+danlei;
			}
  		this.setNewSum();
  		return tipinfo;
  	},
  	//给多个空行塞值
  	setRowsDataInfo:function(jsonobj,indexs){
  		var jsonobj = eval(jsonobj);
  		tipinfo = "error";
  		if(indexs==null || indexs=="" || indexs.length ==0 || indexs.toString() == "-1"){
  			for(var i in jsonobj){
  				var	maxindex = this.$element.children(".zctabletr").children(".indextr").length;	
	  			 	
					var $this = this.$element.children(".zctabletr").children(".indextr").eq(maxindex-1).parent();
					var oddback = $this.attr("oddbackgroundcolor");
					var evenback = $this.attr("evenbackgroundcolor");
					var html = $this.prop("outerHTML");
					$this.after(html);
					if(this.options.rowsnumber <= 0){
						$this.next().css("display","block");
					}
					$this.next().children(".zctabletd").html("");
					var trdivs = $this.nextAll().children(".indextr");
					trdivs.each(function(){
						var indextd = $(this).text();
						$(this).text(parseInt(indextd)+1);
						if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
							if(indextd%2==0){
								$(this).parent().css("background-color",evenback);
							}else{
								$(this).parent().css("background-color",oddback);
							}
						}
					});
  				for(var j in jsonobj[i]){						
							$this.next().children(".zctabletd").each(function(){
								if($(this).hasClass(j+"td")){
									tipinfo = "success";
									$(this).text(jsonobj[i][j]);
								}
							});
					}
							
				}
  		}else{
  			if(jsonobj.length != indexs.length){
  				return alert("行数据和行数不一致！");
  			}
  			for(var i in jsonobj){
	  			var maxindex = indexs[i];			
					var $this = this.$element.children(".zctabletr").children(".indextr").eq(maxindex).parent();

				
		  		var elements = this.$element;
  				for(var j in jsonobj[i]){						
							$this.children(".zctabletd").each(function(){
								$(this).removeClass("table_isblankline");
								if($(this).hasClass(j+"td")){
									tipinfo = "success";
									
									$(this).text(jsonobj[i][j]);
								}
							});
					}
							
				}
  		}
  		this.setNewSum();
  		return tipinfo;
  	},
		//合计重写
		setNewSum:function(){
			var elements = this.$element;
			var classnames = [];
  		elements.children(".sumtr").children(".sumtd").each(function(){
  			if($(this).text()!=null && $(this).text()!= ""){
  				var $classname = $(this).attr("classname").trim();
  				classnames.push($classname);
  			}
				
			});
  		this.setSumCol(classnames);
		},
		//根据序列向某个单元格塞入特定html
		setHtmlColByIndex:function(jsonobj){
  		var jsonobj = eval(jsonobj);
  		var tipinfo = "";
  		var danlei = "";
  		for(var i in jsonobj){
	  		var elements = this.$element;
	  		danlei = "没有创建指定ID";
	  		elements.children(".zctabletr").children(".indextr").each(function(){
	  			var $titlename = $(this).text().trim();	 
	  			danlei = "没有"+i+"这个序列";
	  			if($titlename==i){
	  				for(var j in jsonobj[i]){						
								$(this).parent().children(".zctabletd").each(function(){
									danlei = "没有这个"+j+"列";
									if($(this).hasClass(j+"td")){
										
										$(this).html(jsonobj[i][j]);
										danlei = j+":success,";
									}
								});
						}
						
	  			}
	  		});
	  		tipinfo = tipinfo+danlei;
			}
  		this.setNewSum();
  		return tipinfo;
  	},
  //根据ID向某个单元格塞入特定html
		setHtmlColByID:function(jsonobj){
  		var jsonobj = eval(jsonobj);
  		var tipinfo = "";
  		var danlei = "";
  		for(var i in jsonobj){
	  		var elements = this.$element;
	  		danlei = "没有创建指定ID";
	  		elements.children(".zctabletr").children(".TABLE_ID_COL").each(function(){
	  			var $titlename = $(this).text().trim();	 
	  			danlei = "指定ID没有"+i+"这个ID";
	  			if($titlename==i){
	  				for(var j in jsonobj[i]){						
								$(this).parent().children(".zctabletd").each(function(){
									danlei = "没有这个"+j+"列";
									if($(this).hasClass(j+"td")){
										
										$(this).html(jsonobj[i][j]);
										danlei = j+":success,";
									}
								});
						}
						
	  			}
	  		});
	  		tipinfo = tipinfo+danlei;
			}
  		this.setNewSum();
  		return tipinfo;
  	}
  	
  }
  
  $.fn.toCreateZcTable = function(options){
  	var createZcTable = new CreateZcTable(this, options);
  	return createZcTable;
  }
})(jQuery,window,document);



