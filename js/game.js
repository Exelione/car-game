(function () {
    let isPause = false;

    let animationId = null;



    let speed = 4;
    let gameScore = 0;
    const gameEnd = document.querySelector('.game-end')
    const gameButton = document.querySelector('.game-button')
    const restartButton = document.querySelector('.restartButton')
    const score = document.querySelector('.game-score')
    const car = document.querySelector('.car')
    const carInfo = {
        ...createElementInfo(car),
        move: {
            top: null,
            bottom: null,
            left: null,
            right: null
        }

    }


    const trees = document.querySelectorAll('.tree')
    let treesCoords = []
    trees.forEach((tree) => {

        const coordsTree = getCords(tree)
        treesCoords.push(coordsTree)


    })

    const coin = document.querySelector('.coin')
    const coinInfo = createElementInfo(coin)

    const arrow = document.querySelector('.arrow')
    const arrowInfo = createElementInfo(arrow)

    const danger = document.querySelector('.danger')
    const dangerInfo = createElementInfo(danger)

    const road = document.querySelector('.road')
    const roadHeight = road.clientHeight
    const roadWidth = road.clientWidth / 2



    animationId = requestAnimationFrame(startGame)

    function startGame() {
        elementAnimation( danger, dangerInfo, -170)
        if (dangerInfo.visible && hasCollision(carInfo, dangerInfo)) {
            return finishGame()
        }
        elementAnimation(coin, coinInfo, -55)

        if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
            gameScore++
            coin.style.display = 'none'
            coinInfo.visible = false
            score.textContent = `${gameScore}`
            gameScore % 3 === 0 && (speed += 2)
        }

        elementAnimation(arrow, arrowInfo, -640)
        if (arrowInfo.visible && hasCollision(carInfo, arrowInfo)) {

            arrow.style.display = 'none'
            arrowInfo.visible = false
            
            danger.style.opacity = 0.2
            dangerInfo.visible = false
            speed += 7;
            dangerInfo.ignoreAppearance = true;
            arrowInfo.ignoreAppearance = true;

            setTimeout(() => {
                speed -= 7
                danger.style.opacity = 1
                danger.className = 'dangerActive'
                setTimeout(()=>{
                    dangerInfo.visible = true
                    dangerInfo.ignoreAppearance = false;
                    arrowInfo.ignoreAppearance = false;
                    danger.className = 'danger'
                },1100)
                
            }, 2400)

            gameScore % 3 === 0 && (speed += 2)
        }

        treesAnimation()
        animationId = requestAnimationFrame(startGame);

    }
    function elementAnimation(el, elInfo, elInitialYCoords) {
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


    function treesAnimation() {
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

    document.addEventListener('keydown', (event) => {
        if (isPause) {
            return
        }
        const code = event.code

        if ((code === 'ArrowUp' || code === 'KeyW') && carInfo.move.top === null) {
            if (carInfo.move.bottom) {
                return
            }
            carInfo.move.top = requestAnimationFrame(carMoveToTop)

        }
        else if ((code === 'ArrowDown' || code === 'KeyS') && carInfo.move.bottom === null) {
            if (carInfo.move.top) {
                return
            }
            carInfo.move.bottom = requestAnimationFrame(carMoveToBottom)
        }
        else if ((code === 'ArrowRight' || code === 'KeyD') && carInfo.move.right === null) {
            if (carInfo.move.left) {
                return
            }
            carInfo.move.right = requestAnimationFrame(carMoveToRight)

        }
        else if ((code === 'ArrowLeft' || code === 'KeyA') && carInfo.move.left === null) {
            if (carInfo.move.right) {
                return
            }
            carInfo.move.left = requestAnimationFrame(carMoveToLeft)
        }
    })
    document.addEventListener('keyup', (event) => {
        const code = event.code
        if (code === 'ArrowUp' || code === 'KeyW') {

            cancelAnimationFrame(carInfo.move.top)
            carInfo.move.top = null
        }
        else if (code === 'ArrowDown' || code === 'KeyS') {

            cancelAnimationFrame(carInfo.move.bottom)
            carInfo.move.bottom = null
        }
        else if (code === 'ArrowRight' || code === 'KeyD') {

            cancelAnimationFrame(carInfo.move.right)
            carInfo.move.right = null
        }
        else if (code === 'ArrowLeft' || code === 'KeyA') {

            cancelAnimationFrame(carInfo.move.left)
            carInfo.move.left = null
        }
    })
    function carMove(x, y) {

        car.style.transform = `translate(${x}px, ${y}px)`
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

    function carMoveToTop() {
        const newY = carInfo.coords.y - 5
        if (newY + 5 < 0) {
            return
        }
        carInfo.coords.y = newY
        carMove(carInfo.coords.x, newY)
        carInfo.move.top = requestAnimationFrame(carMoveToTop)

    }
    function carMoveToBottom() {
        const newY = carInfo.coords.y + 5
        if (newY - 5 > roadHeight - carInfo.height) {
            return
        }
        carInfo.coords.y = newY
        carMove(carInfo.coords.x, newY)
        carInfo.move.bottom = requestAnimationFrame(carMoveToBottom)
    }
    function carMoveToLeft() {
        const newX = carInfo.coords.x - 5
        if (newX + 5 < -roadWidth + carInfo.width) {
            return
        }
        carInfo.coords.x = newX
        carMove(newX, carInfo.coords.y)
        carInfo.move.left = requestAnimationFrame(carMoveToLeft)
    }

    function carMoveToRight() {
        const newX = carInfo.coords.x + 5
        if (newX - 5 > roadWidth - carInfo.width) {
            return
        }
        carInfo.coords.x = newX
        carMove(newX, carInfo.coords.y)
        carInfo.move.right = requestAnimationFrame(carMoveToRight)
    }

    function getCords(element) {
        const matrix = window.getComputedStyle(element).transform
        const array = matrix.split(',')
        const y = array[array.length - 1]
        const x = array[array.length - 2]
        const numericY = parseFloat(y)
        const numericX = parseFloat(x)
        return { x: numericX, y: numericY }
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
    function cancelAnimations() {
        cancelAnimationFrame(animationId)
        cancelAnimationFrame(carInfo.move.top)
        cancelAnimationFrame(carInfo.move.bottom)
        cancelAnimationFrame(carInfo.move.right)
        cancelAnimationFrame(carInfo.move.left)
    }
    function finishGame() {

        cancelAnimations()
        gameButton.style.display = 'none'
        score.style.display = 'none'
        gameEnd.style.display = 'flex'
        const gameEndTextScore = document.querySelector('.game-end-text-score')
        gameEndTextScore.innerText = gameScore
    }


    gameButton.addEventListener('click', () => {
        isPause = !isPause
        if (isPause) {
            gameButton.children[0].style.display = 'none'
            gameButton.children[1].style.display = 'initial'
            cancelAnimations()
        }
        else {
            animationId = requestAnimationFrame(startGame);
            gameButton.children[0].style.display = 'initial'
            gameButton.children[1].style.display = 'none'
        }
    })
    restartButton.addEventListener('click', () => {
        window.location.reload()

    })
})()

