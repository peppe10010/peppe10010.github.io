window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var c;
var $;
var w;
var h;

var ms = {
  x: 250,
  y: 250
};

var bin1 = "★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯";
var bin2 = "★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★✯★";

window.onload = function() {
  c = document.getElementById("canv");
  $ = c.getContext("2d");

  window.addEventListener("mousemove", msmv, false);
  window.addEventListener("touchmove", tcmv, false);
  window.addEventListener('load', resize);
  window.addEventListener('resize', resize, false);
  run();
}

function resize() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
  c.style.position = 'absolute';
  c.style.left = (window.innerWidth - w) *
    .01 + 'px';
  c.style.top = (window.innerHeight - h) *
    .01 + 'px';
}

function run() {
  go();
  window.requestAnimFrame(run);
}

function go() {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
  var t = Date.now();
  var col = 5; //color var
  //caterpillars
  for (var i = 0; i < bin1.length; i++) {
    $.globalCompositeOperation = 'source-over';
    $.shadowColor = "hsla(0,0%,0%,.8)";
    $.shadowOffsetX = 10;
    $.shadowOffsetY = 10;
    $.shadowBlur = 0;
    var x1 = 200 * Math.cos(t / 500 + i / bin1.length * 100) +
      200 * Math.cos(t / 500 + i / bin1.length * 100);
    var y1 = 100 * Math.cos(t / 500 + i / bin1.length * 100) +
      200 * Math.sin(t / 500 + i / bin1.length * 100);
    $.fillStyle = "hsla(" + (bin1.length / i * col * 360) + ",100%, 50%, 1)";
    $.font = "bold 40px 'Courier New'";
    $.fillText(bin1.charAt(i), ms.x + x1, ms.y + y1);
    $.fillText(bin1.charAt(i), ms.x + y1, ms.y + x1);
  }
  //outer stars
  for (var i = 0; i < bin2.length; i++) {
    $.globalCompositeOperation = 'source-over';
    $.shadowColor = "hsla(0,0%,0%,.8)";
    $.shadowOffsetX = 5;
    $.shadowOffsetY = 9;
    $.shadowBlur = 0;
    var x2 = Math.cos(t / 5000 + i / bin2.length) * 400 *
      Math.cos(t / 5000 * i / bin2.length);
    var y2 = Math.cos(t / 5000 + i / bin2.length) * 400 *
      Math.sin(t / 5000 * i / bin2.length);
    $.fillStyle = "hsla(" + (bin1.length / i * col * 100) + ",100%, 50%, 1)";
    $.font = "bold 40px 'Courier New'";
    $.fillText(bin2.charAt(i), ms.x + x2, ms.y + y2);
    $.fillText(bin2.charAt(i), ms.x + y2, ms.y + x2);
  }
}

function msmv(e) {
  ms.x = e.clientX;
  ms.y = e.clientY;
}

function tcmv(e) {
  ms.x = e.touches[0].pageX;
  ms.y = e.touches[0].pageY;
}