(function () {
    const LS = localStorage;
    let recordScore = LS.getItem('score');
    let isPause = false;
    let animationId = null;
    let speed = 4;
    let gameScore = 0;

    const gameEnd = document.querySelector('.game-end')
    const gameButton = document.querySelector('.game-button')
    const record = document.querySelector('.game-record')
    record.textContent = recordScore === null ? 'Own Record' : `Own Record: ${recordScore}`
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

    const coin = document.querySelector('.coin')
    const coinInfo = createElementInfo(coin)

    const arrow = document.querySelector('.arrow')
    const arrowInfo = createElementInfo(arrow)

    const danger = document.querySelector('.danger')
    const dangerInfo = createElementInfo(danger)

    animationId = requestAnimationFrame(startGame)

    function startGame() {


        elementAnimation(danger, dangerInfo, -170, speed)
        if (dangerInfo.visible && hasCollision(carInfo, dangerInfo)) {
            return finishGame()
        }
        elementAnimation(coin, coinInfo, -55, speed)

        if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
            gameScore++
            coin.style.display = 'none'
            coinInfo.visible = false
            score.textContent = `${gameScore}`
            gameScore % 3 === 0 && (speed += 2)
        }

        elementAnimation(arrow, arrowInfo, -640, speed)
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
                setTimeout(() => {
                    dangerInfo.visible = true
                    dangerInfo.ignoreAppearance = false;
                    arrowInfo.ignoreAppearance = false;
                    danger.className = 'danger'
                }, 1100)

            }, 2400)

            gameScore % 3 === 0 && (speed += 2)
        }

        treesLogic.treesAnimation(speed)

        animationId = requestAnimationFrame(startGame);


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
            carInfo.move.top = requestAnimationFrame(carMoveToTop(car, carInfo))

        }
        else if ((code === 'ArrowDown' || code === 'KeyS') && carInfo.move.bottom === null) {
            if (carInfo.move.top) {
                return
            }
            carInfo.move.bottom = requestAnimationFrame(carMoveToBottom(car, carInfo))
        }
        else if ((code === 'ArrowRight' || code === 'KeyD') && carInfo.move.right === null) {
            if (carInfo.move.left) {
                return
            }
            carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo))

        }
        else if ((code === 'ArrowLeft' || code === 'KeyA') && carInfo.move.left === null) {
            if (carInfo.move.right) {
                return
            }
            carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo))
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



    function cancelAnimations() {
        cancelAnimationFrame(animationId)
        cancelAnimationFrame(carInfo.move.top)
        cancelAnimationFrame(carInfo.move.bottom)
        cancelAnimationFrame(carInfo.move.right)
        cancelAnimationFrame(carInfo.move.left)
    }


    function finishGame() {

        cancelAnimations()
        record.style.display = 'none'
        gameButton.style.display = 'none'
        score.style.display = 'none'
        gameEnd.style.display = 'flex'
        const gameEndTextScore = document.querySelector('.game-end-text-score')
        gameEndTextScore.innerText = gameScore
        if (gameScore > recordScore) {
            LS.setItem('score', gameScore)
            const newRecord = document.querySelector('.game-end-record')
            newRecord.style.display = 'initial'
        }
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


})()

