
<script language="Javascript">

function validateForm(){
	
	var emailValue = document.forms["news_letter_subscription"]["emailTI"].value;
	console.log('validate');
	if(validateEmail(emailValue) && emailValue != "my@email.com"){
		
		$.post("contents/contact.php",{email: emailValue}, function(data) {
			$('#content').html(data);
		});
		return false;
	}
	else{
		document.forms["news_letter_subscription"]["emailTI"].style.color = "#FF0000";
		return false;
	}
}


function validateEmail(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function emailTI_onclick(elmnt){
	if(elmnt.value == "my@email.com")
		elmnt.value="";
	elmnt.style.color = "#000000";
	
}
</script>

<div class="contentBody centerText">
	<div style="height:60px;">
		<a href="mailto:bonjour@hemisphere-project.com">bonjour@hemisphere-project.com</a>
	</div>
	<div id="newsletter">
	<p id="newsletter-header">newsletter</p>
	<p id="newsletter-separator" />
	<div id="newsletter-content">
	<?php

	if(isset($_POST['email'])){

		$email = $_POST['email'];
		
		$subscribe_headers .= "MIME-Version: 1.0\n";
		$subscribe_headers .= "Content-type: text/plain; charset=iso-8859-1\n";
		$subscribe_headers .= "X-Mailer: php\n";
		$subscribe_headers .= "From: " . $email . "\n";
		
		$subscribe_to = 'hemisphere'.'-subscribe-'.str_replace('@','=',$email).'@'.'alainbarthelemy.com';
		$subscribe_subject = 'subscribe'; //The email subject 
		$subscribe_body = 'subscribe'; //The email body 

		mail($subscribe_to, $subscribe_subject, $subscribe_body, $subscribe_headers); 
	
		echo "<p>Thank you !</p><p>You will receive an email shortly</br> to confirm your subscription.</p>";
	}else if(isset($_POST['news_letter_unsubscription'])){
			echo 'okaaaaaaaaaaaaaaay';
	}else if(isset($_GET['sc'])){
		echo "<p></br>Your subscription is now complete !</br>Thank's again !</p>";
	
	}else if(isset($_GET['usc'])){
		$usc = $_GET['usc'];
		if($usc == "rq" ){
			echo "<p>One more step...</p><p>You will receive an email shortly</br> to confirm your unsubscription.</p>";
		}else if($usc == "scss"){
			echo "<p></br>You have successfully</br>unsubscribed to the newsletter. ";
		}
	
	}else{
		echo	'<div id="newsletter-form-container">';
		echo 	'<form name="news_letter_subscription"  onsubmit="return validateForm()" >
					<!--<input type="text" name="emailTI" value="my@email.com" onclick="if(this.value == '."'my@email.com'".')this.value='."''".';">-->
					<input type="text" name="emailTI" value="my@email.com" onclick="emailTI_onclick(this)">

					<input type="submit" value="Submit">
				</form>';
		echo 	'</div>';
	}
	
	?>
	</div>
	
	
	</div>
</div>
