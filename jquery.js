var playing = false;
var score;
var trialsLeft;
var steps;
var action;

var fruit = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];

$(function(){
      // Click on Start Reset Button
      $("#startreset").click(function(){
        //Are we playing?
        if(playing == true)           //yes
        {
          //Reload Page
          location.reload();
        }
        else                          //no
        {
            playing = true;
            score = 0;
            trialsLeft = 3;

            //Hide Gameover Div
            $("#gameover").hide();

            //Change button Text To "Reset Game"
            $("#startreset").html("Reset Game");
            //Set Score to Zero Initially
            $("#scorevalue").html(score);

            //Show Trials Box
            $("#trialsLeft").show();
            //Show Trials Left (Life Left)

            showHearts();

            // Create Random Fruit
            startAction();

            // $("#fruitContainer").append('<img src="images/'+fruit[Math.round(8*Math.random())]+'.png">');
        }
      });


      $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);

        // document.getElementById("slicesound").play();
        $("#slicesound")[0].play();
        clearInterval(action);

        $("#fruit1").hide();
        // $("#fruit1").hide("explode");

        setTimeout(startAction);
      });

      // Functions Area

      function showHearts()
      {
        $("#trialsLeft").empty();
        for(i=0;i<trialsLeft;i++)
        {
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
      }

      function startAction(){
        //Step 1
        $("#fruit1").show();
        // Generate a fruit from fruit array
        $("#fruit1").attr('src', 'images/'+fruit[Math.round(8*Math.random())]+'.png');

        //Random Steps : Left Postion is altered Randomly whereas Top Position is fixed
        //Container Width is 670 and image width is 100 So : 670-100 = 570
        $("#fruit1").css({'left': Math.round(570* Math.random()),'top': -50});

        steps = 1 + Math.round(5*Math.random());
        //Moving Fruits Down
        action = setInterval(function(){
          $("#fruit1").css('top', $("#fruit1").position().top + steps);

          if ($("#fruit1").position().top > $("#fruitContainer").height() )
          {

               //Check if Trials Left
               if(trialsLeft > 1)
               {
                  //Yes: Repeat Step 1
                  $("#fruit1").show();
                  // Generate a fruit from fruit array
                  $("#fruit1").attr('src', 'images/'+fruit[Math.round(8*Math.random())]+'.png');

                  //Random Steps : Left Postion is altered Randomly whereas Top Position is fixed
                  //Container Width is 670 and image width is 100 So : 670-100 = 570
                  $("#fruit1").css({'left': Math.round(570* Math.random()),'top': -50});

                  trialsLeft --;

                  //Reduce Hearts to trialsLeft (Life Left)
                  showHearts();

                }
                else
                {
                  //Game Over
                    playing = false;

                    clearInterval(action);
                    $("#fruit1").hide();
                    $("#trialsLeft").hide();

                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over</p><p>Your Score is "+ score +"</p>");
                    $("#startreset").html("Start Game");
                }
          }
        },10);
      }

});
