const treesLogic = (function () {
    const trees = document.querySelectorAll('.tree')
    let treesCoords = []
    trees.forEach((tree) => {

        const coordsTree = getCords(tree)
        treesCoords.push(coordsTree)


    })

    function treesAnimation(speed) {
        for (i = 0; i < trees.length; i++) {
            const tree = trees[i]
            const coords = treesCoords[i]

            let newYCoords = coords.y + speed

            if (newYCoords > window.innerHeight) {
                newYCoords = -330
            }
            treesCoords[i].y = newYCoords
            tree.style.transform = `translate(${coords.x}px, ${newYCoords}px)`
        }
    }
    return {treesAnimation}
})()