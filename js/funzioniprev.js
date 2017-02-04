function gd(data1,data2,trasf){
	
	if(typeof(trasf) == "undefined") {
		trasf=1;
	}
	
	switch(trasf){
		case 1:
			anno1 = parseInt(data1.substr(6));
			mese1 = parseInt(data1.substr(3, 2));
			giorno1 = parseInt(data1.substr(0, 2));
			var dataok1=new Date(anno1, mese1-1, giorno1);
			anno2 = parseInt(data2.substr(6));
			mese2 = parseInt(data2.substr(3, 2));
			giorno2 = parseInt(data2.substr(0, 2));
			var dataok2=new Date(anno2, mese2-1, giorno2);
		break;
		case 2:
		
			giorno1 = parseInt(data1.substr(8, 2));
			mese1 = parseInt(data1.substr(5, 2));
			anno1 = parseInt(data1.substr(0,4));			
			var dataok1=new Date(anno1, mese1-1, giorno1);
			giorno2 = parseInt(data2.substr(8, 2));
			mese2 = parseInt(data2.substr(5, 2));
			anno2 = parseInt(data2.substr(0,4));	
			var dataok2=new Date(anno2, mese2-1, giorno2);
		break;
		case 0:
			dataok1=data1;
			dataok2=data2;
		break;
	}
	
	differenza = dataok2-dataok1;
	giorni_differenza = Math.round(new String(differenza/86400000));
	
	return giorni_differenza;
}


function addrestriz(ID,add){
	var qta=$$('#restriz'+ID).html();
		
	if(add==1){
		qta++;
	}else{
		qta--;
	}
	$$('#restriz'+ID).html(qta);

}



var piunotti=0;

	 function dispo1(){
		var data=document.getElementById('data').value;
		var nottipern=1;
		
		if(piunotti==1){
			if(data.length>10){
				var vettore=data.split(' - ');
				var datai=vettore['0'];
				var dataf=vettore['1'];
				var notti=gd(datai,dataf,2);
			}else{
				myApp.alert('Date selezionate in modo scorretto. Si prega di modificarle per continuare.');
				myApp.showTab('#step1');
				return false;
			}
		}else{
			if(data.length>5){
				var datai=data;
				notti=0;
				nottipern=0;
			}else{
				myApp.alert('Date selezionate in modo scorretto. Si prega di modificarle per continuare.');
				myApp.showTab('#step1');
				return false;
			}
			
		}
		var orario=document.getElementById('orario').value;
		var voucher=0;
		var cofanetto=0;
		
		var query = {datai:datai,notti:notti,voucher:voucher,cofanetto:cofanetto,orario:orario};
		
		var IDcont=document.getElementsByClassName('inputrestr');
		var lung=IDcont.length;
		//alert('a');
		var somma=0;
		for(i=0;i<lung;i++){
			var ID=IDcont[i].id;
			var val=$$('#'+ID).html();
			if(val=="undefined")val=0;
			var ss=$$('#'+ID).attr('alt');
			var ID = ID.replace(/[^0-9]/g,'');
			var ID=parseInt(ID);
			if(ss==1){
				somma=parseInt(somma)+parseInt(val);
			}
			query[ID]=val;
		}
		
		
		var ok=1;
		if((notti==0)&&(nottipern==1)){
			ok=0;
		}
		if(ok==1){
			if(somma>0){	
				var url = baseurl+'config/preventivo/config/dispo1.php';
		
				myApp.showIndicator(); setTimeout(function(){ hidelo(); }, 5500);	
				$$.ajax({
						url: url,
						method: 'POST',
						dataType: 'text',
						cache:false,
						data: query,
						success: function (data) {
							//Find matched items
							//alert(data);
							 myApp.hideIndicator();
							 statostep=2;  	 //alert(data);
							 stepnew(1,0);
							  
						}
					})
			}else{
				myApp.alert('Devi inserire tutti i campi. Prego Riprovare');
			}
		}else{
			myApp.alert('Il soggiorno deve avere una durata minima di una notte.');
		}	
		
	 
			
			
   
	}


 function selpacc(IDapp,IDpacc){
	myApp.showIndicator();  setTimeout(function(){ hidelo(); }, 5500);	
		var query = {IDapp:IDapp,IDpacc:IDpacc};
		var url = baseurl+'mobile/config/preventivo/config/selpacc.php';
				$$.ajax({
						url: url,
						method: 'POST',
						dataType: 'text',
						cache:false,
						data: query,
						success: function (data) {
							
							 //alert(data);
							 myApp.hideIndicator();  	 //alert(data);
							
							 
						}
					})
			

	}	
	
