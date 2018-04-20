import Component from '@ember/component';

//This clones the state matrix so that when the
//minimax algorithm creates the game tree, it has to
//hold all possible moves soit needs lots of copies
//of the state matrix.
function deepClone(state) {
  var new_state = [];
  for(var idx1 = 0; idx1 < state.length; idx1++) {
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
    [[0,0], [0,1], [0,2], [0,3]],
    [[0,1], [0,2], [0,3], [0,4]],
    [[0,2], [0,3], [0,4], [0,5]],
    //vertical line 2
    [[1,0], [1,1], [1,2], [1,3]],
    [[1,1], [1,2], [1,3], [1,4]],
    [[1,2], [1,3], [1,4], [1,5]],
    //vertical line 3
    [[2,0], [2,1], [2,2], [2,3]],
    [[2,1], [2,2], [2,3], [2,4]],
    [[2,2], [2,3], [2,4], [2,5]],
    //vertical line 3
    [[3,0], [3,1], [3,2], [3,3]],
    [[3,1], [3,2], [3,3], [3,4]],
    [[3,2], [3,3], [3,4], [3,5]],
    //vertical line 4
    [[4,0], [4,1], [4,2], [4,3]],
    [[4,1], [4,2], [4,3], [4,4]],
    [[4,2], [4,3], [4,4], [4,5]],
    //vertical line 3
    [[5,0], [5,1], [5,2], [5,3]],
    [[5,1], [5,2], [5,3], [5,4]],
    [[5,2], [5,3], [5,4], [5,5]],
    //vertical line 3
    [[6,0], [6,1], [6,2], [6,3]],
    [[6,1], [6,2], [6,3], [6,4]],
    [[6,2], [6,3], [6,4], [6,5]],

    // //horizontal line 1
    [[0,0], [1,0], [2,0], [3,0]],
    [[1,0], [2,0], [3,0], [4,0]],
    [[2,0], [3,0], [4,0], [5,0]],
    [[3,0], [4,0], [5,0], [6,0]],
    // //horizontal line 2
    [[0,1], [1,1], [2,1], [3,1]],
    [[1,1], [2,1], [3,1], [4,1]],
    [[2,1], [3,1], [4,1], [5,1]],
    [[3,1], [4,1], [5,1], [6,1]],
    // //horizontal line 3
    [[0,2], [1,2], [2,2], [3,2]],
    [[1,2], [2,2], [3,2], [4,2]],
    [[2,2], [3,2], [4,2], [5,2]],
    [[3,2], [4,2], [5,2], [6,2]],
    // //horizontal line 4
    [[0,3], [1,3], [2,3], [3,3]],
    [[1,3], [2,3], [3,3], [4,3]],
    [[2,3], [3,3], [4,3], [5,3]],
    [[3,3], [4,3], [5,3], [6,3]],
    // //horizontal line 5
    [[0,4], [1,4], [2,4], [3,4]],
    [[1,4], [2,4], [3,4], [4,4]],
    [[2,4], [3,4], [4,4], [5,4]],
    [[3,4], [4,4], [5,4], [6,4]],
    // //horizontal line 6
    [[0,5], [1,5], [2,5], [3,5]],
    [[1,5], [2,5], [3,5], [4,5]],
    [[2,5], [3,5], [4,5], [5,5]],
    [[3,5], [4,5], [5,5], [6,5]],

    //Diagonal line 1
    [[0,3], [1,2], [2,1], [3,0]],

    //Diagonal line 2
    [[0,4], [1,3], [2,2], [3,1]],
    //Diagonal line 2.1
    [[1,4], [2,3], [3,2], [4,1]],
    //Diagonal line 2.2
    [[1,3], [2,2], [3,1], [4,0]],

    //Diagonal line 3
    [[0,5], [1,4], [2,3], [3,2]],
    //Diagonal line 3.2
    [[1,4], [2,3], [3,2], [4,1]],
    //Diagonal line 3.3
    [[2,3], [3,2], [4,1], [5,0]],

    //Diagonal line 4
    [[1,5], [2,4], [3,3], [4,2]],
    //Diagonal line 4.1
    [[2,4], [3,3], [4,2], [5,1]],
    //Diagonal line 4.2
    [[3,3], [4,2], [5,1], [6,0]],

    //Diagonal line 5
    [[2,5], [3,4], [4,3], [5,2]],
    //Diagonal line 5.1
    [[3,4], [4,3], [5,2], [6,1]],

    //Diagonal line 6
    [[3,5], [4,4], [5,3], [6,2]],

    //Top right to bottom left
    //Diagonal line 1
    [[3,0], [4,1], [5,2], [6,3]],

    // Diagonal line 2
    [[2,0], [3,1], [4,2], [5,3]],
    // Diagonal line 2.1
    [[3,1], [4,2], [5,3], [6,4]],

    // Diagonal line 3
    [[1,0], [2,1], [3,2], [4,3]],
    // Diagonal line 3.1
    [[2,1], [3,2], [4,3], [5,4]],
    // Diagonal line 3.2
    [[3,2], [4,3], [5,4], [6,5]],

    // Diagonal line 4
    [[0,0], [1,1], [2,2], [3,3]],
    // Diagonal line 4.1
    [[1,1], [2,2], [3,3], [4,4]],
    // Diagonal line 4.2
    [[2,2], [3,3], [4,4], [5,5]],

    // Diagonal line 5
    [[0,1], [1,2], [2,3], [3,4]],
    // Diagonal line 5.1
    [[1,2], [2,3], [3,4], [4,5]],

    // Diagonal line 6
    [[0,2], [1,3], [2,4], [3,5]],

  ];

  // This loops over all the patterns and assigns
  //each one to the pattern variable.
  for(var pidx = 0; pidx < patterns.length; pidx++) {
    var pattern = patterns[pidx];
    var winner = state[pattern[0][0]][pattern[0][1]];
    if(winner) {
      for(var idx = 1; idx < pattern.length; idx++) {
        if(winner != state[pattern[idx][0]][pattern[idx][1]]) {
          winner = undefined;
          break;
        }
      }
      if(winner) {
        return winner;
      }
    }
  }
  /*This checks for a draw if no winner has been found,
   by looping over all the squares to check they are
   not empty. */
    var draw = true;
    for(var x = 0; x <= 6; x++) {
      for(var y = 0; y <= 5; y++) {
        if(!state[x][y]) {
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
  var moves = []
  if(limit > 0) {
    //This loops over all the cells for potential moves
    for(var idx2 = 5; idx2 >= 0; idx2--) {
      for(var idx1 = 0; idx1 < 7; idx1++) {
        if(state[idx1][idx2] === undefined) {
          var move = {
            x: idx1,
            y: idx2,
            //deep clone function is used to store the state after the move
            state: deepClone(state),
            score: 0
          };
          move.state[idx1][idx2] = player;
          if(limit === 1 || check_game_winner(move.state) !== undefined) {
            if(check_game_winner(move.state) !== undefined) {
              //This checks whether the winner is the computer or human player.
              var winner = check_game_winner(move.state);
              //If the winner is the computer then it gives a score of 1000
              // to show it is a good result.
              if(winner === 'o2') {
                move.score = 1000;
                //If the winner is the human, then it gives a score of -1000
                //to show this is bad.
              } else if(winner === 'o1') {
                move.score = -1000;
              }
            }
          } else {
            //This returns a list of possible moves based on the move.state
            move.moves = minimax(move.state, limit - 1, player == 'o1' ? 'o2' : 'o1');
            var score = undefined;
            //These moves have a score attached to them so they can be
            //aggregated into the current move's score.
            for(var idx3 = 0; idx3 < move.moves.length; idx3++) {
              if(score === undefined) {
                score = move.moves[idx3].score;
              } else if(player === 'o1') {
                score = Math.max(score, move.moves[idx3].score);
              } else if(player === 'o2') {
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
  for(var idx = 0; idx < moves.length; idx++) {
    if(max_score === undefined || moves[idx].score > max_score) {
      max_score = moves[idx].score;
      move = {
        x: moves[idx].x,
        y: moves[idx].y
      }
    }
  }
  return move;
}


export default Component.extend({
  playing: false,
  winner: undefined,
  draw: false,
didInsertElement: function() {
  var stage = new createjs.Stage(this.$('#stage')[0]);
  //Creates the markers
  var markers = {
    'o1': [],
    'o2': []
  }
  for(var x = 0; x < 21; x++) {
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
  stage.update()
},

click: function(ev) {
  var component = this;
  //Checks game has been started and has not been won yet
  if(component.get('playing') && !component.get('winner')) {
    //Restricts the click event to the area of the board.
    if(ev.offsetX >= 40 && ev.offsetY >= 40 && ev.offsetX < 340 && ev.offsetY < 341) {
      /*This determines the cells. This is done by subtracting 40
      from the offset (because the board was moved 40 pixels in)
      and then dividing by 43 to get the column/row value. */
      var x = Math.floor((ev.offsetX - 40) / 43);
      var y = 5;
      //Checks the value at the x and y co-ordinates is false, which means it is empty.
      var state = component.get('state');
      while (state[x][y] == 'o1' || state[x][y] == 'o2'){
        y = y - 1;
      }

      // if(!state[x][y]) {
      //This stops the counters from going out the top of the board.
      if( y >= 0) {
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
        setTimeout(function() {
          //This checks the computer has not won or drawn.
          if(!component.get('winner') && !component.get('draw')) {
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
check_winner: function() {
  var state  = this.get('state');
  var winner = check_game_winner(state);
  if(winner !== undefined) {
    if(winner === '') {
      this.set('draw', true);
    } else {
      this.set('winner', winner);
    }
  }
},

actions: {
  start: function() {
    //This starts the game
    this.set('playing', true);
    //This sets the game to no winner yet
    this.set('winner', undefined);
    //This sets the game to no draw yet
    this.set('draw', undefined);
    this.set('state', [
      //These set all the cells on the board as being empty.
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined],

    ]);
    //This sets both the player and computer on 0 moves at first.
   this.set('moves', {'o1': 0, 'o2': 0});
   this.set('player', 'o1');
   var markers = this.get('markers');
   //This sets the total amount of counters and marks them as invisible to the users.
   for(var idx = 0; idx < 21; idx++) {
     markers.o1[idx].visible = false;
     markers.o2[idx].visible = false;
   }
   //This updates the board.
   this.get('stage').update();
  }
}
});
