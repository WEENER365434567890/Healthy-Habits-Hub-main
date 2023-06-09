var nextButton = document.getElementById("activityNextPageBtn");
var exVal = document.querySelector('input[id = "ex-choice"]');
var Key = "FbfFoXfcu1pqZGL1wfm5ng==s1ZwGIbhzW13ihcu";
var card1 = document.getElementById("suggestions");

function gohome() {
  document.location = "index.html";
}

$( function() {
    var handle = $( "#custom-handle" ); 
    //List of words able to autocomplete   
    var availableTags = [
        "Run",
        "Walk",
        "Aerobics",
        "Rowing",
        "Cycling",
        "Bicycling",
        "Skiing",
        "Cross country",
        "Ping pong",
        "Tennis",
        "Volleyball",
        "Golf",
        "Boxing",
        "Baseball",
        "Hockey",
        "Surfing",
        "Sailing",
        "Bowling",
        "Skateboarding",
        "Diving",
        "Frisbee",
        "Dodgeball",
        "Climbing",
        "BMX",
        "Basketball",
        "Soccer",
        "Football", 
      ];

      //Identifies the id of input to autocomplete
    $( "#ex-choice" ).autocomplete({
        source: availableTags
      });

    //Assigns current slider value to the slider for user visual
    $( "#slider" ).slider({
        value:30,
        max: 120,
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value ); 
        }
    });
  } );

nextButton.addEventListener("click", gohome);

function exDisplay(e) {
  e.preventDefault();
  if (exVal.value === "") {
    document.getElementById("ex-choice").focus();
  } else document.getElementById("suggestions").style.display = "flex";
    nextButton.style.display = "flex";
  
  exSearch();
}

function exSearch() {
  $("#suggestions").empty();
  var val = $("#slider").slider("value");
  var queryURL =
    "https://api.api-ninjas.com/v1/caloriesburned?&activity=" +
    exVal.value +
    "&duration=" +
    val;
  fetch(queryURL, {
    headers: { "X-Api-Key": "FbfFoXfcu1pqZGL1wfm5ng==s1ZwGIbhzW13ihcu" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
       
      let counter = 1;
      for (let i = 0; i < 3; i++) {
        if ((data.length === 0)) {
          var displayMessage = document.createElement("p");
          displayMessage.setAttribute(
            "class",
            "flex items-center justify-center w-full h-1/3 leading-relaxed"
          );
          displayMessage.textContent =
            "We couldn't find that exercise!  Please try again.";
  
          card1.append(displayMessage);
        }
  

        var exercise1 = document.createElement("p");
        exercise1.setAttribute(
          "class",
          "w-full h-48 shadow-lg flex p-4"
        );
        exercise1.textContent =
          counter + '.  ' +
          data[i].name +
          ".  Great Pick! You will burn " +
          data[i].total_calories +
          " calories doing this for " +
          val +
          " minutes!";
        card1.append(exercise1);
        
        counter++;
      }
    });
}

document.getElementById('activity-form').addEventListener("submit", exDisplay);
