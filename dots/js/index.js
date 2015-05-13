var canvas=document.getElementById("c");
var ctx=canvas.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
canvas.width = W;
canvas.height = H;

var drawing={
  generalVelocity:1,
  minRadiusDot:1,
  maxRadiusDot:3,
  bounce:true,
  connectDistance:200,
  noOfDots:W*H/(150*150), // average of 1 dot per 150*150 px
  lineWidth:1
};


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

function random(min, max){
  if(min>max){
    min = [max, max = min][0];
  }
  return Math.random()*(max-min+1) + min;
}
function round(x){
  return Math.round(x);
}


function drawBackground(){
  ctx.beginPath();
  ctx.rect(0, 0, W, H);
  ctx.fillStyle = "rgba(250, 250, 250, 1)";
  ctx.fill();
}


function distance(dotA, dotB){
  var diffX=dotA.x-dotB.x;
  var diffY=dotA.y-dotB.y;
  return Math.sqrt(diffX*diffX + diffY*diffY);
}

function line(dotA, dotB){
  var grad= ctx.createLinearGradient(dotA.x, dotA.y, dotB.x, dotB.y);
  grad.addColorStop(0, dotA.color);
  grad.addColorStop(1, dotB.color);

  ctx.strokeStyle = grad;
  ctx.lineWidth=drawing.lineWidth;
  ctx.lineCap="round";
  ctx.beginPath();
  ctx.moveTo(dotA.x, dotA.y);
  ctx.lineTo(dotB.x, dotB.y)		;
  ctx.stroke();
}

function Dot(){
  this.r= random(drawing.minRadiusDot,drawing.maxRadiusDot);
  this.vx=random(-3,3);
  this.vy=random(-3,3);
  this.x=random(0,W);
  this.y=random(0,H);
  this.color="rgb("+[round(random(100,220)), round(random(100,220)), round(random(100,220))].join() +")";

  this.update=function(){
    this.x+=this.vx*drawing.generalVelocity;
    this.y+=this.vy*drawing.generalVelocity;
    if(drawing.bounce){
      if(this.x>W) this.vx*=-1.0;//this.x-=W
      if(this.y>H) this.vy*=-1.0;//this.y-=H
      if(this.x<0) this.vx*=-1.0;//this.x+=W
      if(this.y<0) this.vy*=-1.0;//this.y+=H		
    }else{
      if(this.x>W) this.x-=W;
      if(this.y>H) this.y-=H;
      if(this.x<0) this.x+=W;
      if(this.y<0) this.y+=H;						
    }

  };
  this.draw=function(){
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
  };
  this.connect=function(i){
    for (var j = i; j < dots.length; j++) {
      if(distance(this, dots[j])<drawing.connectDistance){
        line(this, dots[j]);
      }
    }
  };
}

function createDots(){
  dots=[];
  for (var i = 0; i < drawing.noOfDots; i++) {
    dots.push(new Dot());
  }
}

function updateRadiiOfDots(){
  for (var i = 0; i < dots.length; i++) {
    dots[i].r = random(drawing.minRadiusDot,drawing.maxRadiusDot);
  }
}

function updateNoOfDots(){
  if(dots.length>drawing.noOfDots){
    while(dots.length!=drawing.noOfDots){
      dots.pop();
    }
  }else{
    while(dots.length!=drawing.noOfDots){
      dots.push(new Dot());
    }
  }
}

function draw(){
  drawBackground();
  
  dots.forEach(function(dot){dot.update();});
  dots.forEach(function(dot){dot.draw();});
  dots.forEach(function(dot, i){dot.connect(i);});

  requestAnimFrame(draw);
}

var dots=[];
createDots();
draw();

var gui=new dat.GUI();
gui.add(drawing, "noOfDots").min(1).max(200).step(5).onChange(updateNoOfDots);
gui.add(drawing, "generalVelocity").min(0).max(10);
gui.add(drawing, "minRadiusDot").min(0).max(10).step(1).onChange(updateRadiiOfDots);
gui.add(drawing, "maxRadiusDot").min(0).max(10).step(1).onChange(updateRadiiOfDots);
gui.add(drawing, "connectDistance").min(0).max(1000).step(10);
gui.add(drawing, "lineWidth").min(0).max(10);
gui.add(drawing, "bounce");

window.onresize=function(){
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
}