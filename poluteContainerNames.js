'use strict';

{
    const containerNames = document.getElementById("container-names")
    const temp = document.createDocumentFragment();

    for (let i = 0; i < 12; ++i)
    {
        const div = document.createElement("div")
        div.dataset.projectName = projects[i][1]
        div.dataset.studentName = projects[i][0]

        const span = document.createElement("span")
        span.className = "home-text"
        span.innerHTML = projects[i][2]

        div.appendChild(span)
        temp.appendChild(div)
    }
    containerNames.appendChild(temp);

    for (let i = 0; i < containerNames.children.length; ++i) {
        containerNames.children[i].onclick = function(event) {
            const targetScrollValue = event.target.parentNode.offsetTop
            if (event.target.parentNode.className == 'selected') {
                window.location.href = `/${event.target.parentNode.dataset.studentName}`
                return
            }
            smoothScroll(targetScrollValue, 300)
        }
    }
}