var xMin = 0;
var xMax = 500;
var yMin = 0;
var yMax = 500;

var blueNote, redNote, purpleNote, greenNote, pinkNote;


//Create All Your Available Notes
soundManager.setup({
  url: '/path/to/swf-files/',
  onready: function() {
    blueNote = soundManager.createSound({
      id: 'aSound',
      url: 'piano/Piano11.mp3'
    });
    redNote = soundManager.createSound({
      id: 'aSound',
      url: 'piano/Piano12.mp3'
    });
    purpleNote = soundManager.createSound({
      id: 'aSound',
      url: 'piano/Piano13.mp3'
    });
    greenNote = soundManager.createSound({
      id: 'aSound',
      url: 'piano/Piano14.mp3'
    });
    pinkNote = soundManager.createSound({
      id: 'aSound',
      url: 'piano/Piano15.mp3'
    });
  },
  ontimeout: function() {
    console.log('TIMEOUT!')
  }
})

var circles = [];
var Circle = function(x, y, r, s, d, color){
  this.x = x;
  this.y = y;
  this.radius = r;
  this.speed = s;
  this.direction = d;
  this.fill = color;
  this.getDistance = function(circle){
    var diffX = Math.abs(this.x - circle.x);
    var diffY = Math.abs(this.y - circle.y);
    //hypotenuse
    return Math.sqrt((diffX * diffX) + (diffY * diffY))
  }
  this.isColliding = function(circle){
    return this.getDistance(circle) < this.radius + circle.radius
  }
};

var createNewCircle = function(color){
  circles.push(new Circle(50,50,10,5,[0.5,1], color));
  //mySound.play();
}


//Create new Dot on click of dot button
//NOT VERY DRY... how can you refactor this?
$('.blue').on('click', function(){
  createNewCircle('blue');
})
$('.red').on('click', function(){
  createNewCircle('red');
})
$('.purple').on('click', function(){
  createNewCircle('purple');
})
$('.green').on('click', function(){
  createNewCircle('green');
})
$('.pink').on('click', function(){
  createNewCircle('pink');
})

var updateLoop = function() {
  //iterate over the array of circles
  for (var i = 0; i < circles.length; ++i) {
    var c = circles[i];

    c.x = c.x + (c.speed * c.direction[0]);
    c.y = c.y + (c.speed * c.direction[1]);

    if (c.x > xMax - c.radius|| c.x < xMin + c.radius) {
      c.direction[0] *= -1;
      //mySound.play();
    }
    if (c.y > yMax - c.radius|| c.y < yMin + c.radius) {
      c.direction[1] *= -1;
      //mySound.play();
    }

    for (var j = 0; j < circles.length; j++) {
      if(j !== i){
        var c2 = circles[j];
        if(c.isColliding(c2)){
          c.direction[0] *= -1;
          //c.direction[1] *= -1;
          //c2.direction[0] *= -1;
          //c2.direction[1] *= -1;
         //mySound.play()
        }
      }
    };
  }
  d3.select('svg').selectAll('circle')
    .data(circles)
    .attr('r', function(d){return d.radius})
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .style('fill', function(d){return d.fill})
    .style('stroke', 'black')
    .style('stroke-width', 3)
    .enter()
    .append('circle')
};

d3.selectAll('svg')
  .style('background-color', 'pink')

updateLoop();
setInterval(updateLoop, 15);