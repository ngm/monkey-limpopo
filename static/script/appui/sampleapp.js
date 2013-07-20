/**
 * @preserve Copyright (c) 2013 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

require.def('sampleapp/appui/sampleapp',
    [
        'antie/application',
        'antie/widgets/container',
        'sampleapp/appui/components/character',
        'sampleapp/appui/components/road',
        'sampleapp/appui/components/lifemanager',
        'sampleapp/appui/components/dialog',
        'sampleapp/appui/components/time',
        'sampleapp/appui/components/progresspoller',
        'sampleapp/appui/components/hue'
    ],
    function(Application, Container, Character, Road, LifeManager, Dialog, Time, ProgressPoller, Hue) {
    
        return Application.extend({
            init: function(appDiv, styleDir, imgDir, callback) {
                var self;
                self = this;
                
                self._super(appDiv, styleDir, imgDir, callback);

                // Sets the root widget of the application to be
                // an empty container
                self._setRootContainer = function() {
                    var container = new Container();
                    container.outputElement = appDiv;
                    self.setRootWidget(container);
                };
            },
            
            run: function() {
                // Called from run() as we need the framework to be ready beforehand.
                this._setRootContainer();

                var rootWidget = this.getRootWidget();
                var device = this.getDevice();
                window.device = device;
                window.layout = this.getLayout();

                var startRegion = new Container("startRegion");
                rootWidget.appendChildWidget(startRegion);

                var road = new Road();
                rootWidget.appendChildWidget(road);

                var endRegion = new Container("endRegion");
                rootWidget.appendChildWidget(endRegion);

                var time = new Time();
                rootWidget.appendChildWidget(time);

                var character = new Character();
                rootWidget.appendChildWidget(character);

                var dialog = new Dialog();
                rootWidget.appendChildWidget(dialog);

                var lifeManager = new LifeManager(dialog, character, time);
                rootWidget.appendChildWidget(lifeManager);

                var hue = new Hue();
                rootWidget.appendChildWidget(hue);

                var onWinDetected = function () {
                    time.stopTime();
                    dialog.showGameWin(function () {
                        lifeManager.resetGame();
                    });
                };
                
                var onCollisionDetected = function () {
                    lifeManager.removeLife();
                    character.die();
                    hue.goRed();
                    
                    setTimeout(function() {
                        character.moveToStartPosition();
                        character.resurrect();
                        hue.goGreen();
                        progressPoller.start();
                    }, 1000);
                };
                
                var progressPoller = new ProgressPoller(character, road, onWinDetected, onCollisionDetected);
                
                lifeManager.setProgressPoller(progressPoller);
                
                lifeManager.resetGame();
                
                var carFrequencyFn = function () {
                    return Math.floor(Math.random() * 4000) + 1000;
                };
                
                road.createCars(carFrequencyFn);
            }
        });     
    }
);
