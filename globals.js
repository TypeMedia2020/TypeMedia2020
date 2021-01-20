'use strict';

const projects = [
    ["nina-botthof", "Ceres", "Nina Botthof"],
    ["thomas-bouillet", "Tandem", "Thomas Bouillet"],
    ["arnaud-chemin", "Epitre", "Arnaud Chemin"],
    ["jamie-chang", "Cleft", "Jamie Chang"],
    ["celine-hurka", "Version", "Céline Hurka"],
    ["huw-williams", "Malham", "Huw Williams"],
    ["jovana-jocic", "Petria", "Jovana Jocić"],
    ["ruggero-magri", "Gesto", "Ruggero Magrì"],
    ["elena-peralta", "Edonia", "Elena Peralta"],
    ["renan-rosatti", "Diafone", "Renan Rosatti"],
    ["jan-sindler", "Gabion", "Jan Šindler"],
    ["olga-umpeleva", "Noordenwind", "Olga Umpeleva"]
]

{
    function getRandomIndexes() {
        const indexes = []
        for (let i=12; i > 0; i--) {
            indexes.push(Math.floor(Math.random() * i))
        }
        return indexes
    }

    function shuffle(ar, indexes) {
        for (let i = 0, val; i < 12; i++) {
            val = ar[parseInt(indexes[i])]
            ar.push(val)
            ar.splice(parseInt(indexes[i]), 1)
        }
    }

    if (!localStorage["order"]) {
        localStorage['order'] = getRandomIndexes().join(',')
    }

    shuffle(projects, localStorage["order"].split(','))

    if (!localStorage["active"]) {
        localStorage["active"] = projects[0][0]
    }

/*
function appendCallback(callback, append) {
    const newCallback = (event) => {
        if (callback) {
            callback(event)
        }
        append(event)
    }
    return newCallback
}
*/
}

let
    abortScrolling = false,
    shouldSnap = true;

// XXX: only scrolls vertically
const smoothScroll = (targetPosition, duration=100) =>
{
    abortScrolling = false;
    
    const
    initialPosition = Math.round(window.pageYOffset), /* round, otherwise it will bump */
    totalDistance = targetPosition - initialPosition;
    let start;
    
    window.requestAnimationFrame(function step(timestamp)
    {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        window.scrollTo(0, initialPosition + totalDistance * Math.min(elapsed / duration, 1))

        if (elapsed < duration || abortScrolling) {
            window.requestAnimationFrame(step)
            abortScrolling = false
            shouldSnap = true
        }
    })
}