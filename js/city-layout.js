function toggleCityLights(scrollWhenDone) {
  var nodes = structures.slice(),
      next = function (array, index) {
        if (index < array.length) {
          if (array[index] instanceof Array) {
            array[index].forEach(function (building, ind, arr) {
              if (ind === arr.length - 1) {
                return building.toggleLights(function () {next(array, index+1);});
              }
              return building.toggleLights();
            });
          } else {
            array[index].toggleLights(function () {next(array, index+1);});
          }
        }
      };

  if (scrollWhenDone) {
    nodes.push({
      toggleLights: function (cb) {
        $('a[href=#about]').click();
      }
    });
  }
  return next(nodes, 0);
}


var structures = [];

structures.push([
  createBuilding(380, 50, 50, 50, 30, {
    color:'#E6AF9C'
  }).drag()
]);
structures.push([
  createBuilding(250, 50, 110, 80, 30, {
    color: '#761617',
    roofColor: '#a29e92'
  }),
  createBuilding(180, 50, 50, 50, 100, {
    color: '#DEDEDE'
  }),
  createBuilding(180, 110, 50, 50, 130)
]);

structures.push(createStreetlamp(175, 165));

structures.push([
  createBuilding(80, 110, 50, 50, 90, {
    color: '#910022',
    roofColor: '#c8c8a6'
  }),
  createBuilding(20, 50, 110, 50, 50, {
    color: '#d9d9d9',
    roofColor: '#bababa'
  })
]);

structures.push([
  createStreetlamp(135, 165),
  createStreetlamp(5, 165)
]);

structures.push([
  createBuilding(270, 210, 100, 60, 70, {
    color: '#9adfbc',
  }),
  createBuilding(230, 210, 100, 40, 50, {
    color: '#8abd3f',
    roofColor: '#c8c8a6'
  }),
  createBuilding(180, 210, 100, 50, 90, {
    color: '#78bebf',
    roofColor: '#bababa'
  })
]);

structures.push([
  createStreetlamp(175, 205),
  createStreetlamp(175, 315),
  createStreetlamp(335, 315)
]);

structures.push([
  createBuilding(70, 210, 100, 60, 80, {
    color: '#cc7b49',
    roofColor: '#c8c8a6'
  }),
  createBuilding(10, 210, 100, 60, 60, {
    color: '#d24e3a',
    roofColor: '#c8c8a6'
  })
]);

structures.push([
  createStreetlamp(5, 205)
]);

