function getCords(element) {
    const matrix = window.getComputedStyle(element).transform
    const array = matrix.split(',')
    const y = array[array.length - 1]
    const x = array[array.length - 2]
    const numericY = parseFloat(y)
    const numericX = parseFloat(x)
    return { x: numericX, y: numericY }
}

function createElementInfo(element) {
    return {
        coords: getCords(element),
        width: element.clientWidth / 2,
        height: element.clientHeight,
        visible: true,
        ignoreAppearance: false,
    }
}

function hasCollision(element1Info, element2Info) {

    const element1InfoYTop = element1Info.coords.y
    const element1InfoYBottom = element1Info.coords.y + element1Info.height

    const element1InfoXLeft = element1Info.coords.x - element1Info.width
    const element1InfoXRight = element1Info.coords.x + element1Info.width

    const element2InfoYTop = element2Info.coords.y
    const element2InfoYBottom = element2Info.coords.y + element2Info.height

    const element2InfoXLeft = element2Info.coords.x - element2Info.width
    const element2InfoXRight = element2Info.coords.x + element2Info.width

    if (element1InfoYTop > element2InfoYBottom || element1InfoYBottom < element2InfoYTop) {
        return false
    }
    if (element1InfoXLeft > element2InfoXRight || element1InfoXRight < element2InfoXLeft) {
        return false
    }
    return true
}