// Init App
var myApp = new Framework7({
    modalTitle: 'Scidoo.com',
	 material: true,
	 pushState:true,
	 animatePages:false
});

IDcode=window.localStorage.getItem("IDcode");

// Expose Internal DOM library
var $$ = Dom7;

// Add main view

var mainView = myApp.addView('.view-main', {});
// Add another view, which is in right panel

//var baseurl='http://127.0.0.1/milliont/';
//var baseurl='http://192.168.1.107/milliont/';
//var baseurl='http://192.168.1.2/milliont/';

var baseurl='https://www.scidoo.com/';

var calendarDefault = myApp.calendar({
     input: '#kscal',
		dateFormat: 'dd/mm/yyyy'
    });
var IDutente=0;
	 function sendform(){
        var email = $$('input[name="email"]').val();
        var password = $$('input[name="pass"]').val();
			
		setTimeout(function(){ hidelo(); }, 5500);		
			
		var url = baseurl+'config/login.php';
		//alert(url);
		myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
		$$.ajax({
                url: url,
                method: 'POST',
				dataType: 'text',
				cache:false,
				data: {
                    email:email,
					password:password,
					json:1,
					callback:'?'
                },
                beforeSend: function (data) {
					
				},
				 error: function (data) {
					//alert(data);
					//console.log(data);
				},
				statusCode: {
					404: function() {
					  alert( "page not found" );
					  myApp.hideIndicator();
					}
				  },
				  
                success: function (data) {
                    //Find matched items
					//alert(data);
					 myApp.hideIndicator();  	 //alert(data);
					var num=data.indexOf("error");  	 //alert(data);
					if(num==-1){					
						window.localStorage.setItem("IDcode", data);
						IDcode=data;
							var query = {IDcode:data};
							navigation(0,'POST',query);
						
					}else{
						myApp.addNotification({
							message: 'I Dati immessi non sono corretti. Prego riprovare!'
						});
						mainView.router.back();
					}
					 
				}
            })
	}
	
		function sendform2(){
        var email = $$('input[name="mailcli"]').val();
        var data = $$('input[id="kscal"]').val();
		var url = baseurl+'config/logincli.php';
		myApp.showIndicator();
		setTimeout(function(){ hidelo(); }, 5500);	
		//alert(url);
		$$.ajax({
                url: url,
                method: 'POST',
				dataType: 'text',
				cache:false,
				data: {
                    email:email,
					data:data,
					json:1
                },
                beforeSend: function (data) {
					//alert(email);
				},
				 error: function (data) {
					alert(data);
					//console.log(data);
				},
				statusCode: {
					404: function() {
					  alert( "Problema applicativo. Contattare la struttura" );
					  myApp.hideIndicator();
					}
				  },
				  
                success: function (data) {
                    // Find matched items
                 	 //alert(data);
					 myApp.hideIndicator();
                    //alert(data);
					var num=data.indexOf("error");
					if(num==-1){
						window.localStorage.setItem("IDcode", data);
						IDcode=data;
						var query = {};
						navigation(1,'POST',query);

					}else{
						myApp.addNotification({
							message: 'I Dati immessi non sono corretti. Prego riprovare!'
						});
						//mainView.router.back();
					}
				}
            })	
  
	
	}



myApp.onPageInit('profilo', function (page) {	
	myApp.initPageSwiper('#tabmain3');
});




myApp.onPageInit('calendario', function (page) {	
	var p=0;
	var ps=0;
	
	//document.getElementById('tabcalmain').scrollLeft=100;
	
	
	$$('.open-about').on('click', function () {
		
		
		//IDcode=window.localStorage.getItem("IDcode");
		var url=baseurl+"mobile/config/nuovaprenotazione.php";
		//id=parseInt(id);
		//var apriurl=new Array('config/profilo.php','config/profilocli.php','config/calendario.inc.php','config/detpren.php');
		//var url=url+apriurl[id];
		//alert(IDcode);
		
		query=new Array();			
		
		myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
		$$.ajax({
				url: url,
					method: 'GET',
					dataType: 'text',
					cache:false,
					data: query,
					success: function (data) {
						myApp.hideIndicator();
						///mainView.router.loadContent(data);
						var popupHTML = '<div class="popup" style="padding:0px;">'+data+'</div>';
						
						myApp.popup(popupHTML);
						
						navigationtxt(5,0,'step0',0);
						statostep=0;
						myApp.initPageSwiper('#tabmain4');
						
			 }
		 });	
	});
	
	
	var container2 = $$('.page-content');
	$$(container2).scroll(function() {
		var offset = $$("#tabappart").offset();
		var off=parseInt(offset.top)+parseInt(55);
		
		if(off<105){
			if(ps==0){
				//$$('#navcal').hide();
				//mainView.hideToolbar();
				ps=1;
			}
		}else{
			if(ps==1){
				//mainView.showToolbar();
				//$$('#navcal').show();
				ps=0;
			}
		}
		
		if(off<104){
				 var offset2=$$('.table-fixed-right').offset();
				var lef=parseInt(offset2.left)*-1+parseInt(174);
				 var off2=offset.top;
				 //$('#valore').html(off2);
				 //document.getElementById('valore').innerHTML=off2;
				 if(off2<0){
					 var off2=(off2*-1);
					 //off2=parseInt(off2)+parseInt(2);
				 }else{
					 off2=0+parseInt(parseInt(2)-off2);
				}
				off2=parseInt(off2)+parseInt(50);
				
				$$('#tabdate').css('top',off2+'px');
				
				if(p!=1){ 
					$$('#tabdate').css('position','fixed');
					$$('#tabdate').css('z-index','99999');
					//$$('#tabdate').css('left','0px');
					$$('#tabbody').css('margin-top','38px');
					p=1;
				}
				
		}else{
			if(p==1){
				
				$$('#tabdate').css('position','absolute');
				$$('#tabdate').css('top','auto');
				$$('#tabdate').css('margin-top','0px');
				$$('#tabdate').css('left','0px');
				
				p=0;
			}
		}
	});
	
	
});


