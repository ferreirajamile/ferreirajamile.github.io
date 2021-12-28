ie=document.all?1:0
n=document.layers?1:0

timSpeed=50
contHeight=220

function makeScrollObj(obj,nest){
	nest=(!nest) ? '':'document.'+nest+'.'										
	this.css=(n) ? eval(nest+'document.'+obj):eval('document.all.'+obj+'.style')							
	this.scrollHeight=n?this.css.document.height:eval('document.all.'+obj+'.offsetHeight')							
	this.top=b_gettop										
	return this
}

function b_gettop(){
	var gleft=(n) ? eval(this.css.top):eval(this.css.pixelTop);
	return gleft;
}

var scrollTim;
var active=0;

function scroll(speed){
	clearTimeout(scrollTim)
	way=speed>0?1:0
	if((!way && oScroll[active].top()>-oScroll[active].scrollHeight+contHeight) || (oScroll[active].top()<0 && way)){
		oScroll[active].css.top=oScroll[active].top()+speed
		scrollTim=setTimeout("scroll("+speed+")",timSpeed)
	}
}

function noScroll(){
	clearTimeout(scrollTim)
}

function changeActive(num){
	oScroll[active].css.visibility='hidden'
	active=num
	oScroll[active].css.top=0
	oScroll[active].css.visibility='visible'
}

function scrollInit(){
	oScroll=new Array()
	oScroll[0]=new	makeScrollObj('divScroll1','divCont')
	oScroll[4]=new	makeScrollObj('divScroll1','divCont')
	oScroll[1]=new	makeScrollObj('divScroll1','divCont')
	oScroll[2]=new	makeScrollObj('divScroll1','divCont')
	oScroll[3]=new	makeScrollObj('divScroll1','divCont')
	oScroll[0].css.visibility='visible'
}

onload=scrollInit; 



function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);