let img = '';
const YOUR_CLIENT_ID = '9c48ba5baf1e548';
let data;


var album_id = 'jwprYxa';
var api_key = '9c48ba5baf1e548';
var request_url = 'https://api.imgur.com/3/album/' + album_id;

var imgUrls = [];


function preload() {
    requestAlbum();
}

function requestAlbum() {
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
        let json = JSON.parse(response_text);
        let imgs = json.data.images;
        imgs.forEach((img) => {
            imgUrls.push(img.link);
        });

        console.log(json);
        console.log(imgs);
        asyncLoad();
    }
}


function asyncLoad() {
    var item = imgUrls[Math.floor(Math.random() * imgUrls.length)];
    img = loadImage(item);
}

function setup() {
    createCanvas(800, 600);
    background(0);
    fullscreen();


}

let s;

function draw() {


    if (img) {
    	// image(img, 0, 0);
    	if( !s)  s = new Slice(0,img);
    	s.render();
    }
}

class Slice {

	position = 0;
	img = null;

    constructor(position, img) {
        this.position = position;
        this.img = img;
    }

    render(){
    	// console.log("rendering maderfacker !");
    	image(img, 0,0);
    }

}


// Authorization: Client-ID YOUR_CLIENT_ID
// For accessing a user's account, please visit the OAuth2 section of the docs.
// Client ID:
// 9c48ba5baf1e548
// 920a33ac25c91675eb9960745010607476795257


// 'https://api.imgur.com/oauth2/authorize?client_id=9c48ba5baf1e548&response_type=token'+
// '&state='+''