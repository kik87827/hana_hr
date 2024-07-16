if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/

var HANATI = HANATI || {};

HANATI = {
	init : function(){
		var funcThis = this;
		$(function(){
			funcThis.actog();
			funcThis.dimLayerControl();
			funcThis.totalFunc();
		});
		$(window).on("load",function(){
		});
	},
	rockTotalFunc : function(target){
		$(".mtmenu_list > li").removeClass("active");
		$(target).addClass("active");
	},
	totalFunc : function(){
		var $mp_gnb_z = $(".total_z"),
			$tm_isc_w = $(".total_scr"),
			touchstart ="ontouchstart" in window,
			$htotal = null;
		
		if($tm_isc_w.length){
			$htotal = new IScroll(".total_w",{
				mouseWheel: true,
				preventDefault : false
			});
			FontFaceOnload('Noto Sans Korean',{
				success: function() {
					$htotal.refresh();
				}
			});
			$(window).on("resize",function(){
				if($(window).width()>=1024){
					totalClose();
					return;
				}
				$htotal.refresh();
			}).resize();
		}
		$tm_isc_w.on("iscRefresh",function(){
			$htotal.refresh();
		});
		$(".btn_totalcall").on("click",function(e){
			e.preventDefault();
			$mp_gnb_z.show();
			setTimeout(function(){
				$mp_gnb_z.addClass("active");
				$htotal.refresh();
			},30);
			heightcheck();
		});
		/*
		$mp_gnb_z.on("touchmove",function(){
			if(!$("html").hasClass("safari")){return;}
			document.ontouchmove = function(e){ e.preventDefault(); };
			$("html,body").addClass("touchDis2");
		});
		$mp_gnb_z.on("touchend",function(){
			if(!$("html").hasClass("safari")){return;}
			document.ontouchmove = function(e){ return true; };
			$("html,body").removeClass("touchDis2");
		});
		*/
		$(".btn_totalclose").on("click",function(e){
			totalClose();
		});
		$mp_gnb_z.on("click",function(e){
			if($(e.target).parents(".total_w").length){
				return;
			}
			totalClose();
		});
		function heightcheck(){
			if(touchstart){
				$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()});
				$("html").addClass("touchDis");
			}
		}
		function totalClose(){
			$mp_gnb_z.removeClass("active");
			setTimeout(function(){
				$mp_gnb_z.hide();
				scrollEnd();
			},500);
		}
		
		function scrollEnd(){
			$("html,body").removeClass("touchDis");
			if(touchstart){
				$("body").css({"margin-top":0});
				window.scrollTo(0,Number($("body").data("data-scr")));
			}
		}
		
	},
	actog : function(){
		$(document).on("click",".btn_acitem",function(e){
			var $this = $(this),
				$t_p = $this.parents(".acitem_w"),
				$t_t = $this.next(".accont_w");
		//	if($this.hasClass("type2")){return;}
			if($(e.target).parents(".acitin").length){return;}
			if($t_p.length){
				$t_p.toggleClass("active");
			}
		});
		/*
		$(document).on("click",".acitemh_in",function(){
			var $this = $(this),
				$t_p = $this.parents(".acitem_w"),
				$t_t = $t_p.find(".accont_w");
			if($t_p.length){
				$t_p.toggleClass("active");
			}
		});*/
		$(document).on("click",".btn_like , .like_type",function(){
			var $this = $(this);
			$this.toggleClass("active");
		});
	},
	dimLayerControl : function(){
		var objThis = this,
			touchIs = "ontouchstart" in window,
			$modal = $(".dlayer_w");
		if($modal.length===0){return;}
		$modal.on("click",".dlayer_bg , .btn_dlayerclose,.closetrigger",function(e){
			var $this = $(this),
				$t_p = $this.parents(".dlayer_w");
			e.preventDefault();
			objThis.dimLayerHide({ 'target' : $t_p});
		});
	},
	dimLayerShow : function(option){
		var touchIs = "ontouchstart" in window,
			$modal = null,
			$target = null,
			transis = "TransitionEvent" in window;
		
		$(function(){
			$modal = $(".dlayer_w");
			
			$target = $(option.target);
			
			if($modal.length===0){return;}
			$modal.removeClass("active");
			$target.addClass("active");
			
			$(".page_wrap").css({"z-index":0});
			heightcheck();
			if("openCallback" in option){
				option.openCallback();
			}
			function heightcheck(){
				if(touchIs){
					$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
					$("html").addClass("touchDis");
				}
			}
		});
	},
	dimLayerHide : function(option){
		var $callbtn = null,
			touchIs = "ontouchstart" in window,
			$modal = null,
			$target = null,
			transis = "TransitionEvent" in window,
			$t_box = null,
			$t_box_duration = 0;
			
		$(function(){
			$modal = $(".dlayer_w");
			$target = $(option.target);
			$target.removeClass("active");
			$(".page_wrap").css({"z-index":""});
			$("html,body").removeClass("touchDis");
			scrollEnd();
			
			if("closeCallback" in option){
				option.closeCallback();
			}
			
			function scrollEnd(){
				if(touchIs){
					$("body").css({"margin-top":0});
					window.scrollTo(0,Number($("body").data("data-scr")));
				}
			}
		});
	}
};
HANATI.init();