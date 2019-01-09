var time = 0;
var col;
let circle1;
let circle2;
let circle3;
let slider;

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
    this.x = cos(radians(this.i)) * 50 + windowWidth / 2;
    this.y = sin(radians(this.i)) * 100 + windowHeight / 2;
    this.w = (sin(radians(time + this.i)) * 200);
    this.w = abs(this.w);
  }

  show() {
    stroke(slider.value(), 255, 255);
    fill(slider.value(), 255, 255, 127);
    ellipse(this.x,this.y,this.w,this.w);
  }

}

function setup(){
  createCanvas(windowWidth, windowHeight);
  // hue, saturation, and brightness
  colorMode(HSB, 255);
  // slider has a range between 0 and 255 with a starting value of 0
  slider = createSlider(0, 255, 0);
  //positioning the slider in the top left hand corner
  slider.position(20,20);

  //creating 3 circle objects
  circle1 = new Circle(100,0,0);
  circle2 = new Circle(100,0,100);
  circle3 = new Circle(100,0,200);
}

function draw(){
  background(242);

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