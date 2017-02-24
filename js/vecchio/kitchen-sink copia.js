// Init App
var myApp = new Framework7({
    modalTitle: 'Scidoo.com',
    material: true
});


// Expose Internal DOM library
var $$ = Dom7;

// Add main view

var mainView = myApp.addView('.view-main', {});
// Add another view, which is in right panel



var baseurl='http://127.0.0.1/milliont/';
//var baseurl='http://192.168.1.107/milliont/';
//var baseurl='https://www.scidoo.com/';





var IDutente=0;

/* ===== Login screen page events ===== */
myApp.onPageInit('login-screen-embedded2', function (page) {
	
	 $$(page.container).find('.sendform').on('click', function () {
        var email = $$(page.container).find('input[name="email"]').val();
        var password = $$(page.container).find('input[name="pass"]').val();
		
		//send "query" to server. Useful in case you generate response dynamically
		/*
                
		*/
			
		var url = baseurl+'config/login.php';
		alert(url);
		myApp.showIndicator();
		$$.ajax({
                url: url,
                method: 'POST',
				dataType: 'html',
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
                    // Find matched items
					alert(data);
					 myApp.hideIndicator();  	 //alert(data);
					var num=data.indexOf("error");  	 //alert(data);
					if(num==-1){					
						window.localStorage.setItem("IDcode", data);
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
    });

});


myApp.onPageInit('login-screen-embedded', function (page) {	

	var calendarDefault = myApp.calendar({
        input: '#kscal',
		dateFormat: 'dd/mm/yyyy'
    });

	$$(page.container).find('.sendform2').on('click', function () {
        var email = $$(page.container).find('input[name="email"]').val();
        var data = $$(page.container).find('input[id="kscal"]').val();
		var url = baseurl+'config/logincli.php';
		myApp.showIndicator();
		//alert(url);
		$$.ajax({
                url: url,
                method: 'POST',
				dataType: 'html',
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
                    alert(data);
					var num=data.indexOf("error");
					if(num==-1){
						window.localStorage.setItem("IDcode", data);
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
    });
	  
});


myApp.onPageInit('calendario', function (page) {	
	var p=0;
	var container2 = $$('.page-content');
	
	$$(container2).scroll(function() {
		
		var offset = $$("#tabappart").offset();
		var off=parseInt(offset.top)+parseInt(55);
		
		
		if(off<111){
			//if(p==0){
				
				//
				 //$$(page.container).find('td[id="valore"]').val(off);
				 
				 var offset2=$$('.table-fixed-right').offset();
				var lef=parseInt(offset2.left)*-1+parseInt(174);
				 
				 var off2=parseInt(offset.top);
				 //$('#valore').html(off2);
				 //document.getElementById('valore').innerHTML=off2;
				 if(off2<0){
					 var off2=(off2*-1);
					 off2=parseInt(off2)+parseInt(58);
				 }else{
					 off2=0+parseInt(parseInt(58)-off2);
					 
					 
					//off2=parseInt(off2)+(parseInt(100);	
					//off2=100;
				}
				
				 
				 
				$$('#tabdate').css('position','absolute');
				$$('#tabdate').css('top',off2+'px');
				$$('#tabdate').css('z-index','99999');
				$$('#tabdate').css('left','0px');
				$$('#tabbody').css('margin-top','42px');
				//alert('aa');
				
				$$('.navbar').hide();
				mainView.hideToolbar();
				//alert(lef);
				
				
				
				p=1;
			//}
		}else{
			
			if(p==1){
				$$('.navbar').show();
				$$('#tabdate').css('position','absolute');
				$$('#tabdate').css('top','auto');
				$$('#tabdate').css('margin-top','0px');
				$$('#tabdate').css('left','0px');
				 mainView.showToolbar();
				p=0;
			}
		}
	});
	
	
	
	
	
/*
	$$(page).on("scroll", function () {
		
		alert('bb');
		
		
		var offset = $$("#tabdate").offset();
		alert('aa');
		if(offset.top<=40){
				//var val=document.getElementById('scro').value;
				//alert(val);
				//document.getElementById('scro').value=1;
					var off=parseInt(offset.top)+parseInt(70);
					//alert(off);
				//$$('#valore').val(off);
				
					var data = $$(page.container).find('input[id="valore"]').val();
					alert(data);
					$$('#tabdate').css('position','absolute');
					$$('#tabdate').css('margin-top',off+'px');
					//$$('#scro').val('1');
					//document.getElementById('scro').value=1;
				
			//$('#tabhead2').css('margin-top','0px');
			//var tt=parseInt(tt)-parseInt(105);
			//$('#tabhead').css('margin-top',tt+'px');
		}else{
			//$('#tabhead2').css('margin-top','35px');
				$$('#tabdate').css('position','absolute');
				$$('#tabdate').css('top','auto');
				$$('#tabdate').css('margin-top','0px');
				document.getElementById('scro').value=0;
		}
			
		
		
		
	});*/
	


});

function scrollrig(){
		
		if($$('#tabdate').css('position')=='fixed'){
			
			var offset = $$("#tabappart").offset();
			var off=parseInt(offset.top)+parseInt(55);
			
			var offset2=$$('.table-fixed-right').offset();
			var lef=parseInt(offset2.left)*-1+parseInt(174);
			
			
			$$('#tabdate').css('position','fixed');
				$$('#tabdate').css('top','55px');
				$$('#tabdate').css('z-index','99999');
				$$('#tabdate').css('left',lef+'px');
			
			}
		
	}

function navigation(id,met,query){
	IDcode=window.localStorage.getItem("IDcode");
	var url=baseurl+"mobile/";
	id=parseInt(id);
	var apriurl=new Array('config/profilo.php','config/profilocli.php','config/calendario.inc.php');
	var url=url+apriurl[id];
	alert(IDcode);
	myApp.showIndicator();
	$$.ajax({
            url: url,
                method: 'POST',
				dataType: 'html',
				cache:false,
                data: {IDcode:IDcode},
                success: function (data) {
				
					myApp.hideIndicator();
					mainView.router.loadContent(data);
					
         }
     });
}

function scrodate(){


	
	//alert( offset.top+'-'+document.body.scrollTop);
	//var posY = offset.top - $$(window).scrollTop();
	//alert(posY);
	
	
	
}


function navigationtxt(id,met,query,campo){
	IDcode=window.localStorage.getItem("IDcode");
	var url=baseurl+"mobile/config/";
	var apriurl=new Array('profilo/temp.php','calendario.inc.php');
	var url=url+apriurl[id];
	myApp.showIndicator();
	
	query['IDcode']=IDcode;
	
	$$.ajax({
            url: url,
                method: 'POST',
				dataType: 'html',
				cache:false,
                data: query,
                success: function (data) {
					alert(data);
    			myApp.hideIndicator();
				$$('#'+campo).html(data);
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
				dataType: 'html',
				cache:false,
                data: {IDcode:IDcode},
                success: function (data) {
					alert(data);
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
	
	var query = {val:val, tipo:tipo,IDv:id,val2:val2,json:'1'};
	
	
	$$.ajax({
            url: url,
                  method: 'POST',
				dataType: 'html',
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