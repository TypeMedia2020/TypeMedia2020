const navigator = document.getElementById('project-navigator')
var navigatorWrapper = document.getElementById('project-navigator-wrapper')


for (let i=0; i < projects.length; i++) {
    const a = document.createElement('a')
    a.href = `../${projects[i][0]}`
    a.textContent = `${projects[i][2]} – ${projects[i][1]}`
    if (projects[i][0] == localStorage['active']) {
        a.className = 'current'
        navigatorWrapper.setAttribute('data-current', a.textContent)
    }
    navigator.appendChild(a)
}

window.onscroll = () => {
    scrollpos = window.scrollY;
    if (!navigatorWrapper.classList.contains("clicked")){
        if (scrollpos >= window.innerHeight) {
            navigatorWrapper.classList.add("active")
        }	else {
            navigatorWrapper.classList.remove("active")
        }
    }
}

// window.onclick = (e) => {
//     if (e.target.parentElement.parentElement.id != navigatorWrapper.id) {
//         if (e.target == navigatorWrapper) {
//             navigatorWrapper.classList.add("clicked")
//         }
//         else {
//             navigatorWrapper.classList.remove("clicked")
//         }   
//     }
// }

navigatorWrapper.addEventListener("click", () => {
    navigatorWrapper.classList.toggle("clicked");
})

