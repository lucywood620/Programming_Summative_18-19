var time = 0;
var col;
let circle1;
let circle2;
let circle3;
let colour_slider;
let size_slider;

class Circle{
  constructor(x,y,i) {
    this.x = x
    this.y = y
    this.w = 100
    this.i = i
  }
  
  move(){
    if (this.i < 360){
      this.i = this.i + 0.5
    }
    else{
      this.i = 0
    }    
    this.x = cos(radians(this.i)) * size_slider.value() + windowWidth / 2;
    this.y = sin(radians(this.i)) * (size_slider.value()*2) + windowHeight / 2;
    this.w = (sin(radians(time + this.i)) * (size_slider.value()*4));
    this.w = abs(this.w);
  }

  show() {
    stroke(colour_slider.value(), 255, 255);
    fill(colour_slider.value(), 255, 255, 127);
    ellipse(this.x,this.y,this.w,this.w);
  }

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);

  // creating a slider to change the colour of the circles
  colour_slider = createSlider(0, 255, 0);
  colour_slider.position(20,20);

  //creating a slider to change the size of the circles
  size_slider = createSlider(0,100,50);
  size_slider.position(180,20);

  //creating 3 circle objects
  circle1 = new Circle(100,0,0);
  circle2 = new Circle(100,0,100);
  circle3 = new Circle(100,0,200);
}

function draw(){
  background(242);
  //adding text labels to the sliders
  fill(0);
  stroke(0)
  text("circle colour",35,45);
  text("circle size",203,45)
  textSize(15);

  circle1.move();
  circle1.show();
  circle2.move();
  circle2.show();
  circle3.move();
  circle3.show();
  time = time + 0.5
}

function mousePressed() {
  circle1.clicked(mouseX,mouseY)
}