var myCalendar='';

function navigation(id,str,agg){
	//alert(id);
	var url=baseurl+"mobile/";
	id=parseInt(id);
	var apriurl=new Array('config/profilo.php','config/profilocli.php','config/calendario.inc.php','config/detpren.php','config/centrobenessere.php','config/ristorante.php','config/pulizie.php','config/arrivi.php','config/prenotazioni.php','config/clienti.php','config/domotica.php','config/notifiche.php','config/appunti.php','config/ristorantegiorno.php','config/centrobenesseregiorno.php');
	var url=url+apriurl[id];
	//alert(IDcode);
	
	query=new Array();
	query['IDcode']=IDcode;
	//alert(IDcode);
	if(str.length>0){
		var vettore=str.split(',');
		if(vettore.length>0){
			for (prop in vettore) {
				query['dato'+prop]=vettore[prop];
			}
		}else{
			query['dato0']=str;
		}
	}
	myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
	$$.ajax({
            url: url,
                method: 'GET',
				dataType: 'text',
				cache:false,
                data: query,
                success: function (data) {
					myApp.hideIndicator();
					//alert(data);
					
					mainView.router.load({
					  content: data,
					  force: true
					});
					//mainView.router.loadContent({content:data,force:true});
					switch(agg){
						case 1:
							var offset = $$(".ogg").offset();
							var left=(parseInt(offset.left)-parseInt(100));
							document.getElementById('tabcalmain').scrollLeft=left;
						
						break;
						case 2:
	
							 myCalendar = myApp.calendar({
								input: '#datacentro',
								weekHeader: true,
								dateFormat: 'dd/mm/yyyy',
								header: false,
								footer: false,
								rangePicker: true,
								onChange:function (p, values, displayValues){
									//alert(p+'//'+values+'//'+displayValues);
									var string=new String(values);
									var vett=string.split(',');
									var t1=vett['0']/1000;
									if(string.length>20){
										var t2=vett['1']/1000;
										var diff=((t2-t1)/86400);
										var send=t1+','+diff;
										navigationtxt(13,send,'centrobenesserediv',5)
										myCalendar.close()
									}
								}
							});
						
						break;
						case 3:
							 myCalendar = myApp.calendar({
								input: '#datacentro',
								weekHeader: true,
								dateFormat: 'dd/mm/yyyy',
								header: false,
								footer: false,
								rangePicker: true,
								onChange:function (p, values, displayValues){
									//alert(p+'//'+values+'//'+displayValues);
									var string=new String(values);
									var vett=string.split(',');
									var t1=vett['0']/1000;
									if(string.length>20){
										var t2=vett['1']/1000;
										var diff=((t2-t1)/86400);
										var send=t1+','+diff;
										navigationtxt(14,send,'ristorantediv',6)
										myCalendar.close()
									}
								}
							});
						
						
							
						break;
						case 4:
						
							 myCalendar = myApp.calendar({
								input: '#datacentro',
								weekHeader: true,
								dateFormat: 'dd/mm/yyyy',
								header: false,
								footer: false,
								rangePicker: true,
								onChange:function (p, values, displayValues){
									
									var string=new String(values);
									var vett=string.split(',');
									var t1=vett['0']/1000;
									if(string.length>20){
										var t2=vett['1']/1000;
										var diff=((t2-t1)/86400);
										var send=t1+','+$$('#IDtipovis').val()+','+diff;
										navigationtxt(15,send,'puliziediv',7)
										myCalendar.close()
									}
									
								}
								
							});
							
							
							
						
						
							
						break;
						case 5:
							 myCalendar = myApp.calendar({
								input: '#dataarrivi',
								weekHeader: true,
								dateFormat: 'dd/mm/yyyy',
								header: false,
								footer: false,
								rangePicker: true,
								onChange:function (p, values, displayValues){
									
									var string=new String(values);
									var vett=string.split(',');
									var t1=vett['0']/1000;
									if(string.length>20){
										var t2=vett['1']/1000;
										var diff=((t2-t1)/86400);
										var send=t1+','+diff;
										navigationtxt(17,send,'arrividiv',8)
										myCalendar.close()
									}
									
								}
							});
						break;
						case 6:
							var sosp=$$('#sospesi').val();
							$$('#badgecentro').html(sosp);
						break;
						
					}
					
         }
     });
}



function aventistep1(){
	if(okstep1==1){
		stepnew(1,0);
	}else{
		myApp.addNotification({
			message: "E' necessario inserire una data. Prego riprovare",
			hold:2000,
			button: {text: '<i class="material-icons">close</i>'}
		});
	}
}

