if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
var HANATI = HANATI || {};
HANATI = {
	/* 페이지 로드함수 */
	init : function(){
		var funcThis = this;
		$(function(){
			if(touchstart){
				$("html").addClass("touchmode");
			}else{
				$("html").removeClass("touchmode");
			}
			funcThis.dimLayerControl();
			funcThis.layerCommon();
		});
		$(window).on("load",function(){
			funcThis.oldBrowerPop();
		});
	},
	bothMinHeight : function(target,csstarget,adddom){
		var $target = $(target),
			$target_height = $target.length ? $target.outerHeight() : 0,
			$adddom = $(adddom),
			$adddom_height = $adddom.length ? $adddom.outerHeight() : 0,
			$csstarget = $(csstarget),
			$csstarget_pt = $csstarget.length ? parseInt($csstarget.css("padding-top")) : 0,
			$csstarget_pb = $csstarget.length ? parseInt($csstarget.css("padding-bottom")) : 0,
			$csstarget_height = $csstarget.length ? $csstarget.outerHeight() : 0;
		if($csstarget_height+$adddom_height<$target_height){
			$csstarget.css("min-height",$target_height-$adddom_height-$csstarget_pt-$csstarget_pb);
		}
	},
	layerCommon : function(){
		var $hlog_target = $(".hlog_target"),
			$hlog_layer = $(".hlog_layer");
		$hlog_target.on("click",function(){
			var $this = $(this),
				$t_n = $this.next(".hlog_layer");
			$this.toggleClass("active");
			$t_n.slideToggle();
		});
		$(document).on("click",function(e){
			if(!$(e.target).parents(".hlogdata").length){
				$hlog_target.removeClass("active");
				$hlog_layer.slideUp();
			}
		});
		
		var $btn_left_toggle = $(".btn_left_toggle"),
			$midscont_both = $(".midscont_both");
		$btn_left_toggle.on("click",function(){
			$midscont_both.toggleClass("type2");
			$(this).toggleClass("active");
			$(window).trigger("resize");
		});
	},
	/* 구브라우저 미지원 팝업 */
	oldBrowerPop : function(){
		var innerHtml = "";
		if( navigator.appName.indexOf("Microsoft") > -1 ){
			if(navigator.appVersion.indexOf("MSIE 7") > -1 || navigator.appVersion.indexOf("MSIE 8") > -1 || navigator.appVersion.indexOf("MSIE 9") > -1){
				innerHtml += "<div class='browser_layer_w'>";
				innerHtml += "<div class='browser_layer'>";
				innerHtml += "<div class='brow_top'>미지원 브라우저 알림</div>";
				innerHtml += "<div class='brow_mid'>";
				innerHtml += "<p class='brow_mid_p'>";
				innerHtml += "웹사이트의 모든 기능을 이용하시려면<br>";
				innerHtml += "최신 브라우저로 업데이트하시기 바랍니다.";
				innerHtml += "</p>";
				innerHtml += "<p class='brow_btn_w'>";
				innerHtml += "<a href='https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads' class='brow_btn' target='_blank' title='새창'><span class='hdtext'>Internet Explorer 다운로드 바로가기</span></a>";
				innerHtml += "</p>";
				innerHtml += "</div>";
				innerHtml += "</div>";
				innerHtml += "</div>";
				$("body").append(innerHtml);
				$(".browser_layer").css({"margin-top":-$(".browser_layer").outerHeight()/2});
				$(".browser_layer_w").addClass("complete");
				$(".page_wrap").css({"z-index":0});
			}
		}
	},
	dimLayerControl : function(){
		var thisUI = this;
		$(document).on("click",".btn_layerclose , .closetrigger",function(){
			thisUI.dimLayerHide($(this).parents(".dimlayer_z"));
		});
	},
	dimLayerShow : function(target,callback){
		$(function(){
			action(target,callback);
		});
		function action(target,callback){
			var $target = $(target),
				$t_layer_td = null,
				$t_layer_tit_low = null,
				$t_layer_tit_low_height = 0,
				$t_layer_td_cssptd = 0,
				$t_layer_td_csspbd = 0,
				$t_btn_lysm_w = null,
				$t_btn_lysm_w_height = 0,
				$t_layer_cont = null,
				$t_layer_box = null,
				$t_layer_box_height = 0;
			
			$(".dimlayer_z").hide();
			$target.show();
			setTimeout(function(){
				$t_layer_td = $target.find(".dimlayer_td");
				$t_layer_td_cssptd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-top")) : 0;
				$t_layer_td_csspbd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-bottom")) : 0;
				$t_layer_box = $target.find(".layer_box");
				$t_layer_box_height = $t_layer_box.length ? $t_layer_box.outerHeight() : 0;
				
				boxHeight();
				
				if($t_layer_box_height+$t_layer_td_cssptd+$t_layer_td_csspbd > $(window).height()){
					$("html,body").addClass("touchDis");
				}
				$(window).on("resize",function(){
					boxHeight();
				});
				if(callback){
					callback();
				}
			},50);
			
			function boxHeight(){
				$t_layer_tit_low = $target.find(".layer_tit_low");
				$t_layer_tit_low_height = $t_layer_tit_low.length ? $t_layer_tit_low.outerHeight() : 0;
				$t_btn_lysm_w = $target.find(".btn_lysm_w");
				$t_btn_lysm_w_height = $t_btn_lysm_w.length ? $t_btn_lysm_w.outerHeight() : 0;
				$t_layer_cont = $target.find(".layer_cont");
				$t_layer_cont.css("max-height",$(window).height() - ($t_layer_td_cssptd+$t_layer_td_csspbd+$t_btn_lysm_w_height+$t_layer_tit_low_height));
			}
		}
		function getScrollBarWidth() {
		    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		    $outer.remove();
		    return 100 - widthWithScroll;
		};
	},
	dimLayerHide : function(target){
		$(function(){
			action(target);
		});
		
		function action(target){
			var $target = $(target);
			$(".dimlayer_z").hide();
			$target.hide();
			$("html,body").removeClass("touchDis");
		}
	},
	sctabFunc : function(){
		var $sctab_z = $(".sctab_z");
		$sctab_z.each(function(){
			var $t_sctab_z = $(this),
				$t_sccont_w = $(".sccont_w",$t_sctab_z),
				$t_sccont = $(".sccont",$t_sctab_z),
				$t_sctab_td = $(".sctab_td",$t_sctab_z);
			$t_sctab_td.on("click",function(e){
				var $this = $(this),
					$t_target = $($this.attr("href"));
				e.preventDefault();
				$t_sctab_td.removeClass("active");
				$this.addClass("active");
				if($t_target.length){
					$t_sccont.hide();
					$t_target.show();
				}
			});
		});
	}
};
HANATI.init();