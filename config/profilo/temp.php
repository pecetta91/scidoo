<?php 
if(!isset($inc)){
	include('../../../config/connect.php');
	include('../../../config/funzioni.php');
}

$IDpren=$_SESSION['IDstrpren'];
$query="SELECT app,gg,time,tempg,tempn FROM prenotazioni WHERE IDv='$IDpren' LIMIT 1";
$result=mysql_query($query);
$IDapp=mysql_result($result,0,0);
$gg=mysql_result($result,0,1);
$time=mysql_result($result,0,2);
$tempg=mysql_result($result,0,3);
$tempn=mysql_result($result,0,4);

$nomepren=estrainome($IDpren);
$alloggio='';
$statodom='Inattivo';
$color='333';
if($gg!=0){
	$query="SELECT nome,temp,statod,risc FROM appartamenti WHERE ID='$IDapp' LIMIT 1";
	$result=mysql_query($query);
	$nome=mysql_result($result,0,0);
	$temp=mysql_result($result,0,1);
	$statod=mysql_result($result,0,2);
	$risc=mysql_result($result,0,3);
	
	if(($risc='1')&&($statod==1)){
		$statodom='In Riscaldamento';
		$color='c11010';
	}
	if(($risc='0')&&($statod==1)){
		$statodom='In Raffreddamento';
		$color='1759c6';
	}
	
	$alloggio='Alloggio: '.$nome.'<br>';
		
}



$txt='<span style="font-size:13px;">
			  	Prenotazione: '.$nomepren.'<br>
				Data di Arrivo: '.dataita($time).' '.date('Y',$time).'<br>
				'.$alloggio.'<hr>
				 </span>
				  <div class="card ks-card-header-pic" style="border:solid 3px #e6692c;">
				  <div class="card-content"> 
					<div class="card-content-inner" style="text-align:center; font-size:20px;"> 
					  <p class="color-gray">Temperatura Attuale<br><span style="line-height:5px; color:#999; font-size:15px; font-weight:100; margin-top:-15px;">'.$statodom.'</span></p>
					</div>
				  </div><div style="text-align:center; font-size:55px; margin-top:-20px;" valign="bottom" class=" color-white no-border" style="color:#'.$color.'">'.$temp.'&deg;</div>
				  
				</div>

				<div class="card ks-facebook-card">
				  <div class="card-header no-border">
					<div >Temperatura Giorno</div>
					<div class="ks-facebook-date" style="margin-left:0px;">09:00 - 17:00</div>
				  </div>
				  <div class="card-content" style="text-align:center; font-size:55px;">'.$tempg.'&deg;</div>
				  <div class="card-footer no-border"><a href="javascript:void(0)" class="link" style="font-size:50px;" onclick="modprofilo('.$IDapp.',0,1,10,1)">-</a><a href="javascript:void(0)" class="link" style="font-size:40px;" onclick="modprofilo('.$IDapp.',0,2,10,1)">+</a></div>
				</div>
				
				
				<div class="card ks-facebook-card">
				  <div class="card-header no-border">
					<div >Temperatura Notte</div>
					<div class="ks-facebook-date" style="margin-left:0px;">17:00 - 09:00</div>
				  </div>
				  <div class="card-content" style="text-align:center; font-size:55px;">'.$tempn.'&deg;</div>
				  <div class="card-footer no-border"><a href="javascript:void(0)" class="link" style="font-size:50px;" onclick="modprofilo('.$IDapp.',1,1,10,1)">-</a><a href="javascript:void(0)" onclick="modprofilo('.$IDapp.',1,2,10,1)" class="link" style="font-size:40px;">+</a></div>
				</div>
				</div>';
				
if(isset($inc)){
	$testo.=$txt;
}else{
	$txt=base64_encode($txt);
	header('Content-type: application/json');
	echo '[{"html" : "'.$txt.'"} ]';	 
}



?>