function avantistep2(){
	if ($$('input[name=pacchetto]:checked').length > 0) {
		statostep=3;stepnew(1,0);
	}else{
		myApp.addNotification({
			message: "E' necessario selezionare una soluzione. Prego riprovare",
			hold:2000,
			button: {text: '<i class="material-icons">close</i>'}
		});
	}
}


var statostep=0;

function stepnew(step,str){
	$$('.popup').scrollTo(0,0);
	$$('.page-content').scrollTo(0,0);
	var show=1;
	var agg=1;
	if(step==-1)agg=0;

	switch(step){
		case 0:
			show=0;
		break;
		case 1:
			statostep++;
		break;
		default:
			statostep--;
		break;
	}
	$$('#buttonadd').css('visibility','hidden');
	var step=parseInt($$('#step'+statostep).attr('alt'));
	$$('.tabpren').attr('disabled','disabled');
	for(i=0;i<=statostep;i++){
		$$('#buttstep'+i).removeAttr('disabled');
	}
	switch(step){
		case 0:
			if(show!=0){myApp.showTab('#step'+statostep);}
		break;
		case 1:
			if(agg==1){navigationtxt(4,str,'step'+statostep,2);}
			if(show!=0){myApp.showTab('#step'+statostep);}
		break;
		case 2:
			if(agg==1){navigationtxt(4,"0,2",'step'+statostep,0);}
			if(show!=0){myApp.showTab('#step'+statostep);}
		break;
		case 3:
			if(agg==1){
				navigationtxt(6,1,'step'+statostep,0);
				calcolatot();
			}
			if(show!=0){myApp.showTab('#step'+statostep);}
		break;
		case 4:
			$$('#buttonadd').css('visibility','visible');
			if(agg==1){
				navigationtxt(7,str,'step'+statostep,0);
				calcolatot();
			}
			if(show!=0){myApp.showTab('#step'+statostep);}
		break;
		case 5:
			if(agg==1){navigationtxt(8,str,'step'+statostep,0);}
			if(show!=0){myApp.showTab('#step'+statostep);}
		break;
		case 6:
			if(agg==1){navigationtxt(9,str,'step'+statostep,0);}
			if(show!=0){myApp.showTab('#step'+statostep);}
		break;
	}
}

var okstep1=0;


