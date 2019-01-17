<h1>Circle Shifts</h1>
I have adapted a sketch from openprocessing.org called CircleShifts: https://www.openprocessing.org/sketch/425051 [GitHub Pages] using the Creative Commons Attribution ShareAlike (https://pages.github.com/) liscence.

<h2>Explanation of example</h2>
The sketch starts with 3 circles moving in a cyclical pattern at different stages in the oscillation. The user is able to change the colour and size of these circles using the sliders to the left of the page. They are also able to change the speed of the circles via the arrows on the input box. Hovering over a circle with the cursor will change the colour of that circle to a darker shade. Clicking on a circle will make the circle bounce around the screen and clicking on the same circle again will change it's direction. Other features include a text box input that allows the user to add multiple circles and a reset button that returns the sketch to it's original state. 

<h2>Javascript circle class</h2>

<h5>constructor(x,y,i)</h5>
<p>The parameters (x,y,i) are passed into the constructor method when a new circle object is initialised. x and y are the (x,y) co-ordinates of the object and i is the stage that the circle is in oscillation.</p>

<h5>move()</h5>
<p>The move method is called every time the 'draw()' function is run, this makes it seem as if the circle objects are constantly moving. In this method, the (x,y) co-ordinates are altered until the circle finishes an oscillation, if so then the oscillation begins again.</p>

``` javascript  
this.x = cos(radians(this.i)) * sizeSlider + 900 / 2;
this.y = sin(radians(this.i)) * (sizeSlider*2) + 750 / 2;
this.w = (sin(radians(time + this.i)) * (sizeSlider*4));
```

<h5>show(colourSlider)</h5>
The method is responsible for drawing the circle objects to the screen using the built-in `stroke`, `fill` and `ellipse` functions. Variable w is the width of the circle object. The value of 'colourSlider' is passed in as a parameter, this is obtained when the user moves the HTML slider with id `colour`.

``` javascript
stroke(colourSlider, 255, this.brightness);
fill(colourSlider, 255, this.brightness, 127);
ellipse(this.x,this.y,this.w,this.w);
```

<h5>hover(x,y)</h5>
The parameters x and y are the (x,y) co-ordinates of the mouse cursor, variable 'd' is created using these variables and determines how far away the cursor is from any given circle object. If the mouse cursor is within the boundaries of a circle then the brightness of the circle is changed to 180 which changes the darkness of the circle.

``` javascript
let d = dist(x,y,this.x,this.y);
if (d < this.w/2) {
  this.brightness = 180;
  this.show();
}
```

<h5>clicked(x,y)</h5>
This method is called whenever the user presses their mouse. Again, variable 'd' is calculated to see if the user has clicked a circle object. If so the circle will bounce around the screen, this is done by setting the attribute 'bouncing' to be true and this attribute is then used in the draw() function to decide whether to run the bounce() method or not.

[Code reference](https://www.youtube.com/watch?v=TaN5At5RWH8&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=29)

<h5>bounce()</h5>
The method adds a value onto the (x,y) co-ordinates of a circle object (this value is determined by the speed) which then makes the circle move continually in one direction.  until it reaches a screen boundary, at whihc point a number. I have included a series of 'if statements' that check whether a circle has reached any screen boundary, if so then the direction of the object is changed accordingly. 

[Code reference](https://www.youtube.com/watch?v=Kp070rI_G48)
 
``` javascript
this.x = this.x + (this.circledirectionx * speedNumber);
this.y = this.y + (this.circledirectiony * speedNumber);
this.w = sizeSlider*4;

if (this.x < 0) { //off the left of the screen
  this.circledirectionx = this.circledirectionx * -1;
}
```

<h5>bounceagain()</h5>
When the user presses a circle that is already bouncing, this method changes the varible "circledirectionx" or "circledirectiony" so that the circle changes it's direction. The variable 'randomItem' is set to equal either 1 or -1 through using the Math.floor and Math.random() functions.

``` javascript
var random = [1, -1]
var randomItem = random[Math.floor(Math.random()*random.length)]
```

<h2> Javascript Functions</h2>

<h5>addcircles()</h5>
This function creates a number of circle objects according to the number the user inputs in the text box. The number of circles the user would want to create is not known in advance, therefore the objects need to be generated dynamically using a for loop that I found on a [Codecademy:](https://www.codecademy.com/en/forum_questions/51068e93f73ad4947a005629) forum. The function runs the loop n number of times and generates random (x,y) co-rdinate values for each new circle object, each circle is also added to the `Circle` array so that it can be drawn to the screen.

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

<h5>draw()</h5>
The HTML input elements that allow the user to alter the colour, size and speed of the circles are drawn to the screen.

``` javascript
colourSlider = document.getElementById('colour').value;
sizeSlider = document.getElementById("size").value;
speedNumber = (document.getElementById("speed").value)/2;
``` 

<h5>mousePressed()</h5>
This function is called every time the user presses their mouse. The clicked() method is run inside this function to establish whether the user has pressed a circle object or not. 

<h2> HTML elements</h2>

<h5>Layout</h5>
Using CSS, I created box with id 'box1', this box sits on the left of the webpage and contains the sliders, text inputs and buttons that allow the user to control the attributes of the circle objects.

<h5>Sliders</h5>
I have used two sliders to alter the colour and size of the circles, these sliders have been created using form controls and by referencing the CSS 'slider' class, which estabishes the formatting of the HTML sliders. 
[Code reference:](https://www.w3schools.com/howto/howto_js_rangeslider.asp)

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

<h5>Input Range Object</h5>
For the speed of the circles, I created a HTML DOM Input Range Object that allows the user to select any speed from 1 to 10 using the size arrows. I decided this was preferable to a simple text box as the minimum and maximum values can be defined. 

<h5>Input Button Object</h5>
The user can return the sketch to it's original state by pressing the 'reset' button. When this button is pressed, the reset() function in the index.js file is run.

<h5>Input Text Object</h5>
The user is able to use this text box to input a value, the 'addcircles()' function in index.js is then run which draws the appropriate number of new circles to the screen.