"use strict";



define('web-app/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    host: 'http://localhost:4201'
  });
});
define('web-app/app', ['exports', 'web-app/resolver', 'ember-load-initializers', 'web-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('web-app/components/connect-four', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;


  //This clones the state matrix so that when the
  //minimax algorithm creates the game tree, it has to
  //hold all possible moves soit needs lots of copies
  //of the state matrix.
  function deepClone(state) {
    var new_state = [];
    for (var idx1 = 0; idx1 < state.length; idx1++) {
      new_state.push(state[idx1].slice(0));
    }
    return new_state;
  }

  //This function checks for a winner
  function check_game_winner(state) {
    var patterns = [
    //These are all the winning patterns for connect four
    //Top left to bottom right
    //vertical line 1
    [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 1], [0, 2], [0, 3], [0, 4]], [[0, 2], [0, 3], [0, 4], [0, 5]],
    //vertical line 2
    [[1, 0], [1, 1], [1, 2], [1, 3]], [[1, 1], [1, 2], [1, 3], [1, 4]], [[1, 2], [1, 3], [1, 4], [1, 5]],
    //vertical line 3
    [[2, 0], [2, 1], [2, 2], [2, 3]], [[2, 1], [2, 2], [2, 3], [2, 4]], [[2, 2], [2, 3], [2, 4], [2, 5]],
    //vertical line 3
    [[3, 0], [3, 1], [3, 2], [3, 3]], [[3, 1], [3, 2], [3, 3], [3, 4]], [[3, 2], [3, 3], [3, 4], [3, 5]],
    //vertical line 4
    [[4, 0], [4, 1], [4, 2], [4, 3]], [[4, 1], [4, 2], [4, 3], [4, 4]], [[4, 2], [4, 3], [4, 4], [4, 5]],
    //vertical line 3
    [[5, 0], [5, 1], [5, 2], [5, 3]], [[5, 1], [5, 2], [5, 3], [5, 4]], [[5, 2], [5, 3], [5, 4], [5, 5]],
    //vertical line 3
    [[6, 0], [6, 1], [6, 2], [6, 3]], [[6, 1], [6, 2], [6, 3], [6, 4]], [[6, 2], [6, 3], [6, 4], [6, 5]],

    // //horizontal line 1
    [[0, 0], [1, 0], [2, 0], [3, 0]], [[1, 0], [2, 0], [3, 0], [4, 0]], [[2, 0], [3, 0], [4, 0], [5, 0]], [[3, 0], [4, 0], [5, 0], [6, 0]],
    // //horizontal line 2
    [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 1], [2, 1], [3, 1], [4, 1]], [[2, 1], [3, 1], [4, 1], [5, 1]], [[3, 1], [4, 1], [5, 1], [6, 1]],
    // //horizontal line 3
    [[0, 2], [1, 2], [2, 2], [3, 2]], [[1, 2], [2, 2], [3, 2], [4, 2]], [[2, 2], [3, 2], [4, 2], [5, 2]], [[3, 2], [4, 2], [5, 2], [6, 2]],
    // //horizontal line 4
    [[0, 3], [1, 3], [2, 3], [3, 3]], [[1, 3], [2, 3], [3, 3], [4, 3]], [[2, 3], [3, 3], [4, 3], [5, 3]], [[3, 3], [4, 3], [5, 3], [6, 3]],
    // //horizontal line 5
    [[0, 4], [1, 4], [2, 4], [3, 4]], [[1, 4], [2, 4], [3, 4], [4, 4]], [[2, 4], [3, 4], [4, 4], [5, 4]], [[3, 4], [4, 4], [5, 4], [6, 4]],
    // //horizontal line 6
    [[0, 5], [1, 5], [2, 5], [3, 5]], [[1, 5], [2, 5], [3, 5], [4, 5]], [[2, 5], [3, 5], [4, 5], [5, 5]], [[3, 5], [4, 5], [5, 5], [6, 5]],

    //Diagonal line 1
    [[0, 3], [1, 2], [2, 1], [3, 0]],

    //Diagonal line 2
    [[0, 4], [1, 3], [2, 2], [3, 1]],
    //Diagonal line 2.1
    [[1, 4], [2, 3], [3, 2], [4, 1]],
    //Diagonal line 2.2
    [[1, 3], [2, 2], [3, 1], [4, 0]],

    //Diagonal line 3
    [[0, 5], [1, 4], [2, 3], [3, 2]],
    //Diagonal line 3.2
    [[1, 4], [2, 3], [3, 2], [4, 1]],
    //Diagonal line 3.3
    [[2, 3], [3, 2], [4, 1], [5, 0]],

    //Diagonal line 4
    [[1, 5], [2, 4], [3, 3], [4, 2]],
    //Diagonal line 4.1
    [[2, 4], [3, 3], [4, 2], [5, 1]],
    //Diagonal line 4.2
    [[3, 3], [4, 2], [5, 1], [6, 0]],

    //Diagonal line 5
    [[2, 5], [3, 4], [4, 3], [5, 2]],
    //Diagonal line 5.1
    [[3, 4], [4, 3], [5, 2], [6, 1]],

    //Diagonal line 6
    [[3, 5], [4, 4], [5, 3], [6, 2]],

    //Top right to bottom left
    //Diagonal line 1
    [[3, 0], [4, 1], [5, 2], [6, 3]],

    // Diagonal line 2
    [[2, 0], [3, 1], [4, 2], [5, 3]],
    // Diagonal line 2.1
    [[3, 1], [4, 2], [5, 3], [6, 4]],

    // Diagonal line 3
    [[1, 0], [2, 1], [3, 2], [4, 3]],
    // Diagonal line 3.1
    [[2, 1], [3, 2], [4, 3], [5, 4]],
    // Diagonal line 3.2
    [[3, 2], [4, 3], [5, 4], [6, 5]],

    // Diagonal line 4
    [[0, 0], [1, 1], [2, 2], [3, 3]],
    // Diagonal line 4.1
    [[1, 1], [2, 2], [3, 3], [4, 4]],
    // Diagonal line 4.2
    [[2, 2], [3, 3], [4, 4], [5, 5]],

    // Diagonal line 5
    [[0, 1], [1, 2], [2, 3], [3, 4]],
    // Diagonal line 5.1
    [[1, 2], [2, 3], [3, 4], [4, 5]],

    // Diagonal line 6
    [[0, 2], [1, 3], [2, 4], [3, 5]]];

    // This loops over all the patterns and assigns
    //each one to the pattern variable.
    for (var pidx = 0; pidx < patterns.length; pidx++) {
      var pattern = patterns[pidx];
      var winner = state[pattern[0][0]][pattern[0][1]];
      if (winner) {
        for (var idx = 1; idx < pattern.length; idx++) {
          if (winner != state[pattern[idx][0]][pattern[idx][1]]) {
            winner = undefined;
            break;
          }
        }
        if (winner) {
          return winner;
        }
      }
    }
    /*This checks for a draw if no winner has been found,
     by looping over all the squares to check they are
     not empty. */
    var draw = true;
    for (var x = 0; x <= 6; x++) {
      for (var y = 0; y <= 5; y++) {
        if (!state[x][y]) {
          return undefined;
        }
      }
    }
    return '';
  }

  /*This is the minimax algorithm. It takes three
  parameters - the current game state, the search depth limit
  and the player to play next. */
  function minimax(state, limit, player) {
    var moves = [];
    if (limit > 0) {
      //This loops over all the cells for potential moves
      for (var idx2 = 5; idx2 >= 0; idx2--) {
        for (var idx1 = 0; idx1 < 7; idx1++) {
          if (state[idx1][idx2] === undefined) {
            var move = {
              x: idx1,
              y: idx2,
              //deep clone function is used to store the state after the move
              state: deepClone(state),
              score: 0
            };
            move.state[idx1][idx2] = player;
            if (limit === 1 || check_game_winner(move.state) !== undefined) {
              if (check_game_winner(move.state) !== undefined) {
                //This checks whether the winner is the computer or human player.
                var winner = check_game_winner(move.state);
                //If the winner is the computer then it gives a score of 1000
                // to show it is a good result.
                if (winner === 'o2') {
                  move.score = 1000;
                  //If the winner is the human, then it gives a score of -1000
                  //to show this is bad.
                } else if (winner === 'o1') {
                  move.score = -1000;
                }
              }
            } else {
              //This returns a list of possible moves based on the move.state
              move.moves = minimax(move.state, limit - 1, player == 'o1' ? 'o2' : 'o1');
              var score = undefined;
              //These moves have a score attached to them so they can be
              //aggregated into the current move's score.
              for (var idx3 = 0; idx3 < move.moves.length; idx3++) {
                if (score === undefined) {
                  score = move.moves[idx3].score;
                } else if (player === 'o1') {
                  score = Math.max(score, move.moves[idx3].score);
                } else if (player === 'o2') {
                  score = Math.min(score, move.moves[idx3].score);
                }
              }
              move.score = score;
            }
            moves.push(move);
          }
        }
      }
    }
    return moves;
  }

  // function heuristic(state) {
  //   var score = 0;
  //   for(var idx = 0; idx < patterns.length; idx++) {
  //     if(match_pattern(state, patterns[idx].pattern, 'o2')) {
  //       score = score + patterns[idx].score;
  //     }
  //     if(match_pattern(state, patterns[idx].pattern, 'o1')) {
  //       score = score - patterns[idx].score;
  //     }
  //   }
  //   return score;
  // }


  function computer_move(state) {
    // var moves = [];
    // for(var idx1 = 0; idx1 < 3; idx1++) {
    //   for(var idx2 = 0; idx2 < 3; idx2++) {
    //     if(state[idx1][idx2] === undefined) {
    //       var move = {
    //         x: idx1,
    //         y: idx2,
    //         score: 0
    //       };
    //       moves.push(move);
    //     }
    //   }
    // }
    // tests = 0;
    var moves = minimax(state, 2, 'o2');
    // alert(tests);
    var max_score = undefined;
    var move = undefined;
    /*//This loops over a list of potential moves and picks
    the move with the highest score which is assigned
    to the move object and then returned by the function.*/
    for (var idx = 0; idx < moves.length; idx++) {
      if (max_score === undefined || moves[idx].score > max_score) {
        max_score = moves[idx].score;
        move = {
          x: moves[idx].x,
          y: moves[idx].y
        };
      }
    }
    return move;
  }

  exports.default = Component.extend({
    playing: false,
    winner: undefined,
    draw: false,
    didInsertElement: function didInsertElement() {
      var stage = new createjs.Stage(this.$('#stage')[0]);
      //Creates the markers
      var markers = {
        'o1': [],
        'o2': []
      };
      for (var x = 0; x < 21; x++) {
        //This draws the yellow circle
        var circleOne = new createjs.Shape();
        graphics = circleOne.graphics;
        //This sets the colour of the circle to yellow
        graphics.beginStroke('#FFFF00');
        //This sets the width of the circle
        graphics.setStrokeStyle(10);
        graphics.drawCircle(0, 0, 10);
        //This makes the circle invisible at first
        circleOne.visible = false;
        //This adds the circle to the board
        stage.addChild(circleOne);
        markers.o1.push(circleOne);

        //This draws the red circle
        var circleTwo = new createjs.Shape();
        graphics = circleTwo.graphics;
        //This sets the colour of the circle to red
        graphics.beginStroke('#FF0000');
        //This sets the width of the circle
        graphics.setStrokeStyle(10);
        graphics.drawCircle(0, 0, 10);
        //This makes the circle invisible at first
        circleTwo.visible = false;
        //This adds the circle to the board
        stage.addChild(circleTwo);
        markers.o2.push(circleTwo);
      }

      //This draws the game board.
      var board = new createjs.Shape();
      var graphics = board.graphics;
      //This makes the board lines white
      graphics.beginFill('#ffffff');
      graphics.drawRect(0, 0, 301, 2);
      graphics.drawRect(0, 50, 301, 2);
      graphics.drawRect(0, 100, 301, 2);
      graphics.drawRect(0, 150, 301, 2);
      graphics.drawRect(0, 200, 301, 2);
      graphics.drawRect(0, 250, 301, 2);
      graphics.drawRect(0, 300, 301, 2);

      graphics.drawRect(0, 0, 2, 300);
      graphics.drawRect(43, 0, 2, 300);
      graphics.drawRect(86, 0, 2, 300);
      graphics.drawRect(129, 0, 2, 300);
      graphics.drawRect(172, 0, 2, 300);
      graphics.drawRect(215, 0, 2, 300);
      graphics.drawRect(258, 0, 2, 300);
      graphics.drawRect(301, 0, 2, 300);
      board.x = 40;
      board.y = 40;
      //This adds the game board.
      stage.addChild(board);

      this.set('markers', markers);
      this.set('stage', stage);

      //Updates the stage
      stage.update();
    },

    click: function click(ev) {
      var component = this;
      //Checks game has been started and has not been won yet
      if (component.get('playing') && !component.get('winner')) {
        //Restricts the click event to the area of the board.
        if (ev.offsetX >= 40 && ev.offsetY >= 40 && ev.offsetX < 340 && ev.offsetY < 341) {
          /*This determines the cells. This is done by subtracting 40
          from the offset (because the board was moved 40 pixels in)
          and then dividing by 43 to get the column/row value. */
          var x = Math.floor((ev.offsetX - 40) / 43);
          var y = 5;
          //Checks the value at the x and y co-ordinates is false, which means it is empty.
          var state = component.get('state');
          while (state[x][y] == 'o1' || state[x][y] == 'o2') {
            y = y - 1;
          }

          // if(!state[x][y]) {
          //This stops the counters from going out the top of the board.
          if (y >= 0) {
            //This
            var move_count = component.get('moves')['o1'];
            var marker = component.get('markers')['o1'][move_count];
            state[x][y] = 'o1';
            //This makes the marker visible and updates its co-ordinates.
            marker.visible = true;
            marker.x = 65 + x * 43;
            marker.y = 70 + y * 50;

            // This updates the current player's moves.
            component.get('moves')['o1'] = move_count + 1;
            //This updates the stage so the marker is shown to the user.
            component.get('stage').update();
            //This checks whether the player has won.
            component.check_winner();

            //This makes it seem the computer player thinks about its move.
            setTimeout(function () {
              //This checks the computer has not won or drawn.
              if (!component.get('winner') && !component.get('draw')) {
                /* Computer move function is used to determine
                where the computer will play. It takes the current
                state and returns an object with x and y properties
                that define where the computer wants to play.*/
                var move = computer_move(state);
                move_count = component.get('moves')['o2'];
                state[move.x][move.y] = 'o2';
                marker = component.get('markers')['o2'][move_count];
                //This makes the counter visible to the player
                marker.visible = true;
                marker.x = 65 + move.x * 43;
                marker.y = 70 + move.y * 50;
                component.get('moves')['o2'] = move_count + 1;
                //This updates the board to show the counter
                component.get('stage').update();
                //This checks whether a player has won
                component.check_winner();
              }
            }, 500);
          }
        }
      }
    },

    //This checks whether a player has won or not.
    /* It retrieves the current game state from the Component,
    then calls the check_game_winner function with that state.
    This then sets winner or draw properties of the component
    depending on the return value of the function.*/
    check_winner: function check_winner() {
      var state = this.get('state');
      var winner = check_game_winner(state);
      if (winner !== undefined) {
        if (winner === '') {
          this.set('draw', true);
        } else {
          this.set('winner', winner);
        }
      }
    },

    actions: {
      start: function start() {
        //This starts the game
        this.set('playing', true);
        //This sets the game to no winner yet
        this.set('winner', undefined);
        //This sets the game to no draw yet
        this.set('draw', undefined);
        this.set('state', [
        //These set all the cells on the board as being empty.
        [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined]]);
        //This sets both the player and computer on 0 moves at first.
        this.set('moves', { 'o1': 0, 'o2': 0 });
        this.set('player', 'o1');
        var markers = this.get('markers');
        //This sets the total amount of counters and marks them as invisible to the users.
        for (var idx = 0; idx < 21; idx++) {
          markers.o1[idx].visible = false;
          markers.o2[idx].visible = false;
        }
        //This updates the board.
        this.get('stage').update();
      }
    }
  });
});
define('web-app/components/number-game', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    playing: false,
    correct: false,
    guesses: 0,
    guessValue: 0,
    limits: null,

    actions: {
      start: function start() {
        this.set('playing', true);
        this.set('correct', false);
        this.set('guessValue', Math.floor(Math.random() * 100) + 1);
        this.set('guesses', 1);
        this.set('limits', { 'min': 1, 'max': 100 });
      },
      lower: function lower() {
        var limit = this.get('limits');
        limit.max = this.get('guessValue');
        this.set('guessValue', limit.min + Math.floor((limit.max - limit.min) / 2));
        this.set('guesses', this.get('guesses') + 1);
      },
      higher: function higher() {
        var limit = this.get('limits');
        limit.min = this.get('guessValue');
        this.set('guessValue', limit.min + Math.floor((limit.max - limit.min) / 2));
        this.set('guesses', this.get('guesses') + 1);
      },
      correct: function correct() {
        this.set('correct', true);
      },

      'save-highscore': function saveHighscore() {
        var action = this.get('on-save-highscore');
        if (action !== undefined) {
          action(this.get('player_name'), this.get('guesses'));
        }
      }
    }
  });
});
define('web-app/components/question-1', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    didInsertElement: function didInsertElement() {
      var stage = new createjs.Stage(this.$('#thestage')[0]);

      //box 1
      var board = new createjs.Shape();
      var graphics = board.graphics;
      graphics.beginFill('#ffffff');
      graphics.drawRect(0, 0, 200, 300);

      //box 2
      var box = new createjs.Shape();
      var graphics = box.graphics;
      graphics.beginFill('#FFD700');
      graphics.beginStroke('#ff0000');
      graphics.setStrokeStyle(5);
      graphics.drawRect(0, 0, 25, 50);
      box.x = 100;
      box.y = 75;

      stage.addChild(board);
      stage.addChild(box);

      //Update the drawing
      stage.update();
    }

  });
});
define('web-app/components/question-2', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    didInsertElement: function didInsertElement() {
      var stage = new createjs.Stage(this.$('#thestage')[0]);

      //box 1
      var box = new createjs.Shape();
      var graphics = box.graphics;
      graphics.beginFill('#ffffff');
      graphics.drawRect(0, 0, 100, 100);
      stage.addChild(box);

      var tick = new createjs.Shape();
      graphics = tick.graphics;
      graphics.beginStroke('#6666ff');
      graphics.setStrokeStyle(10);
      graphics.moveTo(0, 0);
      graphics.lineTo(3, 15);
      graphics.moveTo(0, 20);
      graphics.lineTo(40, 0);
      tick.x = 35;
      tick.y = 35;
      stage.addChild(tick);

      //Update the drawing
      stage.update();
    }

  });
});
define('web-app/components/question-3', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    didInsertElement: function didInsertElement() {
      var stage = new createjs.Stage(this.$('#thestage')[0]);

      //box 1
      var box = new createjs.Shape();
      var graphics = box.graphics;
      graphics.beginFill('#ffffff');
      graphics.drawRect(0, 0, 300, 200);
      box.visible = false;

      //box 2
      var boxtwo = new createjs.Shape();
      var graphics = boxtwo.graphics;
      graphics.beginFill('#008000');
      graphics.drawRect(50, 40, 200, 100);
      boxtwo.visible = false;

      //box 3
      var boxthree = new createjs.Shape();
      var graphics = boxthree.graphics;
      graphics.beginFill('#800080');
      graphics.drawRect(100, 60, 100, 50);
      boxthree.visible = false;

      stage.addChild(box);
      stage.addChild(boxtwo);
      stage.addChild(boxthree);

      //Update the drawing
      stage.update();
    }
  });
});
define('web-app/components/question-4', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    didInsertElement: function didInsertElement() {
      var stage = new createjs.Stage(this.$('#thestage')[0]);

      //circle
      var circle = new createjs.Shape();
      var graphics = circle.graphics;
      graphics.beginStroke('#66ff66');
      graphics.setStrokeStyle(5);
      graphics.drawCircle(0, 0, 10);
      circle.x = 200;
      circle.y = 200;
      stage.addChild(circle);

      //Draw the board
      var board = new createjs.Shape();
      var graphics = board.graphics;
      graphics.beginFill('#66ff66');
      graphics.drawRect(0, 99, 10, 50);
      board.x = 195;
      board.y = 20;
      stage.addChild(board);

      //circle
      var circletwo = new createjs.Shape();
      var graphics = circletwo.graphics;
      graphics.beginStroke('#66ff66');
      graphics.setStrokeStyle(10);
      graphics.arc(210, 90, 30, 130, 90);
      // graphics.drawCircle(0, 0, 10);
      // circletwo.x = 200;
      // circletwo.y = 100;
      stage.addChild(circletwo);

      //Update the drawing
      stage.update();
    }

  });
});
define('web-app/components/question-5', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    didInsertElement: function didInsertElement() {
      var stage = new createjs.Stage(this.$('#thestage')[0]);

      //sky
      var sky = new createjs.Shape();
      var graphics = sky.graphics;
      graphics.beginFill('#e6f2ff');
      graphics.drawRect(0, 0, 350, 200);
      stage.addChild(sky);

      //boat part 1
      var boatone = new createjs.Shape();
      var graphics = boatone.graphics;
      graphics.beginFill('#bfbfbf');
      graphics.drawRect(100, 60, 90, 40);
      stage.addChild(boatone);

      //boat part 2
      var boattwo = new createjs.Shape();
      var graphics = boattwo.graphics;
      graphics.beginFill('#bfbfbf');
      graphics.drawRect(70, 90, 150, 40);
      stage.addChild(boattwo);

      //window one
      var circle = new createjs.Shape();
      var graphics = circle.graphics;
      graphics.beginStroke('#000000');
      graphics.setStrokeStyle(3);
      graphics.drawCircle(0, 0, 5);
      circle.x = 140;
      circle.y = 75;
      stage.addChild(circle);

      //window two
      var circletwo = new createjs.Shape();
      var graphics = circletwo.graphics;
      graphics.beginStroke('#000000');
      graphics.setStrokeStyle(3);
      graphics.drawCircle(0, 0, 5);
      circletwo.x = 160;
      circletwo.y = 75;
      stage.addChild(circletwo);

      //window three
      var circlethree = new createjs.Shape();
      var graphics = circlethree.graphics;
      graphics.beginStroke('#000000');
      graphics.setStrokeStyle(3);
      graphics.drawCircle(0, 0, 5);
      circlethree.x = 180;
      circlethree.y = 75;
      stage.addChild(circlethree);

      //window one.2
      var circlefour = new createjs.Shape();
      var graphics = circlefour.graphics;
      graphics.beginStroke('#ffffff');
      graphics.setStrokeStyle(3);
      graphics.drawCircle(0, 0, 2);
      circlefour.x = 140;
      circlefour.y = 75;
      stage.addChild(circlefour);

      //window two.2
      var circlefive = new createjs.Shape();
      var graphics = circlefive.graphics;
      graphics.beginStroke('#ffffff');
      graphics.setStrokeStyle(3);
      graphics.drawCircle(0, 0, 2);
      circlefive.x = 160;
      circlefive.y = 75;
      stage.addChild(circlefive);

      //window three.2
      var circlethree = new createjs.Shape();
      var graphics = circlethree.graphics;
      graphics.beginStroke('#ffffff');
      graphics.setStrokeStyle(3);
      graphics.drawCircle(0, 0, 2);
      circlethree.x = 180;
      circlethree.y = 75;
      stage.addChild(circlethree);

      //sea
      var sea = new createjs.Shape();
      var graphics = sea.graphics;
      graphics.beginFill('#336699');
      graphics.drawRect(0, 140, 350, 60);
      stage.addChild(sea);

      //wave one
      var wave = new createjs.Shape();
      var graphics = wave.graphics;
      graphics.beginStroke('#336699');
      graphics.setStrokeStyle(40);
      graphics.drawCircle(0, 0, 30);
      wave.x = 30;
      wave.y = 150;
      stage.addChild(wave);

      //wave two
      var wavetwo = new createjs.Shape();
      var graphics = wavetwo.graphics;
      graphics.beginStroke('#336699');
      graphics.setStrokeStyle(40);
      graphics.drawCircle(0, 0, 30);
      wavetwo.x = 115;
      wavetwo.y = 150;
      stage.addChild(wavetwo);

      //wave three
      var wavethree = new createjs.Shape();
      var graphics = wavethree.graphics;
      graphics.beginStroke('#336699');
      graphics.setStrokeStyle(40);
      graphics.drawCircle(0, 0, 30);
      wavethree.x = 205;
      wavethree.y = 150;
      stage.addChild(wavethree);

      //wave four
      var wavefour = new createjs.Shape();
      var graphics = wavefour.graphics;
      graphics.beginStroke('#336699');
      graphics.setStrokeStyle(40);
      graphics.drawCircle(0, 0, 30);
      wavefour.x = 300;
      wavefour.y = 150;
      stage.addChild(wavefour);

      //Update the drawing
      stage.update();
    }

  });
});
define('web-app/components/tic-tac-toe', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function deepClone(state) {
    var new_state = [];
    for (var idx1 = 0; idx1 < state.length; idx1++) {
      new_state.push(state[idx1].slice(0));
    }
    return new_state;
  }

  function check_game_winner(state) {
    var patterns = [[[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]], [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]], [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]]];
    for (var pidx = 0; pidx < patterns.length; pidx++) {
      var pattern = patterns[pidx];
      var winner = state[pattern[0][0]][pattern[0][1]];
      if (winner) {
        for (var idx = 1; idx < pattern.length; idx++) {
          if (winner != state[pattern[idx][0]][pattern[idx][1]]) {
            winner = undefined;
            break;
          }
        }
        if (winner) {
          return winner;
        }
      }
    }
    var draw = true;
    for (var x = 0; x <= 2; x++) {
      for (var y = 0; y <= 2; y++) {
        if (!state[x][y]) {
          return undefined;
        }
      }
    }
    return '';
  }

  var patterns = [{
    pattern: [['p', 0, 1], ['p', 0, 1], ['p']],
    score: 1000
  }, {
    pattern: [['p', 1, 0], ['p', 1, 0], ['p']],
    score: 1000
  }, {
    pattern: [['p', 1, 1], ['p', 1, 1], ['p']],
    score: 1000
  }, {
    pattern: [['p', 1, -1], ['p', 1, -1], ['p']],
    score: 1000
  }, {
    pattern: [['p', 0, 1], ['p', 0, 1], ['p']],
    score: 50
  }, {
    pattern: [['p', 1, 0], ['p', 1, 0], ['p']],
    score: 50
  }, {
    pattern: [['p', 1, 1], ['p', 1, 1], ['p']],
    score: 50
  }, {
    pattern: [['p', 1, -1], ['p', 1, -1], ['p']],
    score: 50
  }];

  function match_pattern_at(state, pattern, player, x, y) {
    if (x >= 0 && x < state.length) {
      if (y >= 0 && y < state[x].length) {
        var element = pattern[0];
        if (element[0] == 'p') {
          if (state[x][y] !== player) {
            return false;
          }
        } else if (element[0] == ' ') {
          if (state[x][y] !== undefined) {
            return false;
          }
        }
        if (pattern.length > 1) {
          return match_pattern_at(state, pattern.slice(1), player, x + element[1], y + element[2]);
        } else {
          return true;
        }
      }
    }
    return false;
  }

  function match_pattern(state, pattern, player) {
    for (var idx1 = 0; idx1 < state.length; idx1++) {
      for (var idx2 = 0; idx2 < state[idx1].length; idx2++) {
        var matches = match_pattern_at(state, pattern, player, idx1, idx2);
        if (matches) {
          return true;
        }
      }
    }
    return false;
  }

  function heuristic(state) {
    var score = 0;
    for (var idx = 0; idx < patterns.length; idx++) {
      if (match_pattern(state, patterns[idx].pattern, 'o')) {
        score = score + patterns[idx].score;
      }
      if (match_pattern(state, patterns[idx].pattern, 'x')) {
        score = score - patterns[idx].score;
      }
    }
    return score;
  }

  var tests = 0;

  function alphabeta(state, limit, player, alpha, beta) {
    var moves = [];
    if (limit > 0) {
      // tests = tests +1;
      if (player === 'o') {
        var cutoff = Number.MIN_VALUE;
      } else {
        var cutoff = Number.MAX_VALUE;
      }
      for (var idx1 = 0; idx1 < 3; idx1++) {
        for (var idx2 = 0; idx2 < 3; idx2++) {
          if (state[idx1][idx2] === undefined) {
            var move = {
              x: idx1,
              y: idx2,
              state: deepClone(state),
              score: 0
            };
            move.state[idx1][idx2] = player;
            if (limit === 1 || check_game_winner(move.state) !== undefined) {
              move.score = heuristic(move.state);
            } else {
              move.moves = alphabeta(move.state, limit - 1, player == 'x' ? 'o' : 'x', alpha, beta);
              var score = undefined;
              for (var idx3 = 0; idx3 < move.moves.length; idx3++) {
                if (score === undefined) {
                  score = move.moves[idx3].score;
                } else if (player === 'x') {
                  score = Math.max(score, move.moves[idx3].score);
                } else if (player === 'o') {
                  score = Math.min(score, move.moves[idx3].score);
                }
              }
              move.score = score;
            }
            moves.push(move);
            if (player === 'o') {
              cutoff = Math.max(cutoff, move.score);
              alpha = Math.max(cutoff, alpha);
            } else {
              cutoff = Math.min(cutoff, move.score);
              beta = Math.min(cutoff, beta);
            }
            if (beta <= alpha) {
              return moves;
            }
          }
        }
      }
    }
    return moves;
  }

  function computer_move(state) {
    // var moves = [];
    // for(var idx1 = 0; idx1 < 3; idx1++) {
    //   for(var idx2 = 0; idx2 < 3; idx2++) {
    //     if(state[idx1][idx2] === undefined) {
    //       var move = {
    //         x: idx1,
    //         y: idx2,
    //         score: 0
    //       };
    //       moves.push(move);
    //     }
    //   }
    // }
    // tests = 0;
    var moves = alphabeta(state, 10, 'o', Number.MIN_VALUE, Number.MAX_VALUE);
    // alert(tests);
    var max_score = undefined;
    var move = undefined;
    for (var idx = 0; idx < moves.length; idx++) {
      if (max_score === undefined || moves[idx].score > max_score) {
        max_score = moves[idx].score;
        move = {
          x: moves[idx].x,
          y: moves[idx].y
        };
      }
    }
    return move;
  }

  exports.default = Ember.Component.extend({
    playing: false,
    winner: undefined,
    draw: false,

    init: function init() {
      this._super.apply(this, arguments);
      createjs.Sound.registerSound("assets/sounds/click.wav", "place-marker");
      createjs.Sound.registerSound("assets/sounds/falling.mp3", "falling");
    },

    didInsertElement: function didInsertElement() {
      var stage = new createjs.Stage(this.$('#stage')[0]);

      //Draw the board
      var board = new createjs.Shape();
      var graphics = board.graphics;
      graphics.beginFill('#ffffff');
      graphics.drawRect(0, 99, 300, 2);
      graphics.drawRect(0, 199, 300, 2);
      graphics.drawRect(99, 0, 2, 300);
      graphics.drawRect(199, 0, 2, 300);
      board.x = 40;
      board.y = 40;
      board.alpha = 0;
      this.set('board', board);
      stage.addChild(board);

      //create markers
      var markers = {
        'x': [],
        'o': []
      };
      for (var x = 0; x < 5; x++) {
        var circleMarker = new createjs.Shape();
        graphics = circleMarker.graphics;
        graphics.beginStroke('#66ff66');
        graphics.setStrokeStyle(10);
        graphics.drawCircle(0, 0, 30);
        circleMarker.visible = false;
        stage.addChild(circleMarker);
        markers.o.push(circleMarker);

        var crossMarker = new createjs.Shape();
        graphics = crossMarker.graphics;
        graphics.beginStroke('#6666ff');
        graphics.setStrokeStyle(10);
        graphics.moveTo(0, 0);
        graphics.lineTo(40, 40);
        graphics.moveTo(0, 40);
        graphics.lineTo(40, 0);
        crossMarker.visible = false;
        stage.addChild(crossMarker);
        markers.x.push(crossMarker);
      }

      this.set('markers', markers);
      this.set('stage', stage);

      //Update the drawing
      createjs.Ticker.addEventListener("tick", stage);
    },

    click: function click(ev) {
      var component = this;
      if (component.get('playing') && !component.get('winner')) {
        if (ev.offsetX >= 40 && ev.offsetY >= 40 && ev.offsetX < 340 && ev.offsetY < 340) {
          var x = Math.floor((ev.offsetX - 40) / 100);
          var y = Math.floor((ev.offsetY - 40) / 100);
          var state = component.get('state');
          if (!state[x][y]) {
            createjs.Sound.play("place-marker");
            var move_count = component.get('moves')['x'];
            var marker = component.get('markers')['x'][move_count];
            state[x][y] = 'x';
            marker.visible = true;
            marker.x = 70 + x * 100;
            marker.y = 70 + y * 100;
            component.check_winner();
            component.get('moves')['x'] = move_count + 1;
            setTimeout(function () {
              if (!component.get('winner') && !component.get('draw')) {
                var move = computer_move(state);
                move_count = component.get('moves')['o'];
                state[move.x][move.y] = 'o';
                marker = component.get('markers')['o'][move_count];
                marker.visible = true;
                marker.x = 90 + move.x * 100;
                marker.y = 90 + move.y * 100;
                component.get('moves')['o'] = move_count + 1;
                component.get('stage').update();
                component.check_winner();
              }
            }, 500);
          }
        }
      }
    },

    check_winner: function check_winner() {
      var state = this.get('state');
      var winner = check_game_winner(state);
      if (winner !== undefined) {
        if (winner === '') {
          this.set('draw', true);
        } else {
          this.set('winner', winner);
        }
      }
    },

    actions: {
      start: function start() {
        var board = this.get('board');
        board.alpha = 0;
        if (this.get('playing')) {
          var markers = this.get('markers');
          for (var idx = 0; idx < 5; idx++) {
            createjs.Tween.get(markers.x[idx]).to({ y: 600 }, 500);
            createjs.Tween.get(markers.o[idx]).to({ y: 600 }, 500);
          }
          createjs.Sound.play("falling");
          createjs.Tween.get(board).wait(500).to({ alpha: 1 }, 1000);
        } else {
          createjs.Tween.get(board).to({ alpha: 1 }, 1000);
        }
        this.set('playing', true);
        this.set('winner', undefined);
        this.set('draw', undefined);
        this.set('draw', false);
        this.set('state', [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]);
        this.set('moves', { 'x': 0, 'o': 0 });
        this.set('player', 'x');
        var markers = this.get('markers');
      }
    }

  });
});
define('web-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('web-app/controllers/game', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      'save-highscore': function saveHighscore(name, score) {
        var controller = this;
        var highscore = controller.store.createRecord('highscore', {
          name: name,
          score: score
        });
        highscore.save().then(function () {
          controller.store.unloadAll();
          controller.transitionToRoute('highscores');
        });
      }
    }
  });
});
define('web-app/helpers/app-version', ['exports', 'web-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('web-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('web-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('web-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'web-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('web-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('web-app/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('web-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('web-app/initializers/export-application-global', ['exports', 'web-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('web-app/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('web-app/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('web-app/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("web-app/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('web-app/models/highscore', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    score: _emberData.default.attr('number')
  });
});
define('web-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('web-app/router', ['exports', 'web-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('game', { path: '/' });
    this.route('highscores');
  });

  exports.default = Router;
});
define('web-app/routes/game', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('web-app/routes/highscores', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('highscore');
    }
  });
});
define('web-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("web-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "U8WucRrY", "block": "{\"symbols\":[],\"statements\":[[6,\"section\"],[9,\"id\",\"app\"],[7],[0,\"\\n  \"],[6,\"header\"],[7],[0,\"\\n    \"],[6,\"h1\"],[7],[4,\"link-to\",[\"game\"],null,{\"statements\":[[0,\"Connect Four\"]],\"parameters\":[]},null],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"article\"],[7],[0,\"\\n    \"],[1,[18,\"outlet\"],false],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"footer\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"float-left\"],[7],[0,\"\\n      Powered by Ember.\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"float-right\"],[7],[0,\"\\n      \"],[4,\"link-to\",[\"highscores\"],null,{\"statements\":[[0,\"High-scores\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/application.hbs" } });
});
define("web-app/templates/components/connect-four", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kGUMUOIY", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"playing\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"winner\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[7],[0,\"\\n          Player \"],[1,[18,\"winner\"],false],[0,\" won!\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"draw\"]]],null,{\"statements\":[[0,\"            We'll call it a draw.\\n\"]],\"parameters\":[]},null],[0,\"        \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"start\"]],[7],[0,\"Restart\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"start\"]],[7],[0,\"Start\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[6,\"canvas\"],[9,\"id\",\"stage\"],[9,\"width\",\"380\"],[9,\"height\",\"360\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/connect-four.hbs" } });
});
define("web-app/templates/components/number-game", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/HETmdLq", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"playing\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"correct\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"text-center\"],[7],[0,\"Yes! It only took me \"],[1,[18,\"guesses\"],false],[0,\" guesses.\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"text-center\"],[7],[0,\"Do you want to \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"start\"]],[7],[0,\"play again!\"],[8],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"text-center\"],[7],[1,[25,\"input\",null,[[\"value\",\"placeholder\"],[[20,[\"player_name\"]],\"Your Name\"]]],false],[6,\"button\"],[3,\"action\",[[19,0,[]],\"save-highscore\"]],[7],[0,\"Save Highscore!\"],[8],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"text-center\"],[7],[0,\"Is it \"],[1,[18,\"guessValue\"],false],[0,\"?\"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"text-center\"],[7],[0,\"\\n      \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"lower\"]],[7],[0,\"Lower\"],[8],[0,\"\\n      \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"correct\"]],[7],[0,\"Correct\"],[8],[0,\"\\n      \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"higher\"]],[7],[0,\"Higher\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[6,\"div\"],[9,\"class\",\"text-center\"],[7],[0,\"Think of a number between 1 and 100 and then press \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"start\"]],[7],[0,\"Start!\"],[8],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/number-game.hbs" } });
});
define("web-app/templates/components/question-1", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1Y6rJ1KU", "block": "{\"symbols\":[],\"statements\":[[6,\"canvas\"],[9,\"id\",\"thestage\"],[9,\"width\",\"380\"],[9,\"height\",\"380\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/question-1.hbs" } });
});
define("web-app/templates/components/question-2", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CEa99tGH", "block": "{\"symbols\":[],\"statements\":[[6,\"canvas\"],[9,\"id\",\"thestage\"],[9,\"width\",\"380\"],[9,\"height\",\"380\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/question-2.hbs" } });
});
define("web-app/templates/components/question-3", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wDoewXkQ", "block": "{\"symbols\":[],\"statements\":[[6,\"canvas\"],[9,\"id\",\"thestage\"],[9,\"width\",\"380\"],[9,\"height\",\"380\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/question-3.hbs" } });
});
define("web-app/templates/components/question-4", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DxcOqGm4", "block": "{\"symbols\":[],\"statements\":[[6,\"canvas\"],[9,\"id\",\"thestage\"],[9,\"width\",\"380\"],[9,\"height\",\"380\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/question-4.hbs" } });
});
define("web-app/templates/components/question-5", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IG+3nUs5", "block": "{\"symbols\":[],\"statements\":[[6,\"canvas\"],[9,\"id\",\"thestage\"],[9,\"width\",\"380\"],[9,\"height\",\"380\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/question-5.hbs" } });
});
define("web-app/templates/components/tic-tac-toe", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+V38C1Pk", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"playing\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"winner\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[7],[0,\"\\n          Player \"],[1,[18,\"winner\"],false],[0,\" won!\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[20,[\"draw\"]]],null,{\"statements\":[[0,\"            We'll call it a draw.\\n\"]],\"parameters\":[]},null],[0,\"        \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"start\"]],[7],[0,\"Restart\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"start\"]],[7],[0,\"Start\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[6,\"canvas\"],[9,\"id\",\"stage\"],[9,\"width\",\"380\"],[9,\"height\",\"380\"],[7],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/components/tic-tac-toe.hbs" } });
});
define("web-app/templates/game", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aso+Id3s", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"connect-four\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/game.hbs" } });
});
define("web-app/templates/highscores", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dn3OzxQf", "block": "{\"symbols\":[\"item\"],\"statements\":[[6,\"div\"],[9,\"class\",\"text-center\"],[7],[0,\"\\n  \"],[6,\"h2\"],[7],[0,\"High-scores\"],[8],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"ol\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"model\"]]],null,{\"statements\":[[0,\"  \"],[6,\"li\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"float-left\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"float-right\"],[7],[1,[19,1,[\"score\"]],false],[8],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "web-app/templates/highscores.hbs" } });
});


define('web-app/config/environment', [], function() {
  var prefix = 'web-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("web-app/app")["default"].create({"name":"web-app","version":"0.0.0+f70ab5fe"});
}
//# sourceMappingURL=web-app.map
