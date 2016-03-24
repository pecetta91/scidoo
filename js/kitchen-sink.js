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


/* ===== Login screen page events ===== */
myApp.onPageInit('login-screen-embedded2', function (page) {
	
	 $$(page.container).find('.sendform').on('click', function () {
		
        var email = $$(page.container).find('input[name="email"]').val();
        var password = $$(page.container).find('input[name="pass"]').val();
		var url = 'http://www.scidoo.com/config/login.php';
		$$.ajax({
                url: url,
                method: 'POST',
				dataType: 'json',
                //send "query" to server. Useful in case you generate response dynamically
                data: {
                    email:email,
					password:password,
					json:1,
					resta:'on',
					callback:''
                },
                success: function (data) {
                    // Find matched items
                 	 //alert(data);
					var ret=data[0].html;alert(ret);
					var num=ret.indexOf("error");
					if(num==-1){
						var query = {IDstr:"14", IDcli:"18"};
						//navigation(0,'POST',query);
						location.href="http://www.scidoo.com";
					}else{
						alert('I Dati immessi non sono corretti. Prego riprovare!');	
						mainView.router.back();
					}
					 
                }
            });
    });

});

myApp.onPageInit('login-screen-embedded', function (page) {	


/*	 var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    var calendarInline = myApp.calendar({
        container: '#ks-calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        header: false,
        footer: false,
		input: '#kscal',

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
	*/
	var calendarDefault = myApp.calendar({
        input: '#kscal',
		dateFormat: 'dd/mm/yyyy'
    });
	
	$$(page.container).find('.sendform2').on('click', function () {
		
        var email = $$(page.container).find('input[name="email"]').val();
        var data = $$(page.container).find('input[id="kscal"]').val();
		var url = 'http://www.scidoo.com/config/logincli.php';
		
		$$.ajax({
                url: url,
                method: 'POST',
				dataType: 'json',
                //send "query" to server. Useful in case you generate response dynamically
                data: {
                    email:email,
					data:data,
					json:1
                },
                success: function (data) {
                    // Find matched items
					var ret=data[0].html; 
					var ret2 = atob(ret);
					var num=ret2.indexOf("error");
					if(num==-1){
						var query = {};
						navigation(1,'POST',query);

					}else{
						alert('I Dati immessi non sono corretti. Prego riprovare!');	
						mainView.router.back();
					}
					 
                }
            });
    });
	  
});


function navigation(id,met,query){

	var baseurl="http://www.scidoo.com/mobile/";
	var apriurl=new Array('config/profilo.php','config/profilocli.php');
	var url=baseurl+apriurl[id];
	
	$$.ajax({
            url: url,
                method: met,
				dataType: 'json',
                data: query,
                success: function (data) {
                    // Find matched items
					var ret=data[0].html;
					var ret2 = atob(ret);
					mainView.router.loadContent(ret2);
                }
     });
}

function navigationtxt(id,met,query,campo){
	var baseurl="http://www.scidoo.com/mobile/";
	var apriurl=new Array('config/profilo/temp.php');
	
	var url=baseurl+apriurl[id];
	$$.ajax({
            url: url,
                method: met,
				dataType: 'json',
                data: query,
                success: function (data) {
                    // Find matched items
					var ret=data[0].html;
					var ret2 = atob(ret);
					
					$$('#'+campo).html(ret2);

					//$$('#'+campo).html(ret2);
                }
     });
}




onloadf();

function onloadf(){
	var baseurl="http://www.scidoo.com/mobile/";
	
	var url='config/controlloini.php';
	
	var url=baseurl+url;
	
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

function modprofilo(id,campo,tipo,val2,agg){
	var baseurl="http://www.scidoo.com/";
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
		var url='config/gestioneprofilo.php';
		
		var url=baseurl+url;
		
		var query = {val:val, tipo:tipo,IDv:id,val2:val2,json:'1'};
	$$.ajax({
            url: url,
                method: 'POST',
                data: query,
				dataType: 'json',
                success: function (data) {
                    switch(agg){
						case 1:
						 	navigationtxt(0,'POST',0,'contenutodiv');
							//navigation(1,'POST','');
						break;
						
					}
                }
     });
	 
}