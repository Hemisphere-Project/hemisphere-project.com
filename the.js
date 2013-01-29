
//var content,xmlhttp;

// var readyStateCheckInterval = setInterval(function() {
//     if (document.readyState === "complete") {
//         clearInterval(readyStateCheckInterval);
//     	start();
//     }
// }, 10);
var DEFAULT_LOCALE = 'fr';
var currentLocale  = DEFAULT_LOCALE;
var urlParamsHM = {};

$("document").ready(function (){
	start();
});

function start(){
	$(window).bind('hashchange',onHashChange);
	urlParamsHM = extractUrlParams();
	if(urlParamsHM['lng'])
		currentLocale = urlParamsHM['lng'];	
	if(window.location.hash != '')
		$(window).hashchange();	
}


function onHashChange(){
	console.log(window.location.hash);
	loadContent(window.location.href);
}


function menuClick(event){
	event.preventDefault();
	//loadContent(event.currentTarget.href);
	var urlParamsString = urlParamsHMToString();
	if(urlParamsString != '')
		urlParamsString = '?'+urlParamsString;
	
	window.location.hash = '!'+event.currentTarget.href.substring(event.currentTarget.baseURI.length)+urlParamsString;
}

function langToggleClick(event){
	event.preventDefault();
	
	switch (event.currentTarget.id) {
		case 'langToggle_fr' :
			setLocale('fr');
			break;
		case 'langToggle_en' :
			setLocale('en');
			break;
		default:
			console.log('err#1 unexpected langToggle id');
			break;
		}

}
//change the url's locale parameter according to the input value
function setLocale(value){
	
	urlParamsHM['lng'] = value;
	updateParamsInURL();
}

function updateParamsInURL(){
	var paramsIndex = window.location.href.indexOf('?')+1;
	var paramsString = urlParamsHMToString();
	// for(var param in urlParamsHM){
	// 	paramsString += param + '=' + urlParamsHM[param] + '&';
	// }
	
	//paramsString = paramsString.substring(0,paramsString.length - 1);
	if(paramsIndex != 0){
		window.location.href = window.location.href.substring(0,paramsIndex)+paramsString;
	}else{
		window.location.href += '?'+paramsString;
	}
}

function urlParamsHMToString(){
	var string = '';
	for(var param in urlParamsHM){
		string += param + '=' + urlParamsHM[param] + '&';
	}
	string = string.substring(0,string.length - 1);
	return string;
}


function loadContent(url){
	console.log(url);
	//history.pushState(null,null,url)
	var hashPos = url.indexOf('#!'); 
	if(hashPos != -1){
		
		var newUrl = url.substring(0,hashPos) + url.substring(hashPos+2);
		url = newUrl;		
	}
	$("#content").load(url);
}

function toggleFold(elmnt){
    	 $(elmnt).next(".subcontent").slideToggle(300, function() {
	  		  // Animation complete.
    	 });
}


function extractUrlParams(){	
	var t = [];
	if(window.location.search != "")
		t = location.search.substring(1).split('&');
	var f = {};
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=');
		f[x[0]]=x[1];
	}
	return f;
}




