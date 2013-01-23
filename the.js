
//var content,xmlhttp;

// var readyStateCheckInterval = setInterval(function() {
//     if (document.readyState === "complete") {
//         clearInterval(readyStateCheckInterval);
//     	start();
//     }
// }, 10);

$("document").ready(function (){
	start();
});

function start(){
	$.address.init(init);
	$.address.change(change);
}

function init(event){
}

function change(event){
	if($('[rel=address:' + event.value + ']').attr('href'))
		loadContent($('[rel=address:' + event.value + ']').attr('href'));
	else if(event.value != '/')
		loadContent(event.value);
}

function loadContent(url){
	$("#content").load(url);
}

function toggleFold(elmnt){
    	 $(elmnt).next(".subcontent").slideToggle(300, function() {
	  		  // Animation complete.
    	 });
}



// function loadXMLDoc(url){
	
// 	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
// 		xmlhttp=new XMLHttpRequest();
// 		xmlhttp.onreadystatechange = ajaxChange;
// 		xmlhttp.open("GET",url,true);
// 		xmlhttp.send(null);
		
// 		$.address.value(url);  
// 	}
// 	else if (window.ActiveXObject){
// 		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
// 		if (xmlhttp) {
// 			xmlhttp.onreadystatechange = ajaxChange;
// 			xmlhttp.open("GET", url, true);
// 			xmlhttp.send();
			
// 			$.address.value(url);  
// 		}
// 	}else{
// 		console.log("ajax not supported");
// 	}
	

// }


// function ajaxChange(){
// 	if (xmlhttp.readyState==4 && xmlhttp.status==200){
// 		content.innerHTML=xmlhttp.responseText;
// 	}
// }


// jQuery style






