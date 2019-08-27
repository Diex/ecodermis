const YOUR_CLIENT_ID = '9c48ba5baf1e548';
let data;


var album_id = 'jwprYxa';
var api_key = '9c48ba5baf1e548';
var request_url = 'https://api.imgur.com/3/album/' + album_id;

var imgUrls = [];

let mask, dummy;
var changeImageTimeout = 1E3;

function preload() {
    requestAlbum();
    mask = loadImage('https://i.imgur.com/SoZ4pjJ.png');
    dummy = loadImage('https://i.imgur.com/Pq0XJem.png');
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
        // asyncLoad();
    }
}

let s;
let slices = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight); //createCanvas(1000, 1000);
    cnv.style('display', 'block');
    background(0);
    fullscreen();

    for (sl = 0; sl < 12; sl++) {
        let temp = new Slice(sl, dummy);
        slices.push(temp);
    }

    setInterval(() => {
        if (imgUrls.length > 0) {
            let item = imgUrls[Math.floor(Math.random() * imgUrls.length)];
            let w = Math.floor(Math.random() * slices.length)
            slices[w].switchImage(item);
        }
    }, changeImageTimeout);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    push();
    translate(width / 2, height / 2);
    slices.forEach((slice) => {
        slice.render();
    })
    pop();

    fill(255);
    ellipse(width / 2, height / 2, 10, 10);

    // noLoop();
}

class Slice {

    radius = 300 - 50;
    offset = -0;
    position = 0;
    img = null;
    loc = { "x": 0, "y": 0 };

    switchImage(newImage) {
        loadImage(newImage, (result) => {
            this.img = result;
        });
    };

    constructor(position, img) {
        this.position = position;
        this.img = img;
    };

    render() {
        this.loc.x = this.radius * sin(radians(this.position * 360 / 12));
        this.loc.y = this.radius * cos(radians(this.position * 360 / 12));
        // console.log(this.loc);
        if (mask) {
            push();
            imageMode(CENTER);

            translate(this.loc.x, this.loc.y);
            rotate(-radians(180 + this.position * 360 / 12));
            this.img.mask(mask);
            image(this.img, 0, 0, mask.width, mask.height);

            pop();
        }
    };
}


// Authorization: Client-ID YOUR_CLIENT_ID
// For accessing a user's account, please visit the OAuth2 section of the docs.
// Client ID:
// 9c48ba5baf1e548
// 920a33ac25c91675eb9960745010607476795257


// 'https://api.imgur.com/oauth2/authorize?client_id=9c48ba5baf1e548&response_type=token'+
// '&state='+''