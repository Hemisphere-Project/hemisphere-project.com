<?php

if(isset($_GET['ad'])){
	$address = $_GET['ad'];
	mail($address, '', '');
	header('Location: /#/contents/contact.php?usc=scss'); 
}

?>
