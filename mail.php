<?php
if($_REQUEST['button-send']) {
 if($_SERVER['REQUEST_METHOD']=='POST') {
  if((isset($_POST['quest']) && $_POST['quest']!="")) {
   $to = 'georgynosar@gmail.com'; 
   $subject = 'ART ' + $_POST['name']; 
   $message = $_POST['quest'] + "   " + $_POST['mail']
   $headers = "Content-type: text/plain; charset=utf-8 \r\n";
   mail($to, $subject, $message, $headers);
  }
 }
}
?>