function addservprev(){
	
	var data=$$('#elencos').html();
	$$('#pannellodx').html(data);
	 myApp.openPanel('right');

}	



function addservprev2(IDins,IDserv,time){
myApp.showIndicator();  setTimeout(function(){ hidelo(); }, 5500);	
	myApp.closeModal('.popover-menu');
	
	var query = {IDserv:IDserv,IDins:IDins,time:time};
	var url = baseurl+'mobile/config/preventivo/config/addserv.php';
	$$.ajax({
						url: url,
						method: 'POST',
						dataType: 'text',
						cache:false,
						data: query,
						success: function (data) {
							
							$$('#pannellodx').html(data);
							 myApp.hideIndicator();  	 //alert(data);
							 myApp.openPanel('right');
							 var relo=$$('#reload').val();
							// alert(relo);
							 if(relo==1){
								 
									num_option=document.getElementById('dataadd').options.length; 
									//alert(num_option);
									indice_selezionato = document.getElementById('dataadd').selectedIndex;
									//alert(indice_selezionato);
									var isucc=parseInt(indice_selezionato)+parseInt(1);
									//alert(isucc);
									//value_selezionato = document.getElementById('dataadd').options[indice_selezionato].value;
									//alert(document.getElementById('dataadd').options[isucc].value);
									
									if(document.getElementById('dataadd').options[isucc].value!='undefined'){
										timesucc = document.getElementById('dataadd').options[isucc].value;
										addservprev2(IDins,IDserv,timesucc);
									}
								 }
								
						}
					})
}	



function addservprevent(IDserv){
	myApp.closeModal('.popover-menu');
	myApp.showIndicator();  setTimeout(function(){ hidelo(); }, 5500);	
	var url = baseurl+'mobile/config/preventivo/config/addserv.php';
	$$.ajax({
						url: url,
						method: 'POST',
						dataType: 'text',
						cache:false,
						data: query,
						success: function (data) {
							$$('#pannellodx').html(data);
							 myApp.hideIndicator();  	 //alert(data);
							 myApp.closePanel('right');
						}
					})
}	
	
	
	
	

function gestioneric(id,campo,tipo,val2,agg){
	myApp.showIndicator(); setTimeout(function(){ hidelo(); }, 5500);	 
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
			default:
				var val=$$('#'+campo).val();
			break;
	}
	
	var query={val:val,tipo:tipo,ID:id,val2:val2};
	
	var url = baseurl+'config/preventivoonline/config/gestionerichiesta.php';
	$$.ajax({
						url: url,
						method: 'POST',
						dataType: 'text',
						cache:false,
						data: query,
						success: function (data) {
							myApp.hideIndicator(); 
							switch(agg) {
								case 1:
									var arr=data.split('_');
									addservprev2(arr['0'],arr['1'],arr['2']);
								break;
								case 2:
									myApp.closePanel('right');
									stepnew(0,0)
								break;
							}
							
						}
					})
		
}


