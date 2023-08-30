function toggleDarkMode() {
    var body = document.body;
    var darkModeToggle = document.getElementById("darkModeToggle");
    var darkModeIcon = document.getElementById("darkModeIcon");

    if (darkModeToggle.checked) {
        // Enable dark mode
        body.classList.add("dark-mode");
        darkModeIcon.classList.remove("fa-sun");
        darkModeIcon.classList.add("fa-moon");

        // Change background gradient for dark mode
        body.style.background = "linear-gradient(to bottom, #333333, #000024)";

        saveModePreference("dark-mode");
    } else {
        // Enable light mode
        body.classList.remove("dark-mode");
        darkModeIcon.classList.remove("fa-moon");
        darkModeIcon.classList.add("fa-sun");

        // Reset background gradient for light mode
        body.style.background = "radial-gradient(circle, rgba(0,173,208,1) 0%, rgba(2,0,36,1) 100%)";

        saveModePreference("light-mode");
    }
}

function saveModePreference(mode) {
    localStorage.setItem("modePreference", mode);
}

function applySavedMode() {
    var savedMode = localStorage.getItem("modePreference");
    var body = document.body;
    var darkModeToggle = document.getElementById("darkModeToggle");
    var darkModeIcon = document.getElementById("darkModeIcon");

    if (savedMode === "dark-mode") {
        // Enable dark mode
        body.classList.add("dark-mode");
        darkModeToggle.checked = true;
        darkModeIcon.classList.remove("fa-sun");
        darkModeIcon.classList.add("fa-moon");

        // Change background gradient for dark mode
        body.style.background = "linear-gradient(to bottom, #333333, #000024)";
    } else {
        // Enable light mode (default)
        body.classList.remove("dark-mode");
        darkModeToggle.checked = false;
        darkModeIcon.classList.remove("fa-moon");
        darkModeIcon.classList.add("fa-sun");

        // Reset background gradient for light mode
        body.style.background = "radial-gradient(circle, rgba(0,173,208,1) 0%, rgba(2,0,36,1) 100%)";
    }

    // Show the content after the preferred mode is applied
    var contentWrapper = document.getElementById("contentWrapper");
    contentWrapper.classList.remove("content-hidden");
}

// Apply the saved mode on page load
applySavedMode();