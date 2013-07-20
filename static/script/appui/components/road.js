require.def('sampleapp/appui/components/road',
    [
        'antie/widgets/container',
        'sampleapp/appui/components/carfactory'
    ],
    function (Container, CarFactory) {
        'use strict';

        return Container.extend({
            init: function () {
                this._super("road");

                var device = this.getCurrentApplication().getDevice();

                for (var i = 1; i < 6; i++) {
                    var lane = new Container("lane" + i);
                    lane.addClass("lane");
                    
                    var alternateColoursClass = (i % 2 === 0) ? "evenLane" : "oddLane";
                    lane.addClass(alternateColoursClass);
                    
                    this.appendChildWidget(lane);
                }
            },
            
            getCars: function (laneNumber) {
                var lane = this._getLane(laneNumber);
                if (lane) {
                    return lane.getChildWidgets();
                } else {
                    return [];
                }
            },
            
            createCars: function (carFrequencyFn) {
                var carFactory = new CarFactory();
                
                var lanes = this._getLanes();
                
                for (var laneNumber = 0; laneNumber < lanes.length; laneNumber++){
                    var direction = (laneNumber % 2 === 0) ? "left" : "right";
                    carFactory.createCars(lanes[laneNumber], direction, carFrequencyFn);
                }
            },
            
            _getLanes: function () {
                return this.getChildWidgets();
            },
            
            _getLane: function (laneNumber) {
                var laneName = "lane" + laneNumber;
                return this.getChildWidget(laneName);
            }
        });
    });

