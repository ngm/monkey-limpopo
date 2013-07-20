require.def('sampleapp/appui/components/livesui',
    [
        'antie/widgets/container'
    ],
    function(Container) {
        'use strict';
    
        return Container.extend({
            init : function (lane) {
                this._super();
                
                for (var i = 0; i < 3; i++) {
                    var life = new Container("life" + i);
                    life.addClass("life");
                    this.appendChildWidget(life);
                }
            },
            
            removeLife: function () {
                var lives = this.getChildWidgets();
                lives[lives.length - 1].addClass("dead");
            },
            
            reset: function () {
                var lives = this.getChildWidgets();
                for (var i = 0; i < lives.length ; i++) {
                    lives[i].removeClass("dead");
                }
            }
    });
});
