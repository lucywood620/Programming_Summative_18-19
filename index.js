var time = 0;

function setup(){
  createCanvas(600, 600);
  noFill();
  stroke(255);
}

function draw(){
  background(242);
  for(var i = 0; i < 360; i+=3){
    var x = cos(radians(i)) * 50 + width / 2;
    var y = sin(radians(i)) *100 + height / 2;
    var w = sin(radians(time+i )) * 200;
    w = abs(w);

    var col=map(i,0,360,120,255);
    fill(col,col,col);

    noStroke();
    fill(col,0,88);
    ellipse(x, y, w, w);
  }
  time++;
}