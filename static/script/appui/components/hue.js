require.def('sampleapp/appui/components/hue',
    [
        'antie/widgets/container'
    ],
    function (Container) {
        'use strict';

        return Container.extend({
            init : function (lane) {
                this._super("hue");

                this.addClass("hue");
            },

            goRed: function() {
                this.removeClass("green");
                this.addClass("red");
                console.log("red...");
            },

            goGreen: function() {
                this.removeClass("red");
                console.log("red...");
            }

        });

    });
