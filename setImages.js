// active = document.querySelector(`div[data-author="${localStorage['active']}"]`)
// for (let i=0; i<active.children.length; i++) {
//     if (!active.children[i].children.src) {
//         active.children[i].children[0].src = active.children[i].children[0].dataset.src
//         console.log(active.children[i].children[0].src)
//     }
// }

async function activateChildren(index) {
    return new Promise(resolve => {
        const student = projects[index][0]
            for (let j=0; j<8; j++) {
                const pictures = thumbnails.querySelector(`div[data-author=${student}]`)
                pictures.children[j].firstChild.className = 'lazyload'
            }
            resolve(index)
            
        }
    )
}
var thumbnails = document.getElementById('preview-images')

async function setImages(){
    let index
    for (let i=0; i<12; i++) {
        if (projects[i][0] == localStorage['active']) {
            index = i
            break
        }
    }
    let indexes = []
    for (let i=0; i<6; i++) {
        indexes.unshift(6 + i)
        indexes.unshift(6 - i - 1) //make it proper
    }
    indexes = indexes.slice(indexes.indexOf(index), 12).concat(indexes.slice(0, indexes.indexOf(index)))
    let pool = []
    for (let i=0;i<12;i++){
        pool.push(activateChildren(indexes[i]))
    }
    await Promise.all(pool)
}

setImages()

