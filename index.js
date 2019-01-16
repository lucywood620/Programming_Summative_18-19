var time = 0;
let circle1;
let circle2;
let circle3;
let circle4;
let colour_slider;
let size_slider;
let speed_slider;
let circles = []


class Circle{
  constructor(x,y,i) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.i = i;
    this.brightness = 255;
    this.circledirectionx = 2;
    this.circledirectiony = -2;
    this.circlespeed = 4;
    this.bouncing = false;
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
    stroke(colour_slider.value(), 255, this.brightness);
    fill(colour_slider.value(), 255, this.brightness, 127);
    ellipse(this.x,this.y,this.w,this.w);
  }

  hover(x,y){
    let d = dist(x,y,this.x,this.y)
    if (d < this.w/2) {
      this.brightness = 180
      this.show()
    }
  }

  clicked(x,y){
    let d = dist(x,y,this.x,this.y)
    if (d < this.w/2) {
      if (this.bouncing == false) {
        this.bouncing = true; 
      }
      else {
        this.bouncing = false;
      }
      //credit: https://www.youtube.com/watch?v=TaN5At5RWH8&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=29
    }
  }

  bounce(){
    //credit: https://www.youtube.com/watch?v=Kp070rI_G48
    this.x = this.x + (this.circledirectionx * this.circlespeed);
    this.y = this.y + (this.circledirectiony * this.circlespeed);
    this.w = size_slider.value()*4;
    this.w = abs(this.w);

    if (this.x < 0) { //off the left of the screen
      this.circledirectionx = this.circledirectionx * -1;
    }
    if (this.x > windowWidth) { //off the right of the screen
      this.circledirectionx = this.circledirectionx * -1;
    }
    if (this.y < 0) { //off the top  of the screen
      this.circledirectiony = this.circledirectiony * -1;
    }
    if (this.y > windowHeight) { //off the bottom of the screen
      this.circledirectiony = this.circledirectiony * -1;
    }
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

  //creating 3 circle objects and adding them to an array
  circle1 = new Circle(100,0,0);
  circles.push(circle1);
  circle2 = new Circle(100,0,100);
  circles.push(circle2);
  circle3 = new Circle(100,0,200);
  circles.push(circle3);
  circle4 = new Circle(10,0,10);

}

//slider for speed
//reset button
//move starting position of sliders and balls
//make an instruction side page about how to use elements
//make sliders html elements

//credit for sliders: https://www.w3schools.com/howto/howto_js_rangeslider.asp

function draw(){
  background(242);
  //adding text labels to the sliders
  fill(0);
  stroke(0)
  text("circle colour",35,45);
  text("circle size",203,45)
  textSize(15);

  for (let i = 0; i < circles.length; i++) {
    circles[i].hover(mouseX,mouseY);
    circles[i].show();
    //if the circle has been clicked and is meant to be bouncing then run the bounce function
    if (circles[i].bouncing == true) {
      circles[i].bounce()
    }
    //otherwise the circle will continue to move in a circle as normal
    else {
      circles[i].move();
    }
  }  
  time = time + 0.5
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].clicked(mouseX,mouseY);
  }
}