require.def('sampleapp/appui/components/time',
    [
        'antie/widgets/label',
        'antie/widgets/container'
    ],
    function (Label, Container) {
        'use strict';

        return Container.extend({
            init: function () {
                this._super("time");
                this.currentTimeInSeconds = 0;
                this.timeDiplay = new Label();
                this.displayTime();
            },
            startTime: function() {
                this.addSecond();
            },
            addSecond: function() {
                var self = this;

                this.interval = setInterval(function(){
                    ++self.currentTimeInSeconds;
                    self.updateTime();
                }, 1000);
            },
            displayTime: function(){
                this.updateTime();
                this.timeDiplay.addClass("timeDisplay");
                this.appendChildWidget(this.timeDiplay);
            },
            updateTime: function(){
                var timeString;
                if (this.currentTimeInSeconds > 59) {
                    var numMinutes = Math.floor(this.currentTimeInSeconds/60);
                    var numSeconds = this.currentTimeInSeconds % 60;
                    timeString = numMinutes + ":" + ((numSeconds > 9) ? numSeconds : ("0" + numSeconds));
                } else if (this.currentTimeInSeconds < 10) {
                    timeString = "0:0" + this.currentTimeInSeconds;
                } else {
                    timeString = "0:" + this.currentTimeInSeconds;
                }
                this.timeDiplay.setText(timeString);
            },
            stopTime: function(){
                clearInterval(this.interval);
            },
            resetTime: function() {
                this.currentTimeInSeconds = 0;
            }
        });
    });

