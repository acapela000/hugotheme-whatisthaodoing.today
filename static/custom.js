// Define an array of colors to choose from
var colors = [
    "#EFE6DD" ,
    "#FDECEF",
    "#FFEEDD",
    "#FCEFEF",
    "#FFFFE0",
    "#EDF9EB",
    "#e7f5fe"
];

// Define a function to change the background color
function changeBackgroundColor() {
    var bodybgarrayno = Math.floor(Math.random() * colors.length); // Choose a random color from the array
    var selectedcolor = colors[bodybgarrayno]; // Get the selected color
    document.body.style.background = selectedcolor; // Set the background color of the body
}

// Call the function to change the background color when the page loads or is reloaded
window.onload = changeBackgroundColor;