function ricarcolaadd(){
	var totale=0;
	var num=0;
	$$('.soggetti').each(function(i, obj) {
		//alert($$(obj).attr('checked'));
    	if($$(obj).is(':checked')){
			var prezzo=parseFloat($$(obj).attr('alt'));
			totale=parseFloat(prezzo)+parseFloat(totale);
			num++;
		}
	});
	$$('#totaleserv').html(totale);
	if(num>0){
		$$('#confbutton').removeAttr('disabled');
	}else{
		$$('#confbutton').Attr('disabled','disabled');
	}
}

function aggiungis(){
	myApp.showIndicator(); setTimeout(function(){ hidelo(); }, 5500);	
	var val1=$$('#orarioadd').val();
	var val2='';
	$$('.soggetti').each(function(i, obj) {
    	if($$(obj).is(':checked')){
			val2=val2+$$(obj).val()+',';
		}
	});
	var val3=$$('#IDservadd').val();
	
	var val=val1+'_'+val2+'_'+val3;
	gestioneric(0,val,2,10,2);	
}


function cambiadestprev(restr,IDins,IDserv){
	var val=restr+'_'+IDserv;
	modprenextra(IDins,val,24,9,1);

}

function eliminaextraprev(ID){
	myApp.showIndicator(); setTimeout(function(){ hidelo(); }, 5500);	 
	myApp.closeModal('.popover-menu');
	var url=baseurl;
	var url=url+'config/preventivo/config/eliminaextra.php';
	var query = {ID:ID};
	//alert(url);
	$$.ajax({
		url: url,
		method: 'POST',
		dataType: 'text',
		cache:false,
		data: query,
		success: function (data) {
			myApp.hideIndicator();
			stepnew(0,0);
			myApp.closePanel('right');
			
			myApp.addNotification({
							message: 'Servizio rimosso con successo',
							hold:2500,
							 button: {text: '<i class="material-icons">close</i>'}
						});
			
		}
	});

}


function addservprenvent(IDserv){
	myApp.showIndicator(); setTimeout(function(){ hidelo(); }, 5500);	 
	var url=baseurl;
	var url=url+'config/preventivo/config/addextra.php';
	var query = {IDserv:IDserv};
	//alert(url);
	$$.ajax({
		url: url,
		method: 'POST',
		dataType: 'text',
		cache:false,
		data: query,
		success: function (data) {
			
			myApp.addNotification({
							message: 'Servizio aggiunto con successo',
							hold:2500,
							 button: {text: '<i class="material-icons">close</i>'}
						});
			
			myApp.hideIndicator();
			myApp.closePanel('right');
			stepnew(0,0)
		}
	});	
}

function calcolatot(){
	var url=baseurl;
	var url=url+'mobile/config/preventivo/config/calcolatot.php';
	var query = {};
	//alert(url);
	$$.ajax({
		url: url,
		method: 'POST',
		dataType: 'html',
		cache:false,
		data: query,
		success: function (data) {
			$$('#totaleprev').html(data+' €');
			
		}
	});	
}

function confermapren(){
	myApp.showIndicator(); 
	setTimeout(function(){ hidelo(); }, 5500);	 
	var url=baseurl;
	var url=url+'config/preventivo/conferma.php';
	var noteag=$$('#noteag').val();
	var query = {noteag:noteag};
	$$.ajax({
		url: url,
		method: 'POST',
		dataType: 'text',
		cache:false,
		data: query,
		beforeSend: function (data) {
			setTimeout(function(){myApp.hideIndicator();}, 8000);
		},
		success: function (data) {
			
			myApp.addNotification({
							message: 'Prenotazione inserita con successo',
							hold:2500,
							 button: {text: '<i class="material-icons">close</i>'}
						});
			
			
			
			myApp.hideIndicator();  
			$$('.close-popup').trigger('click');
			var time=$$('#datacalpren').val();
			navigationtxt(3,time,'calendariodiv',0);
			
			data=parseInt(data);
			var IDp=new String(data);
			
			navigation(3,IDp);
			
		}
	});	
	
	
	
}


