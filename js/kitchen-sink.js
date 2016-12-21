// Init App
var myApp = new Framework7({
    modalTitle: 'Scidoo.com',
    // Enable Material theme
    material: true,
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
                 	 //alert(data);
					 myApp.hideIndicator();  	 //alert(data);
					var num=data.indexOf("error");  	 //alert(data);
					
					if(num==-1){
						
						var res = data.split("_");
						window.localStorage.setItem("IDcliente", res['0']);
						if(res['1']!=0){
							window.localStorage.setItem("IDstruttura", res['1']);
							var query = {IDstr:res['1'], IDcli:res['0']};
							navigation(0,'POST',query);
						}else{
							myApp.addNotification({
								message: 'Non puoi accedere. Non sei un titolare di una struttura'
							});
						}
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
				},
				 error: function (data) {
					//alert(data);
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
                    
					var num=data.indexOf("error");
					if(num==-1){
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

	var url=baseurl+"mobile/";
	var apriurl=new Array('config/profilo.php','config/profilocli.php');
	var url=url+apriurl[id];
	//alert(url);
	myApp.showIndicator();
	$$.ajax({
            url: url,
                  method: 'POST',
				dataType: 'html',
				cache:false,
                data: query,
                success: function (data) {
    				myApp.hideIndicator();
				mainView.router.loadContent(data);
         }
     });
}

function navigationtxt(id,met,query,campo){
	var url=baseurl+"mobile/";
	
	var apriurl=new Array('config/profilo/temp.php');
	var url=url+apriurl[id];
	myApp.showIndicator();
	$$.ajax({
            url: url,
                method: met,
				dataType: 'json',
                data: query,
                success: function (data) {
					myApp.hideIndicator();
                    // Find matched items
					var ret=data[0].html;
					var ret2 = atob(ret);
					
					$$('#'+campo).html(ret2);

                }
     });
}

onloadf();

function onloadf(){
	
	IDutente=window.localStorage.getItem("IDcliente");
	if(isNaN(IDutente)){
		
		var url=baseurl+"mobile/";
		var url=url+'config/controlloini.php';
		
		$$.ajax({
					url: url,
					method: 'POST',
					dataType: 'json',
					success: function (data) {
						// Find matched items
						var ret=data[0].html; 
						var ret2 = atob(ret);
						var num=ret2.indexOf("error");
						if(num==-1){
							var arr=new Array();
							navigation(ret2,'POST',arr)
						}
						 
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
                data: query,
				dataType: 'json',
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
                }
     });
	 
}