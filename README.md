<h2>Circle class</h2>
I have one class in my Javascript code, called the 'Circle' class. The constructor method is called when initialising a new class object, the parameters (x,y,i) are passed into the constructor which  are the (x,y) co-ordinates of the circle's starting point and i is the stage 
that the circle is at in oscillation.
```javascript
class Circle{
  constructor(x,y,i) {
}
```

<h5>move()</h5>
The move method is called every time the 'draw()' function is ran so that it looks as if all the objects that belong to the circle class are constantly moving in a circle. The x and y positions are continually changed until the circle reaches the end of the oscillation, if so then the movement starts again. The code used in this code utilises the code from the original sketch that I am adapting:

```javascript  
this.x = cos(radians(this.i)) * sizeSlider + 900 / 2;
this.y = sin(radians(this.i)) * (sizeSlider*2) + 750 / 2;
this.w = (sin(radians(time + this.i)) * (sizeSlider*4));
this.w = abs(this.w);
```

<h5>show()</h5>
This method is rather self explanitory, the circle style is established by using the built-in stroke and fill functions, the circle is then drawn to the screen using the built-in ellipse function. Variable w is the current width of a given circle object. The variable 'colourSlider' is passed into this method so that the colour determined by the user from the HTML slider can be used by the method.
```javascript
show(colourSlider) {
  stroke(colourSlider, 255, this.brightness);
  fill(colourSlider, 255, this.brightness, 127);
  ellipse(this.x,this.y,this.w,this.w);
}
```

<h5>hover()</h5>
After passing in the (x,y) co-ordinates of the mouse cursor, a variable 'd' is created to determine how far away the cursor is from any given circle object. If the mouse cursor is within the boundaries of a given circle (i.e. if the user is hovering over one of the circles) then the brightness of the circle is changed to 180 which changes the darkness of the circle.
```javascript
hover(x,y){
  let d = dist(x,y,this.x,this.y)
  if (d < this.w/2) {
    this.brightness = 180
    this.show()
  }
}
```

