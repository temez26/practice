function toggleLanguage() {
    const currentLanguage = localStorage.getItem("selectedLanguage");
    const languageLink = document.getElementById("languageLink");

    if (currentLanguage === "Finnish") {
        // Switch to English
        localStorage.setItem("selectedLanguage", "English");
        languageLink.href = "/English"; // Update the link's href
        languageLink.innerText = "English"; // Update the link's text
    } else {
        // Switch to Finnish
        localStorage.setItem("selectedLanguage", "Finnish");
        languageLink.href = "/Index"; // Update the link's href
        languageLink.innerText = "Finnish"; // Update the link's text
    }

    // Reload the page to apply the language changes
    location.reload();
}

// Check if the selected language is saved in localStorage and set it on page load
document.addEventListener("DOMContentLoaded", function () {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    const languageLink = document.getElementById("languageLink");

    if (selectedLanguage === "Finnish") {
        // Set the link text to Finnish
        languageLink.href = "/Index"; // Set the link's href to Finnish
        languageLink.innerText = "Finnish";
    } else {
        // Set the link text to English (default)
        languageLink.href = "/English"; // Set the link's href to English
        languageLink.innerText = "English";
    }
});