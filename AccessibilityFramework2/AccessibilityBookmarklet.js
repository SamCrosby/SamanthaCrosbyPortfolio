
/**
Some websites did not work with the framework because they did not have
the jQuery. To fix this a script was created in each of the websites
this framework is used on. It retrieves the head, creates the tag and
 prepends the script to the head tag. 
*/

//This retrieve the head element by its tag name
var head = document.getElementsByTagName('head')[0];
//This creates the script tag
var script = document.createElement('script');
//This sets the script type as text/javascript
script.type = 'text/javascript';
//This sets the source of the script as the jQuery link from the Google apis page.
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
//This sets the script as the first child of the head tag. This was to prevent any other scripts from running before it.
head.prepend(script);

$(document).ready(function() {

//This is the function that checks for empty alt tags. It selects all of the alt attributes for the images.
  $("img").attr("alt", function() {
    //This is the variable that retrieves and holds all of the alt text.
      var alt = $(this).attr("alt");

    /**
    This is the if statement that checks if the alt tags are empty. If they are,
    then an error box appears with the message "Image missing alternative text."
    */
      if(alt == "") {
	      // alert("Image missing alternative text");
        //This is the error box and the corresponding text that appears after the instance of missing alt text.
        $("<div>Image missing alternative text.</div>").insertAfter(this).addClass("error");
        //This is the styling for the error boxes. It produces a rounded red box with white text.
        $(".error").css({
          'background-color': 'red',
          'color': 'white',
          'width': '100px',
          'padding': '5px',
          'border': 'none',
          'margin': '0',
          'font-family':'sans-serif',
        });
      }
      });

      //This is the function for checking if there is duplicate alternative text.
      $("img").attr("alt", function() {
          //This retrieves all of the alt tags and places them in the alter variable
          var alter = $(this).attr("alt");
          //This is the array that contains the list of all the alternative text.
          var alternativeList = [];

    /**
    This function goes through each image, retrieves the alternative Text
    and then pushes it to the alternativeList array.
    */
      $("img").each(function(){
        var alter = $(this).attr("alt");
        alternativeList.push(alter);
        // alert(alternativeList);
    });

      //This is the variable tally that holds the amount of times a specific alternative text has appeared.
        var tally = 0;

        // alert(alternativeList.length);

        /*
        *This is the for loop that goes through the list of alternative text, checking if the
        alternative text has appeared. Each time an alt text appears, the tally goes up by 1.
        Since the list will always have atleast one of the alt tags in the array, the tally
        must be more than or equal to 2 for it to appear with the duplicate alt text error box.
        */
        for (i = 0; i < alternativeList.length; i++) {
          //This is the if statement that checks the alt text in the array is equal to one of the images alt tags.
            if (alternativeList[i] === alter){
              // alert(alternativeList[i]);

              //This is the tally that goes up by 1 each time an alt text appears
              tally = tally + 1;
              // alert(tally);

              //This is the if statement that checks whether the tally of alt text is more than or equal to 2.
                if (tally >= 2) {
                  // alert("Image has alternative text duplicate");

                  //This is the error box and the corresponding text that appears after the instance of duplicate alt text.
                  $("<div>Image has alternative text duplicate.</div>").insertAfter(this).addClass("error");

                  //This is the styling for the error boxes. It produces a rounded red box with white text.
                    $(".error").css({
                      'background-color': 'red',
                      'color': 'white',
                      'width': '100px',
                      'padding': '5px',
                      'border': 'none',
                      'margin': '0',
                      'font-family':'sans-serif',
                    });
                     break;
                }
              }
          //  else {
          //    // alert(alternativeList);
          // }
        }
        // }

      });







      //This is the function that checks for duplicate id's. It selects the id attributes for all of the elements.
      $("*").attr("id", function() {
        //This variable retrieves and stores all of the id's in the id variable.
        var id = $(this).attr("id");
        //This is the array for the list of id's.
        var idList = [];

        //This function retrieves all the id's for each of the elements and pushes them into the idList array.
          $("*").each(function(){
            //This retrieves and stores all of the id's in the id variable.
            var id = $(this).attr("id");
            //This pushes the id's into the idList array.
            idList.push(id);
            // alert(idList);
        });

        /**
        This is the function that removes all of the empty id's from the array.
        It uses the method grep to check if the id's are empty and then removes them.
        */
        var  idList2 = $.grep(idList,function(n){
           return n == 0 || n
         });
         // alert(idList);

          //This is the variable tally which holds how many times an id has appeared.
            var tally = 0;
            //Due to the empty id's, this if statement was necessary to check to make sure the id's are not undefined.
            // If they are not then they go through to the for loop.
            if (id !== undefined){
            //This for loop goes through the list of id's which are not empty.
              for (i = 0; i < idList2.length; i++) {
                //If the id in the list is equal to one of the id's, the tally goes up by one.
                  if (idList2[i] === id){
                  //This is the tally that goes up by 1 each time an id appears.
                  tally = tally + 1;
                  // alert(tally);

                    /**
                    Since the array will always have atleast one of the id tags in the array, the tally
                    must be more than or equal to 2 for it to appear with the duplicate id error box.
                    */
                    /**
                    This is the if statement that checks if the tally is more than or equal to 2.
                    If it is, then the duplicate id error box appears.
                    */
                      if (tally >= 2) {
                        // alert("There are duplicate id's.");
                        //This is the error box and the corresponding text that appears after the instance of duplicate id's.
                        $("<div>There are duplicate id's.</div>").insertAfter(this).addClass("error");
                        //This is the styling for the error boxes. It produces a rounded red box with white text.
                        $(".error").css({
                          'background-color': 'red',
                          'color': 'white',
                          'width': '100px',
                          'padding': '5px',
                          'border': 'none',
                          'margin': '0',
                          'font-family':'sans-serif',
                        });
                        break
                      }
                }
                // else {
                  // alert(idList2);
                // }
              }
            }

      });

    // This is the function that checks for empty links. It selects all of the href attributes for the links.
    $("a").attr("href", function() {
      //This is the variable that retrieves and holds all of the href's
        var link = $(this).attr("href");
        //If the href is empty, then the empty link error box appears above the empty link.
        if(link == "") {
          // alert("Link is empty.");
          //This is the error box and the corresponding text that appears after the instance of empty links.
          $("<div>Link is empty.</div>").prependTo(this).addClass("error");
          //This is the styling for the error boxes. It produces a rounded red box with white text.
          $(".error").css({
            'background-color': 'red',
            'color': 'white',
            'width': '100px',
            'padding': '5px',
            'border': 'none',
            'margin': '0',
            'font-family':'sans-serif',
          });
        }
    });


//This is the function that checks for empty language tags. It first selects the language attribute of the html tag.
  $("html").attr("lang", function() {
    //This is the variable that retrieves and stores the content of the lang attribute.
      var lang = $(this).attr("lang");
      //This is the if statement that checks whether the lang attribute is empty. If it is,
      // then the missing language error box will appear.
      if(lang == "") {
        // alert("Missing language");
        //This is the error box and the corresponding text that appears after the instance of the emtpy language attribute.
        $("<div>Missing document language.</div>").appendTo("body").addClass("error");
        //This is the styling for the error boxes. It produces a rounded red box with white text.
        $(".error").css({
          'background-color': 'red',
          'color': 'white',
          'width': '100px',
          'padding': '5px',
          'border': 'none',
          'margin': '0',
          'font-family':'sans-serif',
        });
      }
  });

//This is the function that checks for empty buttons. It selects the text for all of the buttons.
  $("button").html(function() {
    //This variable retrieves and holds all of the text for the buttons.
      var button_text = $(this).html();
      //This if statment checks whether the buttons have empty text. If a button does have empty text,
      //then the error box for empty button will appear after the button.
      if(button_text == "") {
        // alert("Missing button text");
        //This is the error box and the corresponding text that appears after the instance of an empty button.
        $("<div>Missing button text.</div>").insertAfter(this).addClass("error");
        //This is the styling for the error boxes. It produces a rounded red box with white text.
        $(".error").css({
          'background-color': 'red',
          'color': 'white',
          'width': '100px',
          'padding': '5px',
          'border': 'none',
          'margin': '0',
          'font-family':'sans-serif',
        });
      }
  });

  /**
  This function retrieves all the text from the headers. If the header text is empty,
   an error box appears after the headers with the message "Missing heading text.".
  */
  $(":header").html(function() {
    //This is the variable that retrieves and holds all of the header text.
      var header = $(this).html();
      //This if statement checks if the header is empty.
      // If the header is empty, then the missing heading text error box appears.
      if(header == "") {
        // alert("Missing heading text");

        //This is the error box and the corresponding text that appears after the instance of missing heading text.
        $("<div>Missing heading text.</div>").insertAfter(this).addClass("error");
        //This is the styling for the error boxes. It produces a rounded red box with white text.
        $(".error").css({
          'background-color': 'red',
          'color': 'white',
          'width': '100px',
          'padding': '5px',
          'border': 'none',
          'margin': '0',
          'font-family':'sans-serif',
        });
      }
  });


//This is the fucntion that checks list items are contained within <ul> or <ol> parents.
   $("li", document.body).each(function() {
     //This is the variable that retrieves the parent tag of the list item.
     var parentTag = $(this).parent().get(0).tagName;
     //If the list item's parent is not ul or ol, then it produces an error box for that list item.
     if(parentTag !== "UL", parentTag !== "OL") {
       // alert("List is not contained within <ul> or <ol> parent element.")
       //This is the error box and the corresponding text that appears after the instance of list items not being contained within ul or ol parents.
       $("<div>List is not contained within ul or ol parent elements.</div>").prependTo(this).addClass("error");
       //This is the styling for the error boxes. It produces a rounded red box with white text.
       $(".error").css({
         'background-color': 'red',
         'color': 'white',
         'width': '100px',
         'padding': '5px',
         'border': 'none',
         'margin': '0',
         'font-family':'sans-serif',
       });
    }
   });

//This is the function that checks whether a form is missing a label.
   $( "input", document.body ).each(function() {
     //This variable retrieves and holds the tag name of the inputs sibling.
     var siblingTag = $( this ).siblings().get( 0 ).tagName;
     // alert(siblingTag);
     //If the sibling tag is not label, then an error box will appear.
     if(siblingTag !== "LABEL") {
       // alert("Form is missing a label")
       $("<div>Form is missing a label.</div>").insertAfter(this).addClass("error");
       //This is the styling for the error boxes. It produces a rounded red box with white text.
       $(".error").css({
         'background-color': 'red',
         'color': 'white',
         'width': '100px',
         'padding': '5px',
         'border': 'none',
         'margin': '0',
         'font-family':'sans-serif',
       });
   }

   });


   //This is the function that checks there are not too many form labels.
   $("form", document.body).each(function() {
     //This is the variable that holds all the inputs.
     var input = $(this).children("input");
     //This is the variable that holds all of the labels.
     var labels = $(this).children("label");

     /**
     This if statement checks if there are more labels than inputs.
     If there are, then the multiple label error appears after the form.
     */
     if(labels.length > input.length) {
       //This is the error box and the corresponding text that appears after the instance of too many labels in a form.
       $("<div>Multiple form labels.</div>").insertAfter(this).addClass("error");
       //This is the styling for the error boxes. It produces a rounded red box with white text.
       $(".error").css({
         'background-color': 'red',
         'color': 'white',
         'width': '100px',
         'padding': '5px',
         'border': 'none',
         'margin': '0',
         'font-family':'sans-serif',
       });
     }

   });


//This function checks to make sure text is not smaller than 10px.
   $("html, body, p, h1, h2, h3, h4, h5, h6, a").each( function() {
     //The size variable retrieves and holds all of the font-size for the tags.
     var size = $(this).css('font-size')
     //The remove variable removes the 'px' for each of the sizes in the size variable.
     var remove = size.replace(/px/gi, "");

     /**
     The if statement then checks each of the sizes. If they are less than 10,
     the corresponding error box will then appear after the error.
     */
     if(remove < 10) {
       //This is the error box and the corresponding text that appears after the instance of font size being too small.
       $("<div>Text too small.</div>").insertAfter(this).addClass("error");
       //This is the styling for the error boxes. It produces a rounded red box with white text.
       $(".error").css({
         'background-color': 'red',
         'color': 'white',
         'width': '100px',
         'padding': '5px',
         'border': 'none',
         'margin': '0',
         'font-family':'sans-serif',
       });
     }
     // alert(fontSizes);
   });


});
