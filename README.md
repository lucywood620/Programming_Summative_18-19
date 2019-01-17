//need to do liscencing
<h1>Circle Shifts</h1>
I have adapted a sketch from openprocessing.org called CircleShifts: https://www.openprocessing.org/sketch/425051

<h2>Javascript Circle class</h2>
<p>I have one class in my Javascript code, called the `Circle` class. The constructor method is called when initialising a new class object, the parameters (x,y,i) are passed into the constructor which  are the (x,y) co-ordinates of the circle's starting point and i is the stage 
that the circle is at in oscillation.</p>

``` javascript
class Circle {
  constructor(x,y,i)
```

<h5>move()</h5>
<p>The move method is called every time the 'draw()' function is ran so that it looks as if all the objects that belong to the circle class are constantly moving in a circle. The x and y positions are continually changed until the circle reaches the end of the oscillation, if so then the movement starts again. This method utilises the code from the original sketch:</p>

``` javascript  
this.x = cos(radians(this.i)) * sizeSlider + 900 / 2;
this.y = sin(radians(this.i)) * (sizeSlider*2) + 750 / 2;
this.w = (sin(radians(time + this.i)) * (sizeSlider*4));
```

<h5>show()</h5>
This method is rather self explanitory, the circle style is established by using the built-in stroke and fill functions, the circle is then drawn to the screen using the built-in ellipse function. Variable w is the current width of a given circle object. The variable 'colourSlider' is passed into this method so that the colour determined by the user from the HTML slider can be used by the method.

``` javascript
stroke(colourSlider, 255, this.brightness);
fill(colourSlider, 255, this.brightness, 127);
ellipse(this.x,this.y,this.w,this.w);
```

<h5>hover()</h5>
After passing in the (x,y) co-ordinates of the mouse cursor, a variable 'd' is created to determine how far away the cursor is from any given circle object. If the mouse cursor is within the boundaries of a given circle (i.e. if the user is hovering over one of the circles) then the brightness of the circle is changed to 180 which changes the darkness of the circle.

``` javascript
let d = dist(x,y,this.x,this.y);
if (d < this.w/2) {
  this.brightness = 180;
  this.show();
}
```

<h5>clicked()</h5>
The mousedpressed() function below is run anytime the user clicks their computer mouse, the clicked method is called in that function and is also therefore run for every circle object whenever the user presses their mouse. Again the variable 'd' is calculated to see if the user has pressed their mouse in the same (x,y) co-ordinates of a given circle (i.e. if the user has clicked on a circle). If the user did click a given circle object, then the circle should start to bounce around the screen, this is a feature that I have added to the sketch that was not in the original code. To make a circle object bounce, the attribute 'bouncing' is set to be true, this will be used in the draw function to determine whether a given circle object should be oscillating or bouncing. 
[Code reference](https://www.youtube.com/watch?v=TaN5At5RWH8&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=29)

<h5>bounce()</h5>
This method is called when the attribute 'bouncing' is set to 'true', i.e. the user has clicked on a circle and so that circle should start to bounce around the screen instead of moving in oscillation like at the start. The method adds a value onto the x and y co-ordinates of a circle object (this value is determined by the speed) which then makes the circle move continually in one direction on the screen.  
 
``` javascript
this.x = this.x + (this.circledirectionx * speedNumber);
this.y = this.y + (this.circledirectiony * speedNumber);
this.w = sizeSlider*4;
```
There are a series of 'if statements' included in this method to check whether a circle has reached the window boundaries, if so then the direction of the object is changed accordingly. An example of one of the if statements can be seen here:

``` javascript
if (this.x < 0) { //off the left of the screen
  this.circledirectionx = this.circledirectionx * -1;
}
```
[Code reference:](https://www.youtube.com/watch?v=Kp070rI_G48)

<h5>bounceagain()</h5>
When the user first clicks a circle, it stops oscillating and begins to bounce around the screen. When the user presses the same circle a second or third time etc. the circle changes it's direction and begins to move another way, this is all due to this 'bounceagain' method. A variable 'randomItem' is initialised and set to equal a random item from the array 'random' by using the Math.floor and Math.random() functions that are recognised by Javascript.

``` javascript
var random = [1, -1]
var randomItem = random[Math.floor(Math.random()*random.length)]
```

<h2> Javascript Functions</h2>

<h5> addcircles()</h5>
This function initialises a certain number of circle objects depending on the number inputted by the user in the HTML text box. I needed to generate object names dynamically as I didn't know how many circles the user would want to create in advance. To do this I used a for loop that I found on a [Codecademy:](https://www.codecademy.com/en/forum_questions/51068e93f73ad4947a005629) forum. The function runs the loop n number of times and generates random (x,y) co-rdinate values for each new circle object, each circle is also added to the `Circle` array so that it can be drawn to the screen.

``` javascript
for (var i = 0; i < number; i++) {
  var randomx = Math.floor(Math.random() * 900);
  var randomy = Math.floor(Math.random() * 750);
  circle[i] = new Circle(randomx,randomy,0);
  circle[i].bouncing = true;
  circles.push(circle[i]);
}
```

<h5>reset()</h5>
Resets the sketch by removing all the circles the user may have added and returning the original 3 circles to their starting positions.  

<h5>speedFunction()</h5>
Changes the variable `speed` of all the objects in the circle class when the HTML range input is used.

<h5>setup()</h5>
A canvas is created and 3 instances of the circle class are initialised and added the the `Circles` array.
function setup(){

<h5>draw()</h5>
The HTML input elements that allow the user to alter the colour, size and speed of the circles are drawn to the screen.

``` javascript
  colourSlider = document.getElementById('colour').value;
  sizeSlider = document.getElementById("size").value;
  speedNumber = (document.getElementById("speed").value)/2;
``` 

<h5>mousePressed()</h5>
The mousePressed() function is called every time a mouse button is pressed. When running this function the clicked() method is run to see if the mouse pressed occured within the boundary of any circle object.

<h2> HTML elements</h2>

<h5>Layout</h5>
Using CSS, I created the box1 id, this box sits on the left of the webpage and contains the sliders, text inputs and button allowing the users to alter the circle attributes.

<h5>Sliders</h5>
The CSS class 'slider' establishes the formatting of the HTML sliders. Code reference: https://www.w3schools.com/howto/howto_js_rangeslider.asp

``` css
.slider {
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: white;
    outline: none;
    opacity: 0.7;
}
``` 
I have used two sliders to alter the colour and the size of the circle objects. I created these sliders by using a form and referencing the 'slider' class from the style sheet. 

<h5>Input Range Object</h5>
For the speed of the circles, I created a HTML DOM Input Range Object that allows the user to select any speed from 1 to 10 using the arrows on the size of the range object. I decided that this was a better solution than a text box as I can easily bound the speed by minimum and maximum values.

<h5>Input Button Object</h5>
The user can return the sketch to it's stating state by pressing the 'reset' button. When this button is pressed, the reset() function in the index.js file is run.

<h5>Input Text Object</h5>
The user is able to input any number of circles that will be drawn to the screen by runnign the 'addcircles()' function in index.js.