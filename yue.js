$(function(){
    var Index=0;
    var musics=[{name:"自由的时间",author:"许巍",src:"自由.mp3",tx:"tx6.jpg",bg:"bg1.jpg"},
    	{name:"旅行",author:"许巍",src:"旅行.mp3",tx:"tx2.jpg",bg:"bg4.jpg"},
    	{name:"那一年",author:"许巍",src:"那一年.mp3",tx:"tx5.jpg",bg:"bg5.jpg"}]
function render(){
	$.each(musics,function(i,v){
		var c=(i===Index) ? "active" : "";
		$('<li class="'+c+'"><span>'+v.name+'</span><span> — '+v.author+'</span></li>').appendTo("#lists");
	})
}
    $("#lists").on("click","li",function(){
    	$("#lists").find("li").removeClass("active");
    	$(this).addClass("active");
    	Index=$(this).index();
    	audio.src=musics[Index].src;
    	name.html(musics[Index].name);
    	auto.html("—— "+musics[Index].author+" ——");
    	$('html').css("background","url("+musics[Index].bg+")")
    	$('#toux').css("background","url("+musics[Index].tx+")")
    })
     render();
    $("#next").on("click",function(){
    	var now=$('.active').index();
		if(now>=$("li").length-1){
	  		now=-1
	  	}
    	$("#lists").find("li").removeClass("active");
    	
    	$("li").eq(now+1).addClass("active");
    	audio.src=musics[now+1].src;
    	name.html(musics[now+1].name);
    	auto.html("—— "+musics[now+1].author+" ——");
    	$('html').css("background","url("+musics[now+1].bg+")")
    	$('#toux').css("background","url("+musics[now+1].tx+")")})
	 $("#shang").on("click",function(){
	    	var now=$('.active').index();
	    	if(now<1){
	  		now=$("li").length
	  		}
	    	$("#lists").find("li").removeClass("active");
	    	$("li").eq(now-1).addClass("active");
	    	audio.src=musics[now-1].src;
	    	name.html(musics[now-1].name);
	    	auto.html("—— "+musics[now-1].author+" ——");
	    	$('html').css("background","url("+musics[now-1].bg+")")
	    	$('#toux').css("background","url("+musics[now-1 ].tx+")")
	   })
	var audio=$("#audio")[0];
	var play = $("#play");
	var current=$("#cur");
	var duration=$("#dur");
	var PI=$("#kuai");
	var progress=$("#vic");
//	var vol=$("#vic")
//	var VI=$("#yuan")
	var mute=$(".last");
	var name=$("#name");
	var auto=$("#auto");

	function format(v){
		v=Math.floor (v);
		var s = v % 60;
		s=(s<10)?("0"+s):s;
		var m=Math.floor(v/60);
		return m + ":" + s;
	}
	
	
	play.on("click",function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
	})
	$(audio).on("play",function(){
        play.html("&#xe618;");
	})	
	$(audio).on("pause",function(){
        play.html("&#xe616;");
	})

	progress.on("click",function(e){
		audio.currentTime=e.offsetX / $(this).width() * audio.duration;
	})
	

	$(audio).on("canplay",function(){
		duration.html(format(audio.duration));
		audio.play();
	})
	

	$(audio).on("timeupdate",function(){
		current.html(format(audio.currentTime));
		var left=progress.width() * audio.currentTime / audio.duration 
		- PI.width() / 2;
		PI.css('left',left);
	})
	
	
	PI.on("click",false)
	PI.on('mousedown',function(e){
		var r=PI.width()/2;
		var start=r-e.offsetX;
		$(document).on('mousemove',function(e){
			var left=e.clientX - progress.position().left + start;
			var c=left / progress.width() * audio.duration;
			if(c>=audio.duration||c<=0){
				return;
			}
			audio.currentTime=c;
		})
		return false;
	})

		$(document).on('mouseup',function(){
			$(document).off('mousemove');
		})


//	VI.on("click",false)
//	vol.on("click",function(e){
//		audio.volume=e.offsetX/vol.width();
//		mute.removeAttr("data-v");
//	})
	
	mute.on("click",function(){
		if($(this).attr("data-v")){
			audio.volume=$(this).attr("data-v");
			$(this).removeAttr("data-v");
		}else{
			$(this).attr("data-v",audio.volume)
			audio.volume = 0;
		}
	})
	
	
//	$(audio).on('volumechange',function(){
//		VI.css('left',vol.width()* audio.volume-VI.width()/2);
//	})
	

//	VI.on('mousedown',function(e){
//
//		var r=VI.width()/2;
//		var start=r-e.offsetX;
//		$(document).on('mousemove',function(e){
//			var m=e.clientX;
//			var left=m-vol.position().left+start;
//			var v=left/vol.width();
//			if(v>1||v<0){
//				return;
//			}
//			audio.volume=v;
//		})
//		return false;
//	})

	$(document).on('mouseup',function(){
			$(document).off('mousemove');
	})

	$(".left").on("touchstart",function(){
		$("#lists").slideDown("slow");
		$("#body-nei").fadeOut("slow");
	})
	    var tou;
		$("html").on("touchstart",function(e){
			tou=e.originalEvent.changedTouches[0].clientY;
		})
		
		$("html").on("touchend",function(e){
			var wei=e.originalEvent.changedTouches[0].clientY;
			if(tou-wei>=60){
				$("#lists").slideUp("slow");
				$("#body-nei").fadeIn("slow");
			}
		})
	})