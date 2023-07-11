// Start button event listener
document.getElementById("startBTN").addEventListener("click", function() {
    location.href = "userForm.html";
});

// Find user and populate summary
function findUser() {
    const currentUser = 'localUser';
    const summaryPage = document.getElementById("summary-page");
    const getStarted = document.getElementById("get-started");

    if (localStorage.getItem(currentUser)) {
        summaryPage.classList.remove("hidden");
        populateSummary(currentUser);
    } else {
        getStarted.classList.remove("hidden");
    }
}

function populateSummary(user) {
    const userInfo = JSON.parse(localStorage.getItem(user));
    const retrievedUser = document.getElementById("retrieved-user");
    const userGoal = document.getElementById("goal");
    const userDietCal = document.getElementById("dietCal");
    const userExerciseCal = document.getElementById("exerciseCal");
    const userDeficit = document.getElementById("deficit");
    const userGoalTime = document.getElementById("goalTime");

    retrievedUser.textContent = userInfo.name;
    userGoal.textContent = userInfo.goal[0];
    userDietCal.textContent = userInfo.dietCal;
    userExerciseCal.textContent = userInfo.exerciseCal;
    userDeficit.textContent = userInfo.deficit;
    userGoalTime.textContent = userInfo.goalTime;
}

function updateUserInfo() {
    localStorage.clear();
    location.href = "userForm.html";
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", findUser);

// Update info button event listener
document.getElementById("update-info").addEventListener("click", updateUserInfo);
