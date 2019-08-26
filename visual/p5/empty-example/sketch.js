let img = '';
const YOUR_CLIENT_ID = '9c48ba5baf1e548';
let data;


var album_id = 'jwprYxa';
var api_key = '9c48ba5baf1e548';
var request_url = 'https://api.imgur.com/3/album/' + album_id;


function preload(){
	img = loadImage('https://i.imgur.com/VNFrEEu.jpg');
	requestAlbum();
	

	// let url = 'https://api.imgur.com/3/';

				// 'https://api.imgur.com/oauth2/authorize?client_id=9c48ba5baf1e548&response_type=token';
				// 'https://api.imgur.com/oauth2/authorize?'+
				// 'client_id='+YOUR_CLIENT_ID+
				// '&response_type=token'+
				// '&state='+'';
	

	// httpGet(request_url, 'jsonp', false,function(response) {
	// 	console.log(response);
	//     // when the HTTP request completes, populate the variable that holds the
	//     // earthquake data used in the visualization.
	//     data = response;    
 //  	});
}

function requestAlbum(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() { 
     if (req.readyState == '4' && req.status == '200') {
       processRequest(req.responseText);
     } else {
     	// error...
     }
  }
  req.open('GET', request_url, true); // true for asynchronous     
  req.setRequestHeader('Authorization', 'Client-ID ' + api_key);
  req.send(null);
}

function processRequest(response_text) {
  if (response_text == 'Not found') {
    console.log('Imgur album not found.');
  } else {
    
    var json = JSON.parse(response_text);
    console.log(json);
    
  }
}


function setup() {
	createCanvas(800, 600);
	background(0);
	fullscreen();	
}

function draw() {
	image(img, 0,0);
}


// Authorization: Client-ID YOUR_CLIENT_ID
// For accessing a user's account, please visit the OAuth2 section of the docs.
// Client ID:
// 9c48ba5baf1e548
// 920a33ac25c91675eb9960745010607476795257


// 'https://api.imgur.com/oauth2/authorize?client_id=9c48ba5baf1e548&response_type=token'+
				// '&state='+''