function navigationtxt(id,str,campo,agg){
	
	var url=baseurl+"mobile/config/";
	var apriurl=new Array('profilo/temp.php','calendario.inc.php','detpren2.php','calendario2.inc.php','preventivo/step1.php','preventivo/step0.php','preventivo/step2.php','preventivo/step3.php','preventivo/step4.php','preventivo/step5.php','notifiche.inc.php','promemoria.php','appunti.inc.php','centrobenessere.inc.php','ristorante.inc.php','pulizie.inc.php','domotica.inc.php','arrivi.inc.php','clienti.inc.php','prenotazioni.inc.php','ristorantegiorno.inc.php','centrobenesseregiorno.inc.php');
	var url=url+apriurl[id];
	myApp.showIndicator();
	setTimeout(function(){ hidelo(); }, 5500);	

	query=new Array();
	query['IDcode']=IDcode;
	var str=new String(str);
	if(str.length>0){
		var vettore=str.split(',');
		if(vettore.length>0){
			for (prop in vettore) {
				query['dato'+prop]=vettore[prop];
			}
		}else{
			query['dato0']=str;
		}
	}	
	$$.ajax({
            url: url,
                method: 'GET',
				dataType: 'text',
				cache:false,
                data: query,
                success: function (data) {
					//alert(data);
					myApp.hideIndicator();
					$$('#'+campo).html(data);
					myApp.closeModal('.popover-menu');
					switch(agg){
						case 1:
							//$$('.tmenupren').removeClass('active');
							//$$('#tabm'+query['dato1']).addClass('active');
							myApp.closeModal('.popover-menu');
							// myApp.materialTabbarSetHighlight('.subnavbar');
							switch(query['dato1']){
								case "0":
								 	myApp.initPageSwiper('#tabmain');
								break
								case "1":
									myApp.initPageSwiper('#tabmain2');
								break;
							}
							
						break;
						case 2:
						
							var range=true;
							piunotti=1;
							if(query['dato0']==0){
								piunotti=0;
								range=false;
							}
						
						
							 var calendarInline = myApp.calendar({
								container: '#ks-calendar-inline-container',
								input: '#data',
								weekHeader: true,
								dateFormat: 'yyyy-mm-dd',
								rangePicker: range,
								header: false,
								footer: false,
								onChange:function (p, values, displayValues){
									var str=new String(values);
									var vettore=str.split(',');
									//var data=document.getElementById('data').value;
									statostep=1;
									okstep1=0;
									if((piunotti==1)&&(vettore.length==2)){
										//stepnew(1,0);
										okstep1=1;
									}
									
									if((piunotti==0)&&(vettore.length==1)){
										okstep1=1;
										//stepnew(1,0);
									}
									
									
								},
								
								toolbarTemplate:
									'<div class="toolbar calendar-custom-toolbar">' +
										'<div class="toolbar-inner">' +
											'<div class="left">' +
												'<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
											'</div>' +
											'<div class="center"></div>' +
											'<div class="right">' +
												'<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
											'</div>' +
										'</div>' +
									'</div>',
								onOpen: function (p) {
									$$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
									$$('.calendar-custom-toolbar .left .link').on('click', function () {
										calendarInline.prevMonth();
									});
									$$('.calendar-custom-toolbar .right .link').on('click', function () {
										calendarInline.nextMonth();
									});
								},
								onMonthYearChangeStart: function (p) {
									$$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
								}
							});
						     
						break;
						case 3:
							var not=$$('#numnotif').val();
							$$('#numnotifiche').html(not);
							
							var not=$$('#numappunt').val();
							$$('#numappunti').html(not);
							
						break;
						case 4:
							var offset = $$(".ogg").offset();
							var left=parseInt(offset.left)+parseInt(70);
							$$('#tabdate').css('left',lef+'px');
							//$$('#tabdate').animate({'left': left});
						break;
						case 5:
							myCalendar = myApp.calendar({
								input: '#datacentro',
								weekHeader: true,
								dateFormat: 'dd/mm/yyyy',
								header: false,
								footer: false,
								rangePicker: true,
								onChange:function (p, values, displayValues){
									var string=new String(values);
									var vett=string.split(',');
									var t1=vett['0']/1000;
									if(string.length>20){
										var t2=vett['1']/1000;
										var diff=((t2-t1)/86400);
										var send=t1+','+diff;
										navigationtxt(13,send,'centrobenesserediv',5)
										myCalendar.close()
									}
								}
							});
						break;
						case 6:
							myCalendar = myApp.calendar({
								input: '#datacentro',
								weekHeader: true,
								dateFormat: 'dd/mm/yyyy',
								header: false,
								footer: false,
								rangePicker: true,
								onChange:function (p, values, displayValues){
									var string=new String(values);
									var vett=string.split(',');
									var t1=vett['0']/1000;
									if(string.length>20){
										var t2=vett['1']/1000;
										var diff=((t2-t1)/86400);
										var send=t1+','+diff;
										navigationtxt(14,send,'ristorantediv',6)
										myCalendar.close()
									}
								}
							});
						break;
						case 7:
							var myCalendar = myApp.calendar({
								input: '#datacentro',
								weekHeader: true,
								dateFormat: 'dd/mm/yyyy',
								header: false,
								footer: false,
								rangePicker: true,
								onChange:function (p, values, displayValues){
									var string=new String(values);
									var vett=string.split(',');
									var t1=vett['0']/1000;
									if(string.length>20){
										var t2=vett['1']/1000;
										var diff=((t2-t1)/86400);
										var send=t1+','+$$('#IDtipovis').val()+','+diff;
										navigationtxt(15,send,'puliziediv',7)
										myCalendar.close()
									}
								}
							});
						break;
						case 8:
							var myCalendar = myApp.calendar({
								input: '#dataarrivi',
								weekHeader: true,
								dateFormat: 'dd/mm/yyyy',
								header: false,
								footer: false,
								rangePicker: true,
								onChange:function (p, values, displayValues){
									var string=new String(values);
									var vett=string.split(',');
									var t1=vett['0']/1000;
									if(string.length>20){
										var t2=vett['1']/1000;
										var diff=((t2-t1)/86400);
										var send=t1+','+diff;
										navigationtxt(17,send,'arrividiv',8)
										myCalendar.close()
									}
								}
							});
						break;
						case 9:
							var sosp=$$('#sospesi').val();
							$$('#badgecentro').html(sosp);
						break;
						
					}
					
					
					
         }
     });	
}



onloadf();

function onloadf(){
	IDcode=window.localStorage.getItem("IDcode");
	if(IDcode.length>10){
		//alert(ID);
		//var url=baseurl+"mobile/";
		
		var url=baseurl+'mobile/config/controlloini.php';
		//alert(url);
		
		$$.ajax({
            url: url,
                  method: 'POST',
				dataType: 'text',
				cache:false,
                data: {IDcode:IDcode},
                success: function (data) {
					//alert(data);
					var num=data.indexOf("error");
					if((num==-1)&&(!isNaN(data))){
						data=parseInt(data);
						var arr=new Array();
						navigation(data,'POST',arr)
					}
    				//myApp.hideIndicator();
					//mainView.router.loadContent(data);
       			}
    	 });
	}
	
}


function modprofilo(id,campo,tipo,val2,agg){
	var url=baseurl;
	switch(val2) {
			case 8:
				var val=$('#'+campo).html();
				break;
			case 9:
				var val=$('#'+campo).val();
				break;
			case 10:
				val=campo;
			break;
			case 11:
				val=$(campo).val();
			break;
			
		}
		var url=url+'config/gestioneprofilo.php';
	myApp.showIndicator();
	setTimeout(function(){ hidelo(); }, 5500);	
	var query = {val:val, tipo:tipo,IDv:id,val2:val2,json:'1'};
	
	
	$$.ajax({
            url: url,
                  method: 'POST',
				dataType: 'text',
				cache:false,
                data: query,
                success: function (data) {
					myApp.hideIndicator();
					
					switch(agg){
						case 1:
							myApp.addNotification({
								message: 'Temperatura Modificata con Successo'
							});
						 	navigationtxt(0,'POST',0,'contenutodiv');
							
							//navigation(1,'POST','');
						break;
						
					}
					//mainView.router.loadContent(data);
       			}
    	 });
}


