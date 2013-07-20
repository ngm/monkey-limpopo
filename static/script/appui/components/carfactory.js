require.def('sampleapp/appui/components/carfactory',
    [
        'antie/class',
        'sampleapp/appui/components/car'
    ],
    function (Class, Car) {
        'use strict';

        var carClasses = [ "yellowcar", "yellowcar", "redcar", "redcar",
                           "bluecar", "bluecar", "bulldozer", "fireengine" ];
        
        return Class.extend({
            init: function () {
                this._rightEdge = window.layout.requiredScreenSize.width;
                this._leftEdge = -160;
            },
            
            createCars: function (lane, direction, carFrequencyFn) {
                var self = this;
                setTimeout(function () {
                    self._createCar(lane, direction);
                    self.createCars(lane, direction, carFrequencyFn);
                }, carFrequencyFn());
            },
            
            _createCar: function (lane, direction) {
                var randomValue = Math.floor(Math.random() * carClasses.length);
                var carClass = carClasses[randomValue];
                
                var newCar = new Car(lane, carClass);
                lane.appendChildWidget(newCar);

                var laneHeight = window.layout.metrics.lane.height;
                var carHeight = window.device.getElementSize(newCar.outputElement).height;
                
                var top = (laneHeight - carHeight) / 2;
                
                if(direction == "left"){
                    newCar.setPosition({left: this._rightEdge, top: top});
                    newCar.goLeft({left: this._leftEdge, top: top});
                } else {
                    newCar.setPosition({left: this._leftEdge, top: top});
                    newCar.goRight({left: this._rightEdge, top: top});
                }
            }
        });

    });