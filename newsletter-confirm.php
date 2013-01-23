<?php

//mail("hello@alainbarthelemy.com", "test", "test", "From:" . $email);
if(isset($_GET['ad'])){
	$address = $_GET['ad'];
	mail($address, '', '');
	header('Location: /#/contents/contact.php?sc=true');
}
//phpinfo();

?>
