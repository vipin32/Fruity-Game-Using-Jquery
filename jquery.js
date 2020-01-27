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
        if(playing == true)          
        {
          //Reload Page
          location.reload();
        }
        else                          
        {
            playing = true;
            score = 0;
            trialsLeft = 3;

            $("#gameover").hide();

            $("#startreset").html("Reset Game");
            $("#scorevalue").html(score);

            $("#trialsLeft").show();
  
            showHearts();

            // Create Random Fruit
            startAction();
        }
      });

      //Slice a fruit and increase score
      $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);

        $("#slicesound")[0].play();
        clearInterval(action);

        $("#fruit1").hide();

        setTimeout(startAction);
      });

      //All Functions
      
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
        // Generating a fruit from fruit array
        $("#fruit1").attr('src', 'images/'+fruit[Math.round(8*Math.random())]+'.png');

        //Container Width is 670 and image width is 100 So :So Random position is between 670-100 = 570
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

                  //Container Width is 670 and image width is 100 So :So Random position is between 670-100 = 570
                  $("#fruit1").css({'left': Math.round(570* Math.random()),'top': -50});

                  trialsLeft --;

                  //Decrease Hearts(Total TrialsLeft)
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
