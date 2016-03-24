<?php 
include('../../config/connect.php');
$testo=  '<div data-page="dynamic-content" class="page"> 
            <!-- Top Navbar--> 
            <div class="navbar"> 
              <div class="navbar-inner"> 
                <div class="left"><a href="#" class="back link icon-only"><i class="icon icon-back"></i></a></div> 
                <div class="center">Scidoo</div> 
              </div> 
            </div> 
            <!-- Scrollable page content--> 
            <div class="page-content"> 
              <div class="content-block"> 
                

              </div> 
            </div> 
          </div>';
		  
		  $testo=base64_encode($testo);
		  
		  //$testo='pincopallino';
		  
	header('Content-type: application/json');
	//echo "[{'html' : '".$testo."'} ]";	  

	echo '[{"html" : "'.$testo.'"} ]';	  

?>