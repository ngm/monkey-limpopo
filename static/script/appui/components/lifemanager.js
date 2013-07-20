require.def('sampleapp/appui/components/lifemanager',
    [
        'antie/widgets/container',
        'sampleapp/appui/components/livesui'
    ],
    function (Container, LivesUI) {
        'use strict';

        return Container.extend({
            init: function (dialog, character, time) {
                this._super("lives");
                this.numberOfLives = 3;
                this.dialog = dialog;
                this.character = character;
                this.time = time;
                
                this._livesUI = new LivesUI();
                this.appendChildWidget(this._livesUI);
            },
            
            setProgressPoller: function (progressPoller) {
                this._progressPoller = progressPoller;
            },
            
            removeLife: function () {
                --this.numberOfLives;
                this._livesUI.removeLife();
                
                if (this.numberOfLives === 0) {
                    this.dialog.showGameOver(this.resetGame);
                    this.time.stopTime();
                }
            },
            
            resetGame: function () {
                this.character.focus();
                
                this.numberOfLives = 3;
                this._livesUI.reset();
                
                this.character.moveEnabled = true;
                this.character.moveToStartPosition();
                
                this.time.resetTime();
                this.time.startTime();
                
                this._progressPoller.start();
            }
        });
    });

