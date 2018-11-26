// Script document
const menu = document.querySelector("#menuItems");
const menuSwitch = document.querySelector("#menuButton");
const icons = document.getElementsByClassName("single-icon");
const projectIcons = document.getElementsByClassName("projects-icon");
const menuItems = menu.getElementsByClassName("menu-label");
const resumePdf = document.querySelector("#resumePdf");
const aboutMePdf = document.querySelector("#aboutMePdf");
const mailExe = document.querySelector("#mailExe");
const tellPdf = document.querySelector("#tellPdf");
const spaceInvadersPdf = document.querySelector("#spaceInvadersPdf");
const feastPdf = document.querySelector("#feastPdf");
const projects = document.querySelector("#projects");
const timeLabel = document.querySelector(".time-label");
const launchScreen = document.querySelector(".loading-background");
const intros = document.querySelectorAll(".intro-label");
const clickSound = document.getElementById("click-audio"); 
const openingSound = document.getElementById("opening-sound");
const mainDesktop = document.querySelector(".main-background");
const quotes = [
	"There are two ways to write error-free programs; only the third one works.",
	"It’s not a bug – it’s an undocumented feature.",
	"Software undergoes beta testing before it’s released. Beta is Latin for 'still doesn’t work'.",
	"In order to understand recursion, one must first understand recursion.",
    "The best thing about a boolean is even if you are wrong, you are only off by a bit",
    "One man’s crappy software is another man’s full time job.",
    "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.",
    "Good code is its own best documentation.",
    "One of my most productive days was throwing away a 1000 lines of code."
];

let isShowingMenu = false;
let curZIndex = 30;
let menuZindex = 34;

setTimeout(readyDocument = function () {
    launchScreen.style.display = "none";
}, 6000);

timeUpdater();
window.setInterval(timeUpdater, 10000);

// setup dragging
$(document).ready(function () {
    // initialize dragging
    $(".movable-window").draggable({
        containment: "parent",
        start: function( event, ui ) {
            const elementId = ui.helper[0].id;
            const element = document.getElementById(elementId);
            curZIndex += 1;
            menuZindex += 1;
	        element.style.zIndex = curZIndex;
        }
    });
    $(".single-icon").draggable({
        containment: ".main-window"
    });
    $(".projects-icon").draggable({
        containment: ".projects-container"
    });

    // set dragging
    $(".movable-window").draggable("option", "containment", "parent");
    $(".single-icon").draggable("option", "containment", ".main-window");
    $(".projects-icon").draggable("option", "containment", ".projects-container");

    // add actions to icons
    for (let i = 0; i < icons.length; i++) {
        icons[i].onclick = function () {
            const singleIcon = icons[i];
            const iconText = singleIcon.getElementsByTagName("p")[0].innerText;
            playAudio();

            // open external link if available
            directToSocialMedia(iconText);
            // open window if available
            openWindow(iconText);
        }
    }

    // add actions to menu
    for (let j = 0; j < menuItems.length; j++) {
        menuItems[j].onclick = function () {
            const menuText = menuItems[j].innerText;
            playAudio();

            // open external link if available
            directToSocialMedia(menuText);
            // open window if available
            openWindow(menuText);

            if (menuText === "Restart...") {
                restartWindow();
            }
        }
    }

    // open projects 
    for (let k = 0; k < projectIcons.length; k++) {
        projectIcons[k].onclick = function () {
            const singleIcon = projectIcons[k];
            const iconText = singleIcon.getElementsByTagName("p")[0].innerText;
            playAudio();

            if (iconText === "Tell") {
                selectRandomSpot(tellPdf)
                moveToTop(tellPdf);
            } else if (iconText === "Space Invaders") {
                selectRandomSpot(spaceInvadersPdf)
                moveToTop(spaceInvadersPdf);
            } else if (iconText === "Feast") {
                selectRandomSpot(feastPdf)
                moveToTop(feastPdf);
            }
        }
    }

    menuSwitch.onclick = function() {
        playAudio();
        isShowingMenu = !isShowingMenu;
    
        if (isShowingMenu === true) {
            menu.style.zIndex = menuZindex;
            menu.style.display = "";
        } else {
            menu.style.display = "none";
        }
    };
});

function playAudio() {
    clickSound.play();
}

function bootupSound() {
    openingSound.play()
}

function restartWindow() {
    // hide label and pick quote
    bootupSound();
    intros[0].style.display = "none";
    menu.style.display = "none";
    isShowingMenu = !isShowingMenu;
    intros[1].innerText = quotes[Math.floor(Math.random() * quotes.length)];

    launchScreen.style.display = "";
    mainDesktop.style.display = "none";

    setTimeout(readyDocument = function () {
        launchScreen.style.display = "none";
        mainDesktop.style.display = "flex";
    }, 6000);
}

function timeUpdater() {
    var date = new Date();
    var formatedLabel = "";
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var hour = 0;
    var minute = 0;
    var hourExtension = "AM";

    formatedLabel += days[date.getDay()];
    formatedLabel += " ";

    hour = date.getHours();
    if (hour > 12) {
        hour -= 12;
        hourExtension = "PM";
    } else {
        hourExtension = "AM";
    }
    if (hour === 0) {
        formatedLabel += "0";
	}
    formatedLabel += hour;

    minute = date.getMinutes();
    if (minute < 10) {
        formatedLabel += ":0";
    } else {
		formatedLabel += ":";
	}
    formatedLabel += minute + " " + hourExtension;

    timeLabel.innerText = formatedLabel;
}

function selectRandomSpot(myWindow) {
    const screenDimension = $(window).width(); 
    const baseTop = 50;
    const baseLeft = 40;
    const offset = Math.floor(Math.random() * 45);

    if (screenDimension > 890) {
        myWindow.style.top = baseTop + offset;
        myWindow.style.left = baseLeft + offset;
    }
}

function moveToTop(window) {
    curZIndex += 1;
    menuZindex += 1;
	window.style.zIndex = curZIndex;
    window.style.display = "";
}

function directToSocialMedia(text) {
    if (text === "LinkedIn.html" || 
        text === "LinkedIn" ||
        text === "Github.html" || 
        text === "Github" ||
        text === "Twitter.html" || 
        text === "Instagram.html" ) {
        openExternalLinks(text);
    }
}

function openWindow(link) {
    if (link === "Résumé.pdf" || link === "Résumé") {
        selectRandomSpot(resumePdf);
        moveToTop(resumePdf);
    } else if (link === "AboutMe.pdf") {
        selectRandomSpot(aboutMePdf);
        moveToTop(aboutMePdf);
    } else if (link === "Projects") {
        selectRandomSpot(projects);
        moveToTop(projects);
    } else if (link === "Mail.exe" || link === "Mail") {
        selectRandomSpot(mailExe);
        moveToTop(mailExe);
    }
}

function closeWindow(window) {
    window.style.display = "none";
}

function openExternalLinks(link) {
    let url;

    switch(link) {
        case "LinkedIn.html":
        case "LinkedIn":
            url = "https://www.linkedin.com/in/lloyddapaah";
            break;
        case "Github.html":
        case "Github":
            url = "https://github.com/lloydoad";
            break;
        case "Twitter.html":
            url = "https://twitter.com/lloydoad";
            break;
        case "Instagram.html":
            url = "https://www.instagram.com/lloydoad/";
            break;
        default:
            url = link;
    }

    window.open(url);
}
