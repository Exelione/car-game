function elementAnimation(el, elInfo, elInitialYCoords, speed) {
    let elYCoords = elInfo.coords.y + speed
    let elXCoords = elInfo.coords.x
    if (elYCoords > window.innerHeight) {
        elYCoords = elInitialYCoords
        const maxXCoord = roadWidth + 1 - elInfo.width
        const randomXCoord = parseInt(Math.random() * maxXCoord)
        const direction = parseInt(Math.random() * 2)
        if(!elInfo.ignoreAppearance){
            el.style.display = 'initial'
            elInfo.visible = 'true'
        }
        elXCoords = direction === 0
            ? -randomXCoord
            : randomXCoord
    }


    elInfo.coords.y = elYCoords;
    elInfo.coords.x = elXCoords;
    el.style.transform = `translate(${elXCoords}px, ${elYCoords}px)`;
}
