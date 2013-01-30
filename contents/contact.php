
<script language="Javascript">

function validateForm(){
	
	var emailValue = document.forms["news_letter_subscription"]["emailTI"].value;
	console.log('validate');
	if(validateEmail(emailValue) && emailValue != "my@email.com"){
		
		$.post("newsletter-subscribe.php",{email: emailValue}, function(data) {
			$('#newsletter-content').html(data);
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


	if(isset($_GET['sc'])){
		echo "<p></br>Your subscription is now complete !</br>Thank you !</p>";
	}else if(isset($_GET['usc'])){
		echo "<p></br>You have successfully</br>unsubscribed to the newsletter. ";
	}else{
		echo	'<div id="newsletter-form-container">';
		echo 	'<form name="news_letter_subscription"  onsubmit="return validateForm()" >
					<input type="text" name="emailTI" value="my@email.com" onclick="emailTI_onclick(this)">

					<input type="submit" value="Subscribe">
				</form>';
		echo 	'</div>';
	}
	
	?>
	</div>
	
	
	</div>
</div>
