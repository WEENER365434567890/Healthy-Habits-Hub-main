const nextButton = document.getElementById("activityNextPageBtn");
const exVal = document.querySelector('input[id = "ex-choice"]');
const Key = "FbfFoXfcu1pqZGL1wfm5ng==s1ZwGIbhzW13ihcu";
const card1 = document.getElementById("suggestions");

function goHome() {
  document.location = "index.html";
}

$(function () {
  const handle = $("#custom-handle");
  // List of words able to autocomplete
  const availableTags = [
    "Run",
    "Walk",
    "Darts",
    "Shuffleboard",
    "Raking lawn",
    "Aerobics",
    "Stairs",
    "Steps",
    "Rowing",
    "Cycling",
    "Bicycling",
  ];

  // Identifies the id of input to autocomplete
  $("#ex-choice").autocomplete({
    source: availableTags,
  });

  // Assigns current slider value to the slider for user visual
  $("#slider").slider({
    value: 30,
    max: 120,
    create() {
      handle.text($(this).slider("value"));
    },
    slide(event, ui) {
      handle.text(ui.value);
    },
  });
});

nextButton.addEventListener("click", goHome);

function exDisplay(e) {
  e.preventDefault();
  if (exVal.value === "") {
    document.getElementById("ex-choice").focus();
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
    headers: { "X-Api-Key": "FbfFoXfcu1pqZGL1wfm5ng==s1ZwGIbhzW13ihcu" },
  })
    .then((response) => response.json())
    .then((data) => {
      let counter = 1;
      for (let i = 0; i < 3; i++) {
        if (data.length === 0) {
          const displayMessage = document.createElement("p");
          displayMessage.setAttribute(
            "class",
            "flex items-center justify-center w-full h-1/3 leading-relaxed"
          );
          displayMessage.textContent =
            "We couldn't find that exercise!  Please try again.";

          card1.append(displayMessage);
        }

        const exercise1 = document.createElement("p");
        exercise1.setAttribute(
          "class",
          "w-full h-48 shadow-lg flex p-4"
        );
        exercise1.textContent =
          `${counter}.  ${data[i].name}.  Great Pick! You will burn ${data[i].total_calories} calories doing this for ${val} minutes!`;
        card1.append(exercise1);

        counter++;
      }
    });
}

document.getElementById("activity-form").addEventListener("submit", exDisplay);
// The code above sets up an event listener for an activity form and enables autocomplete for the input field. It also assigns the current slider value to the user interface, and a function to search for exercise information. The code also has a function to display exercise information and a function to redirect to the home page.