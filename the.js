var DEFAULT_LOCALE = 'fr';
var localStorageLocale = '';
var HEMISPHERE_GREEN = '#8ACDA3';
var currentLocale  = '';
var urlParamsHM = {};

var NO_LOCAL_STRG = false;



$("document").ready(function (){
	start();
});


function start(){
	
	// before anything else we test the availables features :
	if(!Modernizr.canvas){
		console.log('no canvas');	
	}
	
	if(!Modernizr.localstorage){
		console.log('no localStorage');
		NO_LOCAL_STRG = true;
	}
	
	var localStorageLocale = localStorage.getItem('hemisp_lng');
	
	if((localStorageLocale === undefined) || (localStorageLocale === null))
		$('#menu_opts').load('menu_'+DEFAULT_LOCALE+'.html');
	else
		$('#menu_opts').load('menu_'+localStorageLocale+'.html');
	
	
	$(window).bind('hashchange',onHashChange);
	$(window).hashchange();	
}


function menuClick(event){
	event.preventDefault();
	//loadContent(event.currentTarget.href);
	trimUSCandSCParams();
	
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
	
	if(!NO_LOCAL_STRG){
		localStorage.hemisp_lng = value;	
	}
	
	urlParamsHM['lng'] = value;
	updateParamsInURL();
}

// takes the urlParamsHM HashMap and write the params in the url
function updateParamsInURL(){
	var paramsIndex = window.location.href.indexOf('?')+1;
	var paramsString = urlParamsHMToString();

	if(paramsIndex != 0){// we already have params in the url
		window.location.href = window.location.href.substring(0,paramsIndex)+paramsString;
	}else{//we don't have any params in the url
		var hashIndex = window.location.href.indexOf('#!');
		if(hashIndex != -1){//we have a hashbang in the url
			window.location.href += '?'+paramsString;
		}else{// we don't have any hashbang in the url
			window.location.href += '#!?'+paramsString;	
		}
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



function onHashChange(){
	//console.log(window.location.hash);
	
	urlParamsHM = extractUrlParams();
	updateLangIfRequiered();
	
	
	
	loadContent(window.location.href);
	

}

function trimUSCandSCParams(){
	if(urlParamsHM['usc']){
		delete urlParamsHM['usc'];
		//updateParamsInURL();
		//return;
	}
	if(urlParamsHM['sc']){
		delete urlParamsHM['sc'];
		//updateParamsInURL();
		//return;
	}
	
}

// loadContent is designed to load content inside the #content element
function loadContent(url){
	console.log(url);
	
	var hashPos = url.indexOf('#!'); 
	if(hashPos != -1){
		if(url.indexOf('?') !=-1 && url.indexOf('?') == hashPos+2){
			// in this case we have nohin to load in #content
			$("#content").html('');
			return;	
		}
		
		var newUrl = url.substring(0,hashPos) + url.substring(hashPos+2);
		url = newUrl;		
	}else{
		//nohin to load in #content	
		$("#content").html('');
		return;
	}
	
	if(!NO_LOCAL_STRG && !urlParamsHM['lng'] && localStorage.hemisp_lng){ //if we have a lng stored locally and the url doesn't specify a lng
		// we add the lng to the url for this request
		if(url.indexOf('?') != -1){// we already have params
			url += '&lng='+localStorage.hemisp_lng;
		}else{// we have no preexisting params
			url += '?lng='+localStorage.hemisp_lng;
		}
	}
	
	$("#content").load(url);
	
	
}

function updateLangIfRequiered(){
	
	if(urlParamsHM['lng']){
		
		if(currentLocale != urlParamsHM['lng']){
			currentLocale = urlParamsHM['lng'];
			$('#menu_opts').load('menu_'+currentLocale+'.html');
			switch (currentLocale){
				case 'en': 			
					$('#langToggle_en').css('color',HEMISPHERE_GREEN);
					$('#langToggle_fr').css('color','');	
					break;
				case 'fr': 			
					$('#langToggle_fr').css('color',HEMISPHERE_GREEN);
					$('#langToggle_en').css('color','');	
					break;
				default:
					console.log('err#2 locale not supported');
				
			}
			
		}
	}else{
		$('#langToggle_fr').css('color','');
		$('#langToggle_en').css('color','');
	}
	
}



//toggleFolded is called to fold and unfold subcontent
function toggleFold(elmnt){
    	 $(elmnt).next(".subcontent").slideToggle(300, function() {
	  		  // Animation complete.
    	 });
}

// extractUrlParams takes all url variables and puts them in an hashmap (object)
// we can't use here window.location.search because of the #! 
function extractUrlParams(){	
	var t = [];
	if(window.location.href.indexOf('?') != -1)
		t = window.location.href.substring(window.location.href.indexOf('?')+1).split('&');
	var f = {};
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=');
		f[x[0]]=x[1];
	}
	return f;
}




