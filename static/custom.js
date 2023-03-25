// Define an array of colors to choose from
var colors = [
    "#EFE6DD" ,
    "#F3DFA2",
    "#D5F2E3",
    "#FDECEF",
    "#EDC79B",
    "#D57A66",
    "#EABDA8",
    "#61988E",
    "#CEC2FF",
    "#B3B3F1",
    "#DCB6D5",
    "#C7EAE4",
    "#A7E8BD",
    "#FCBCB8",
    "#EFA7A7",
    "#FFEEDD",
    "#FFD8BE"
];

// Define a function to change the background color
function changeBackgroundColor() {
    var bodybgarrayno = Math.floor(Math.random() * colors.length); // Choose a random color from the array
    var selectedcolor = colors[bodybgarrayno]; // Get the selected color
    document.body.style.background = selectedcolor; // Set the background color of the body
}

// Call the function to change the background color when the page loads or is reloaded
window.onload = changeBackgroundColor;