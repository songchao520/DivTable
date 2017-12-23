/**
 * @author 宋超
 * @desc 一款div表格
 */
;(function($,window,document,undefined){
  var isautos = [];
  var isnoautos = [];
  var inittableindex = 0;
  var editobj;
  var currentpage;
  var pagesize;
  var CreateZcTable = function(ele,opt){
  	this.$element = ele,
  	this.defaults = {
  		"indexwidth" : "58",//序号表格宽度
  		"iconwidth": "170",//图标表格宽度
  		"checkboxwidth":"50",
  		"contentwidth" : "140",//内容表格宽度 		
  		"titleheight" : "37",//标题表格高度
  		"contentheight" : "37",//内容表格高度 
  		"titlebackgroundcolor" : "#f6f6f6",//标题表格背景
  		"tdbackgroundcolor" : "#f7f7f7",//内容表格背景颜色
  		"isShowIndex" : "true",//是否显示序列号
  		"isShowIcon" : "true",//是否显示图标
  		"isShowCheckbox":"true",
  		"rowsnumber" : "0",//传入显示多少行数 
  		"classdiv":"",//默认加载div的宽度
  		"colsname":[],//表格标题名称集合
  		"colclassname":[],//表格标题样式
  		"isShowSum":"false",//是否显示合计，默认为否
  		"datainto":[],//传入数据一集合形式
  		"isauto":"false",//是否自适应
  		"oddbackgroundcolor":"false",//技术样式
  		"evenbackgroundcolor":"false",//偶数样式
  		"contentborder":"false",//表体分割线
  		"titleborder":"false",//表头分割线
  		"ispiaofu":"false",//是否漂浮
  		"ispageshow":"false",//是否展示分页
  		"pagesize":"10",
  		"totalnumber":"-1",
  		"currentpage":"1",
  		"colsdatas":[],
  		"selectstate":"false"
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
		var contentborder = this.options.contentborder;
		var titleborder = this.options.titleborder
		var ispiaofu = this.options.ispiaofu
		var ispageshow = this.options.ispageshow
		currentpage = this.options.currentpage
		var selectstate = this.options.selectstate;
		this.$element.attr("selectstate",selectstate);
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
  		
  		
  		
  		
  		var conwidth;
  		if(classdiv == null || classdiv == ""){
  			conwidth = parseFloat(this.$element.parent().width());
  		}else{
  			conwidth = parseFloat($("."+classdiv).width());
  		}
  		var parentdiv = this.$element.parent().width();
  		if(isauto=="false"){
  			this.$element.css({
	  			"width":sumwidth+"px",
	  			"overflow":"hidden",
	  			"text-align":"center",
	  			"padding":"0px",
	  			"position": "static"
	  		})
  		}else{
  			this.$element.css({
	  			"width":parentdiv+"px",
	  			"overflow":"hidden",
	  			"text-align":"center",
	  			"padding":"0px",
	  			"position": "static"
	  			
	  		})
  		}
  		if(sumwidth>conwidth && isauto=="false"){
  			
  			this.$element.parent().css({"overflow-x":"scroll","border-left":"1px solid #eaeaea"})
  		}
  		if(isauto=="true"){
  			this.$element.parent().css({"overflow-x":"hidden"})
  		}
  		var parentdiv = this.$element.parent().width();
  		
  		
		var thiswidth = parentdiv;
		if(isauto == "true"){
			if(isShowIndex == "true"){
				thiswidth = thiswidth - indexwidth;
			}
			if(isShowIcon == "true"){
				thiswidth = thiswidth - iconwidth;
				iconwidth = iconwidth*0.6;
			}
			if(isShowCheckbox == "true"){
				thiswidth = thiswidth - checkboxwidth;
			}
			contentwidth = thiswidth/colsnumber;
		}
  		
  		//创建表格div为0
  		var sumhtml = '';
  		var borderline = "";
  		if(titleborder == "true"){
  			borderline = "border-right:1px solid #eaeaea;"
  		}
  		
  		//创建一行标题div
  		var thdiv = '<div style="width:100%;height:'+titleheight+'px;float:left;background:'+titlebackgroundcolor+';border:1px solid #eaeaea;line-height:'+titleheight+'px;border-left:0px;" class="tableth" >';
  		var marginleft = 0;
  		var ispiaofuhtml = "";
  		if(ispiaofu == "true"){
  			ispiaofuhtml = "position:absolute!important;z-index:9999;"
  		}
  		if(isShowCheckbox == "true"){
  			
  			thdiv = thdiv+'<div style="float:left;width:'+checkboxwidth+'px;height:'+parseFloat(titleheight-2)+'px;'+borderline+' '+ispiaofuhtml+'background:'+titlebackgroundcolor+'" class="checkboxth"><input type="checkbox" class="checkboxthinput"></div>'
  			
  			marginleft = marginleft+parseInt(checkboxwidth);
  		}
  		if(isShowIndex == "true"){
  		
	  		if(ispiaofu == "true"){
	  			ispiaofuhtml ='position:absolute;margin-left:'+marginleft+'px;z-index:9999;border-right:1px solid #eaeaea;box-shadow:1px 0 0 rgba(0,0,0,0.2);'
	  		}
  		
  			thdiv = thdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+parseFloat(titleheight-2)+'px;'+borderline+' '+ispiaofuhtml+'background:'+titlebackgroundcolor+'" class="indexth">序号</div>'
  			
  			marginleft = marginleft + parseInt(indexwidth);
  		}else{
  			thdiv = thdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+parseFloat(titleheight-2)+'px;'+borderline+'display:none;background:'+titlebackgroundcolor+'" class="indexth">序号</div>'
  		}
  		if(ispiaofu != "true"){
  			marginleft = 0;
  		}
  		
  		//循环遍历输入的标题和标题样式
  		var thinputdiv = "";
  		for(var i=0;i<colsname.length;i++){
  			if(i == 0){
  				if(ispiaofu == "true"){
		  			ispiaofuhtml ='margin-left:'+marginleft+'px;'
		  		}
  				thinputdiv = thinputdiv + '<div style="float:left;width:'+contentwidth+'px;height:'+titleheight+'px;'+borderline+' '+ispiaofuhtml+'" class="th'+i+' '+colclassname[i]+'th zctablethtd" i="'+i+'" classname="'+colclassname[i]+'" >'+colsname[i]+'</div>';
  			}else{
  				thinputdiv = thinputdiv + '<div style="float:left;width:'+contentwidth+'px;height:'+titleheight+'px;'+borderline+'" class="th'+i+' '+colclassname[i]+'th zctablethtd" i="'+i+'" classname="'+colclassname[i]+'" >'+colsname[i]+'</div>';
  			}
  			
  			
  		}
  		
  		if(isShowIcon == "true"){
  			thinputdiv = thinputdiv+'<div  class="icontr" style="float:left;width:'+iconwidth+'px;height:'+titleheight+'px;'+borderline+'" class="iconth">操作</div>'	
  		}
  		/*if(isauto == "true"){
  			if(isShowIcon == "true"){
	  			thinputdiv = thinputdiv+'<div style="float:left;width:'+parseInt(iconwidth-52)+'px;height:'+titleheight+'px;'+borderline+'" class="iconth">操作</div>'
	  		}
  		}else{
  			if(isShowIcon == "true"){
	  			thinputdiv = thinputdiv+'<div style="float:left;width:'+iconwidth+'px;height:'+titleheight+'px;'+borderline+'" class="iconth">操作</div>'
	  		}
  		}*/
  		
  		thdiv = thdiv+thinputdiv+"</div>";
  		//循环遍历表体
  		var sumtrdiv = "";
  			
  			
		//创建一行内容div
		var oddeven = "";
		
		if(oddbackgroundcolor !="false" && evenbackgroundcolor !="false"){
			tdbackgroundcolor = oddbackgroundcolor;
			oddeven = 'oddbackgroundcolor="'+oddbackgroundcolor+'" evenbackgroundcolor="'+evenbackgroundcolor+'" '
  		}
		
		var contentborderhtml = "";
		var contentleftright = "border-left:1px solid #eaeaea;border-right:1px solid #eaeaea;border-left:0px;";
		if(contentborder == "true"){
			contentborderhtml = "border-bottom:1px solid #eaeaea;border-left:0px;"
		}
		
  		var trzerodiv = '<div tdbackgroundcolor="'+tdbackgroundcolor+'" style="width:100%;height:'+contentheight+'px;float:left;background:'+tdbackgroundcolor+';line-height:'+parseFloat(contentheight)+'px;'+contentborderhtml+' '+contentleftright+'" class="tabletr'+0+' zctabletr hidezctabletr" '+oddeven+'>';
  		var borderwidth = "";
  		
  		var marginleft = 0;
  		var ispiaofuhtml = "";
  		/*if(ispiaofu == "true"){
  			ispiaofuhtml = 'position:absolute;z-index:9999;background:'+tdbackgroundcolor+';'
  		}*/
  		
  		if(isShowCheckbox == "true"){
  			trzerodiv = trzerodiv+'<div style="float:left;width:'+checkboxwidth+'px;height:'+parseFloat(contentheight-1)+'px;" class="checkboxtr"><input type="checkbox" class="checkboxtrinput"></div>'
  			
  			marginleft = marginleft+parseInt(checkboxwidth);
  		}
  		
  		if(isShowIndex == "true"){
  			/*if(ispiaofu == "true"){
	  			ispiaofuhtml ='position:absolute;margin-left:'+marginleft+'px;z-index:9999;background:'+tdbackgroundcolor+';border-right:1px solid #eaeaea;box-shadow:1px 0 0 rgba(0,0,0,0.2);'
	  		}*/
  			
  			trzerodiv = trzerodiv+'<div style="float:left;width:'+indexwidth+'px;height:'+parseFloat(contentheight-1)+'px; '+ispiaofuhtml+'" class="indextr">0</div>'
  			marginleft = marginleft + parseInt(indexwidth);
  		}else{
  			trzerodiv = trzerodiv+'<div style="float:left;width:'+indexwidth+'px;height:'+parseFloat(contentheight-1)+'px;display:none;" class="indextr">0</div>'
  		}
  		
  		
  		if(ispiaofu != "true"){
  			marginleft = 0;
  		}
  		
  		
  		
  		var trinputdiv = "";
  		for(var h=0;h<colclassname.length;h++){
			if(h == 0){
				trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;height:'+contentheight+'px;'+borderwidth+' margin-left:'+marginleft+'px;" class="tr'+i+' '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" ></div>'
			}else{
				trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;height:'+contentheight+'px;'+borderwidth+'" class="tr'+i+' '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" ></div>'	
			}
			
		}
  			
  		/*if(isShowIcon == "true"){
  			trinputdiv = trinputdiv+'<div style="float:left;width:'+parseFloat(iconwidth-2)+'px;height:'+contentheight+'px;" class="icontr"><span class="glyphicon  zctable_glyphicon-plus" style="cursor:pointer">新增</span><span class="glyphicon  zctable_glyphicon-plus" style="cursor:pointer;margin-left:5px">修改</span><span class="glyphicon zctable_glyphicon-trash" style="cursor:pointer;margin-left:5px">删除</span></div>'
  		}	*/
  		if(isShowIcon == "true"){
  			trinputdiv = trinputdiv+'<div style="float:left;width:'+parseFloat(iconwidth-2)+'px;height:'+contentheight+'px;" class="icontr"></div>'
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
	  		var trdiv = '<div style="width:99.9%;height:'+contentheight+'px;float:left;background:'+tdbackgroundcolor+';line-height:'+parseFloat(contentheight)+'px;'+contentborderhtml+' '+contentleftright+'" tdbackgroundcolor="'+tdbackgroundcolor+'" class="tabletr'+i+' zctabletr" '+oddeven+'>';
	  		
	  		var marginleft = 0;
	  		var ispiaofuhtml = "";
	  		/*if(ispiaofu == "true"){
	  			ispiaofuhtml = 'position:absolute;z-index:9999;background:'+tdbackgroundcolor+''
	  		}*/
	  		if(isShowCheckbox == "true"){
	  			trdiv = trdiv+'<div style="float:left;width:'+checkboxwidth+'px;height:'+parseFloat(contentheight-1)+'px;'+ispiaofuhtml+'" class="checkboxtr"><input type="checkbox" class="checkboxtrinput"></div>'
	  			marginleft = marginleft+parseInt(checkboxwidth);
	  		}
	  		
	  		
	  		if(isShowIndex == "true"){
	  			/*if(ispiaofu == "true"){
		  			ispiaofuhtml ='position:absolute;margin-left:'+marginleft+'px;z-index:9999;background:'+tdbackgroundcolor+';border-right:1px solid #eaeaea;box-shadow:1px 0 0 rgba(0,0,0,0.2);'
		  		}*/
	  			
	  			trdiv = trdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+parseFloat(contentheight-1)+'px;'+ispiaofuhtml+'" class="indextr">'+(parseInt(i)+1)+'</div>'
	  			
	  			marginleft = marginleft + parseInt(indexwidth);
	  		}else{
	  			trdiv = trdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+parseFloat(contentheight-1)+'px;display:none;" class="indextr">'+(parseInt(i)+1)+'</div>'
	  		}
	  		
	  		
	  		
	  		if(ispiaofu != "true"){
	  			marginleft = 0;
	  		}
	  		
	  		
	  		var trinputdiv = "";
	  		if(datainto.length>i){
	  			var borderline = "";
	  			for(var h=0;h<datainto[i].length;h++){
	  				if(h == 0){
	  					trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;margin-left:'+marginleft+'px;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" >'+datainto[i][h]+'</div>'
	  				}else{
	  					trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" >'+datainto[i][h]+'</div>'
	  				}
	  				
	  			}
	  		}else{
	  			for(var h=0;h<colclassname.length;h++){
	  				if(h==0){
	  					trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;margin-left:'+marginleft+'px;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd table_isblankline"  i="'+h+'" classname="'+colclassname[h]+'" ></div>'
	  				}else{
	  					trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd table_isblankline"  i="'+h+'" classname="'+colclassname[h]+'" ></div>'
	  				}
	  				
	  			}
	  			
	  		}
	  		/**
	  		 * <span class="glyphicon  zctable_glyphicon-plus" style="cursor:pointer">新增</span><span class="glyphicon  zctable_glyphicon-plus" style="cursor:pointer;margin-left:5px">修改</span><span class="glyphicon  zctable_glyphicon-trash" style="cursor:pointer;margin-left:5px">删除</span>
	  		 */
	  		if(isShowIcon == "true"){
	  			trinputdiv = trinputdiv+'<div style="float:left;width:'+parseFloat(iconwidth-2)+'px;height:'+contentheight+'px;" class="icontr"></div>'
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
	  		
	  		if(isShowCheckbox == "true"){
	  			hejisum = hejisum+'<div style="float:left;width:'+checkboxwidth+'px;height:'+contentheight+'px;" class="checkboxtr"></div>'
	  		}
	  		for(var j=0;j<colsname.length;j++){
	  			var borderline = "";
	  				hejisum = hejisum + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;'+borderline+'" class="'+colclassname[j]+'sum sumtd" classname="'+colclassname[j]+'" i="'+j+'"></div>';
	  		}
	  		if(isShowIcon == "true"){
	  			hejisum = hejisum+'<div  class="icontr" style="float:left;width:'+iconwidth+'px;height:'+contentheight+'px;"></div>'
	  		}
	  		hejisum = hejisum+"</div>";
  		}
  		sumhtml = thdiv+sumtrdiv+hejisum;
  		var pagehtml = "";
  		if(ispageshow == "true"){
  			pagehtml = '<div style="width:100%;height:50px;float:left;" class="zctable_page_html"><div class="zctable_page" style="width:100%;position:absolute;"><ul class="pagination zctable_page_ul" style="margin:0px;"></ul></div></div>';
  			
  		}
  		/*<li><a href="#"><span class="glyphicon glyphicon-step-backward"></span></a></li><li><a href="#"><</a></li><li class="active"><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">></a></li><li><a href="#"><span class="glyphicon glyphicon-step-forward"></span></a></li>
  		 */
  		
  		sumhtml = sumhtml + pagehtml;
  		this.$element.html(sumhtml);
  		
  		if(ispageshow == "true"){
  			this.refreshPage();
  		}
		
		
		
  	},
  	//获取编辑后的值及一些列其他值
  	getEditObject:function(){
  		if(editobj == null){
  		
  			return "并没有编辑任何值";
  		}
  		return editobj;
  	},
  	//通过ID 删除。
  	
  	RemoveTrById:function(deleteid){
  		if(deleteid ==null || deleteid == ""){
  			alert("删除的id不能为空")
  			return false;
  		}
		var elements = this.$element;
  		elements.find(".zctabletr").each(function(){
  			if($(this).children(".TABLE_ID_COL").text().trim() == deleteid || $(this).children(".indextr").text().trim() == deleteid){
  				var oddback = $(this).attr("oddbackgroundcolor");
				var evenback = $(this).attr("evenbackgroundcolor");
				var trdivs = $(this).nextAll().children(".indextr");
				trdivs.each(function(){
					var indextd = $(this).text();
					$(this).text(parseInt(indextd)-1);
					if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
						if(indextd%2==0){
							$(this).parent().css("background-color",evenback);
							$(this).parent().attr("tdbackgroundcolor",evenback);
		
						}else{
							$(this).parent().css("background-color",oddback);
							$(this).parent().attr("tdbackgroundcolor",oddback);
						}
					}
				})
				
				$(this).children("div").each(function(){
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
				
				$(this).remove();
				return false;
  			}
  		})
					
					
				
  	},
  	//向操作列添加图标或按钮
  	setIconTolist:function(html){
  		var elements = this.$element;
  		elements.children(".zctabletr").children(".icontr").html(html);
  	},
  	//获取当前操作列的序列号
  	getOperationThisIndex:function(){
  		var elements = this.$element;
  		var thisindex;
  		elements.find(".zctabletr").each(function(){
  			if($(this).hasClass("zctable_this")){
  				thisindex = $(this).children(".indextr").text();
  				
  			}
  		})
  		return thisindex;
  	},
  	//获取当前操作列的id
  	getOperationThis:function(){
  		var elements = this.$element;
  		var thisid;
  		elements.find(".zctabletr").each(function(){
  			if($(this).hasClass("zctable_this")){
  				thisid = $(this).children(".TABLE_ID_COL").text();
  				
  			}
  		})
  		return thisid;
  	},
  	//刷新分页
  	/*<li><a href="#"><span class="glyphicon glyphicon-step-backward"></span></a></li><li><a href="#"><</a></li><li class="active"><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">></a></li><li><a href="#"><span class="glyphicon glyphicon-step-forward"></span></a></li>
  		 */
  	refreshPage:function(){
  		//zctable_page_ul currentpage
  		var totalnumber = this.options.totalnumber;
  		pagesize = this.options.pagesize;
  		var	maxindex = this.$element.children(".zctabletr").children(".indextr").length-1;
  		if(totalnumber != -1){
  			var pagenum = totalnumber/pagesize;
  			
  		}else{
  			var pagenum = Math.ceil(maxindex/pagesize);
  			var startnum = (currentpage-1)*pagesize;
  			var endnum = currentpage*pagesize+1;
  			var elements = this.$element;
	  		elements.find(".indextr").each(function(){
	  			if($(this).parent().hasClass("zctable_showZero")){
	  				return;
	  			}
	  			var indexnum = parseInt($(this).text());
	  			if(indexnum>startnum && indexnum<endnum){
	  				$(this).parent().addClass("zctable_page_show");
	  				$(this).parent().show();
	  			}else{
	  				$(this).parent().removeClass("zctable_page_show")
	  				$(this).parent().hide();
	  			}
	  		})
	  		var leftpagenum = 1;
	  		if(currentpage>1){
	  			leftpagenum = currentpage-1;
	  		}
	  		var pagehtml = '<li><a class="zctable_page_a" pagenumber="1" style="cursor:pointer;"><span class="glyphicon glyphicon-step-backward"></span></a></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;"><</a></li>'
	  		if(currentpage>1){
	  			pagehtml = pagehtml+'<li ><a class="zctable_page_a"  pagenumber="'+parseInt(currentpage-1)+'"  style="cursor:pointer">'+parseInt(currentpage-1)+'</a></li>';
	  			
	  		}
	  		pagehtml = pagehtml+'<li class="active"><a>'+currentpage+'</a></li>';
	  		if(currentpage<pagenum){
	  			pagehtml = pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(parseInt(currentpage)+1)+'" style="cursor:pointer">'+parseInt(parseInt(currentpage)+1)+'</a></li>';
	  		}
	  		var rightpagenum = pagenum;
	  		if(currentpage<pagenum){
	  			rightpagenum = parseInt(parseInt(currentpage)+1);
	  		}
	  		//alert(rightpagenum)
	  		pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+rightpagenum+'" style="cursor:pointer">></a></li><li><a class="zctable_page_a" pagenumber="'+pagenum+'" style="cursor:pointer;"><span class="glyphicon glyphicon-step-forward"></span></a></li>';
	  		pagehtml = pagehtml + '<li><span style="background:#f7f7f7;">每页<span style="color:red">'+pagesize+'</span>行，共<span style="color:red">'+pagenum+'</span>页，'
	  		pagehtml = pagehtml+'当前第<span style="color:red">'+currentpage+'</span>页，'
	  		pagehtml = pagehtml+'可跳转<input type="text" style="width:40px;color:#000;height:20px" class="page_number_input" /><button class="btn btn-info page_number_btn" style="height:20px;line-height:20px;padding:0px 2px;vertical-align:inherit;font-size:12px;">确定</button>'
	  		pagehtml = pagehtml+'</span></li>';
	  		elements.find(".zctable_page_ul").html(pagehtml);
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
  	setEditCol:function(names,xings){
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
								if(xings == "date"){
									$(this).addClass("create_table_Edit_Date");
								}
								$(this).css("cursor","pointer");
								
							}
						})
					}
	  				
	  			}
	  		});
		}
  		
  		//if(inittableindex==1){}
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
  	//向外输出html
  	getSerialize:function(){
  		var htmlobj = new Object();
  		var thisstyle = this.$element.attr("style");
  		htmlobj["thisstyle"] = thisstyle;
  		var parentstyle = this.$element.parent().attr("style");
  		htmlobj["parentstyle"] = parentstyle;
  		var selectstate = this.$element.attr("selectstate");
  		htmlobj["selectstate"] = selectstate;
  		var sumhtml = this.$element.html();
  		htmlobj["sumhtml"] = sumhtml;
  		
  		
  		return htmlobj;
  	},
  	setSerialize:function(sumhtml){
  		this.$element.html(sumhtml.sumhtml);
  		this.$element.attr("style",sumhtml.thisstyle);
  		this.$element.attr("selectstate",sumhtml.selectstate);
  		this.$element.parent().attr("style",sumhtml.parentstyle);
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
						if($(this).attr("i") == $index){
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
  	//获取复选框选择的ID的所有数据。
  	getRowsDataSelecter:function(){
  		var isShowIcon = this.options.isShowIcon;
  		var elements = this.$element;
	  	var thisdata = [];
  		if(isShowIcon == "true"){
  			elements.find(".zctabletr").each(function(){
	  			if($(this).children(".checkboxtr").children(".checkboxtrinput").is(':checked')){
	  				var obj = new Object();
	  				$(this).children(".zctabletd").each(function(){
	  					var classname = $(this).attr("classname");
	  					var data = $(this).text();
	  					obj[classname] = data;
	  					
	  				})
	  				thisdata.push(obj);
	  				
	  			}
	  		})
  		}else{
  			
	  		elements.find(".zctabletr").each(function(){
	  			if($(this).hasClass("zctable_this")){
	  				var obj = new Object();
	  				$(this).children(".zctabletd").each(function(){
	  					var classname = $(this).attr("classname");
	  					var data = $(this).text();
	  					obj[classname] = data;
	  					
	  				})
	  				thisdata.push(obj);
	  			}
	  		})
	  		
  		}
  		return thisdata;
  	},
  	//获取复选框选择的ID。
  	getRowsIdsSelecter:function(){
  		var isShowIcon = this.options.isShowIcon;
  		var elements = this.$element;
	  	var thisids = [];
  		if(isShowIcon == "true"){
  			elements.find(".zctabletr").each(function(){
	  			if($(this).children(".checkboxtr").children(".checkboxtrinput").is(':checked')){
	  				var thisid = $(this).children(".TABLE_ID_COL").text();
	  				thisids.push(thisid);
	  				
	  			}
	  		})
  		}else{
  			
	  		elements.find(".zctabletr").each(function(){
	  			if($(this).hasClass("zctable_this")){
	  				var thisid = $(this).children(".TABLE_ID_COL").text();
	  				thisids.push(thisid);
	  			}
	  		})
	  		
  		}
  		return thisids;
  	},
  	//获取复选框选择的序列号。
  	getRowsIndexsSelecter:function(){
  		var isShowIcon = this.options.isShowIcon;
  		var elements = this.$element;
	  	var thisindexs = [];
  		if(isShowIcon == "true"){
  			elements.find(".zctabletr").each(function(){
	  			if($(this).children(".checkboxtr").children(".checkboxtrinput").is(':checked')){
	  				var thisindex = $(this).children(".indextr").text();
	  				thisindexs.push(thisindex);
	  				
	  			}
	  		})
  		}else{
  			
	  		elements.find(".zctabletr").each(function(){
	  			if($(this).hasClass("zctable_this")){
	  				var thisindex = $(this).children(".indextr").text();
	  				thisindexs.push(thisindex);
	  			}
	  		})
	  		
  		}
  		return thisindexs;
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
  			if($(this).text() == ""){
  				return;
  			}
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
  	//插行 
  	//参数jsonobj可以为集合  也可以为数字  集合时是塞入插行的数据 数字为空行。
  	insertDataforindex:function(jsonobj,index){
  		var isnan = isNaN(jsonobj);
  		//var jsonobj = eval(jsonobj);	
		if(index ==null || index == ""){
  			alert("插行的id或序号不能为空")
  			return false;
  		}
		var elements = this.$element;
  		elements.find(".zctabletr").each(function(){
  			if($(this).children(".TABLE_ID_COL").text().trim() == index || $(this).children(".indextr").text().trim() == index){
  				var html = $(this).prop("outerHTML");
  				$(this).after(html);
  				$(this).next().children(".zctabletd").addClass("table_isblankline");
  				$(this).next().children(".zctabletd").html("");
  				var shtml = "";
  				var xhtml = $(this).next().prop("outerHTML");
  				if(isnan){
  					for(var h=0;h<jsonobj.length-1;h++){
	  					shtml = shtml+xhtml;
	  				}
  				}else{
  					for(var h=0;h<jsonobj-1;h++){
	  					shtml = shtml+xhtml;
	  				}
  				}
  				
  				$(this).next().after(shtml);
  				var oddback = $(this).attr("oddbackgroundcolor");
				var evenback = $(this).attr("evenbackgroundcolor");
				var trdivs = $(this).nextAll().children(".indextr");
				var indexthis = $(this).children(".indextr").text().trim();
				trdivs.each(function(i){
					$(this).text(parseInt(indexthis)+1+i)
					var indextd = parseInt(indexthis)+i
					if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
						if(indextd%2==0){
							$(this).parent().css("background-color",evenback);
							$(this).parent().attr("tdbackgroundcolor",evenback);
						}else{
							$(this).parent().css("background-color",oddback);
							$(this).parent().attr("tdbackgroundcolor",oddback);
						}
					}
					if(isnan){
	  					for(var h=0;h<jsonobj.length-1;h++){
		  					shtml = shtml+xhtml;
		  				}
	  				}
					/*$(this).children(".zctabletd").each(function(){
						if($(this).hasClass(j+"td")){
							tipinfo = "success";
							$(this).text(jsonobj[i][j]);
						}
					});*/
					
				})
  			}
		})
					
					
		this.refreshPage();		
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
								$(this).parent().children(".indextr").css("background-color",evenback);
								$(this).parent().children(".checkboxtr").css("background-color",evenback);
								$(this).parent().attr("tdbackgroundcolor",evenback);
							}else{
								$(this).parent().css("background-color",oddback);
								$(this).parent().children(".indextr").css("background-color",oddback);
								$(this).parent().children(".checkboxtr").css("background-color",oddback);
								$(this).parent().attr("tdbackgroundcolor",oddback);
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
  		this.refreshPage();
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
  	},
  	//显示0行
  	setupZeroTr:function(state){
  		if(state == "show"){
  			this.$element.children(".hidezctabletr").show();
  			this.$element.children(".hidezctabletr").addClass("zctable_showZero")
  		}else{
  			this.$element.children(".hidezctabletr").hide();
  			this.$element.children(".hidezctabletr").removeClass("zctable_showZero")
  		}
  		
  	},
  	/*
  	 * <div style="float:left;width:'+contentwidth+'px;height:'+titleheight+'px;'+borderline+' '+ispiaofuhtml+'" class="th'+i+' '+colclassname[i]+'th zctablethtd" i="'+i+'" classname="'+colclassname[i]+'" >'+colsname[i]+'</div>'
  	 */
  	//插列
  	insertColforClass:function(classname,classobjs){
  		var elements = this.$element;
  		var options = this.options;
  		for(var i=0;i<classobjs.length;i++){
  			
  			elements.children(".tableth").children(".zctablethtd").each(function(){
	  			if($(this).attr("classname") == classname){
	  				var width = $(this).width();
	  				var pawidth = elements.width();
	  				var thiswidth = parseInt(pawidth)+parseInt(width)+1;
	  				elements.css("width",thiswidth);
	  				var html = $(this).prop("outerHTML");
	  				$(this).after(html);
	  				$(this).next().text(classobjs[i].classtext)
	  				$(this).next().attr("classname",classobjs[i].classname);
	  				$(this).nextAll().each(function(){
	  					var s = $(this).attr("i");
	  					var h = parseInt(parseInt(s)+1);
	  					$(this).attr("i",h);
	  				});
	  			}
	  			
	  		})
  			elements.children(".zctabletr").children(".zctabletd").each(function(){
	  			if($(this).attr("classname") == classname){
	  				var html = $(this).prop("outerHTML");
	  				$(this).after(html);
	  				$(this).next().text("")
	  				$(this).next().attr("classname",classobjs[i].classname);
	  				$(this).nextAll().each(function(){
	  					var s = $(this).attr("i");
	  					var h = parseInt(parseInt(s)+1);
	  					$(this).attr("i",h);
	  				});
	  			}
	  			
	  		})
  			if(classname == ""){
  				var titleheight = options.titleheight;
				var titleborder = options.titleborder;
				var contentwidth = options.contentwidth;
  				var borderline = "";
		  		if(titleborder == "true"){
		  			borderline = "border-right:1px solid #eaeaea;"
		  		}
  				var addhtml = '<div style="float:left;width:'+contentwidth+'px;height:'+titleheight+'px;'+borderline+'" class="th0  '+classobjs[i].classname+'th zctablethtd" i="-1" classname="'+classobjs[i].classname+'" >'+classobjs[i].classtext+'</div>';
  				
				elements.children(".tableth").children(".indexth").after(addhtml);
				elements.children(".tableth").children(".indexth").nextAll().each(function(){
					var width = $(this).width();
	  				var pawidth = elements.width();
	  				var thiswidth = parseInt(pawidth)+parseInt(width);
	  				elements.css("width",thiswidth);
  					var s = $(this).attr("i");
  					var h = parseInt(parseInt(s)+1);
  					$(this).attr("i",h);
  				});
  				
	  				/**
	  				 * <div style="float:left;width:'+contentwidth+'px;height:'+contentheight+'px;" class=" '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" ></div>
	  				 */
				var contentwidth = options.contentwidth;
			  	var contentheight = options.contentheight;
  				var addhtml = '<div style="float:left;width:'+contentwidth+'px;height:'+contentheight+'px;" class="'+classobjs[i].classname+'td zctabletd" i="-1" classname="'+classobjs[i].classname+'" ></div>';
  				
				elements.children(".zctabletr").children(".indextr").after(addhtml);
				elements.children(".zctabletr").children(".indextr").nextAll().each(function(){
					
  					var s = $(this).attr("i");
  					var h = parseInt(parseInt(s)+1);
  					$(this).attr("i",h);
  				});
	  				
	  			
  				
  			}
  			
  			
  			
  		}
  		
  	},
  	//删列
  	removeColByClass:function(classnames){
  		var elements = this.$element;
  		for(var i in classnames){
  			elements.children(".tableth").children(".zctablethtd").each(function(){
	  			if($(this).attr("classname") == classnames[i]){
	  				var width = $(this).width();
	  				var pawidth = elements.width();
	  				var thiswidth = parseInt(pawidth)-parseInt(width)-1;
	  				$(this).nextAll().each(function(){
	  					var s = $(this).attr("i");
	  					var h = parseInt(parseInt(s)-1);
	  					$(this).attr("i",h);
	  				});
	  				$(this).remove();
	  			}
	  			
	  		})
  			elements.children(".zctabletr").children(".zctabletd").each(function(){
	  			if($(this).attr("classname") == classnames[i]){
	  				$(this).nextAll().each(function(){
	  					var s = $(this).attr("i");
	  					var h = parseInt(parseInt(s)+1);
	  					$(this).attr("i",h);
	  				});
	  				$(this).remove();
	  			}
	  			
	  		})
  		}
  	},
  	//获取初始化参数
  	getOptions:function(){
  		var options = this.options;
  		return options;
  	},
  	//插入多行表头
  	insertTitletoTable:function(index,number){
  		var elemnts = this.$element;
  		var tableth = elemnts.children(".tableth")
  		var titlehtml = tableth.prop("outerHTML");
  		if(index == 0){
  			for(var i=number;i>0;i--){
  				tableth.before(titlehtml);
		  		tableth.prev().css("border-bottom","0px")
		  		tableth.prev().children("div").each(function(index){
		  			
		  			if(!$(this).hasClass("indexth")){
		  				var indexs = index+1;
		  				$(this).html(indexs)
		  			}
		  		});
		  		tableth.prev().children(".indexth").html(1);
		  		tableth.prev().addClass("zctable_title");
		  		tableth.prev().removeClass("tableth");
		  		tableth.prev().prevAll().each(function(){
		  			var indexth = $(this).children(".indexth").text();
		  			$(this).children(".indexth").html(parseInt(indexth)+1);
		  		})
  			}
  			
  		}else{
  			elemnts.children(".zctable_title").each(function(){
  				if($(this).children(".indexth").text().trim() == index.toString()){
  					for(var i=number;i>0;i--){
		  				$(this).before(titlehtml);
				  		$(this).prev().css("border-bottom","0px")
				  		$(this).prev().children("div").each(function(index){
				  			var indexs = index+1;
				  			$(this).html(indexs)
				  			
				  		});
				  		$(this).prev().addClass("zctable_title");
				  		$(this).prev().removeClass("tableth");
				  		$(this).prevAll().each(function(indexs){
				  			$(this).children(".indexth").html(parseInt(index)+indexs+1);
				  		})
				  		
		  			}
  				}
  			});
  		}
  		
  		
  	},
  	//合并表头
  	mergeTitle:function(lineindex,colindex,showtext){
  		var lineflag = false;
  		var elemnts = this.$element;
  		elemnts.children(".zctable_title").each(function(index){
  			if(lineindex == index){
  				lineflag = true;
  				var sumwidth = 0;
  				var firstflag = true;
  				var mergediv;
  				var deletediv = [];
  				for(var i in colindex){
  					$(this).children("div").each(function(indexs){
  						if(indexs+1 == colindex[i]){
  							var thiswidht = $(this).width();
  							sumwidth = sumwidth + parseInt(thiswidht);
  							if(firstflag){
  								mergediv = $(this);
  								firstflag = false;
  							}else{
  								deletediv.push($(this));
  							}
  						}
  					})
  				}
  				for(var h in deletediv){
  					deletediv[h].remove();
  				}
  				mergediv.css("width",sumwidth);
  				if(showtext == "index"){
  					showtext = $(this).children(".indexth").text();
  				}
  				mergediv.text(showtext);
  			}
  		})
  		
  		if(!lineflag){
  			return "参数行无效"
  		}
  	},
  	//删除表头
  	deleteTitle:function(index){
  		var elements = this.$element;
  		elements.children(".zctable_title").each(function(){
  				if($(this).children(".indexth").text().trim() == index.toString()){
			  		$(this).prevAll().each(function(indexs){
			  			$(this).children(".indexth").html(parseInt(index)+indexs);
			  		})
			  		$(this).remove();
  				}
  			});
  	},
  	//给单个单元格添加样式
  	setClassInCellByIndex:function(colclassname,index,cellclass){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			if($(this).children(".indextr").text().trim() == index){
  				
  				$(this).children(".zctabletd").each(function(){
  					if($(this).attr("classname") == colclassname){
  						$(this).addClass(cellclass);
  					}
  				})
  			}
  		})
  	},
  	//删除样式
  	removeClassCellByIndex:function(colclassname,index,cellclass){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			if($(this).children(".indextr").text().trim() == index){
  				
  				$(this).children(".zctabletd").each(function(){
  					if($(this).attr("classname") == colclassname){
  						$(this).removeClass(cellclass);
  					}
  				})
  			}
  		})
  	},
  	//给单个单元格添加样式
  	setClassInCellById:function(colclassname,id,cellclass){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			if($(this).children(".TABLE_ID_COL").text().trim() == id){
  				$(this).children(".zctabletd").each(function(){
  					if($(this).attr("classname") == colclassname){
  						$(this).addClass(cellclass);
  					}
  				})
  			}
  		})
  	},
  		//删除样式
  	removeClassCellById:function(colclassname,id,cellclass){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			if($(this).children(".TABLE_ID_COL").text().trim() == id){
  				$(this).children(".zctabletd").each(function(){
  					if($(this).attr("classname") == colclassname){
  						$(this).removeClass(cellclass);
  					}
  				})
  			}
  		})
  	},
  	//获取当前单元格的对象
  	getOperationThisCell:function(){
  		//zctabletd_this
  		var elements = this.$element;
  		var thisobj = new Object();
  		elements.find(".zctabletr").each(function(){
  			if($(this).hasClass("zctable_this")){
  				thisobj["index"] = $(this).children(".indextr").text();
  				thisobj["id"] = $(this).children(".TABLE_ID_COL").text();
  				thisobj["value"] = $(this).children(".zctabletd_this").text();
  				thisobj["colclassname"] = $(this).children(".zctabletd_this").attr("classname");
  			}
  		})
  		return thisobj;
  	},
  	//为列赋予新值  列名 列样式
  	setColNewValue:function(colclassname,newcolclassname,newcolname){
  		var elements = this.$element;
  		elements.children(".tableth").children(".zctablethtd").each(function(){
  			if($(this).attr("classname") == colclassname){
  				$(this).attr("classname",newcolclassname);
  				$(this).removeClass(colclassname+"th");
  				$(this).addClass(newcolclassname+"th")
  				$(this).text(newcolname);
  			}
  		});
  		elements.children(".zctabletr").children(".zctabletd").each(function(){
  			if($(this).attr("classname") == colclassname){
  				$(this).attr("classname",newcolclassname);
  				$(this).removeClass(colclassname+"td");
  				$(this).addClass(newcolclassname+"td")
  			}
  		})
  	},
  	//赋予单元格选择参数。
  	setSelectstate:function(state){
  		this.options.selectstate = state;
  		this.$element.attr("selectstate",state);
  	},
  	//获取所有选中单元格方法
  	getSelectCellobjs:function(){
  		
  		var elements = this.$element;
  		var cellobjs = [];
  		elements.find(".zctabletd_select").each(function(){
  			var thisobj = new Object();
			thisobj["index"] = $(this).parent().children(".indextr").text();
			thisobj["id"] = $(this).parent().children(".TABLE_ID_COL").text();
			thisobj["value"] = $(this).text();
			thisobj["colclassname"] = $(this).attr("classname");
			cellobjs.push(thisobj);
  		})
  		return cellobjs;
  	},
  	AddMonitor:function(){
  		if(inittableindex==1){
			$(window).resize(function () {          //当浏览器大小变化时
				setTimeout(function(){
					for(var i=0;i<isautos.length;i++){
				    	//alert(isautos[i].options.indexwidth)
				    	var parentdiv = isautos[i].$element.parent().width();
	  		
	  					var contentwidth;
	  					var iconwidth;
						var thiswidth = parentdiv;
						if(isautos[i].options.isauto == "true"){
							if(isautos[i].options.isShowIndex == "true"){
								thiswidth = thiswidth - isautos[i].options.indexwidth;
							}
							if(isautos[i].options.isShowIcon == "true"){
								thiswidth = thiswidth - isautos[i].options.iconwidth*0.4;
								iconwidth = isautos[i].options.iconwidth;
							}
							if(isautos[i].options.isShowCheckbox == "true"){
								thiswidth = thiswidth - isautos[i].options.checkboxwidth;
							}
							contentwidth = thiswidth/isautos[i].options.colsname.length;
						}
						//alert(contentwidth);
						isautos[i].$element.children("div").children("div").each(function(){
							if($(this).attr("i")!=null || $(this).attr("i")!=""){
								$(this).css("width",contentwidth);
							}
							if($(this).hasClass("icontr")){
								$(this).css("width",iconwidth*0.6);
							}
						});
				    }
				},100)
			    
			});
			//监听分页跳转方法
			$(document).on("click",".page_number_btn",function(){
				var currentp =  $(this).siblings(".page_number_input").val();
				if(isNaN(currentp) || currentp.trim() == ""){
					alert("不是数字！")
					return false;
				}else{
					currentp = parseInt(currentp);
				}
				var pagenum =parseInt($(this).siblings(".page_sum_span").text().trim());
				if(currentp<1 || currentp>pagenum){
					alert("请输入页码范围内的数字！")
					return false;
				}else{
					currentpage = currentp;
				}
				var elements = $(this).parent().parent().parent().parent().parent().parent();
				var	maxindex = elements.children(".zctabletr").children(".indextr").length-1;
				var pagenum = Math.ceil(maxindex/pagesize);
	  			var startnum = (currentpage-1)*pagesize;
	  			var endnum = currentpage*pagesize+1;
		  		elements.find(".indextr").each(function(){
		  			if($(this).parent().hasClass("zctable_showZero")){
		  				return;
		  			}
		  			var indexnum = parseInt($(this).text());
		  			if(indexnum>startnum && indexnum<endnum){
		  				$(this).parent().addClass("zctable_page_show");
		  				$(this).parent().show();
		  			}else{
		  				$(this).parent().removeClass("zctable_page_show")
		  				$(this).parent().hide();
		  			}
		  		})
		  		var leftpagenum = 1;
		  		if(currentpage>1){
		  			leftpagenum = currentpage-1;
		  		}
		  		var pagehtml = '<li><a class="zctable_page_a" pagenumber="1" style="cursor:pointer;"><span class="glyphicon glyphicon-step-backward"></span></a></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;"><</a></li>'
		  		if(currentpage>1){
		  			pagehtml = pagehtml+'<li ><a class="zctable_page_a"  pagenumber="'+parseInt(currentpage-1)+'"  style="cursor:pointer">'+parseInt(currentpage-1)+'</a></li>';
		  			
		  		}
		  		pagehtml = pagehtml+'<li class="active"><a>'+currentpage+'</a></li>';
		  		if(currentpage<pagenum){
		  			pagehtml = pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(parseInt(currentpage)+1)+'" style="cursor:pointer">'+parseInt(parseInt(currentpage)+1)+'</a></li>';
		  		}
		  		var rightpagenum = pagenum;
		  		if(currentpage<pagenum){
		  			rightpagenum = parseInt(parseInt(currentpage)+1);
		  		}
		  		//alert(rightpagenum)
		  		pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+rightpagenum+'" style="cursor:pointer">></a></li><li><a class="zctable_page_a" pagenumber="'+pagenum+'" style="cursor:pointer;"><span class="glyphicon glyphicon-step-forward"></span></a></li>';
		  		pagehtml = pagehtml + '<li><span style="background:#f7f7f7;">每页<span style="color:red">'+pagesize+'</span>行，共<span style="color:red" class="page_sum_span">'+pagenum+'</span>页，'
		  		pagehtml = pagehtml+'当前第<span style="color:red">'+currentpage+'</span>页，'
		  		pagehtml = pagehtml+'可跳转<input type="text" style="width:40px;color:#000;height:20px" class="page_number_input" /><button class="btn btn-info page_number_btn" style="height:20px;line-height:20px;padding:0px 2px;vertical-align:inherit;font-size:12px;">确定</button>'
		  		pagehtml = pagehtml+'</span></li>';
		  		elements.find(".zctable_page_ul").html(pagehtml);
			});
			//监听分页选中方法
			$(document).on("click",".zctable_page_a",function(){
				var currentp = parseInt($(this).attr("pagenumber").trim());
				currentpage = currentp;
				
				var elements = $(this).parent().parent().parent().parent().parent();
				var	maxindex = elements.children(".zctabletr").children(".indextr").length-1;
				var pagenum = Math.ceil(maxindex/pagesize);
	  			var startnum = (currentpage-1)*pagesize;
	  			var endnum = currentpage*pagesize+1;
		  		elements.find(".indextr").each(function(){
		  			if($(this).parent().hasClass("zctable_showZero")){
		  				return;
		  			}
		  			var indexnum = parseInt($(this).text());
		  			if(indexnum>startnum && indexnum<endnum){
		  				$(this).parent().addClass("zctable_page_show");
		  				$(this).parent().show();
		  			}else{
		  				$(this).parent().removeClass("zctable_page_show")
		  				$(this).parent().hide();
		  			}
		  		})
		  		var leftpagenum = 1;
		  		if(currentpage>1){
		  			leftpagenum = currentpage-1;
		  		}
		  		var pagehtml = '<li><a class="zctable_page_a" pagenumber="1" style="cursor:pointer;"><span class="glyphicon glyphicon-step-backward"></span></a></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;"><</a></li>'
		  		if(currentpage>1){
		  			pagehtml = pagehtml+'<li ><a class="zctable_page_a"  pagenumber="'+parseInt(currentpage-1)+'"  style="cursor:pointer">'+parseInt(currentpage-1)+'</a></li>';
		  			
		  		}
		  		pagehtml = pagehtml+'<li class="active"><a>'+currentpage+'</a></li>';
		  		if(currentpage<pagenum){
		  			pagehtml = pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(parseInt(currentpage)+1)+'" style="cursor:pointer">'+parseInt(parseInt(currentpage)+1)+'</a></li>';
		  		}
		  		var rightpagenum = pagenum;
		  		if(currentpage<pagenum){
		  			rightpagenum = parseInt(parseInt(currentpage)+1);
		  		}
		  		//alert(rightpagenum)
		  		pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+rightpagenum+'" style="cursor:pointer">></a></li><li><a class="zctable_page_a" pagenumber="'+pagenum+'" style="cursor:pointer;"><span class="glyphicon glyphicon-step-forward"></span></a></li>';
		  		pagehtml = pagehtml + '<li><span style="background:#f7f7f7;">每页<span style="color:red">'+pagesize+'</span>行，共<span style="color:red" class="page_sum_span">'+pagenum+'</span>页，'
		  		pagehtml = pagehtml+'当前第<span style="color:red">'+currentpage+'</span>页，'
		  		pagehtml = pagehtml+'可跳转<input type="text" style="width:40px;color:#000;height:20px" class="page_number_input" /><button class="btn btn-info page_number_btn" style="height:20px;line-height:20px;padding:0px 2px;vertical-align:inherit;font-size:12px;">确定</button>'
		  		pagehtml = pagehtml+'</span></li>';
		  		elements.find(".zctable_page_ul").html(pagehtml);
			})
			//监听复选框全选择
			$(document).on("click",".checkboxthinput",function(){
				if($(this).is(':checked')){
					$(this).parent().parent().siblings(".zctabletr").children(".checkboxtr").children(".checkboxtrinput").prop("checked", true);
				}else{
					$(this).parent().parent().siblings(".zctabletr").children(".checkboxtr").children(".checkboxtrinput").prop("checked", false);
				}
				
			})
			$(document).on("click",".checkboxtrinput",function(e){
				e.stopPropagation();
			})
			
			//监听行选择
			$(document).on("mouseover",".zctabletr",function(){
				$(this).css("background-color","#D1FCF0");
				$(this).addClass("zctable_this");
				//$(this).children(".indextr").css("background-color","#D1FCF0");
				//$(this).children(".checkboxtr").css("background-color","#D1FCF0");
			});
			$(document).on("mouseout",".zctabletr",function(){
				var tdbackgroundcolor = $(this).attr("tdbackgroundcolor");
				$(this).css("background-color",tdbackgroundcolor);
				$(this).removeClass("zctable_this");
				//$(this).children(".indextr").css("background-color",tdbackgroundcolor);
				//$(this).children(".checkboxtr").css("background-color",tdbackgroundcolor);
			});
			$(document).on("click",".zctabletr",function(){
				$(this).children(".checkboxtr").children(".checkboxtrinput").click();
			});
			//监听列选择
			$(document).on("mouseover",".zctabletd",function(){
				$(this).addClass("zctabletd_this");
			});
			$(document).on("mouseout",".zctabletd",function(){
				$(this).removeClass("zctabletd_this");
			});
			$(document).on("click",".zctabletd",function(){
				var selectstate = $(this).parent().parent().attr("selectstate");
				if(selectstate.toString() == "true"){
					if($(this).hasClass("zctabletd_select")){
						$(this).removeClass("zctabletd_select");
						$(this).css("background-color","")
					}else{
						$(this).addClass("zctabletd_select");
						$(this).css("background-color","#00E8D7")
					}
					
				}
			});
			//监听+号方法
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
								$(this).parent().attr("tdbackgroundcolor",evenback);
							}else{
								$(this).parent().css("background-color",oddback);
								$(this).parent().attr("tdbackgroundcolor",oddback);
							}
						}
					})
					
					
				}
				
			});
			//监听删除方法
			$(document).on("click",".zctable_glyphicon-trash",function(){
				if(!$(this).hasClass("icon_no_method")){
					
					var oddback = $(this).parents(".zctabletr").attr("oddbackgroundcolor");
					var evenback = $(this).parents(".zctabletr").attr("evenbackgroundcolor");
					var trdivs = $(this).parents(".zctabletr").nextAll().children(".indextr");
					trdivs.each(function(){
						var indextd = $(this).text();
						$(this).text(parseInt(indextd)-1);
						if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
							if(indextd%2==0){
								$(this).parent().css("background-color",evenback);
								$(this).parent().attr("tdbackgroundcolor",evenback);

							}else{
								$(this).parent().css("background-color",oddback);
								$(this).parent().attr("tdbackgroundcolor",oddback);
							}
						}
					})
					
					$(this).parents(".zctabletr").children("div").each(function(){
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
					
					$(this).parents(".zctabletr").remove();
					
				}
				
				
			})
			
			
	  		//监听表格编辑方法
			$(document).on("click",".create_table_Edit",function(e){
				e.stopPropagation();
				/*if($(this).hasClass("table_isblankline")){
					return false;
				}*/
				var $text = $(this).text().trim();
				//alert($text);
				var width = $(this).width()*0.95;
				var height = $(this).parent().height();
				var marginheight = height/4;
				var inputheight = height/2;
				var inputhtml = '<input type="text" class="create_table_Edit_input" style="height:'+inputheight+'px;margin-top:'+marginheight+'px;border:1px solid #77BCAB;line-height:'+marginheight+'px;width:'+width+'px" />';
				if($(this).hasClass("create_table_Edit_Date")){
					
				inputhtml = '<input id="create_table_Edit_input_Date" class="create_table_Edit_input create_table_Edit_input_Date" style="height:'+inputheight+'px;margin-top:'+marginheight+'px;border:1px solid #77BCAB;line-height:'+marginheight+'px;width:'+width+'px" >'
				}
				$(this).html(inputhtml);
				var $children = $(this).children(".create_table_Edit_input");
				$children.focus().val($text);
				$children.attr("beforevalue",$text);
				if($(this).hasClass("create_table_Edit_Date")){
					laydate.skin('yalan');
					laydate({
					  elem: '#create_table_Edit_input_Date',
					  format: 'YYYY-MM-DD hh:mm:ss', // 分隔符可以任意定义，该例子表示只显示年月
					  festival: true, //显示节日
					  istime: true,
					  isclear:false,
					  issure:false,
  					  istoday: false,
					  choose: function(datas){ //选择日期完毕的回调
					   
					    var classname = $("#create_table_Edit_input_Date").parent().attr("classname");
						var colid = $("#create_table_Edit_input_Date").parent().parent().children(".TABLE_ID_COL").text();
						var indextext = $("#create_table_Edit_input_Date").parent().parent().children(".indextr").text();
						editobj = new Object();
						editobj["classname"] = classname;
						editobj["value"] = datas;
						editobj["id"] = colid;
						editobj["index"] = indextext;
						$("#create_table_Edit_input_Date").parent().html(datas);
					  }
					});
				}
			});
			//组织冒泡
			$(document).on("click",".create_table_Edit_input",function(e){
				e.stopPropagation();
			});
			//监听表格编辑input光标离开
			$(document).on("blur",".create_table_Edit_input",function(e){
				if($(this).hasClass("create_table_Edit_input_Date")){
					return false;
				}
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
					var classname = $(this).parent().attr("classname");
					var colid = $(this).parent().parent().children(".TABLE_ID_COL").text();
					var indextext = $(this).parent().parent().children(".indextr").text();
					editobj = new Object();
					editobj["classname"] = classname;
					editobj["value"] = value;
					editobj["id"] = colid;
					editobj["index"] = indextext;
					$parent.html(value);
			});
			
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
  	}
  }
  
  $.fn.toCreateZcTable = function(options){
  	var createZcTable = new CreateZcTable(this, options);
  	if(options.isauto == "true"){
		isautos.push(createZcTable);
	}else{
		isnoautos.push(createZcTable);
	}
  	return createZcTable;
  }
})(jQuery,window,document);



