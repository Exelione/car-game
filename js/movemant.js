function carMove(car, x, y) {

    car.style.transform = `translate(${x}px, ${y}px)`


}


function carMoveToTop(car, carInfo) {

    return () => {
        const newY = carInfo.coords.y - 5
        if (newY + 5 < 0) {
            return
        }
        carInfo.coords.y = newY
        carMove(car, carInfo.coords.x, newY)
        carInfo.move.top = requestAnimationFrame(carMoveToTop(car, carInfo))
    }


}
function carMoveToBottom(car, carInfo) {
    return () => {
        const newY = carInfo.coords.y + 5
        if (newY - 5 > roadHeight - carInfo.height) {
            return
        }
        carInfo.coords.y = newY
        carMove(car, carInfo.coords.x, newY)
        carInfo.move.bottom = requestAnimationFrame(carMoveToBottom(car, carInfo))
    }

}
function carMoveToLeft(car, carInfo) {
    return () => {
        const newX = carInfo.coords.x - 5
        if (newX + 5 < -roadWidth + carInfo.width) {
            return
        }
        carInfo.coords.x = newX
        carMove(car, newX, carInfo.coords.y)
        carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo))
    }

}

function carMoveToRight(car, carInfo) {
    return () => {
        const newX = carInfo.coords.x + 5
        if (newX - 5 > roadWidth - carInfo.width) {
            return
        }
        carInfo.coords.x = newX
        carMove(car, newX, carInfo.coords.y)
        carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo))
    }

}