<h5>clicked()</h5>
The mousedpressed() function below is run anytime the user clicks their computer mouse, the clicked method is called in that function and is also therefore run for every circle object whenever the user presses their mouse. Again the variable 'd' is calculated to see if the user has pressed their mouse in the same (x,y) co-ordinates of a given circle (i.e. if the user has clicked on a circle). If the user did click a given circle object, then the circle should start to bounce around the screen, this is a feature that I have added to the sketch that was not in the original code. To make a circle object bounce, the attribute 'bouncing' is set to be true, this will be used in the draw function to determine whether a given circle object should be oscillating or bouncing. 
[Code reference](https://www.youtube.com/watch?v=TaN5At5RWH8&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=29)

<h5>bounce()</h5>
This method is called when the attribute 'bouncing' is set to 'true', i.e. the user has clicked on a circle and so that circle should start to bounce around the screen instead of moving in oscillation like at the start. The method adds a value onto the x and y co-ordinates of a circle object (this value is determined by the speed) which then makes the circle move continually in one direction on the screen.  
 ```javascript
this.x = this.x + (this.circledirectionx * speedNumber);
this.y = this.y + (this.circledirectiony * speedNumber);
this.w = sizeSlider*4;
this.w = abs(this.w);
```
There are a series of 'if statements' included in this method to check whether a circle has reached the window boundaries, if so then the direction of the object is changed accordingly. An example of one of the if statements can be seen here:
 ```javascript
if (this.x < 0) { //off the left of the screen
  this.circledirectionx = this.circledirectionx * -1;
}
```
[Code reference:](https://www.youtube.com/watch?v=Kp070rI_G48)

<h5>bounceagain()</h5>
When the user first clicks a circle, it stops oscillating and begins to bounce around the screen. When the user presses the same circle a second or third time etc. the circle changes it's direction and begins to move another way, this is all due to this 'bounceagain' method. A variable 'randomItem' is initialised and set to equal a random item from the array 'random' by using the Math.floor and Math.random() functions that are recognised by Javascript.
 ```javascript
var random = [1, -1]
var randomItem = random[Math.floor(Math.random()*random.length)]
```

<h1>Functions</h1>


function addcircles() {
  var number = document.getElementById("addnew").value;
  var circle = new Circle(0,0,0);
  for (var i = 0; i < number; i++) {
    var randomx = Math.floor(Math.random() * 900);
    var randomy = Math.floor(Math.random() * 750);
    console.log(i)
    circle[i] = new Circle(randomx,randomy,0);
    circle[i].bouncing = true;
    circles.push(circle[i]);
  }
[I'm an inline-style link](https://www.codecademy.com/en/forum_questions/51068e93f73ad4947a005629)

}

function reset() {
  circles = []
  setup()
}  

function speedFunction() {
  speed = document.getElementById("myNumber").value;
  document.getElementById("demo").innerHTML = x;
}

function setup(){
  canvas = createCanvas(900, 750);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  background(255, 0, 200);

  colorMode(HSB, 255);
  //creating 3 circle objects and adding them to an array
  circle1 = new Circle(0,0,0);
  circles.push(circle1);
  circle2 = new Circle(100,0,100);
  circles.push(circle2);
  circle3 = new Circle(100,0,200);
  circles.push(circle3);
}

function draw(){
  background(242);
  colourSlider = document.getElementById('colour').value;
  sizeSlider = document.getElementById("size").value;
  speedNumber = (document.getElementById("speed").value)/2;

  for (let i = 0; i < circles.length; i++) {
    circles[i].hover(mouseX,mouseY);
    circles[i].show(colourSlider);
    if (circles[i].bouncing == true) {
      circles[i].bounce()
    }
    else {
      circles[i].move();
    //if the circle has been clicked and is meant to be bouncing then run the bounce 
    //function, otherwise the circle will continue to move in a circle as normal
    }
  }  
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].clicked(mouseX,mouseY);
  }
}










I have adapted a sketch from openprocessing.org called CircleShifts which can be found here: https://www.openprocessing.org/sketch/425051
liscencing remember!
Example of a good documentation: https://devdocs.io/javascript/

The circle class has 3 parametres that are passed into the constructor when a new circle object is created. 




-----------------------

function reset() {
  var x = 100;
  var y = 100;
  for (let i = 0; i < circles.length; i++) {
    circles[i].x = x
    circles[i].y = y
     x = x + 100
     y = y + 100
     circles[i].bouncing = false;
  }
}  

function speedFunction() {
  speed = document.getElementById("myNumber").value;
  document.getElementById("demo").innerHTML = x;
}

function setup(){
  canvas = createCanvas(900, 750);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  background(255, 0, 200);

  colorMode(HSB, 255);
  //creating 3 circle objects and adding them to an array
  circle1 = new Circle(0,0,0);
  circles.push(circle1);
  circle2 = new Circle(100,0,100);
  circles.push(circle2);
  circle3 = new Circle(100,0,200);
  circles.push(circle3);
}

function draw(){
  background(242);
  colourSlider = document.getElementById('colour').value;
  sizeSlider = document.getElementById("size").value;
  speedNumber = (document.getElementById("speed").value)/2;

  for (let i = 0; i < circles.length; i++) {
    circles[i].hover(mouseX,mouseY);
    circles[i].show(colourSlider);
    if (circles[i].bouncing == true) {
      circles[i].bounce()
    }
    else {
      circles[i].move();
    //if the circle has been clicked and is meant to be bouncing then run the bounce 
    //function, otherwise the circle will continue to move in a circle as normal
    }
  }  
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].clicked(mouseX,mouseY);
  }
}


newcircle:
OK, if I understand you correctly, you would like to have variable names generated dynamically (i.e. at run time) rather than hard-coding them (such as obj1, obj2, etc.).

  <!--slider html credit: https://www.w3schools.com/howto/howto_js_rangeslider.asp-->
  <!--slider css credit: https://www.youtube.com/watch?v=DQAAJJxza2A-->