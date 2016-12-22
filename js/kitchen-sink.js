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
var baseurl='https://www.scidoo.com/';

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
		alert(url);
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
					alert(email);
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
					alert(data);
    			myApp.hideIndicator();
				mainView.router.loadContent(data);
         }
     });
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