idprec=0;
function vis2(id,tipo,multi,num){
	//alert();
	
	
	if(idprec!=id){
		var campo='into'+tipo+'-'+id;
		$$('.modificas').html('--');
		var val=$$('#tr'+id).attr('lang');
		
		idprec=id;
		//alert(val);
		var url=baseurl;
		var url=url+'mobile/config/detserv2.php';
		
		var query = {ID:val,tipo:tipo,multi:multi};
		//alert(url);
		$$.ajax({
				url: url,
					  method: 'GET',
					dataType: 'text',
					cache:false,
					data: query,
					success: function (data) {
						//myApp.hideIndicator();
						document.getElementById(campo).innerHTML=data;
						
						var scriptinto=$$('#scriptinto').html();
						if(scriptinto!="undefined"){
							eval(scriptinto);
						}
						
						
						//mainView.router.loadContent(data);
					}
			 });
	}else{
		idprec=0;
	}
}

function backcentro(tipo){
	
	
	
	switch(tipo){
		case 1:
			var time=$$('#timecentro').val();
			var gg=$$('#ggcentro').val();
			var txt=time+','+gg;
			navigationtxt(13,txt,'centrobenesserediv',5)
		break;
		case 2:
			var time=$$('#timeristo').val();
			var gg=$$('#ggristo').val();
			var txt=time+','+gg;
			navigationtxt(14,txt,'ristorantediv',6)
		break;
	}
}


function riaggvis(txtsend){
	//alert(mainView.activePage.name);
	//controllo dove siamo
	//
	
	switch(mainView.activePage.name){
		
		case "detpren":
		
			var campo='into1-'+$$('#'+txtsend).val();
			//alert(campo);
			var url=baseurl;
				var url=url+'mobile/config/detserv2.php';
				var query = {ID:txtsend,tipo:1,multi:0};
				//alert(url);
				$$.ajax({
						url: url,
							  method: 'GET',
							dataType: 'text',
							cache:false,
							data: query,
							success: function (data) {
								document.getElementById(campo).innerHTML=data;
								var scriptinto=$$('#scriptinto').html();
								if(scriptinto!="undefined"){
									eval(scriptinto);
								}
							}
					 });
		break;
		case "centrobenesseregiorno":
			var time=$$('#timecentrogiorno').val();
			var sottotip=$$('#IDsottocentrogiorno').val();
			var txt=time+','+sottotip;
			navigationtxt(21,txt,'centrobenesseregiornodiv',9);
		break;
		case "ristorantegiorno":
			var time=$$('#timeristogiorno').val();
			var send= time+','+$$('#IDsottoristogiorno').val();
			navigationtxt(20,send,'ristorantegiornodiv',0)
		break;
	}
}


function modprenextra(id,campo,tipo,val2,agg){
		myApp.showIndicator();
		setTimeout(function(){ hidelo(); }, 5500);	
		var plus="";
		switch(val2) {
			case 1:
				var val=$$('#'+campo).val();
				val=val.replace(',','.');
				if(isNaN(val)){
					myApp.alert("E' necessario inserire un numero. Prego Riprovare");
					return false;
				}
				break;
			case 6:
				var val=$$('#'+campo).val();
				val=val.replace(/\n/g, "<br/>"); //descrizione
				break;
			case 7:
				if(document.getElementById(campo).checked==true){ //si o no
					val='1';
				}else{
					val='0';
				}
				break;
			case 8:
				var classe=$$('#'+campo).attr('class');
				var jj=0;
				var kk=0;
				if(classe.indexOf(plus+"1")!=-1){ //1
					jj=1;
					kk=2;
				}
				if(classe.indexOf(plus+"2")!=-1){ //2
					jj=2;
					kk=0;
				}
				if(jj==0){
					if(classe.indexOf("pag")!=-1){kk=2;}else{kk=1;}
				}
				val=kk;	
				break;
			case 9:
				val=campo;
			break;
			case 10:
				var val=$$('#'+campo).val();
				var plus='modi';
				val2=8;
				break;
			case 11:
				var val=$$('#'+campo).val();
				var id2=val;
				var val=$$('#tr'+id).attr('lang');
				id=id2;
				break;
			default:
				var val=$$('#'+campo).val();
			break;
		}
		
		var url=baseurl;
		var url=url+'config/gestioneprenextra.php';
		
		var query = {val:val,tipo:tipo,ID:id,val2:val2};
		//alert(url);
		$$.ajax({
				url: url,
					  method: 'POST',
					dataType: 'text',
					cache:false,
					data: query,
					success: function (data) {
						
						myApp.addNotification({
							message: 'Modifica effettuata con successo',
							hold:1700,
							 button: {text: '<i class="material-icons">close</i>'}
						});
						
						
						switch(agg) {
							case 1:
								var arr=data.split('_');
								addservprev2(arr['0'],arr['1'],arr['2']);
							break;
							case 2: //modifica serv
								/*var ID=$$('#IDmodserv').val();
								var tipo=$$('#tipomod').val();
								var time=$$('#timemod').val();
								var riagg=$$('#riaggmod').val();
								modificaserv(ID,tipo,time,riagg);*/
								
								var arr=val.split('_');
								var sala=arr['0'];
								var time=arr['1'];
								var IDpers=arr['2'];
								$$('.bor').removeClass('button-fill');
								$$('#'+time+sala+IDpers).addClass('button-fill');
								
								var funz=$$('#funzioneriagg').val();
								eval(funz);
								
							break;
							
						}
						
						myApp.hideIndicator();
						
						
					}
			 });

}


