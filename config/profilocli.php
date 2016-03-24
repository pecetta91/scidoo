<?php 
include('../../config/connect.php');
include('../../config/funzioni.php');

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

$testo=  '<div data-page="dynamic-content" class="page"> 
            <!-- Top Navbar--> 
            <div class="navbar"> 
              <div class="navbar-inner"> 
                <div class="center"><img src="scidoomini.png" style="margin-top:14px;"></div> 
              </div> 
            </div> 
			
			
			<div class="toolbar toolbar-bottom">
    <div class="toolbar-inner">
	<a href="#tab-3" class="link" style=" border-bottom:solid 4px #fff;"><img src="img/weather.png"></a>
	<a href="#tab-1" class="link"><img src="img/direction.png"></a></div>
  </div>
			
			
            <!-- Scrollable page content--> 
            <div class="page-content"> 
              <div class="content-block" ><div id="contenutodiv">';
			  
			  
			  
			  $inc=1;
			  
			  include('profilo/temp.php');
				 
           $testo.=' </div></div> 
          </div>';
		  
		  $testo=base64_encode($testo);
	header('Content-type: application/json');
	echo '[{"html" : "'.$testo.'"} ]';	  

?>