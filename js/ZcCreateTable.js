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
  var functions = new Object();
  var edithtmlparameters = new Object();
  var tableparameters = new Object();
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
  		"oddbackgroundcolor":"false",//基数样式
  		"evenbackgroundcolor":"false",//偶数样式
  		"contentborder":"false",//表体分割线
  		"titleborder":"false",//表头分割线
  		"ispiaofu":"false",//是否漂浮
  		"ispageshow":"false",//是否展示分页
  		"pagesize":"10",//页面数据条数
  		"totalnumber":"-1",//总共多少条，一次性加载不要传入此参数
  		"currentpage":"1",//当前页数，一次性加载不要传入此参数
  		"colsdatas":[],//列与数据集合体 还未完成
  		"selectstate":"false",//是否打开选择状态，控制表体和多行表头
  		"pageParent":"",//指定分页显示的父容器
  		"pageTable":"",//指定控制哪一个表格
  		"trnotselect":"false"
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
		var oddbackgroundcolor = this.options.evenbackgroundcolor;
		var evenbackgroundcolor = this.options.oddbackgroundcolor;
		var isShowCheckbox = this.options.isShowCheckbox;
		var checkboxwidth = this.options.checkboxwidth;
		var contentborder = this.options.contentborder;
		var titleborder = this.options.titleborder
		var ispiaofu = this.options.ispiaofu
		var ispageshow = this.options.ispageshow
		currentpage = this.options.currentpage
		var selectstate = this.options.selectstate;
		var pageParent = this.options.pageParent;
		var pageTable = this.options.pageTable;
		var trnotselect = this.options.trnotselect;
		this.$element.attr("selectstate",selectstate);
		this.$element.attr("trnotselect",trnotselect);
		this.$element.attr("inittableindex","table"+inittableindex);
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
				iconwidth = iconwidth*0.95;
			}
			if(isShowCheckbox == "true"){
				thiswidth = thiswidth - checkboxwidth;
			}
			contentwidth = Math.floor(thiswidth/colsnumber);
		}
  		
  		//创建表格div为0
  		var sumhtml = '';
  		var borderline = "";
  		if(titleborder == "true"){
  			borderline = "border-right:1px solid #eaeaea;"
  		}
  		
  		//创建一行标题div
  		var thdiv = '<div style="width:100%;height:'+titleheight+'px;float:left;background:'+titlebackgroundcolor+';border:1px solid #eaeaea;line-height:'+titleheight+'px;border-left:0px;" class="tableth" titlebackgroundcolor="'+titlebackgroundcolor+'" >';
  		var marginleft = 0;
  		var ispiaofuhtml = "";
  		if(ispiaofu == "true"){
  			ispiaofuhtml = "position:absolute!important;z-index:9999;"
  		}
  		if(isShowCheckbox == "true"){
  			
  			thdiv = thdiv+'<div style="float:left;width:'+checkboxwidth+'px;height:'+parseFloat(titleheight-2)+'px;'+borderline+' '+ispiaofuhtml+'" class="checkboxth"><input type="checkbox" class="checkboxthinput"></div>'
  			
  			marginleft = marginleft+parseInt(checkboxwidth);
  		}
  		if(isShowIndex == "true"){
  		
	  		if(ispiaofu == "true"){
	  			ispiaofuhtml ='position:absolute;margin-left:'+marginleft+'px;z-index:9999;border-right:1px solid #eaeaea;box-shadow:1px 0 0 rgba(0,0,0,0.2);'
	  		}
  		
  			thdiv = thdiv+'<div style="float:left;width:'+indexwidth+'px;height:'+parseFloat(titleheight-2)+'px;'+borderline+' '+ispiaofuhtml+'" class="indexth">序号</div>'
  			
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
		
  		var trzerodiv = '<div tdbackgroundcolor="'+tdbackgroundcolor+'" style="width:100%;height:'+contentheight+'px;float:left;background:'+tdbackgroundcolor+';line-height:'+parseFloat(contentheight)+'px;display:none;'+contentborderhtml+' '+contentleftright+'" class="tabletr'+0+' zctabletr hidezctabletr" '+oddeven+'>';
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
  		
		if(rowsnumber == 0){
			rowsnumber = datainto.length;
		}
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
	  					trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;margin-left:'+marginleft+'px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" >'+datainto[i][h]+'</div>'
	  				}else{
	  					trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd"  i="'+h+'" classname="'+colclassname[h]+'" >'+datainto[i][h]+'</div>'
	  				}
	  				
	  			}
	  		}else{
	  			for(var h=0;h<colclassname.length;h++){
	  				if(h==0){
	  					trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;margin-left:'+marginleft+'px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd table_isblankline"  i="'+h+'" classname="'+colclassname[h]+'" ></div>'
	  				}else{
	  					trinputdiv = trinputdiv + '<div style="float:left;width:'+contentwidth+'px;'+borderwidth+'height:'+contentheight+'px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'+borderline+'" class="tr'+i+' '+colclassname[h]+'td zctabletd table_isblankline"  i="'+h+'" classname="'+colclassname[h]+'" ></div>'
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
  		if(pageTable!="" && pageParent !="" && ispageshow == "true"){
  			$(pageParent).html(pagehtml);
  		}else{
  			sumhtml = sumhtml + pagehtml;
  		}
  		
  		this.$element.html(sumhtml);
  		
  		if(ispageshow == "true"){
  			this.refreshPage();
  		}
		
		this.AddMonitor();
		
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
  		var ispageshow = this.options.ispageshow;
  		if(ispageshow != "true"){
  			return false;
  		}
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
  			var pageTable = this.options.pageTable;
  			
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
	  		var pagehtml = '<li ><div href="#" style="border:0px;float: left;line-height:34px;">共'+maxindex+'条</div></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;"><</a></li>'
	  		if(currentpage>1){
	  			pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+1+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+1+'</a></li>'
	  			
	  			if(currentpage != 2 && currentpage != 3){
	  				
	  				pagehtml = pagehtml+'<li><div href="#" style="border:0px;float: left;line-height:30px;margin-left: 10px;color:#00c0de;">...</div></li>'
	  			}
	  			
	  			
	  		}
	  		if(currentpage>2){
	  			pagehtml = pagehtml+'<li ><a class="zctable_page_a"  pagenumber="'+parseInt(currentpage-1)+'"  style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(currentpage-1)+'</a></li>';
	  			
	  		}
	  		pagehtml = pagehtml+'<li class="active"><a style="margin-left: 10px;background:#777777;color: white;border: 1px #777777 solid;">'+currentpage+'</a></li>';
	  		if(currentpage<pagenum){
	  			pagehtml = pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(parseInt(currentpage)+1)+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(parseInt(currentpage)+1)+'</a></li>';
	  		}
	  		var rightpagenum = pagenum;
	  		if(currentpage<pagenum){
	  			rightpagenum = parseInt(parseInt(currentpage)+1);
	  		}
	  		if(currentpage<pagenum-1){
	  			if(currentpage != pagenum-2){
	  				pagehtml = pagehtml+'<li><div href="#" style="border:0px;float: left;line-height:30px;margin-left: 10px;color:#00c0de;">...</div></li>'
	  			}
	  			
	  			pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(pagenum)+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(pagenum)+'</a></li>'
	  		}
	  		
	  		
	  		//alert(rightpagenum)
	  		pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+rightpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">></a></li>';
	  		pagehtml = pagehtml + '<li><div href="#" style="border:0px;float: left;line-height:34px;margin-left: 10px;" >跳转到<input type="text" style="width:40px;color:#000;height:20px" class="page_number_input" />页</div><div class="btn btn-info page_number_btn" style="margin-left: 10px;border-radius: 2px;">确定</div></li>'
	  		
	  		
	  		elements.find(".zctable_page_ul").html(pagehtml);
	  		var pageParent = this.options.pageParent;
	  		if(pageParent != ""){
	  			$(pageParent).html('<ul class="pagination zctable_page_ul" style="margin:0px;" pageTable="'+pageTable+'" pageParent="'+pageParent+'"></ul>');
	  			$(pageParent).find(".zctable_page_ul").html(pagehtml);
	  		}
	  		
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
								$(this).removeClass("create_table_Edit_Custom")
								$(this).removeClass("create_table_Edit_Date");
								$(this).addClass("create_table_Edit");
								if(xings == "date"){
									$(this).addClass("create_table_Edit_Date");
								}
								if(xings == "custom"){
									$(this).addClass("create_table_Edit_Custom")
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
  	setEditHtmlCustom:function(name,inputhtml,callback){
  		edithtmlparameters[name] = new Object();
  		edithtmlparameters[name]["html"] = inputhtml;
  		edithtmlparameters[name]["callback"] = callback;
  	},
  	closeEditCustom:function(showtexts){
  		
  		var elements = this.$element;
  		elements.find(".Editing_Table_this").each(function(){
  			var value = $(this).val();
			var $parent = $(this).parent(".zctabletd");
			if(showtexts != null && showtexts != ""){
  				value = showtexts;
  			}
		
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
			var tablebiaos = elements.attr("inittableindex");
			if(functions[tablebiaos]!=null){
				if(functions[tablebiaos]["celleditsuccess"]!=null && functions[tablebiaos]["celleditsuccess"]!=""){
					$(functions[tablebiaos]["celleditsuccess"]);
				}
			}
  		})
				
			
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
								$(this).removeClass("create_table_Edit_Custom");
								$(this).removeClass("create_table_Edit_Date");
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
  		inittableindex = inittableindex+1;
  		this.AddMonitor();
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
	  				var parentwidth = $(this).parent().width();
	  				var thiswidth = $(this).width();
	  				var nowwidth = sumwidth-thiswidth;
	  				$(this).parent().css("width",nowwidth-1+"px");
	  				$(this).parent().parent().css("width",nowwidth+"px");
	  				
	  			
  					//如果是自适应模式将重新赋值；
	  				if(options.isauto == "true"){
	  					var indextr = options.indexwidth;
	  					var icontr = options.iconwidth;
	  					var checkboxtr = options.checkboxwidth;
	  					var widthnow = sumwidth;
	  					if(options.isShowIndex == "true"){
							widthnow = widthnow - indextr;
						}
						if(options.isShowIcon == "true"){
							widthnow = widthnow - icontr;
							//iconwidth = isautos[i].options.iconwidth*0.95;
						}
						if(options.isShowCheckbox == "true"){
							widthnow = widthnow-checkboxtr;
						}
	  					var trsum = $(this).parent().children(".zctablethtd").length;
						var hidesum = $(this).parent().children(".create_table_hide").length;
						widthnow = widthnow;
						nowwidths = Math.floor(widthnow/(trsum-hidesum-1));
						//alert((trsum-hidesum)*thiswidth);
						$(this).parent().css("width",parentwidth+"px");
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
  	//获取复选框选择的所有数据。
  	getRowsDataSelecter:function(){
  		var isShowCheckbox = this.options.isShowCheckbox;
  		var elements = this.$element;
	  	var thisdata = [];
  		if(isShowCheckbox == "true"){
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
	  			if($(this).hasClass("zctable_this_select")){
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
  		var isShowCheckbox = this.options.isShowCheckbox;
  		var elements = this.$element;
	  	var thisids = [];
  		if(isShowCheckbox == "true"){
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
  	//获取全部数据包括序列号 id为空的
  	getTableData:function(){
  		
  		var objs = [];
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(index){
  			if(index == 0){
  				return;
  			}
  			var obj = new Object();
  			$(this).children("div").each(function(){
	  			if($(this).hasClass("indextr")){
	  				obj["index"] = $(this).text().trim();
	  			}else if($(this).attr("classname") != null && $(this).attr("classname") != ""){
	  				var classname = $(this).attr("classname").trim();
	  				obj[classname] = $(this).text().trim();
	  			}
			
  				
  			});
  			
  			objs.push(obj);	
  		})
  		
  		return objs;
  	
  	},
  	//通过ID塞某个值
  	setColDataInfo:function(jsonobj){
  		var jsonobj = eval(jsonobj);
  		var tipinfo = "";
  		var danlei = "";
  		for(var i in jsonobj){
	  		var elements = this.$element;
	  		danlei = "没有创建指定ID";
	  		elements.children(".zctabletr").each(function(){
	  			if($(this).children(".TABLE_ID_COL").text().trim() == i || $(this).children(".indextr").text().trim() == i){
	  				for(var j in jsonobj[i]){						
								$(this).children(".zctabletd").each(function(){
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
		var indexjh = [];
		var elements = this.$element;
  		elements.find(".zctabletr").each(function(){
  			if($(this).children(".TABLE_ID_COL").text().trim() == index || $(this).children(".indextr").text().trim() == index){
  				var html = $(this).prop("outerHTML");
  				$(this).after(html);
  				$(this).next().children(".zctabletd").addClass("table_isblankline");
  				$(this).next().children(".zctabletd").html("");
  				var shtml = "";
  				var xhtml = $(this).next().prop("outerHTML");
  				var indexthis = $(this).children(".indextr").text().trim();
  				indexjh.push(parseInt(indexthis)+1);
  				if(isnan){
  					for(var h=0;h<jsonobj.length-1;h++){
	  					shtml = shtml+xhtml;
	  					indexjh.push(parseInt(indexthis)+1+h+1);
	  				}
  					
  				}else{
  					for(var h=0;h<jsonobj-1;h++){
	  					shtml = shtml+xhtml;
	  					indexjh.push(parseInt(indexthis)+1+h+1);
	  				}
  				}
  				
  				$(this).next().after(shtml);
  				var oddback = $(this).attr("oddbackgroundcolor");
				var evenback = $(this).attr("evenbackgroundcolor");
				var trdivs = $(this).nextAll().children(".indextr");
				
				
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
					if(i<jsonobj.length){
						for(var s in jsonobj[i]){
  							$(this).parent().children(".zctabletd").each(function(){
								if($(this).attr("classname") == s){
									$(this).text(jsonobj[i][s]);
								}
							});
  						}
					}
					
				})
				
				/*if(isnan){
  					for(var h=0;h<jsonobj.length;h++){
  						for(var s in jsonobj[h]){
  							$(this).next().children(".zctabletd").each(function(){
								if($(this).attr("classname") == s){
									$(this).text(jsonobj[h][s]);
								}
							});
  						}
	  					
	  				}
  				}*/
					
				return false;
  			}
		})
					
					
		this.refreshPage();	
		return indexjh;
  	},
  	//给多个空行塞值
  	setRowsDataInfo:function(jsonobj,indexs){
  		var jsonobj = eval(jsonobj);
  		var tipinfo = "error";
  		var indexjh = [];
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
						indexjh.push(parseInt(indextd)+1);
						if(oddback != "" && oddback!=null && evenback!="" && evenback !=null){
							if(indextd%2==0){
								$(this).parent().css("background-color",evenback);
								//$(this).parent().children(".indextr").css("background-color",evenback);
								//$(this).parent().children(".checkboxtr").css("background-color",evenback);
								$(this).parent().attr("tdbackgroundcolor",evenback);
							}else{
								$(this).parent().css("background-color",oddback);
								//$(this).parent().children(".indextr").css("background-color",oddback);
								//$(this).parent().children(".checkboxtr").css("background-color",oddback);
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
  		if(indexjh.length != 0){
  			return indexjh;
  		}
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
	//ID或者序列号改变单元格内容
	setHtmlColByCustom:function(jsonobj){
		var elements = this.$element;
		for(var i in jsonobj){
			
			elements.find(".zctabletr").each(function(){
		  		if($(this).children(".TABLE_ID_COL").text().trim() == i || $(this).children(".indextr").text().trim() == i){
		  			
		  			for(var j in jsonobj[i]){	
		  				var thisobj = $(this).find("."+j+"td");
		  				thisobj.html(jsonobj[i][j]);
		  			}
		  		}
		 	});
		}
		this.setNewSum();
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
  	insertColforClass:function(classname,classobjs,position){
  		var elements = this.$element;
  		var options = this.options;
  		for(var i=classobjs.length-1;i>=0;i--){
  			
  			elements.children(".zctable_title").children(".zctablethtd").each(function(){
	  			if($(this).attr("classname") == classname){
	  				var html = $(this).prop("outerHTML");
	  				if(position == "before"){
	  					$(this).before(html);
		  				$(this).prev().text(classobjs[i].classtext)
		  				$(this).prev().attr("classname",classobjs[i].classname);
		  				$(this).prev().nextAll().each(function(){
		  					var s = $(this).attr("indexst");
		  					var h = parseInt(parseInt(s)+1);
		  					$(this).attr("indexst",h);
		  				});
		  				$(this).prev().attr("class",classobjs[i].classname+"th zctablethtd create_table_Edit") 
	  				}else{
	  					$(this).after(html);
		  				$(this).next().text(classobjs[i].classtext)
		  				$(this).next().attr("classname",classobjs[i].classname);
		  				$(this).nextAll().each(function(){
		  					var s = $(this).attr("indexst");
		  					var h = parseInt(parseInt(s)+1);
		  					$(this).attr("indexst",h);
		  				});
		  				$(this).next().attr("class",classobjs[i].classname+"th zctablethtd create_table_Edit") 
	  				}
	  				
	  			}
	  			
	  		})
  			elements.children(".tableth").children(".zctablethtd").each(function(){
	  			if($(this).attr("classname") == classname){
	  				var width = $(this).width();
	  				var pawidth = elements.width();
	  				var thiswidth = parseInt(pawidth)+parseInt(width)+1;
	  				elements.css("width",thiswidth);
	  				var html = $(this).prop("outerHTML");
	  				if(position == "before"){
	  					$(this).before(html);
		  				$(this).prev().text(classobjs[i].classtext)
		  				$(this).prev().attr("classname",classobjs[i].classname);
		  				$(this).prev().nextAll().each(function(){
		  					var s = $(this).attr("i");
		  					var h = parseInt(parseInt(s)+1);
		  					$(this).attr("i",h);
		  				});
		  				$(this).prev().attr("class",classobjs[i].classname+"th zctablethtd") 
	  				}else{
	  					$(this).after(html);
		  				$(this).next().text(classobjs[i].classtext)
		  				$(this).next().attr("classname",classobjs[i].classname);
		  				$(this).nextAll().each(function(){
		  					var s = $(this).attr("i");
		  					var h = parseInt(parseInt(s)+1);
		  					$(this).attr("i",h);
		  				});
		  				$(this).next().attr("class",classobjs[i].classname+"th zctablethtd") 
	  				}
	  				
	  			}
	  			
	  		})
  			elements.children(".zctabletr").children(".zctabletd").each(function(){
	  			if($(this).attr("classname") == classname){
	  				var html = $(this).prop("outerHTML");
	  				if(position == "before"){
	  					$(this).before(html);
		  				$(this).prev().text("")
		  				$(this).prev().attr("classname",classobjs[i].classname);
		  				$(this).prev().removeClass("zctabletd_select");
						$(this).prev().css("background-color","")
		  				$(this).prev().nextAll().each(function(){
		  					var s = $(this).attr("i");
		  					var h = parseInt(parseInt(s)+1);
		  					$(this).attr("i",h);
		  				});
		  				$(this).prev().attr("class",classobjs[i].classname+"td zctabletd") 
	  				}else{
		  				$(this).after(html);
		  				$(this).next().text("")
		  				$(this).next().attr("classname",classobjs[i].classname);
		  				$(this).next().removeClass("zctabletd_select");
						$(this).next().css("background-color","")
		  				$(this).nextAll().each(function(){
		  					var s = $(this).attr("i");
		  					var h = parseInt(parseInt(s)+1);
		  					$(this).attr("i",h);
		  				});
		  				$(this).next().attr("class",classobjs[i].classname+"td zctabletd") 
	  				}
	  				
	  				
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
					
  					var s = $(this).attr("i");
  					var h = parseInt(parseInt(s)+1);
  					$(this).attr("i",h);
  				});
  				//var width = $(this).next().width();
  				var pawidth = elements.width();
  				var thiswidth = parseInt(pawidth)+parseInt(contentwidth);
  				elements.css("width",thiswidth);
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
  			
  			elements.children(".zctable_title").children(".zctablethtd").each(function(){
	  			if($(this).attr("classname") == classnames[i]){
	  				var width = $(this).width();
	  				var pawidth = elements.width();
	  				var thiswidth = parseInt(pawidth)-parseInt(width);
	  				elements.css("width",thiswidth);
	  				$(this).nextAll().each(function(){
	  					var s = $(this).attr("indexst");
	  					var h = parseInt(parseInt(s)-1);
	  					$(this).attr("indexst",h);
	  				});
	  				$(this).remove();
	  				return false;
	  			}
	  			
	  		})
  			elements.children(".tableth").children(".zctablethtd").each(function(){
	  			if($(this).attr("classname") == classnames[i]){
	  				var width = $(this).width();
	  				var pawidth = elements.width();
	  				var thiswidth = parseInt(pawidth)-parseInt(width);
	  				elements.css("width",thiswidth);
	  				$(this).nextAll().each(function(){
	  					var s = $(this).attr("i");
	  					var h = parseInt(parseInt(s)-1);
	  					$(this).attr("i",h);
	  				});
	  				$(this).remove();
	  				return false;
	  			}
	  			
	  		})
  			elements.children(".zctabletr").children(".zctabletd").each(function(){
	  			if($(this).attr("classname") == classnames[i]){
	  				
	  				$(this).nextAll().each(function(){
	  					var s = $(this).attr("i");
	  					var h = parseInt(parseInt(s)-1);
	  					$(this).attr("i",h);
	  				});
	  				$(this).remove();
	  				return false;
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
		  			
		  			var indexs = index+1;
	  				$(this).html(indexs);
	  				$(this).attr("indexst",indexs)
		  		});
		  		tableth.prev().children(".indexth").html(1);
		  		tableth.prev().children(".indexth").attr("indexth",1);
		  		tableth.prev().addClass("zctable_title");
		  		tableth.prev().children("div").addClass("create_table_Edit");
		  		tableth.prev().removeClass("tableth");
		  		tableth.prev().prevAll().each(function(){
		  			var indexth = $(this).children(".indexth").text();
		  			$(this).children(".indexth").html(parseInt(indexth)+1);
		  			$(this).children(".indexth").attr("indexth",parseInt(indexth)+1)
		  		})
  			}
  			
  		}else{
  			elemnts.children(".zctable_title").each(function(){
  				if($(this).children(".indexth").attr("indexth").trim() == index.toString()){
  					for(var i=number;i>0;i--){
		  				$(this).before(titlehtml);
				  		$(this).prev().css("border-bottom","0px")
				  		$(this).prev().children("div").each(function(index){
				  			var indexs = index+1;
				  			$(this).html(indexs)
				  			$(this).attr("indexst",indexs)
				  			
				  		});
				  		$(this).prev().addClass("zctable_title");
				  		$(this).prev().children("div").addClass("create_table_Edit");
				  		$(this).prev().removeClass("tableth");
				  		$(this).prevAll().each(function(indexs){
				  			$(this).children(".indexth").html(parseInt(index)+indexs+1);
				  			$(this).children(".indexth").attr("indexth",parseInt(index)+indexs+1)
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
  		elemnts.children(".zctable_title").each(function(){
  			var index = $(this).children(".indexth").attr("indexth").trim();
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
			  			$(this).children(".indexth").attr("indexth",parseInt(index)+indexs);
			  		})
			  		$(this).remove();
			  		return false;
  				}
  			});
  	},
  	//判断某个单元格是否存在指定样式。
  	IsClassInCell:function(colclassname,index,cellclass){
  		var elements = this.$element;
  		var flag;
  		elements.children(".zctabletr").each(function(){
  			if($(this).children(".indextr").text().trim() == index || $(this).children(".TABLE_ID_COL").text().trim() == index){
  				$(this).children(".zctabletd").each(function(){
  					if($(this).attr("classname") == colclassname){
  						if($(this).hasClass(cellclass)){
  							flag = "true";
  						}else{
  							flag = "false";
  						}
  						return false;
  					}
  				})
  			}
  		})
  		return flag;
  	},
  	//给单个单元格添加样式
  	setClassInCell:function(colclassname,index,cellclass){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			if($(this).children(".indextr").text().trim() == index || $(this).children(".TABLE_ID_COL").text().trim() == index){
  				
  				$(this).children(".zctabletd").each(function(){
  					if($(this).attr("classname") == colclassname){
  						$(this).addClass(cellclass);
  						return false;
  					}
  				})
  			}
  		})
  	},
  	//给单个单元格添加直接样式
  	setStyleInCell:function(colclassname,index,cellclass){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			if($(this).children(".indextr").text().trim() == index || $(this).children(".TABLE_ID_COL").text().trim() == index){
  				
  				$(this).children(".zctabletd").each(function(index){
  					if($(this).attr("classname") == colclassname){
  						var styles = $(this).attr("style");
  						var stylenew = styles+";"+cellclass;
  						if(cellclass == null || cellclass == ""){
  							stylenew = $(this).parent().parent().children(".zctabletr").eq(0).children(".zctabletd").eq(index).attr("style");
  						}
  						$(this).attr("style",stylenew);
  						if(cellclass.indexOf("background-color") != -1){
  							var bgcolor = $(this).css("background-color")
  							$(this).attr("bgcolor",bgcolor);
  						}
  						return false;
  					}
  				})
  			}
  		})
  	},
  	//给表头单元格添加直接样式
  	setStyleInCellTitle:function(colclassname,index,cellclass){
  		var elements = this.$element;
  		elements.children(".zctable_title").each(function(){
  			if($(this).children(".indexth").attr("indexth").trim() == index){
  				
  				$(this).children(".zctablethtd").each(function(){
  					if($(this).attr("classname") == colclassname || $(this).attr("indexst") == colclassname){
  						var styles = $(this).attr("style");
  						var stylenew = styles+";"+cellclass;
  						if(cellclass == null || cellclass == ""){
  							stylenew = $(this).parent().prev().eq(0).children(".zctablethtd").eq(index).attr("style");
  						}
  						$(this).attr("style",stylenew);
  						return false;
  					}
  				})
  			}
  		})
  	},
  		//删除样式
  	removeClassCell:function(colclassname,id,cellclass){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			if($(this).children(".indextr").text().trim() == id || $(this).children(".TABLE_ID_COL").text().trim() == id){
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
  				return false;
  			}
  		})
  		return thisobj;
  	},
  	//为列赋予新值  列名 列样式
  	setColNewValue:function(colclassname,newcolclassname,newcolname){
  		var elements = this.$element;
  		var flag = true;
  		var thisobj;
  		elements.children(".tableth").children(".zctablethtd").each(function(){
  			if($(this).attr("classname") == newcolclassname){
  				flag = false;
  			}
  			if($(this).attr("classname") == colclassname){
  				thisobj = $(this);
  				
  			}
  		});
  		if(flag){
  			thisobj.attr("classname",newcolclassname);
			thisobj.removeClass(colclassname+"th");
			thisobj.addClass(newcolclassname+"th")
			thisobj.text(newcolname);
  		}else{
  			return "false";
  		}
  		elements.children(".zctabletr").children(".zctabletd").each(function(index){
  			if($(this).attr("classname") == colclassname){
  				$(this).attr("classname",newcolclassname);
  				$(this).removeClass(colclassname+"td");
  				$(this).addClass(newcolclassname+"td");
  				return false;
  			}
  		})
  		return "true";
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
  	//获取表头所有选中单元格方法
  	getSelectCellTitle:function(){
  		var elements = this.$element;
  		var cellobjs = [];
  		elements.find(".zctablethtd_select").each(function(){
  			var thisobj = new Object();
			thisobj["index"] = $(this).parent().children(".indexth").text();
			//thisobj["id"] = $(this).parent().children(".TABLE_ID_COL").text();
			thisobj["value"] = $(this).text();
			thisobj["colclassname"] = $(this).attr("classname");
			$(this).parent().children("div").each(function(indexs){
				if(thisobj["colclassname"] == $(this).attr("classname")){
					thisobj["colindex"] = indexs+1;
				}
			})
			
			cellobjs.push(thisobj);
  		})
  		return cellobjs;
  		
  	},
  	//将指定列全部显示空行。
  	setGivenNumber:function(indexmin,indexmax){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			var thisindex = parseInt($(this).children(".indextr").text().trim());
  			if(thisindex>=indexmin && thisindex<=indexmax){
  				$(this).children("div").hide();
  			}
  		})
  	},
  	//激活空行
  	activationGivenNumber:function(indexmin,indexmax){
  		var elements = this.$element;
  		elements.children(".zctabletr").each(function(){
  			var thisindex = parseInt($(this).children(".indextr").text().trim());
  			if(thisindex>=indexmin && thisindex<=indexmax){
  				$(this).children("div").each(function(){
  					if(!$(this).hasClass("create_table_hide")){
  						$(this).show();
  					}
  				});
  			}
  		})
  	},
  	//获取被选中的表头
  	getActiveTitle:function(){
  		var elements = this.$element; 		
  		var indexth = elements.find(".zctable_title_this_click").children(".indexth").text();	
  		return indexth;
  	},
  	//清楚选择的单元格
  	ClearSelectedCells:function(){
  		var elements = this.$element; 	
  		elements.find(".zctabletd_select").each(function(){
  			$(this).css("background-color","")
  			$(this).removeClass("zctabletd_select");
  		})	
  	},
  	//
  	//监听双击事件
  	AddDbClick:function(callback){
  		var elemnts = this.$element;
  		elemnts.children(".zctabletr").on("dblclick",function(){
  			$(callback)
  		});
  	},
  	//编辑单元格事件之后增加监听
  	AddCellEditSuccess:function(callback){
  		var tablebiaos = this.$element.attr("inittableindex");
  		if(functions[tablebiaos] == null){
  			functions[tablebiaos] = new Object();
  		}
  		functions[tablebiaos]["celleditsuccess"] = callback;
  		
  	},
  	//单元格编辑增加监听
  	AddCellClick:function(callback){
  		var tablebiaos = this.$element.attr("inittableindex");
  		if(functions[tablebiaos] == null){
  			functions[tablebiaos] = new Object();
  		}
  		functions[tablebiaos]["cellclick"] = callback;
  	},
  	//复选框增加监听checkboxAllClick
  	AddCheckBox:function(callback){
  		var tablebiaos = this.$element.attr("inittableindex");
  		if(functions[tablebiaos] == null){
  			functions[tablebiaos] = new Object();
  		}
  		
  		functions[tablebiaos]["checkboxclick"] = callback;
  	},
  	//复选框增加监听checkboxAllClick
  	AddCheckBoxAllClick:function(callback){
  		var tablebiaos = this.$element.attr("inittableindex");
  		if(functions[tablebiaos] == null){
  			functions[tablebiaos] = new Object();
  		}
  		
  		functions[tablebiaos]["checkboxAllClick"] = callback;
  	},
  	//编辑图标事件监听
  	AddIconEditClick:function(callback){
  		var tablebiaos = this.$element.attr("inittableindex");
  		if(functions[tablebiaos] == null){
  			functions[tablebiaos] = new Object();
  		}
  		functions[tablebiaos]["iconeditclick"] = callback;
  	},
  	//是否显示鼠标指向样式
  	setShowOverCol:function(state){
  		var tablebiaos = this.$element.attr("inittableindex");
  		if(tableparameters[tablebiaos] == null){
  			tableparameters[tablebiaos] = new Object();
  		}
  		
  		tableparameters[tablebiaos]["showovaercol"] = state;
  	},
  	//是否显示鼠标指向样式
  	setShowClickCellBgColor:function(ClickCellBgColor){
  		var tablebiaos = this.$element.attr("inittableindex");
  		if(tableparameters[tablebiaos] == null){
  			tableparameters[tablebiaos] = new Object();
  		}
  		
  		tableparameters[tablebiaos]["ClickCellBgColor"] = ClickCellBgColor;
  	},
  	//指定行编辑
  	setEditRow:function(ids,xings){
  		for(var i=0;i<ids.length;i++){
	  		var elements = this.$element;
	  		elements.children(".zctabletr").each(function(){	  			
	  			if($(this).children(".indextr").text().trim() == ids[i] || $(this).children(".TABLE_ID_COL").text().trim() == ids[i] ){
	  				
					$(this).children(".zctabletd").each(function(){
						if(!$(this).hasClass("create_table_Edit")){
							$(this).removeClass("create_table_Edit_Custom")
							$(this).removeClass("create_table_Edit_Date");
							$(this).addClass("create_table_Edit");
							if(xings == "date"){
								$(this).addClass("create_table_Edit_Date");
							}
							if(xings == "custom"){
								$(this).addClass("create_table_Edit_Custom")
							}
							$(this).css("cursor","pointer");
							
						}
					})
					
	  				
	  			}
	  		});
		}
  		
  		//if(inittableindex==1){}
  	},
  	//选中某行
  	SelectRows:function(ids){
  		var isShowCheckbox = this.options.isShowCheckbox;
  		for(var i=0;i<ids.length;i++){
	  		var elements = this.$element;
	  		elements.children(".zctabletr").each(function(){	  			
	  			if($(this).children(".indextr").text().trim() == ids[i] || $(this).children(".TABLE_ID_COL").text().trim() == ids[i] ){
	  				if(isShowCheckbox == "true"){
	  					$(this).children(".checkboxtr").children(".checkboxtrinput").click();
	  				}else{
	  					$(this).css("background-color",tdbackgroundcolor);
						$(this).removeClass("zctable_this_select");
	  				}
	  			}
	  		});
		}
  		
  		//if(inittableindex==1){}
  	},
  	//删除某行且自动增加一行空行
  	deleteCellCon:function(deleteid){
  		elements = this.$element;
  		var maxindex = elements.children(".zctabletr").children(".indextr").length-1;
  		this.RemoveTrById(deleteid);
  		this.setRowsDataInfo([{}],null)
  		this.setGivenNumber(maxindex,maxindex);
  	},
  	//获取最后选择的单元格对象
  	getLastClickObj:function(){
  		
  		var elements = this.$element;
  		var thisobj = new Object();
  		elements.find(".zctabletd_last").each(function(){
  			
			thisobj["index"] = $(this).parent().children(".indextr").text();
			thisobj["id"] = $(this).parent().children(".TABLE_ID_COL").text();
			thisobj["value"] = $(this).text();
			thisobj["colclassname"] = $(this).attr("classname");
  		})
  		return thisobj;
  	},
  	//执行0行不可编辑事件
  	setZeroEditCancel:function(){
  		this.$element.find(".hidezctabletr").each(function(){
  			$(this).children("div").removeClass("create_table_Edit");
  		})
  	},
  	//赋予表头编辑
  	setEditTitleCol:function(names){
  		for(var i=0;i<names.length;i++){
	  		var elements = this.$element;
	  		elements.find(".zctablethtd").each(function(){
	  			if($(this).hasClass(names[i]+"th")){
					$(this).addClass("create_table_Edit");
					$(this).css("cursor","pointer");
	  			}
	  		});
		}
  		
  		//if(inittableindex==1){}
  	},
  	//设置行选不可选择
  	setTrNotSelect:function(state){
  		if(state == "true"){
  			this.$element.attr("trnotselect","true");
  		}else{
  			this.$element.attr("trnotselect","false");
  		}
  		
  	},
  	//通过自定义条件获取数据
  	getDataByOther:function(colclassname,formula,values){
  		var elements = this.$element;
  		var objs = [];
  		elements.find("."+colclassname+"td").each(function(){
  			var valuethis = $(this).text().trim();
  			if(valuethis != ""){
  				if(formula == "=="){
  					if(valuethis==values){
		  				var obj = new Object();
		  				$(this).parent().children(".zctabletd").each(function(){
		  					var classname = $(this).attr("classname");
		  					obj[classname] = $(this).text().trim();
		  				})
		  				var indextr = $(this).parent().children(".indextr").text().trim();
		  				obj["index"] = indextr;
		  				objs.push(obj);
		  			}
  				}else if(formula == ">="){
  					if(valuethis>=values){
		  				var obj = new Object();
		  				$(this).parent().children(".zctabletd").each(function(){
		  					var classname = $(this).attr("classname");
		  					obj[classname] = $(this).text().trim();
		  				})
		  				var indextr = $(this).parent().children(".indextr").text().trim();
		  				obj["index"] = indextr;
		  				objs.push(obj);
		  			}
  				}else if(formula == "<="){
  					if(valuethis>=values){
		  				var obj = new Object();
		  				$(this).parent().children(".zctabletd").each(function(){
		  					var classname = $(this).attr("classname");
		  					obj[classname] = $(this).text().trim();
		  				})
		  				var indextr = $(this).parent().children(".indextr").text().trim();
		  				obj["index"] = indextr;
		  				objs.push(obj);
		  			}
  				}else if(formula == "<"){
  					if(valuethis>=values){
		  				var obj = new Object();
		  				$(this).parent().children(".zctabletd").each(function(){
		  					var classname = $(this).attr("classname");
		  					obj[classname] = $(this).text().trim();
		  				})
		  				var indextr = $(this).parent().children(".indextr").text().trim();
		  				obj["index"] = indextr;
		  				objs.push(obj);
		  			}
  				}else if(formula == ">"){
  					if(valuethis>=values){
		  				var obj = new Object();
		  				$(this).parent().children(".zctabletd").each(function(){
		  					var classname = $(this).attr("classname");
		  					obj[classname] = $(this).text().trim();
		  				})
		  				var indextr = $(this).parent().children(".indextr").text().trim();
		  				obj["index"] = indextr;
		  				objs.push(obj);
		  			}
  				}
  				
  			}else{
  				if(values == null || values == ""){
  					var obj = new Object();
	  				$(this).parent().children(".zctabletd").each(function(){
	  					var classname = $(this).attr("classname");
	  					obj[classname] = $(this).text().trim();
	  				})
	  				var indextr = $(this).parent().children(".indextr").text().trim();
		  			obj["index"] = indextr;
	  				objs.push(obj);
  				}
  			}
  			
  			
  		})
  		return objs;
  	},
  	//增项合并
  	setVerticalmerger:function(colindex,rowindexs){
  		var maxRindex = Math.max(rowindexs);
  		var elements = this.$element;
  		var thisdiv = elements.children(".zctable_title").eq(maxRindex-1).children("div").eq(rowindexs-1);
  		thisdiv.css("background-color","#000000");
  	},
  	//编辑图标路径
  	setImgSrcEdit:function(imgsrc){
  		this.$element.attr("imgsrc",imgsrc);
  	},
  	//自定义宽度
  	setWidthCol:function(jsonobjs){
  		var classdiv = this.options.classdiv;
  		var elements = this.$element;
  		for(var i=0;i<jsonobjs.length;i++){
  			var thiscol = elements.children(".tableth").find("."+jsonobjs[i].colclassname+"th");
  			var thiscolwidth = thiscol.width();
  			thiscol.css("width",jsonobjs[i].width+"px");
  			elements.find("."+jsonobjs[i].colclassname+"th").css("width",jsonobjs[i].width+"px");
  			elements.find("."+jsonobjs[i].colclassname+"td").css("width",jsonobjs[i].width+"px");
  			var tablewidthO = elements.width();
  			var tablewidthN = tablewidthO-thiscolwidth+parseInt(jsonobjs[i].width);
  			elements.css("width",tablewidthN+"px");
  			var conwidth;
	  		if(classdiv == null || classdiv == ""){
	  			conwidth = parseFloat(this.$element.parent().width());
	  		}else{
	  			conwidth = parseFloat($("."+classdiv).width());
	  		}
	  		if(tablewidthN>conwidth){
	  			elements.parent().css("overflow-x","scroll");
	  		}else{
	  			elements.parent().css("overflow-x","hidden");
	  		}
  		}
  	},
  	//表格初始化监听事件
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
								thiswidth = thiswidth - isautos[i].options.iconwidth;
								iconwidth = isautos[i].options.iconwidth*0.95;
							}
							if(isautos[i].options.isShowCheckbox == "true"){
								thiswidth = thiswidth - isautos[i].options.checkboxwidth;
							}
							
						}
						//alert(contentwidth);
						
						var s = 0;
						isautos[i].$element.children(".tableth").children(".zctablethtd").each(function(){
							if($(this).hasClass("create_table_hide")){
								s = s+1;
							}
							
						});
						contentwidth = Math.floor(thiswidth/(isautos[i].options.colsname.length-s));
						//alert(contentwidth)
						isautos[i].$element.children(".tableth").children(".zctablethtd").each(function(){
							if($(this).attr("i")!=null || $(this).attr("i")!=""){
								$(this).css("width",contentwidth);
							}
							
						});
						isautos[i].$element.children(".zctabletr").children(".zctabletd").each(function(){
							if($(this).attr("i")!=null || $(this).attr("i")!=""){
								$(this).css("width",contentwidth);
							}
							
						});
				    }
				},100)
			    
			});
			//监听分页跳转方法
			$(document).on("click",".page_number_btn",function(){
				var currentp =  $(this).siblings("div").children(".page_number_input").val();
				if(isNaN(currentp) || currentp.trim() == ""){
					alert("不是数字！")
					return false;
				}else{
					currentp = parseInt(currentp);
				}
				
				var elements = $(this).parent().parent().parent().parent().parent();
				if($(this).parent().parent().attr("pageTable")!=null && $(this).parent().parent().attr("pageTable")!=""){
					
					var biaos = $(this).parent().parent().attr("pageTable");
					elements = $(biaos);
				}
				var	maxindex = elements.children(".zctabletr").children(".indextr").length-1;
				var pagenum = Math.ceil(maxindex/pagesize);
				if(currentp<1 || currentp>pagenum){
					alert("请输入页码范围内的数字！")
					return false;
				}else{
					currentpage = currentp;
				}
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
		  		var pagehtml = '<li ><div href="#" style="border:0px;float: left;line-height:34px;">共'+maxindex+'条</div></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;"><</a></li>'
		  		if(currentpage>1){
		  			pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+1+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+1+'</a></li>'
		  			
		  			if(currentpage != 2 && currentpage != 3){
		  				
		  				pagehtml = pagehtml+'<li><div href="#" style="border:0px;float: left;line-height:30px;margin-left: 10px;color:#00c0de;">...</div></li>'
		  			}
		  			
		  			
		  		}
		  		if(currentpage>2){
		  			pagehtml = pagehtml+'<li ><a class="zctable_page_a"  pagenumber="'+parseInt(currentpage-1)+'"  style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(currentpage-1)+'</a></li>';
		  			
		  		}
		  		pagehtml = pagehtml+'<li class="active"><a style="margin-left: 10px;background:#777777;color: white;border: 1px #777777 solid;">'+currentpage+'</a></li>';
		  		if(currentpage<pagenum){
		  			pagehtml = pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(parseInt(currentpage)+1)+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(parseInt(currentpage)+1)+'</a></li>';
		  		}
		  		var rightpagenum = pagenum;
		  		if(currentpage<pagenum){
		  			rightpagenum = parseInt(parseInt(currentpage)+1);
		  		}
		  		if(currentpage<pagenum-1){
		  			if(currentpage != pagenum-2){
		  				pagehtml = pagehtml+'<li><div href="#" style="border:0px;float: left;line-height:30px;margin-left: 10px;color:#00c0de;">...</div></li>'
		  			}
		  			
		  			pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(pagenum)+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(pagenum)+'</a></li>'
		  		}
		  		
		  		
		  		//alert(rightpagenum)
		  		pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+rightpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">></a></li>';
		  		pagehtml = pagehtml + '<li><div href="#" style="border:0px;float: left;line-height:34px;margin-left: 10px;" >跳转到<input type="text" style="width:40px;color:#000;height:20px" class="page_number_input" />页</div><div class="btn btn-info page_number_btn" style="margin-left: 10px;border-radius: 2px;">确定</div></li>'
		  		
		  		
		  		if($(this).parent().parent().attr("pageTable")!=null && $(this).parent().parent().attr("pageParent")!=""){
		  			
					var pageParent = $(this).parent().parent().attr("pageParent");
					$(pageParent).find(".zctable_page_ul").html(pagehtml);
				}else{
					elements.find(".zctable_page_ul").html(pagehtml);
				}
			});
			//监听分页选中方法
			$(document).on("click",".zctable_page_a",function(){
				var currentp = parseInt($(this).attr("pagenumber").trim());
				currentpage = currentp;
				
				var elements = $(this).parent().parent().parent().parent().parent();
				if($(this).parent().parent().attr("pageTable")!=null && $(this).parent().parent().attr("pageTable")!=""){
					
					var biaos = $(this).parent().parent().attr("pageTable");
					elements = $(biaos);
				}
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
		  		var pagehtml = '<li ><div href="#" style="border:0px;float: left;line-height:34px;">共'+maxindex+'条</div></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;"><</a></li>'
		  		if(currentpage>1){
		  			pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+1+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+1+'</a></li>'
		  			
		  			if(currentpage != 2 && currentpage != 3){
		  				
		  				pagehtml = pagehtml+'<li><div href="#" style="border:0px;float: left;line-height:30px;margin-left: 10px;color:#00c0de;">...</div></li>'
		  			}
		  			
		  			
		  		}
		  		if(currentpage>2){
		  			pagehtml = pagehtml+'<li ><a class="zctable_page_a"  pagenumber="'+parseInt(currentpage-1)+'"  style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(currentpage-1)+'</a></li>';
		  			
		  		}
		  		pagehtml = pagehtml+'<li class="active"><a style="margin-left: 10px;background:#777777;color: white;border: 1px #777777 solid;">'+currentpage+'</a></li>';
		  		if(currentpage<pagenum){
		  			pagehtml = pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(parseInt(currentpage)+1)+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(parseInt(currentpage)+1)+'</a></li>';
		  		}
		  		var rightpagenum = pagenum;
		  		if(currentpage<pagenum){
		  			rightpagenum = parseInt(parseInt(currentpage)+1);
		  		}
		  		if(currentpage<pagenum-1){
		  			if(currentpage != pagenum-2){
		  				pagehtml = pagehtml+'<li><div href="#" style="border:0px;float: left;line-height:30px;margin-left: 10px;color:#00c0de;">...</div></li>'
		  			}
		  			
		  			pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+parseInt(pagenum)+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">'+parseInt(pagenum)+'</a></li>'
		  		}
		  		
		  		
		  		//alert(rightpagenum)
		  		pagehtml = pagehtml+'<li><a class="zctable_page_a"  pagenumber="'+rightpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;">></a></li>';
		  		pagehtml = pagehtml + '<li><div href="#" style="border:0px;float: left;line-height:34px;margin-left: 10px;" >跳转到<input type="text" style="width:40px;color:#000;height:20px" class="page_number_input" />页</div><div class="btn btn-info page_number_btn" style="margin-left: 10px;border-radius: 2px;">确定</div></li>'
		  		//pageParent
		  		
		  		if($(this).parent().parent().attr("pageTable")!=null && $(this).parent().parent().attr("pageParent")!=""){
					var pageParent = $(this).parent().parent().attr("pageParent");
					$(pageParent).find(".zctable_page_ul").html(pagehtml);
				}else{
					elements.find(".zctable_page_ul").html(pagehtml);
				}
			})
			//监听复选框全选择
			$(document).on("click",".checkboxthinput",function(){
				var tablebiaos = $(this).parent().parent().parent().attr("inittableindex");
				if($(this).is(':checked')){
					
					
					$(this).parent().parent().siblings(".zctabletr").children(".checkboxtr").children(".checkboxtrinput").prop("checked", true);
					
				}else{
					$(this).parent().parent().siblings(".zctabletr").children(".checkboxtr").children(".checkboxtrinput").prop("checked", false);
					
				}
				
				if(functions[tablebiaos]!=null){

					if(functions[tablebiaos]["checkboxAllClick"]!=null && functions[tablebiaos]["checkboxAllClick"]!=""){
						$(functions[tablebiaos]["checkboxAllClick"]);
					}
				}
				
			})
			$(document).on("click",".checkboxtrinput",function(e){
				e.stopPropagation();
				
				var tablebiaos = $(this).parent().parent().parent().attr("inittableindex");
				
				if(functions[tablebiaos]!=null){

					if(functions[tablebiaos]["checkboxclick"]!=null && functions[tablebiaos]["checkboxclick"]!=""){
						$(functions[tablebiaos]["checkboxclick"]);
					}
				}
			})
			//监听表头行选择
			$(document).on("mouseover",".zctable_title",function(){
				$(this).css("background-color","#D1FCF0");
				$(this).addClass("zctable_title_this");
			});
			$(document).on("mouseout",".zctable_title",function(){
				if(!$(this).hasClass("zctable_title_this_click")){
					var titlebackgroundcolor = $(this).attr("titlebackgroundcolor");
					$(this).css("background-color",titlebackgroundcolor);
					$(this).removeClass("zctable_title_this");
				}
				
			});
			$(document).on("click",".zctable_title",function(){
				var titlebackgroundcolor = $(this).attr("titlebackgroundcolor");
				$(".zctable_title_this_click").css("background-color",titlebackgroundcolor);
				$(".zctable_title_this_click").removeClass("zctable_title_this_click");
				$(this).css("background-color","#D1FCF0");
				$(this).addClass("zctable_title_this_click");
				
			});
			//监听行选择
			$(document).on("mouseover",".zctabletr",function(){
				if($(this).hasClass("zctable_this_select")){
					return false;
				}
				$(this).css("background-color","#D1FCF0");
				$(this).addClass("zctable_this");
				//$(this).children(".indextr").css("background-color","#D1FCF0");
				//$(this).children(".checkboxtr").css("background-color","#D1FCF0");
			});
			$(document).on("mouseout",".zctabletr",function(){
				if($(this).hasClass("zctable_this_select")){
					return false;
				}
				var tdbackgroundcolor = $(this).attr("tdbackgroundcolor");
				$(this).css("background-color",tdbackgroundcolor);
				$(this).removeClass("zctable_this");
				//$(this).children(".indextr").css("background-color",tdbackgroundcolor);
				//$(this).children(".checkboxtr").css("background-color",tdbackgroundcolor);
			});
			$(document).on("click",".zctabletr",function(e){
				var trnotselect =  $(this).parent().attr("trnotselect").trim();
				if(trnotselect == "true"){
					return false;
				}
				if($(this).children(".checkboxtr").length != 0){
					$(this).children(".checkboxtr").children(".checkboxtrinput").click();
				}else{
					if($(this).hasClass("zctable_this_select")){
						var tdbackgroundcolor = $(this).attr("tdbackgroundcolor");
						
						$(this).css("background-color",tdbackgroundcolor);
						$(this).removeClass("zctable_this_select");
						
					}else{
						$(this).parent().children(".zctabletr").each(function(){
							if($(this).hasClass("zctable_this_select")){
								var tdbackgroundcolor = $(this).attr("tdbackgroundcolor");
								
								$(this).css("background-color",tdbackgroundcolor);
								$(this).removeClass("zctable_this_select");
								
							}
						})
						$(this).addClass("zctable_this_select");
						$(this).css("background-color","#31B0D5");
					}
					
				}
					
				
			});
			//监听表头拖拽事件
			$(document).on("mousemove",".tableth .zctablethtd",function(e){
				thisoffset=$(this).offset();
				if(Math.round(e.clientX-thisoffset.left)<3 || Math.abs(Math.round(thisoffset.left+parseInt($(this).width()))-e.clientX)<3){
					$(this).css("cursor","move");
					/*if($(document.body).find(".offset_table_div").length != 0){
						$(document.body).find(".offset_table_div").css("marginLeft",e.clientX);
						$(document.body).find(".offset_table_div").css("marginTop",e.clientY-30);
					}else{
						$(document.body).prepend("<div style='width:1px;height:70px;background:#C0C0C0;position: absolute;margin-left:"+e.clientX+"px;margin-top:"+(e.clientY-30)+"px;' class='offset_table_div'></div>")
					}*/
					if(Math.round(e.clientX-thisoffset.left)<3){
						var offsetdiv = $(document.body).find(".offset_table_div");
						if(offsetdiv.length != 0){
							offsetdiv.removeClass("offset_table_right");
							offsetdiv.addClass("offset_table_left");
						}else{
							$(document.body).prepend("<div style='width:1px;height:60px;background:#C0C0C0;position: absolute;margin-left:"+Math.round(thisoffset.left)+"px;margin-top:"+(thisoffset.top-10)+"px;' class='offset_table_div offset_table_left'></div>")
						}
					}else{
						var offsetdiv = $(document.body).find(".offset_table_div");
						if(offsetdiv.length != 0){
							offsetdiv.removeClass("offset_table_left");
							offsetdiv.addClass("offset_table_right");
						}else{
							$(document.body).prepend("<div style='width:1px;height:60px;background:#C0C0C0;position: absolute;margin-left:"+Math.round(thisoffset.left+parseInt($(this).width()))+"px;margin-top:"+(thisoffset.top-10)+"px;' class='offset_table_div offset_table_right'></div>")
						}
						
					}
					
					
				}else{
					$(this).css("cursor","");
					var offsetdiv = $(document.body).find(".offset_table_div");
					if(!offsetdiv.hasClass("offset_table_div_mousedown")){
						offsetdiv.remove();
					}else{
						var clientXO = parseInt(offsetdiv.css("marginLeft"));
						offsetdiv.css("marginLeft",e.clientX);
						offsetdiv.css("marginTop",thisoffset.top-10);
						
						var elements = $(this).parent().parent();
						var thiscol;
						if(offsetdiv.hasClass("offset_table_left")){
							thiscol = $(this).prev();
						}else{
							thiscol = $(this);
						}
						var colclassname = thiscol.attr("classname");
						var colwidth = thiscol.width();
			  			var thiscolwidth = thiscol.width()+parseInt(e.clientX-clientXO);
			  			thiscol.css("width",thiscolwidth+"px");
			  			elements.find("."+colclassname+"th").css("width",thiscolwidth+"px");
			  			elements.find("."+colclassname+"td").css("width",thiscolwidth+"px");
			  			var tablewidthO = elements.width();
			  			var tablewidthN = tablewidthO-colwidth+parseInt(thiscolwidth);
			  			elements.css("width",tablewidthN+"px");
			  			var conwidth;
				  		conwidth = parseFloat(elements.parent().width());
				  		if(tablewidthN>conwidth){
				  			elements.parent().css("overflow-x","scroll");
				  		}else{
				  			elements.parent().css("overflow-x","hidden");
				  		}
					}
					
				}
			})
			$(document).on("mousedown",".tableth .zctablethtd",function(e){
				var offsetdiv = $(document.body).find(".offset_table_div");
				if(offsetdiv.length != 0){
					offsetdiv.addClass("offset_table_div_mousedown");
					
				}
			});
			$(document).on("mouseup","body",function(e){
				var offsetdiv = $(document.body).find(".offset_table_div");
				if(offsetdiv.length != 0){
					offsetdiv.removeClass("offset_table_div_mousedown");
					offsetdiv.remove();
				}
			});
			$(document).on("mouseout",".tableth .zctablethtd",function(e){
				var offsetdiv = $(document.body).find(".offset_table_div");
				if(offsetdiv.length != 0 && !offsetdiv.hasClass("offset_table_div_mousedown")){
					offsetdiv.remove();
					
				}
			});


			//监听多行表头单元格选择
			$(document).on("mouseover",".zctable_title .zctablethtd",function(){
				$(this).addClass("zctablethtd_this");
				
			});
			$(document).on("mouseout",".zctable_title .zctablethtd",function(){
				$(this).removeClass("zctablethtd_this");
			});
			$(document).on("click",".zctable_title .zctablethtd",function(event){
				var selectstate = $(this).parent().parent().attr("selectstate");
				if(selectstate == "true"){
					
					if(event.ctrlKey){
						if($(this).hasClass("zctablethtd_select")){
							
							$(this).removeClass("zctablethtd_select");
							$(this).css("background-color","")
						}else{
							$(this).addClass("zctablethtd_select");
							$(this).css("background-color","#00E8D7")
						}
					}else{
						if($(this).hasClass("zctablethtd_select")){
							$(this).removeClass("zctablethtd_select");
							$(this).css("background-color","")
						}else{
							$(this).parent().parent().find(".zctablethtd_select").each(function(){
								$(this).removeClass("zctablethtd_select");
								$(this).css("background-color","");
							})
							$(this).addClass("zctablethtd_select");
							$(this).css("background-color","#00E8D7")
						}
					}
					
					
				}
			});
			//监听单元格选择
			$(document).on("click",".create_table_Edit_img",function(){
				var tablebiaos = $(this).parent().parent().parent().attr("inittableindex");
				var thiscell = $(this).parent();
				var value = $(this).siblings(".create_table_Edit_over").html();
				var classname = $(this).parent().attr("classname");
				var index = $(this).parent().parent().children(".indextr").text();
				var id = $(this).parent().parent().children(".TABLE_ID_COL").text();
				var obj = new Object();
				obj["value"] = value;
				obj["colclassname"] = classname;
				obj["index"] = index;
				obj["id"] = id;
				
				if(functions[tablebiaos]!=null){
					if(functions[tablebiaos]["iconeditclick"]!=null && functions[tablebiaos]["iconeditclick"]!=""){
						functions[tablebiaos]["iconeditclick"](thiscell,obj);
					}
				}
			})
			$(document).on("mouseover",".zctabletd",function(){
				var tablebiaos = $(this).parent().parent().attr("inittableindex");
				if(tableparameters[tablebiaos]!=null){
					if(tableparameters[tablebiaos]["showovaercol"]!=null && tableparameters[tablebiaos]["showovaercol"]!=""){
						if(tableparameters[tablebiaos]["showovaercol"] instanceof Array){
							var tableclassshows = tableparameters[tablebiaos]["showovaercol"];
  							for(var i in tableclassshows){
  								if($(this).attr("classname") == tableclassshows[i]){
  									return false;
  								}
  							}
				  		}else{
				  			if(tableparameters[tablebiaos]["showovaercol"] == "false"){
								return false;
							}
				  		}
						
					}
				}
				$(this).addClass("zctabletd_this");
				if($(this).hasClass("create_table_Edit") && !$(this).children().hasClass("create_table_Edit_over") && $(this).find(".create_table_Edit_Custom_input").length == 0){
					
					var $thishtml = $(this).html();
					var imgsrc = $(this).parent().parent().attr("imgsrc");
					$(this).css("border","1px solid #31B0D5")
					var htmlstring = '<div style="text-align:left;height:99%;float:left;width:80%;" class="create_table_Edit_over">'+$thishtml+'</div>'
					htmlstring = htmlstring+'<div style="float:left;width:20%;" class="create_table_Edit_img"><img src="'+imgsrc+'" style="width:70%;"></div>'
					$(this).html(htmlstring);
					
				}
			});
			$(document).on("mouseleave",".zctabletd",function(){
				$(this).removeClass("zctabletd_this");
				$(this).css("border","0px solid #31B0D5")
				if($(this).hasClass("create_table_Edit") && $(this).children().hasClass("create_table_Edit_over")){
					var $thishtml = $(this).children(".create_table_Edit_over").html();
					$(this).html($thishtml);
					
				}
			});
			//鼠标左键监听
			$(document).on("click",".zctabletd",function(event){
				
				var selectstate = $(this).parent().parent().attr("selectstate");
				var tablebiaos = $(this).parent().parent().attr("inittableindex");
				if(selectstate == "true"){
					if(event.ctrlKey){
						if($(this).hasClass("zctabletd_select")){
							
							$(this).removeClass("zctabletd_select");
							var bgcolor = $(this).attr("bgcolor");
							if(bgcolor != null && bgcolor != ""){
								$(this).css("background-color",bgcolor)
							}else{
								$(this).css("background-color","")
							}
							
						}else{
							$(this).parent().parent().find(".zctabletd_last").each(function(){
								$(this).removeClass("zctabletd_last");
							})
							$(this).addClass("zctabletd_last")
							$(this).addClass("zctabletd_select");
							var bgColor = "#00E8D7";
							
							if(tableparameters[tablebiaos]["ClickCellBgColor"] != "false"){
								bgColor =  tableparameters[tablebiaos]["ClickCellBgColor"];
							}
							$(this).css("background-color",bgColor);
						}
					}else{
						if($(this).hasClass("zctabletd_select")){
							$(this).removeClass("zctabletd_select");
							var bgcolor = $(this).attr("bgcolor");
							if(bgcolor != null && bgcolor != ""){
								$(this).css("background-color",bgcolor)
							}else{
								$(this).css("background-color","")
							}
						}else{
							$(this).parent().parent().find(".zctabletd_select").each(function(){
								$(this).removeClass("zctabletd_select");
								var bgcolor = $(this).attr("bgcolor");
								if(bgcolor != null && bgcolor != ""){
									$(this).css("background-color",bgcolor)
								}else{
									$(this).css("background-color","")
								}
							})
							$(this).addClass("zctabletd_select");
							var bgColor = "#00E8D7"
							if(tableparameters[tablebiaos]["ClickCellBgColor"] != "false"){
								bgColor =  tableparameters[tablebiaos]["ClickCellBgColor"];
							}
							$(this).css("background-color",bgColor);
							$(this).parent().parent().find(".zctabletd_last").each(function(){
								$(this).removeClass("zctabletd_last");
							})
							$(this).addClass("zctabletd_last")
						}
					}
					
					
				}
				
				
				var tablebiaos = $(this).parent().parent().attr("inittableindex");
				if(functions[tablebiaos]!=null){
					if(functions[tablebiaos]["cellclick"]!=null && functions[tablebiaos]["cellclick"]!=""){
						$(functions[tablebiaos]["cellclick"]);
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
			$(document).on("dblclick",".create_table_Edit",function(e){
				e.stopPropagation();
				if($(this).hasClass("create_table_Edit") && $(this).children().hasClass("create_table_Edit_over")){
					var $thishtml = $(this).children(".create_table_Edit_over").html();
					$(this).html($thishtml);
					
				}
				/*if($(this).hasClass("table_isblankline")){
					return false;
				}*/
				var $text = $(this).text().trim();
				//alert($text);
				var width = $(this).width()*0.95;
				var height = $(this).parent().height();
				var marginheight = height/4;
				var inputheight = height/2;
				var inputhtml = '<input type="text" class="create_table_Edit_input create_table_Edit_Custom_input" style="height:'+inputheight+'px;margin-top:'+marginheight+'px;border:1px solid #77BCAB;line-height:'+marginheight+'px;width:'+width+'px" />';
				if($(this).hasClass("create_table_Edit_Date")){
					
					inputhtml = '<input id="create_table_Edit_input_Date" class="create_table_Edit_input create_table_Edit_Custom_input create_table_Edit_input_Date" style="height:'+inputheight+'px;margin-top:'+marginheight+'px;border:1px solid #77BCAB;line-height:'+marginheight+'px;width:'+width+'px" >'
				}
				if($(this).hasClass("create_table_Edit_Custom")){
					inputhtml = $(this).text().trim();
					var names = $(this).attr("classname");
					if(edithtmlparameters[names] != null && edithtmlparameters[names] !=""){
						inputhtml = edithtmlparameters[names]["html"];
					}else{
						alert("请先自定义html")
					}
					
				}
				
				$(this).html(inputhtml);
				$(this).children().addClass("Editing_Table_this");
				if($(this).hasClass("create_table_Edit_Custom")){
					$(this).find("input").addClass("create_table_Edit_Custom_input");
				}
				var $children = $(this).children(".create_table_Edit_input");
				if(edithtmlparameters[names] != null && edithtmlparameters[names] !=""){
					if(edithtmlparameters[names]["callback"] != null){
						var objtable = new Object(); 
						var classname = $(this).attr("classname").trim();
						var indexth = $(this).parent().children(".indextr").text().trim();
						objtable["colclassname"] = classname;
						objtable["index"] = indexth;
						edithtmlparameters[names]["callback"]($(this),$text,objtable);
					}else{
						$children.focus().val($text);
						$children.attr("beforevalue",$text);
					}
				}else{
					$children.focus().val($text);
					$children.attr("beforevalue",$text);
				}
				var thistable = $(this).parent().parent();
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
						var tablebiaos = thistable.attr("inittableindex");
						if(functions[tablebiaos]!=null){
							if(functions[tablebiaos]["celleditsuccess"]!=null && functions[tablebiaos]["celleditsuccess"]!=""){
								$(functions[tablebiaos]["celleditsuccess"]);
							}
						}
						
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
				var $parent = $(this).parents(".zctabletd");
				
			
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
					
					var tablebiaos =  $(this).parents(".zctabletr").parent().attr("inittableindex");
					$parent.html(value);
					if(functions[tablebiaos]!=null){
						if(functions[tablebiaos]["celleditsuccess"]!=null && functions[tablebiaos]["celleditsuccess"]!=""){
							$(functions[tablebiaos]["celleditsuccess"]);
						}
					}
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



