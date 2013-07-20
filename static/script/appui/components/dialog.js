require.def('sampleapp/appui/components/dialog',
    [
        'antie/widgets/container',
        'antie/widgets/button',
        'antie/widgets/label',
        'antie/events/keyevent'
    ],
    function (Container, Button, Label, KeyEvent) {
        'use strict';

        return Container.extend({
            init: function () {
                this._super("dialog");
                this.addClass("hidden");
            },
            
            clear: function() {
                var widgets = this.getChildWidgets();
                for(var i = widgets.length - 1; i >= 0 ; i--) {
                    this.removeChildWidget(widgets[i]);
                }
            },
            
            showGameOver: function(callbackFn) {
                this.clear();
                var gameOver = new Label();
                gameOver.setText("Game Over");
                gameOver.addClass("gameOverLabel");
                this.appendChildWidget(gameOver);

                var playAgainButton = this._buildPlayAgainButton(callbackFn);
                this.appendChildWidget(playAgainButton);
                playAgainButton.focus();

                this.removeClass("hidden");
            },
            
            showGameWin: function(callbackFn) {
                this.clear();
                var gameWin = new Label();
                gameWin.setText("You are a Winner");
                gameWin.addClass("gameOverLabel");
                this.appendChildWidget(gameWin);

                var playAgainButton = this._buildPlayAgainButton(callbackFn);
                this.appendChildWidget(playAgainButton);
                playAgainButton.focus();

                this.removeClass("hidden");
            },
            
            _buildPlayAgainButton: function (callbackFn) {
                var playAgain = new Button();
                playAgain.addClass("playAgain");
                
                var playLabel = new Label();
                playLabel.setText("Play Again");
                playLabel.addClass("playLabel");
                
                playAgain.appendChildWidget(playLabel);
                
                var self = this;
                
                playAgain.addEventListener('select', function(e) {
                    self.addClass("hidden");
                    callbackFn();
                });
                
                return playAgain;
            }
        });
    });

