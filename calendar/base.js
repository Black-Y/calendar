function getWidth(element,width){
    if(element.currentStyle){
        return element.currentStyle.width; //ie下先获取样式
    }else{
        return getComputedStyle(element,false).width; //FF下获取样式
    }
}
var Calendar = function(){
	this.calObj = document.getElementById("calendarBox");
	this.showDetail = false;
	this.year = 0;
	this.month = 0;
}
Calendar.prototype.getDayNum = function(month){
	var dayNum;
	switch(month){
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			dayNum = 31;
			break;
		case 3:
		case 5:
		case 8:
		case 10:
			dayNum = 30;
			break;
		case 1:
			dayNum = this.year%4==0?29:28;
			break;
	}
	return dayNum;
}
Calendar.prototype.getYear = function(){
	var date = new Date();
	this.year = date.getFullYear();
	return date.getFullYear();
}
Calendar.prototype.getMonth = function(){
	var date = new Date();
	var mon = date.getMonth();
	this.month = mon;
	return mon;
}
Calendar.prototype.initDays = function(){
	var year = this.year;
	var dt = new Date(year, this.month, 1);
	var index = dt.getDay();
	var dayUl = document.getElementById("daysList");
	var dayLen = dayUl.getElementsByTagName("li").length;
	var startDay = 1;
	var num = this.getDayNum(this.month);
	var h = $("#weekdays li").css("width");
	document.getElementById("weekdays").style.height = h;
	document.getElementById("weekdays").style.lineHeight = h;
	var w =  $("#calendarBox").css("width");
	var divHeight = parseInt(h)*7+parseInt(w)*0.02;
	$("#trdDiv").css("height", divHeight);
	$("#daysList li").removeClass("isDay");
	$("#weekdays li").removeClass("isWeekday");
	for(var i = 0; i<dayLen; i++){
		dayUl.getElementsByTagName("li")[i].style.height = h;
		dayUl.getElementsByTagName("li")[i].style.lineHeight = h;
	}
	for(var i=index; i<index+num; i++){//获取当月天数
		dayUl.getElementsByTagName("li")[i].style.color = "#fff";
		dayUl.getElementsByTagName("li")[i].innerHTML = startDay++;
	}
	if(index>0){//获取前一个月天数
		var m1 = this.month-1<0?11:this.month-1;
		var numPrev = this.getDayNum(m1);
		for(var i=0; i<index; i++){
			dayUl.getElementsByTagName("li")[i].innerHTML = (numPrev-index+1)+i;
			dayUl.getElementsByTagName("li")[i].style.color = "#6f6f6f";
		}
	}
	startDay = 1;
	if(index+num < dayLen){//获取下一个月天数
		var m2 = this.month > 11?1:this.month+1;
		var numNext = this.getDayNum(m2);
		for(var i=index+num; i<dayLen; i++){
			dayUl.getElementsByTagName("li")[i].innerHTML = startDay++;
			dayUl.getElementsByTagName("li")[i].style.color = "#6f6f6f";
		}
	}
	var date = new Date();
	var d = date.getDate();
	if(date.getMonth() == this.month && date.getFullYear() == this.year){
		$("#daysList li").eq(index+d-1).addClass("isDay");
		$("#weekdays li").eq(Math.ceil(d%7)+index-1).addClass("isWeekday");
	}
	document.getElementById("day").innerHTML = (d>9?d:"0"+d)+"日";
}
Calendar.prototype.initTimer = function(){
 	var date = new Date(); 
 	document.getElementById("timer").innerHTML = "时间&nbsp;:&nbsp;&nbsp;" + (date.getHours()>9?date.getHours():"0"+date.getHours()) + "&nbsp;:&nbsp;" + (date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes());
	setTimeout(Calendar.prototype.initTimer,1000);
}
Calendar.prototype.initCalendar = function(){
	var that = this;
	$("#ctrlBtn").click(function(){
		if(!that.showDetail){
			// document.getElementById("trdDiv").className = "listOn";
			$("#trdDiv").slideDown(300);
			this.className = "rotReduce";
			this.innerHTML = "";
			$("#prevBtn").css("visibility","visible");
			$("#nextBtn").css("visibility","visible");
		}else{
			$("#trdDiv").slideUp(300);
			// document.getElementById("trdDiv").className = "listOff";
			this.className = "rotAdd";
			this.innerHTML = "-";
			$("#prevBtn").css("visibility","hidden");
			$("#nextBtn").css("visibility","hidden");
			var date = new Date();
			that.year = date.getFullYear();
			that.month = date.getMonth();
			$("#year").text(that.getYear());
			$("#mon").text(that.getMonth()+1 + "月");
			that.initDays();
		}
		that.showDetail = !that.showDetail;
	});
	$("#year").text(this.getYear());
	$("#mon").text(this.getMonth()+1 + "月");
	document.getElementById("prevBtn").addEventListener("click", function(){
		if(that.month<1){
			that.month = 11;
			that.year--;
		}else{
			that.month--;
		}
		document.getElementById("year").innerHTML = that.year;
		document.getElementById("mon").innerHTML = (that.month+1) + "月";
		that.initDays();
	});
	document.getElementById("nextBtn").addEventListener("click", function(){
		if(that.month>10){
			that.month = 0;
			that.year++;
		}else{
			that.month++;
		}
		document.getElementById("year").innerHTML = that.year;
		document.getElementById("mon").innerHTML = (that.month+1) + "月";
		that.initDays();
	});
	this.initDays();
	this.initTimer();
}
var aa = new Calendar();
aa.initCalendar();
