;(function($,window,document,undefined){
	var functions = new Object();
	var initpageNum = 0;
	var CreatePageControl = function(opt,ele){
		this.$element = ele,
		this.defaults = {
			"pagesize":"10",
			"totalnumber":"10",
			"currentpage":"1",
		},
		this.options = $.extend({}, this.defaults, opt)
	}
	
	CreatePageControl.prototype = {
		
		//初始化分页控件
		initPageControl:function(initoptions){
			
			this.options = $.extend({},this.defaults,this.options,initoptions)
	  		var maxindex = this.options.totalnumber;
	  		var pagesize = this.options.pagesize;
	  		var currentpage = this.options.currentpage;
	  		var elements = this.$element;
	  		var initpageNums = elements.attr("initpageNum");
	  		if(initpageNums == null || initpageNums == ""){
	  			initpageNum = initpageNum+1;
	  			elements.attr("initpageNum",initpageNum);
	  		}
	  		elements.attr("pagesize",pagesize);
  			var pagenum = Math.ceil(maxindex/pagesize);
  			var startnum = (currentpage-1)*pagesize;
  			var endnum = currentpage*pagesize+1;
  			
	  		var leftpagenum = 1;
	  		if(currentpage>1){
	  			leftpagenum = currentpage-1;
	  		}
	  		var pagehtml = '<li class="totalnumber" totalnumber="'+maxindex+'"><div href="#" style="border:0px;float: left;line-height:34px;">共'+maxindex+'条</div></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;"><</a></li>'
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
	  		
	  		elements.html('<ul class="pagination zctable_page_ul" style="margin:0px;"></ul>');
	  		elements.find(".zctable_page_ul").html(pagehtml);
	  		
  			this.AddMonitor();
	  	},
	  	//监听分页方法
	  	AddClickBtn:function(callback){
	  		var pagebiaos = this.$element.attr("initpageNum");
	  		if(functions[pagebiaos] == null){
	  			functions[pagebiaos] = new Object();
	  		}
	  		functions[pagebiaos]["AddClickBtn"] = callback;
	  	},
	  	//增加监听方法
	  	AddMonitor:function(){
	  		var pageControl_Addmonitor = $("body").attr("pageControl_Addmonitor");
	  		if(pageControl_Addmonitor!="1"){
	  			$("body").attr("pageControl_Addmonitor","1");
	  			//监听分页跳转方法
				$(document).on("click",".page_number_btn",function(){
					var currentp =  $(this).siblings("div").children(".page_number_input").val();
					if(isNaN(currentp) || currentp.trim() == ""){
						alert("不是数字！")
						return false;
					}else{
						currentp = parseInt(currentp);
					}
					
					var elements = $(this).parent().parent().parent();
					var	maxindex = elements.children(".zctable_page_ul").children(".totalnumber").attr("totalnumber").trim();
					var pagesize = elements.attr("pagesize");
					var pagenum = Math.ceil(maxindex/pagesize);
					if(currentp<1 || currentp>pagenum){
						alert("请输入页码范围内的数字！")
						return false;
					}else{
						currentpage = currentp;
					}
		  			var startnum = (currentpage-1)*pagesize;
		  			var endnum = currentpage*pagesize+1;
			  		var leftpagenum = 1;
			  		if(currentpage>1){
			  			leftpagenum = currentpage-1;
			  		}
			  		var pagehtml = '<li class="totalnumber" totalnumber="'+maxindex+'" ><div href="#" style="border:0px;float: left;line-height:34px;" >共'+maxindex+'条</div></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;"><</a></li>'
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
			  		
			  		
			  		elements.html('<ul class="pagination zctable_page_ul" style="margin:0px;"></ul>');
	  				elements.find(".zctable_page_ul").html(pagehtml);
	  				var pagebiaos = elements.attr("initpageNum");
					if(functions[pagebiaos]!=null){
						if(functions[pagebiaos]["AddClickBtn"]!=null && functions[pagebiaos]["AddClickBtn"]!=""){
							functions[pagebiaos]["AddClickBtn"](currentpage,pagesize,maxindex);
						}
					}
						
				});
				//监听分页选中方法
				$(document).on("click",".zctable_page_a",function(){
					
					var currentp = parseInt($(this).attr("pagenumber").trim());
					var currentpage = currentp;					
					var elements = $(this).parent().parent().parent();
					var	maxindex = elements.children(".zctable_page_ul").children(".totalnumber").attr("totalnumber").trim();
					var pagesize = elements.attr("pagesize");
					var pagenum = Math.ceil(maxindex/pagesize);
		  			var startnum = (currentpage-1)*pagesize;
		  			var endnum = currentpage*pagesize+1;
			  		var leftpagenum = 1;
			  		if(currentpage>1){
			  			leftpagenum = currentpage-1;
			  		}
			  		var pagehtml = '<li class="totalnumber" totalnumber="'+maxindex+'" ><div href="#" style="border:0px;float: left;line-height:34px;">共'+maxindex+'条</div></li><li><a class="zctable_page_a" pagenumber="'+leftpagenum+'" style="cursor:pointer;margin-left: 10px;color:#00c0de;"><</a></li>'
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
			  		
			  		elements.html('<ul class="pagination zctable_page_ul" style="margin:0px;"></ul>');
	  				elements.find(".zctable_page_ul").html(pagehtml);
	  				var pagebiaos = elements.attr("initpageNum");
					if(functions[pagebiaos]!=null){
						if(functions[pagebiaos]["AddClickBtn"]!=null && functions[pagebiaos]["AddClickBtn"]!=""){
							functions[pagebiaos]["AddClickBtn"](currentpage,pagesize,maxindex);
						}
					}
				})
	  		}
	  	},

	}
	
	$.fn.toCreatePageControl = function(options){
  	var createPageControl = new CreatePageControl(options,this);
  	return createPageControl;
  }
})(jQuery,window,document);
