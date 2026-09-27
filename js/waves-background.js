var canvas = document.getElementById('waves');
paper.install(window);
paper.setup(canvas);

var h = window.innerHeight,
    w = window.innerWidth,
    horizon = h / 2,
    pathCounts = 13,
    pathPoints = 15,
    strokeWidth = 1.5,
    strokeColor = '#c6c9cc',
    fillColor = 'rgb(0, 0, 0)',
    speed = 0.1,
    offset = 7,
    frequency = [0, -30, 50, -50, -35, 35, 0, -30, 50, -50, -35, 35, -30, 50, -50, -35, 35],
    delay = 4,
    mousePos = view.center / 2,
    path = [];

initializePath();

function initializePath() {
  h = window.innerHeight;
  w = window.innerWidth;
  horizon = h * 0.7;
  
  //clear
  paper.project.activeLayer.removeChildren();
  
  for (i = 0; i < pathCounts; i++) {
    path[i] = new paper.Path();

    path[i].add(new paper.Point(-10, h));
    path[i].add(new paper.Point(-10, horizon));

    for (var p = 0; p < pathPoints - 1; p++) {
      height =
        path[i].add(new paper.Point(w / (pathPoints - 1) * p + p, horizon + frequency[p]));
    }
    
    path[i].add(new paper.Point(w + 10, horizon));
    path[i].add(new paper.Point(w + 10, h));

    path[i].strokeWidth = strokeWidth;
    path[i].strokeColor = strokeColor;
    
    if (i == 0) {
      path[i].fillColor = 'rgb(0, 0, 0)';
    }
    
    path[i].smooth();
  }  
}
// paper.view.draw();

view.onFrame = function(event) {
  for (p = 0; p < pathCounts; p++) {
    for (s = 0; s < pathPoints; s++) {
      // skip first two points because they are the base of the path
      var value = (s % 2) ? -1 : 1;
      var segment = path[p].segments[2 + s];
      segment.point.y = horizon + ((Math.sin((event.time + s * delay) * speed)) * (frequency[s] * value + (p * offset * value)));
    }
  }
}

window.onresize = function(event) {
  initializePath();
}