function modprenot(id,campo,tipo,val2,agg){
		myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
		switch(val2) {
			case 0:
				var val=$$('#'+campo).val();
				//val=encodeURIComponent(val);
				break;
			case 1:
				var val=$$('#'+campo).val();
				val=val.replace(',','.');
				if(isNaN(val)){
					alertify.alert("E' necessario inserire un numero. Prego Riprovare");
					return false;
				}
				break;
			case 6:
				var val=$$('#'+campo).val();
				val=val.replace(/\n/g, "<br/>"); //descrizione
				//val=encodeURIComponent(val);
				break;
			case 7:
				if(document.getElementById(campo).checked==true){ //si o no
					val='1';
				}else{
					val='0';
				}
				break;
			case 8:
				var val=$$('#'+campo).html();
				break;
			case 9:
				var val=$$('#'+campo).html();
				break;
			case 10:
				val=campo;
			break;
			case 11:
				val=$$(campo).val();
			break;
			case 12:
				val=$$(campo).val();
				id=id+'_'+$$(campo).attr('alt');
			break;
			default:
				var val=$$('#'+campo).val();
			break;
	}
	
	var url=baseurl;
		var url=url+'config/gestioneprenot.php';
		var query = {val:val,tipo:tipo,ID:id,val2:val2};
		//alert(url);
		$$.ajax({
			url: url,
			method: 'POST',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				if(agg==2){
					myApp.addNotification({
							message: 'Funzione eseguita con successo',
							hold:2500,
							 button: {text: '<i class="material-icons">close</i>'}
						});
				}else{
					myApp.addNotification({
							message: 'Modifica effettuata con successo',
							hold:2500,
							 button: {text: '<i class="material-icons">close</i>'}
						});
				}
				myApp.hideIndicator();
				switch(agg) {
					case 1:
						var vis=$$('#visdom').val();
						navigationtxt(16,vis,'domoticadiv',0);
						myApp.closePanel('right');
					break;
					case 2:
						navigationtxt(12,0,'appuntidiv',0);
						myApp.closePanel('right');
					break;
					case 3:
						var send= $$('#timeristo').val()+','+$$('#IDtipovis').val()+','+$$('#ggpulizie').val();
						navigationtxt(15,send,'puliziediv',7)				
					break;
					
					
				}
			}
	});
}

function accendidom(ID,acc){
	var giornic3='';
	var mioArray=document.getElementsByName('giornidom');
	var lun=mioArray.length; //individuo la lunghezza dell’array 
	for (n=0;n<lun;n++) { //scorro tutti i div del documento
		if(mioArray.item(n).checked==true){
			var gg=mioArray.item(n).getAttribute('value');
			giornic3=giornic3+gg+','	
		}
	}
	
	var val=acc+'_2_'+$$('#accendi').val()+'_'+$$('#spegni').val()+'_'+giornic3;
	modprenot(ID,val,63,10,1);
}

function accendidom2(ID,acc){
	var val=acc+'_1_'+$$('#oreatt').val();
	modprenot(ID,val,63,10,1);
}



var inter3=setInterval("notifiche()",300000);

function notifiche(){
	var url=baseurl;
	var url=url+'mobile/config/reloadnot.php';
	var query = {};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				var arr=data.split(',');
				$$('#numnot').html(arr['0']);
				$$('#numapp').html(arr['1']);
				//alert(data);
			}
	});
	navigationtxt(11,0,'promemoria',0);
}


function opennosogg(time){
	var url=baseurl;
	var url=url+'mobile/config/nosoggiorno.php';
	var query = {time:time};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				myApp.pickerModal(data);
			}
	});
}

function modificaserv(ID,tipo,time,riagg){
	//alert(ID);
	
	myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
	var url=baseurl;
	var url=url+'mobile/config/orarioserv.php';
	var query = {ID:ID,tipo:tipo,time:time,riagg:riagg};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				
				myApp.closeModal('.popover-menu');
				$$('#pannellodx').html(data);
				myApp.openPanel('right');
				 myApp.hideIndicator();
				var ID=$$('.tabac').attr('href');	
				document.getElementById('pannellodx').scrollTop=0;			
				if(ID.length>0){
					myApp.showTab(ID);
				}
						
			}
	});
}


function aprimenu(IDpren,obj){
	//alert(IDpren);
	var data=$$('#menu'+IDpren).html();
	$$('#menupop').html(data);
	myApp.popover($$('.popover-menu'),obj);
}

function aprimod(ID,obj){
	var data=$$('#menu'+ID).html();
	data=atob(data);
	$$('#menupop').html(data);
	myApp.popover($$('.popover-menu'),obj);
}

var durata11='';
var tipolim11='';
var IDtipo11='';
var serviziriep='';
var extra11='';

