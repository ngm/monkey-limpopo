require.def('sampleapp/appui/components/progresspoller',
    [
        'antie/class'
    ],
    function (Class) {
        'use strict';

        return Class.extend({
            init: function (character, road, onWinDetected, onCollisionDetected) {
                this.road = road;
                this.character = character;
                this._onWinDetected = onWinDetected;
                this._onCollisionDetected = onCollisionDetected;
            },
            
            start: function () {
                var self = this;
                this._pollHandle = setInterval(function () {
                     if (self._winDetected()) {
                         self._stopPolling();
                         self._onWinDetected();
                     }
                     else if (self._collisionDetected()) {
                         self._stopPolling();
                         self._onCollisionDetected();
                    }
                }, 60);
            },
            
            _stopPolling: function () {
                clearInterval(this._pollHandle);
            },
            
            _collisionDetected: function () {
                var characterLeft = window.device.getElementOffset(this.character.outputElement).left;
                var characterRight = window.device.getElementSize(this.character.outputElement).width + characterLeft;
                
                var cars = this.road.getCars(this.character.laneNumber);
                
                for (var i = 0; i < cars.length; i++) {
                    if (this._characterIntersectsCar(characterLeft, characterRight, cars[i])) {
                        return true;
                    }
                }
                
                return false;
            },
            
            _characterIntersectsCar: function (characterLeft, characterRight, car) {
                var carLeft = window.device.getElementOffset(car.outputElement).left;
                var carRight = window.device.getElementSize(car.outputElement).width + carLeft;
                
                var characterLeftIntersectsCar = (characterLeft > carLeft && characterLeft < carRight);
                var characterRightIntersectsCar = (characterRight > carLeft && characterRight < carRight);
                
                if(characterLeftIntersectsCar || characterRightIntersectsCar) {
                    return true;
                }
                
                return false;
            },
            
            _winDetected: function () {
                return (this.character.laneNumber === 0 );
            }
        });
    });
