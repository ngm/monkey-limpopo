require.def('sampleapp/appui/components/character',
    [
         'antie/widgets/button',
         'antie/events/keyevent'
    ],
    function(Button, KeyEvent) {
        'use strict';
    
        return Button.extend({
            init : function() {
                this._super("character");
                var self = this;
                
                self.moveEnabled = true;

                this.addEventListener('keydown', function(e) {
                    self._handleKeyDown(e);
                });
            },
            
            _handleKeyDown : function (e) {
                if (this.isAnimating || !this.moveEnabled) {
                    e.stopPropagation();
                    return;
                }

                var currentPosition = window.device.getElementOffset(this.outputElement);
                var elementSize = window.device.getElementSize(this.outputElement);
                
                var characterJumpDistance = window.layout.metrics.characterJumpDistance;

                var newLeft, newTop, laneNumber;

                switch (e.keyCode) {
                case KeyEvent.VK_LEFT:
                    newLeft = currentPosition.left - elementSize.width;
                    newTop = currentPosition.top;
                    laneNumber = this.laneNumber;
                    break;
                case KeyEvent.VK_RIGHT:
                    newLeft = currentPosition.left + elementSize.width;
                    newTop = currentPosition.top;
                    laneNumber = this.laneNumber;
                    break;
                case KeyEvent.VK_UP:
                    newLeft = currentPosition.left;
                    newTop = currentPosition.top - characterJumpDistance;
                    laneNumber = this.laneNumber - 1;
                    break;
                case KeyEvent.VK_DOWN:
                    newLeft = currentPosition.left;
                    newTop = currentPosition.top + characterJumpDistance;
                    laneNumber = this.laneNumber + 1;
                    break;
                }

                if (this._isValidPosition(newLeft, laneNumber)) {
                    this._moveToPosition({left: newLeft, top: newTop}, laneNumber, false);
                }
            },

            moveToStartPosition : function() {
                var characterSize = window.device.getElementSize(this.outputElement);

                var startPosition = {
                    top : window.layout.metrics.characterStart.top,
                    left : (window.layout.requiredScreenSize.width / 2) - characterSize.width
                };
                
                this._moveToPosition(startPosition, 6, true);
            },
            
            _moveToPosition : function(position, laneNumber, skipAnimation) {
                this.laneNumber = laneNumber;
                
                this.addClass("jumping");
                this.isAnimating = true;
                
                var self = this;
                
                window.device.moveElementTo({
                    el : this.outputElement,
                    to : position,
                    easing : 'linear',
                    duration : 100,
                    skipAnim: skipAnimation,
                    onComplete : function() {
                        self.isAnimating = false;
                        self.removeClass("jumping");
                    }
                });
            },
            
            _isValidPosition : function(left, laneNumber) {
                var elementSize = window.device.getElementSize(this.outputElement);
                
                var maxLaneNumber = 6;
                var maxLeft = window.layout.requiredScreenSize.width - elementSize.width;
                
                return (left >= 0 && laneNumber >= 0 && left <= maxLeft && laneNumber <= maxLaneNumber);
            },
            
            die : function () {
                this.addClass("dead");
                this.moveEnabled = false;
            },
            
            resurrect : function () {
                this.removeClass("dead");
                this.moveEnabled = true;
            }
      });
});