function selectservice(ID,tipolim,IDtipo,durata,agg){
	var url=baseurl;
	var url=url+'mobile/config/step2add.php';
	extra11=ID;
	durata11=durata;
	tipolim11=tipolim;
	IDtipo11=IDtipo;
	var query = {ID:ID,tipolim:tipolim};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				$$('#add2').html(data);
				document.getElementById('pannellodx').scrollTop=0;
				if(isNaN(agg)){
					myApp.showTab('#add2');
				}
						
			}
	});	

}



function creasessione(valore,tipo){
	var url=baseurl;
	var url=url+'config/creasessione.php';
	
	var query = {valore:valore,tipo:tipo};
	$$.ajax({
			url: url,
			method: 'POST',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				switch (data) {
					case "successaddserv":
						 selectservice(extra11,tipolim11,IDtipo11,durata11,1);
					
					break;
				
				}
				
				
				
						
			}
	});	
	
}




function addservice2(agg,tipoadd){
	var note="";
	var prezzo="";//da vedere
	var opzione = 0;
	var tipolim=tipolim11;		
	var IDtipo=IDtipo11;	
	var durata=durata11;
	var orario11='00:00';
	var personale11='';
	
	if(tipolim=='6'){
		serviziriep='';
		var mioArray=document.getElementsByClassName('cent');
		var lun=mioArray.length; //individuo la lunghezza dell’array 
		for (n=0;n<lun;n++) { //scorro tutti i div del documento
			var serv=mioArray.item(n).getAttribute('alt');
			var time=mioArray.item(n).getAttribute('dir');
			var qta=mioArray.item(n).innerHTML;
			serviziriep =serviziriep +serv+'_'+time+'_'+qta+'_0/////';		
		}	
	}
	nump=1;
	if((tipolim=='8')||(tipolim=='7')){
		var arr=serviziriep.split('/////');
		var num=arr.length-1;
		if(num>=limitp){
			nump=1;
		}else{
			nump=0;
		}
	}
	
if((serviziriep.length>0)&&(nump==1)){
	dataString='arrins='+serviziriep+"&orario=" + orario11  +"&note=" + note+"&IDtipo=" + IDtipo+"&personale=" + personale11 +"&prezzo=" + prezzo +"&durata=" + durata+"&tipolim=" + tipolim+"&tipoadd=" + tipoadd
	
	var url=baseurl;
	var url=url+'config/addservice2.php';
	
	$$.ajax({
			url: url,
			method: 'POST',
			dataType: 'text',
			cache:false,
			data: dataString,
			success: function (data) {
				myApp.addNotification({
							message: 'Servizio inserito con successo',
							hold:2500,
							 button: {text: '<i class="material-icons">close</i>'}
						});
				switch(agg){
					case 1:
						var IDpren=$$('#IDprenfunc').val();
						navigationtxt(2,IDpren+',1','contenutop',1);
						myApp.closePanel('right');
					break;
					case 2:
						var IDp=parseInt(data);
						modificaserv(IDp,1,0,2);
						setTimeout(function(){ riaggvis(0); }, 1500);					
					break;
				}
				
				
				
				myApp.hideIndicator();
						
			}
	});	

}else{
	
}
}

function hidelo(){
	myApp.hideIndicator();
}




var arrservice=new Array();

function selectbutt(obj){
	var key=$$(obj).attr('lang');
	var campo=$$(obj).attr('align');
	var prezzo=$$(obj).attr('alt');
	
	totale=0;
	var ele=new Array();
	
	var mioArray=document.getElementsByName('soggetti');
	var lun=mioArray.length; //individuo la lunghezza dell’array 
	for (n=0;n<lun;n++) { //scorro tutti i div del documento
		if(mioArray.item(n).checked==true){
			var time=mioArray.item(n).getAttribute('align');
			var prezzo=mioArray.item(n).getAttribute('alt');
			totale=parseFloat(totale)+parseFloat(prezzo);
			if (typeof ele[time] == 'undefined') {
				ele[time]=1;
			}else{
				ele[time]=parseInt(ele[time])+parseInt(1);
			}			
		}
	}
	
	$$('.eletxt').html('0 Elementi selezionati');
	for (var key2 in ele) {
		var txt=ele[key2]+' Elementi selezionati';
		 $$('#ele'+key2).html(txt);	 
	}
	$$('#totaleadd').html(totale);
	
	
	
	if (typeof arrservice[key] == 'undefined') {
		//alert('add');
		arrservice[key]=key;
	}else{
		//alert('remove');
		delete arrservice[key];
	}

	serviziriep='';
	for (var key in arrservice) {
		 serviziriep =serviziriep +key+'/////';	 
	}
	
	
	
}




function cercaservizio(val){
	var url=baseurl;
	var url=url+'mobile/config/cercaservizi.php';
	var query = {val:val};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				$$('#listaservizi').html(data);
				 myApp.hideIndicator();
			}
	});
}

function addservice(IDpren){
	
	myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
	var url=baseurl;
	var url=url+'mobile/config/addserv.php';
	var query = {IDpren:IDpren};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				//alert(data);
				$$('#pannellodx').html(data);
				myApp.openPanel('right');
				 myApp.hideIndicator();
				
						
			}
	});

}	


