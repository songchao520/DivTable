/**
 * @author 宋超
 * @desc 一款Tree
 */
;(function($,window,document,undefined){
  var inittreeindex = 0;
  var CreateZcTree = function(ele,opt){
  	this.$element = ele,
  	this.defaults = {
  		"id":"RECID",
  		"level":"LEVEL",
  		"parents":"PARENTS",
  		"stdname":"STDNAME"
  	},
  	this.options = $.extend({}, this.defaults, opt)
  }
  CreateZcTree.prototype = {
  	initZcTree:function(deptCon){
		inittreeindex = inittreeindex+1;
  		var $element = this.$element;
  		var id = this.options.id;
  		var level = this.options.level;
  		var parents = this.options.parents;
  		var stdname = this.options.stdname;
		$(function(){
			var maxlevel = 1;
			for(var i=0;i<deptCon.length;i++){
				if(deptCon[i][level] > maxlevel){
					maxlevel = deptCon[i][level];
				}
				if(deptCon[i][level] == 1){
					//console.log(deptCon[i].RECID);
					shtml="<li><a class='zctree_clicka'   level='"+deptCon[i][level]+"'  recid='"+deptCon[i][id]+"' >"+deptCon[i][stdname]+"</a><ul></ul></li>" 
					$element.append(shtml);				
				}
			}
			for(var i=2;i<=maxlevel;i++){ 
				for(var j=0;j<deptCon.length;j++){
					if(deptCon[j][level] == i){
						//console.log(deptCon[j].PARENT+" "+deptCon[j].PARENTS);
						$(".zctree_clicka").each(function(){
							
							if(deptCon[j][parents].indexOf($(this).attr("recid")) != -1 ){
								
								$(this).parent("li").children("ul").append('<li><a class="zctree_clicka" href="javascript:void(0);" level="'+deptCon[j][level]+'"  recid="'+deptCon[j][id]+'" >'+deptCon[j][stdname]+'<span class="glyphicon glyphicon-remove-sign" style="margin-left:5px;color:red;display:none;"></span></a><ul></ul></li>'); 
							}
						});
					}
				}
			}
			$element.tree({
				expanded: 'li:first'
			});	
		
		});
		if(inittreeindex==1){
			$(document).on("click",".zctree_clicka",function(){
				alert(1)
				alert($(this).attr("id"))
			})
		}
  	
  	},
  	getStdNameById:function(id){
  		
  		var elements = this.$element;
  		var returntext = "";	
		elements.find(".zctree_clicka").each(function(){
		
			if($(this).attr("recid").trim()==id){
				returntext = $(this).text();
				
			}
  		})

  		return returntext;
  	},
  	
  	setValueInNode:function(jsonobj){
  		
  		var jsonobj = eval(jsonobj);
  		var tipinfo = "";
  		var danlei = "";
  		for(var i in jsonobj){
	  		var elements = this.$element;
	  		danlei = "没有ID参数";
	  		
	  		tipinfo = tipinfo+danlei;
		}
  		return tipinfo;
  	
  	}
  	
  }
  
  $.fn.toCreateZcTree = function(options){
  	var createZcTree = new CreateZcTree(this, options);
  	return createZcTree;
  }
})(jQuery,window,document);



