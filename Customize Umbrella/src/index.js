let currentLogoSrc = ''; // Store the uploaded logo's source URL

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to color buttons
    document.querySelectorAll('.color-option').forEach(button => {
        button.addEventListener('click', (event) => changeColor(event.target.dataset.color, event));
    });

    // Add event listener for logo upload
    document.getElementById('logoUpload').addEventListener('change', handleLogoUpload);
});

// Color configuration object for different umbrella colors
const colorConfig = {
    Pink: {
        bgColor: "rgb(252, 238, 245)", // Background color
        btnColor: "rgb(238, 20, 147)", // Upload button color
        loaderColor: "invert(45%) sepia(60%) saturate(700%) hue-rotate(290deg)", // Loader filter color
        borderColor: "rgb(180, 10, 100)" // Border color for selected color button
    },
    Blue: {
        bgColor: "#d5edfb",
        btnColor: "rgb(0, 166, 255)",
        loaderColor: "invert(66%) sepia(46%) saturate(550%) hue-rotate(170deg)",
        borderColor: "rgb(0, 120, 200)"
    },
    Yellow: {
        bgColor: "rgb(252, 249, 226)",
        btnColor: "rgb(233, 199, 7)",
        loaderColor: "invert(88%) sepia(61%) saturate(797%) hue-rotate(337deg)",
        borderColor: "rgb(180, 140, 0)"
    }
};

// Function to change the umbrella color and update the UI
function changeColor(color, event) {
    if (!colorConfig[color]) return; // Exit if the color is not in the config

    const { bgColor, btnColor, loaderColor, borderColor } = colorConfig[color];

    // Update the background, button, and loader colors
    document.body.style.backgroundColor = bgColor;
    document.querySelector(".upload-btn").style.backgroundColor = btnColor;
    document.getElementById("loading").style.filter = loaderColor;

    // Remove active styles from all buttons and apply to the selected one
    document.querySelectorAll('.color-option').forEach(button => {
        button.classList.remove('active-color');
        button.style.boxShadow = "none";
    });

    event.target.classList.add('active-color');
    event.target.style.boxShadow = `0 0 0 3px ${borderColor}`;

    toggleLoader(true); // Show loader while changing the umbrella image

    setTimeout(() => {
        document.getElementById('umbrella').src = `../images/${color}_umbrella.png`;
        toggleLoader(false); // Hide loader after image update
    }, 3000);
}

// Function to handle logo upload
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return; // Exit if no file is selected

    toggleLoader(true); // Show loader while processing the file

    const reader = new FileReader();
    reader.onload = function (e) {
        setTimeout(() => {
            toggleLoader(false); // Hide loader after upload completes
            currentLogoSrc = e.target.result;

            // Display the uploaded logo preview
            const logo = document.getElementById('logo-preview');
            logo.src = currentLogoSrc;
            logo.style.display = 'block';

            // Update upload button text with the file name
            const uploadBtn = document.querySelector('.upload-btn');
            uploadBtn.innerHTML = `<img src="../images/upload_icon.svg" alt="Upload Icon" class="upload-icon"> ${file.name}`;
        }, 4000);
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}

// Function to toggle the loading state of the page
function toggleLoader(show) {
    const loadingIcon = document.getElementById('loading');
    const umbrella = document.getElementById('umbrella');
    const uploadBtn = document.querySelector('.upload-btn');
    const colorOptions = document.querySelectorAll('.color-option');

    if (show) {
        umbrella.style.display = 'none'; // Hide umbrella image
        loadingIcon.style.display = 'block'; // Show loading icon

        // Disable the upload button and change cursor to default
        uploadBtn.disabled = true;
        uploadBtn.style.cursor = "default";

        // Disable color selection buttons
        colorOptions.forEach(option => {
            option.style.pointerEvents = "none";
        });

        // Get the currently selected color or default to 'Blue'
        const activeColor = document.querySelector('.color-option.active-color');
        const selectedColor = activeColor ? activeColor.dataset.color : 'Blue';

        // Apply corresponding loader color filter
        if (colorConfig[selectedColor]) {
            loadingIcon.style.filter = colorConfig[selectedColor].loaderColor;
        }
    } else {
        umbrella.style.display = 'block'; // Show umbrella image
        loadingIcon.style.display = 'none'; // Hide loading icon

        // Enable the upload button
        uploadBtn.disabled = false;
        uploadBtn.style.cursor = "pointer";

        // Enable color selection buttons
        colorOptions.forEach(option => {
            option.style.pointerEvents = "auto";
        });
    }
}