function selprenot(){
	
	switch(mainView.activePage.name){
		
		case "centrobenesseregiorno":
			var time=$$('#timecentrogiorno').val();
			var IDsotto=$$('#IDsottocentrogiorno').val();
		break;
		case "ristorantegiorno":
			var time=$$('#timeristogiorno').val();
			var IDsotto=$$('#IDsottoristogiorno').val();
		break;
	}
	
	myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
	var url=baseurl;
	var url=url+'mobile/config/selprenot.php';
	var query = {time:time,IDsotto:IDsotto};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				//alert(data);
				$$('#pannellodx').html(data);
				myApp.openPanel('right');
				 myApp.hideIndicator();
				
						
			}
	});

}	

function cercaprenot(val){
	var url=baseurl;
	var url=url+'mobile/config/cercaprenot.php';
	var query = {val:val};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				$$('#listaprenot').html(data);
				 myApp.hideIndicator();
			}
	});
}



function setdom(IDdom){
	
	myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
	var url=baseurl;
	var url=url+'mobile/config/setdomotica.php';
	var query = {IDdom:IDdom};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				//alert(data);
				$$('#pannellodx').html(data);
				myApp.openPanel('right');
				 myApp.hideIndicator();
				
						
			}
	});

}	




function msgboxelimina(id,tipo,altro,id2,url){
	var cosa;
	var agg="";
	myApp.closeModal('.popover-menu');
	var arrtipiel=new Array("","la prenotazione","la scheda numero "+id,"il servizio","l'album","la foto","il parametro","l'orario","8","9","la mansione","il soggetto dal personale","il messaggio Newsletter","la fascia oraria","il cliente dalla prenotazione","la nota","la Fattura/Ricevuta","il prodotto dalla Fattura/Ricevuta","l'acconto selezionato","il Fornitore","la Vendita","il pagamento","l'Agenzia","la Ricevuta/Fattura","i servizi selezionati","l'abbuono","la limitazione? Tutti le agenzie con la stessa limitazione subiranno lo stessa elimazione. Continuare","il cofanetto regalo","il voucher","il servizio","il documento","la spedizione");
	
	
		myApp.confirm('Vuoi davvero eliminare '+ arrtipiel[tipo] +'?<br><br>'+agg, function () {
			
			
			switch(tipo) {
				case 1:
				case 2:
				case 4:
				case 5:
				case 6:
				case 10:
				case 11:
				case 20:
				case 21:
				case 25:
					elimina(id,tipo,altro,id2,url);
				break;
				case 3:
					id=$$('#tr'+id).attr('lang');
					elimina(id,tipo,altro,id2,url);
				break;
				
			
			
			}
			
		});
	
	
	
	
}



function elimina(id,tipo,altro,agg,url){

	myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
	var url=baseurl;
	var url=url+'config/elimina.php';
	var query = {ID:id,tipo:tipo,altro:altro};
	
	$$.ajax({
			url: url,
			method: 'POST',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				
				myApp.addNotification({
							message: 'Rimozione effettuata con successo',
							hold:2500,
							 button: {text: '<i class="material-icons">close</i>'}
						});
				
				myApp.hideIndicator();
				switch(agg){
					case 1:
						if(isNaN(altro)){
							var ff='riaggvis("'+altro+'")';
							eval(ff);
						}else{
							var IDpren=$$('#IDprenfunc').val();
							navigationtxt(2,IDpren+',1','contenutop',1);
						}
						
					break;
					case 2:
						var time=$$('#IDprentime').val();
						
						
						
						navigationtxt(3,time,'calendariodiv',0);
						//chiude la prenotazione e riaggiorna
						
						
					break;
				}
						
			}
	});
}


function detcli(ID){
	//alert(ID);
	myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
	var url=baseurl;
	var url=url+'mobile/config/detcli.php';
	var query = {ID:ID};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				myApp.closeModal('.popover-menu');
				$$('#pannellodx').html(data);
				myApp.openPanel('right');
				myApp.hideIndicator();		
			}
	});
}

function detappunto(ID){
	//alert(ID);
	myApp.showIndicator();setTimeout(function(){ hidelo(); }, 5500);	
	var url=baseurl;
	var url=url+'mobile/config/detappunto.php';
	var query = {ID:ID};
	$$.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			cache:false,
			data: query,
			success: function (data) {
				myApp.closeModal('.popover-menu');
				$$('#pannellodx').html(data);
				myApp.openPanel('right');
				myApp.hideIndicator();		
			}
	});
}

function salvaappunto(){
			var appunto=$$('#appunto').val();
			var note=$$('#noteappunto').val();
			
			//var dests=$('#dests').val();
			
			var dests='';
			
			var mioArray=document.getElementsByName('dests');
			var lun=mioArray.length; //individuo la lunghezza dell’array 
			for (n=0;n<lun;n++) { //scorro tutti i div del documento
				if(mioArray.item(n).checked==true){
					var val=mioArray.item(n).value;
					dests=dests+val+',';		
				}
			}
			
			
			var argrec=$$('#argrec').val();
			var argnew=$$('#argnew').val();
			arg='';
			if((argrec!='undefined')&&(argrec!='0')&&(argrec!='')){
				arg=argrec;
			}else{
				arg=argnew;
			}
			
			var val=appunto+'////'+note+'////'+dests+'////'+arg;
			if((appunto.length>0)&&(dests.length>0)&&(arg.length>0)){
				modprenot(0,val,141,10,2);
			}else{
				myApp.alert('Devi inserire almeno un destinatario,un appunto ed un argomento.<br/>Prego riprovare.');
			}
			
			
		}

