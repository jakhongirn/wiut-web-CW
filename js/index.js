// Typing animation
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();  //period of rotate in typing
  this.isDeleting = false; 
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1); 
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1); //add each letter or removes depending on isDeleting is true or false
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>"; //type below when reaches the limit of width of container

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500; //when types all of the words it will get back and removes letter one by one and vice versa. 
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate"); //takes each data in the data-rotate attribute list

    var period = elements[i].getAttribute("data-period"); //takes data in the data-period attribute
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #1b5bf7 }";
  document.body.appendChild(css); //shows the | to untype or type
};

// Number animation
const counters = document.querySelectorAll(".value"); //takes the all elements which class is value
const speed = 300;

counters.forEach((counter) => {
  const animate = () => {
    const value = +counter.getAttribute("data"); //attribute data represents the maximum number
    const data = +counter.innerText;

    const time = value / speed;
    if (data < value) {
      counter.innerText = Math.ceil(data + time);
      setTimeout(animate, 1);  //maximum number divides into speed and adds 1 to 0 (starter) in each that speed and loops until gets maxmimum number data
    } else {
      counter.innerText = value;
    }
  };

  animate();
});

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(41.2995, 69.2401), //shows the area of Tashkent in google maps
    zoom: 10,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
