require.def('sampleapp/appui/components/car',
    [
        'antie/widgets/container',
        'antie/events/keyevent'
    ],
    function(Container, KeyEvent) {
        'use strict';
    
        return Container.extend({
            init : function(lane, carClass) {
                this._super();
                this._lane = lane;
                this.addClass("car");
                this.addClass(carClass);
            },
            
            setPosition: function (position) {
                window.device.setElementPosition(this.outputElement, position);
            },
            
            goLeft: function (endPosition) {
                this.addClass("left");
                this._go(endPosition);
            },
            
            goRight: function (endPosition) {
                this.addClass("right");
                this._go(endPosition);
            },
            
            _go: function (endPosition) {
                var self = this;
    
                window.device.moveElementTo({
                    el : this.outputElement,
                    to : endPosition,
                    easing : 'linear',
                    duration : 8000,
                    onComplete : function() {
                        self._lane.removeChildWidget(self);
                    }
                });
            }
    });
});
