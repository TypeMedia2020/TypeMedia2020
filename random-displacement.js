'use strict';
// var names = document.getElementById('container-names') // already declared in script.js


/* TO GET A DIFFERENT DISPLACEMENT FOR EACH NAME
function getNames() {
  for (let i=0; i < names.children.length; i++) {
    var name = names.children[i]
    var projectName = name.dataset.projectName
    projectNames.push(projectName);
  }
}

function getDisplacements() {
  getNames()
  for (let i=0; i < projectNames.length; i++) {
    var name = projectNames[i]
    var projectBackground = document.getElementById(name);
    projectBackground.style.setProperty('--displacement-1', getRndInteger(-10, -4) + '%');
    projectBackground.style.setProperty('--displacement-2', getRndInteger(-3, 3) + '%');
    projectBackground.style.setProperty('--displacement-3', getRndInteger(4, 10) + '%');
    projectBackground.style.setProperty('--displacement-4', getRndInteger(-3, 3) + '%');
  }
}

*/

{
  const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min;

  const projectBackground = document.getElementById('preview-images');
  projectBackground.style.setProperty('--displacement-1', getRndInteger(-10, -4) + '%');
  projectBackground.style.setProperty('--displacement-2', getRndInteger(-3, 3) + '%');
  projectBackground.style.setProperty('--displacement-3', getRndInteger(4, 10) + '%');
  projectBackground.style.setProperty('--displacement-4', getRndInteger(-3, 3) + '%');
}