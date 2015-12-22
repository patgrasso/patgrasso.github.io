function delayColor(nodes, color, delayTime, cb) {
  delayTime = delayTime || 250;
  var next = function (index) {
    if (index < nodes.length) {
      nodes[index].attr('fill', color);
      return setTimeout(function () { next(index + 1); }, delayTime);
    }
    return (cb instanceof Function) && cb.call();
  };
  return next(0);
}


var s = Snap('#city');

var lightUID = (function () {
  var uid = 0;

  return function () {
    uid += 1;
    return uid;
  };
})();


function addWindows(group, length, width, height, context) {
  var i, j, lights = [], curr;

  context = context || s;

  for (i = 0; i < height/20 - 1; i += 1) {
    for (j = 0; j < length / 10; j += 1) {
      if (Math.random() < 0.4) {
        curr = context.rect(0, 0, 5, 5).attr({
          id: 'light-' + lightUID(),
          fill: 'black',
          transform: 'translate(' + (i*10 + 5) + ', ' + (j*10-i*10-2) + ') skewY(-45)'
        });
        lights.push(curr);
        group.add(curr);
      }
    }

    for (j = 0; j < width / 10; j += 1) {
      if (Math.random() < 0.4) {
        curr = context.rect(0, 0, 5, 5).attr({
          id: 'light-' + lightUID(),
          fill: 'black',
          transform: 'translate(' + (10 + j*10 + i*10) + ', ' + (length-7-i*10) + ') skewX(-45)'
        });
        lights.push(curr);
        group.add(curr);
      }
    }
  }

  return lights;
}

function createStreetlamp(x, y, angle, options) {
  var lamp, light, height, g, lightStatus = 0;

  options = options || {};
  context = options.context || s;
  height  = options.height || 15;

  g = context.gradient('r(0.5, 0.5, 0.2)#ecf0f1-rgba(255, 255, 255, 0)');

  angle = Math.PI * (angle / 180);

  lamp = context.group(
    context.line(x, y, x+height, y-height).attr({
      stroke: '#7f8c8d',
      'stroke-width': 3,
      'stroke-linecap': 'round'
    }),
    context.circle(0, 0, 3).attr({
      transform: 'translate(' + (x+height+3) + ', ' + (y-height-3) + ') skewX(-30)',
      fill: 'none',
      stroke: 'white'
    })
  );

  light = context.circle(x+height+3, y-height-3, 50).attr({
    fill: 'none'
  });

  return {
    lightsOn: function (cb) {
      lightStatus = 1;
      light.attr('fill', g);
      return (cb instanceof Function) && cb.call();
    },
    lightsOff: function (cb) {
      lightStatus = 0;
      light.attr('fill', 'none');
      return (cb instanceof Function) && cb.call();
    },
    toggleLights: function (cb) {
      if (lightStatus === 1) {
        this.lightsOff(cb);
      } else {
        this.lightsOn(cb);
      }
    }
  };
}

function createBuilding(x, y, length, width, height, options) {
  options = options || {};

  var building, lights, lightStatus = 0,
      sideColor = options.color || '#7f8c8d',
      r     = parseInt(sideColor.slice(1, 3), 16) + 20,
      g     = parseInt(sideColor.slice(3, 5), 16) + 20,
      b     = parseInt(sideColor.slice(5), 16) + 20,
      roofColor = options.roofColor ||
        '#' + r.toString(16) + g.toString(16) + b.toString(16);
  //'#95a5a6'
  context = options.context || s;
  height = height / 2;

  building = context.group(
    context.rect(height, -height, width, length).attr({
      fill: roofColor,
      stroke: 'black',
      'stroke-width': '0.2'
    }),

    context.rect(0, 0, height, length).attr({
      transform: 'translate(0, ' + 0 + ') skewY(-45)',
      fill: sideColor,
      stroke: 'black',
      'stroke-width': '0.2'
    }),

    context.rect(0, 0, width, height).attr({
      transform: 'translate(' + height + ', ' + (length-height) + ') skewX(-45)',
      fill: sideColor,
      stroke: 'black',
      'stroke-width': '0.2'
    })
  );

  lights = addWindows(building, length, width, height*2);

  building.attr({
    transform: 'translate(' + x + ', ' + y + ')'
  });

  return {
    building: building,
    drag: function () {
      building.drag();
      return this;
    },
    lightsOn: function (cb) {
      lightStatus = 1;
      delayColor(lights, 'yellow', 15, cb);
    },
    lightsOff: function (cb) {
      lightStatus = 0;
      delayColor(lights, 'black', 15, cb);
    },
    toggleLights: function (cb) {
      if (lightStatus === 1) {
        this.lightsOff(cb);
      } else {
        this.lightsOn(cb);
      }
    }
  };
}



$('#btn-welcome').on('click tap', function () {
  toggleCityLights();
});
