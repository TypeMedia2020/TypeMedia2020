'use strict';

const names = document.getElementById('container-names')
let marginValue = 0

function marginizeNames() {
    const height = names.getBoundingClientRect().height
    const selectorHeight = names.firstElementChild.clientHeight
    names.style.top = `50vh`
    names.style.marginTop = `-${selectorHeight/2}px`
    names.style.paddingBottom = `calc( 50vh - ${selectorHeight/2}px)`
}

const previewImages = document.getElementById('preview-images')
const selectorLink = document.getElementById('selector-link')

let activeBackground = previewImages.querySelector(`div[data-author=${localStorage["active"]}]`)
activeBackground.classList.add('active')
document.getElementById('project-name').innerHTML = activeBackground.id

// highlights active name depending on scrolling
const scrollCallback = (() =>
{
    const
        selector = document.getElementById('selector'),
        projectNameElement = document.getElementById('project-name'),
        scrollThreshold = 250;
    let
        selectorBox = selector.getBoundingClientRect(),
        selectorCentre = selectorBox.bottom - selectorBox.height / 2,
        selectedName = getRecentlySelected(),
        lastIndex,
        timeStamp,
        scrollToValue,
        timer;

    // actions for when scrolling has ended, assigned to a timer at the end of the scroll callback
    // snap currently selected name to the selector element
    const snap = () => smoothScroll(scrollToValue);

    // Only on mobile devices:
    // Make sure snapping doesn’t start before the user hasn’t finished the scrolling gesture.
    if ('ontouchstart' in document.documentElement)
    {
        const
            onTouchStart = () => {
                shouldSnap = false
                abortScrolling = true
            },
            onTouchEnd = () => {
                shouldSnap = true;
                timer = setTimeout(snap, scrollThreshold);
            };
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("touchcancel", onTouchEnd);
    }

    for (let i = 0; i < 12; ++i) {
        if (names.children[i] == selectedName) {
            lastIndex = i;
            break;
        }
    }

    window.addEventListener('resize', () =>
    {
        selectorBox = selector.getBoundingClientRect()
        selectorCentre = selectorBox.bottom - selectorBox.height / 2
    });

    // This aborts script-triggered scrolling when the user starts scrolling manually.
    window.addEventListener('wheel', () => abortScrolling = true);


    return (event) =>
    {
        timeStamp = event.timeStamp

        for (let i = 0; i < 12; ++i)
        {
            const name = names.children[i]
            const nameBox = name.getBoundingClientRect()
            if (nameBox.bottom >= selectorCentre)
            {
                selectedName.classList.remove('selected')
                selectedName = name;
                selectedName.classList.add('selected')

                projectNameElement.innerHTML = name.dataset.projectName

                scrollToValue = selectedName.offsetTop

                activeBackground.classList.remove('active')
                activeBackground = document.getElementById(name.dataset.projectName)
                activeBackground.classList.add('active')
                selectorLink.href = name.dataset.studentName + '/'

                localStorage['active'] = name.dataset.studentName
                break
            }
        }

        // abort any previously running timer
        if (timer) clearTimeout(timer);
        // assign timed callback for when scrolling has ended
        if (shouldSnap) timer = setTimeout(snap, scrollThreshold);
    }
})();

var isactive = true
var isScrolling = false
var nextYVal 
var sleep = 4000

async function infinite() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, sleep))
        if (! isactive) {
            const active = document.querySelector("#container-names>div.selected")
            const index = Array.from(active.parentNode.children).indexOf(active)
            nextYVal = names.children[(index + 1)%12].offsetTop
            isScrolling = true
            smoothScroll(nextYVal)
        }
    }
}

var activityStamp = 0

// checks if device has a mouse and makes ‘activity’ an empty function otherwise
const activity = matchMedia('(pointer:fine)').matches ?
(event) => {
    setTimeout(function () {
        if (activityStamp == event.timeStamp) {
            isactive = false
        } else {
            isactive = true
        }
    }, 3000)
    activityStamp = event.timeStamp
} : () => {}

function getRecentlySelected() {
    const selectedName =
        localStorage['active'] ?
        document.querySelector(`div[data-student-name=${localStorage["active"]}]`) :
        names.children[4];
    selectedName.className = "selected"
    return selectedName
    // document.head.innerHTML += "<style>{scroll-behavior: smooth;}</style>"
}

document.body.onload = function () { 
    // solves that sometimes the selector was in middle of two names
    marginizeNames()

    smoothScroll(getRecentlySelected().offsetTop)

    window.onscroll = scrollCallback
    window.onresize = marginizeNames
    window.onmousemove = activity
    window.onkeydown = activity
    window.onmousedown = activity

    // takes the content of data-src and generates a new src out of it for every img. Therefore the main content of the page is loaded and js executed BEFORE the images are loaded
    for (const img of document.getElementsByTagName('img')) { 
        img.src = img.dataset.src
    }
    // infinite()
}
