(function () {
  const nextButton = document.getElementById("activityNextPageBtn");
  const exVal = document.querySelector('input[id="ex-choice"]');
  const key = "FbfFoXfcu1pqZGL1wfm5ng==s1ZwGIbhzW13ihcu";
  const card1 = document.getElementById("suggestions");

  function goHome() {
    document.location = "index.html";
  }

  $(function () {
    const handle = $("#custom-handle");
    const availableTags = [
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

    $("#ex-choice").autocomplete({
      source: availableTags,
    });

    $("#slider").slider({
      value: 30,
      max: 120,
      create: function () {
        handle.text($(this).slider("value"));
      },
      slide: function (event, ui) {
        handle.text(ui.value);
      },
    });
  });

  nextButton.addEventListener("click", goHome);

  function exDisplay(e) {
    e.preventDefault();
    if (exVal.value === "") {
      exVal.focus();
    } else {
      document.getElementById("suggestions").style.display = "flex";
      nextButton.style.display = "flex";
      exSearch();
    }
  }

  function exSearch() {
    $("#suggestions").empty();
    const val = $("#slider").slider("value");
    const queryURL =
      "https://api.api-ninjas.com/v1/caloriesburned?&activity=" +
      exVal.value +
      "&duration=" +
      val;

    fetch(queryURL, {
      headers: { "X-Api-Key": key },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then(function (data) {
        if (data.length === 0) {
          const displayMessage = document.createElement("p");
          displayMessage.setAttribute(
            "class",
            "flex items-center justify-center w-full h-1/3 leading-relaxed"
          );
          displayMessage.textContent =
            "We couldn't find that exercise! Please try again.";
          card1.append(displayMessage);
        } else {
          let counter = 1;
          for (let i = 0; i < 3; i++) {
            const exercise = document.createElement("p");
            exercise.setAttribute("class", "w-full h-48 shadow-lg flex p-4");
            exercise.textContent = `${counter}. ${data[i].name}. Great Pick! You will burn ${data[i].total_calories} calories doing this for ${val} minutes!`;
            card1.append(exercise);
            counter++;
          }
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  }

  document.getElementById("activity-form").addEventListener("submit", exDisplay);
})();
