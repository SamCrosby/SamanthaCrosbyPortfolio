var prize = "";
var winner = "";

function popup() {
  if(prize == "") {
    // Get the modal
    var modal = document.getElementById('modal');
  //
  //   // Get the button that opens the modal
    var btn = document.getElementById("spin");
  //
  //   // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

   // When the user clicks on the button, open the modal
    modal.style.display = "block";

   // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
  }
}

function speechBubble() {
  var speech = document.getElementById("speech");
      if (speech.style.display === "none") {
          speech.style.display = "block";
      } else {
          speech.style.display = "none";
      }
  }

    // var angle = Math.floor(Math.random() * 361);

    function spin() {
        var modal = document.getElementById('modal');
        modal.style.display = "none";


        var weight = Math.floor(Math.random() * 49);

        if(weight == 48) {
          prize = "An all expenses paid trip!";
          document.getElementById("moose").style.transform = "rotate(742deg)";
          document.getElementById("moose").style.WebkitTransitionDuration="2s";
          // window.alert("You have won an all expenses paid trip!");
        } else if((weight >= 46) && (weight => 47)) {
          prize = "A free flight!";
          document.getElementById("moose").style.transform = "rotate(1013deg)";
          document.getElementById("moose").style.WebkitTransitionDuration="2s";
          // window.alert("You have won a free flight!");
        } else if((weight >= 41) && (weight => 45)) {
          prize = "	&pound;100 off!";
          document.getElementById("moose").style.transform = "rotate(833deg)";
          document.getElementById("moose").style.WebkitTransitionDuration="2s";
          // window.alert("You have won a £100 off!");
        } else if((weight >= 36) && (weight => 40)) {
          prize = "	&pound;20 off!";
          document.getElementById("moose").style.transform = "rotate(1058deg)";
          document.getElementById("moose").style.WebkitTransitionDuration="2s";
          // window.alert("You have won a £20 off!");
        } else if((weight >= 27) && (weight => 35)) {
          prize = "	&pound;10 off!";
          document.getElementById("moose").style.transform = "rotate(923deg)";
          document.getElementById("moose").style.WebkitTransitionDuration="2s";
          // window.alert("You have won a £10 off!");
        } else if((weight >= 22) && (weight => 26)) {
          prize = "Prize 1!";
          document.getElementById("moose").style.transform = "rotate(878deg)";
          document.getElementById("moose").style.WebkitTransitionDuration="2s";
          // window.alert("You have won prize 1!");
        } else if((weight >= 13) && (weight => 21)) {
          prize = "Prize 2!";
          document.getElementById("moose").style.transform = "rotate(968deg)";
          document.getElementById("moose").style.WebkitTransitionDuration="2s";
          // window.alert("You have won prize 2!");
        } else if((weight >= 0) && (weight => 12)) {
          prize = "Prize 3!";
          document.getElementById("moose").style.transform = "rotate(878deg)";
          document.getElementById("moose").style.WebkitTransitionDuration="2s";
          // window.alert("You have won prize 3!");
        }
        var winner = "won";
        var speech = document.getElementById("speech");
        var bubble = document.getElementById("bubble");

        if (speech.style.display === "none") {
            speech.style.display = "block";
            // bubble.style.display = "block";
            if (bubble.style.display === "none") {
                 bubble.style.display = "block";
                 // bubble.style.display = "block";
             }
        }

        document.getElementById("prizes").innerHTML = prize;



    }
