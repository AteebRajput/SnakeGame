// ============================================================================
//                  All DOM Elements
// ============================================================================

const score = document.getElementById("score");
const buttons = document.querySelectorAll(".btn");
const closeBtn = document.getElementById("close")
const gameCard = document.getElementById("gameover")
const startBtn = document.getElementById("startBtn")
const endScore = document.getElementById("endscore")
const playBtn = document.getElementById("playBtn")
// ============================================================================
//                  All Required variables
// ============================================================================

let snakeBody = ['00', '10', '20', '30'];
let direction = 'right';
let foodID;
let totalScore = 0;
let currentLevel = 'easy';
let currentScore = 0;
let gameOver = false;
let interval;

// Difficulty levels speed
const levelSpeeds = {
    easy: 500,
    medium: 300,
    hard: 150
};

let scoreCard = [
    {
        level: 'easy',
        point: 5,
    },
    {
        level: 'medium',
        point: 7,
    },
    {
        level: 'hard',
        point: 10,
    },
];

// ============================================================================
//                  All Functions
// ============================================================================

const showSnake = () => {
    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach(box => {
        box.className = "box";
    });
    snakeBody.forEach(snake => {
        document.getElementById(`${snake}`).className = "box snake";
    });

    const foodDOMElement = document.getElementById(foodID);
    foodDOMElement.className = `box food`;
};

const updateScore = () => {
    scoreCard.forEach(data => {
        if (data.level === currentLevel) {
            currentScore = data.point;
        }
    });
    totalScore += currentScore;
    score.innerText = `${totalScore}`;
};

const moveSnake = () => {
    if (gameOver) return;

    for (let i = 0; i < snakeBody.length - 1; i++) {
        snakeBody[i] = snakeBody[i + 1];
    }

    let head = snakeBody[snakeBody.length - 1];
    let headRow = parseInt(head[0]);
    let headCol = parseInt(head[1]);

    switch (direction) {
        case "right":
            headCol += 1;
            break;
        case "left":
            headCol -= 1;
            break;
        case "up":
            headRow -= 1;
            break;
        case "down":
            headRow += 1;
            break;
    }

    const newHead = `${headRow}${headCol}`;
    
    if (snakeBody.includes(newHead) || headRow < 0 || headRow > 9 || headCol < 0 || headCol > 9) {
        endGame();
        return;
    }

    snakeBody[snakeBody.length - 1] = newHead;
    showSnake();
    consumeFood();
};

const getRandomNumber = (exclude = []) => {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 100);
        randomNumber = randomNumber < 10 ? '0' + randomNumber : String(randomNumber);
    } while (exclude.includes(randomNumber));
    
    foodID = randomNumber;
};

const consumeFood = () => {
    if (snakeBody.includes(foodID)) {
        updateScore();

        const foodDOMElement = document.getElementById(foodID);
        foodDOMElement.className = `box`;

        getRandomNumber(snakeBody);

        let head = snakeBody[snakeBody.length - 1];
        snakeBody.push(head);

        showSnake();
    }
};

const endGame = () => {
    gameOver = true;
    clearInterval(interval);
    endScore.innerText = `${totalScore}`
    gameCard.className =  "card show"
};

const startGame = () => {
    snakeBody = ['00', '10', '20', '30'];
    direction = 'right';
    totalScore = 0;
    score.innerText = `${totalScore}`;
    gameOver = false;
    getRandomNumber(snakeBody);
    showSnake();
    clearInterval(interval);
    interval = setInterval(moveSnake, levelSpeeds[currentLevel]);
};

// ============================================================================
//                  All Event Listeners
// ============================================================================

window.addEventListener("keydown", (e) => {
    if (gameOver) return;

    switch (e.key) {
        case "ArrowUp":
        case "w":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
        case "s":
            if (direction !== "up") direction = "down";
            break;
        case "ArrowLeft":
        case "a":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
        case "d":
            if (direction !== "left") direction = "right";
            break;
    }
});

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (!gameOver) return; // Allow changing level only when the game is over
        currentLevel = e.target.value;
        // startGame(); // Start the game with the selected difficulty level
    });
});

closeBtn.addEventListener("click" , e => {
    gameCard.className = "card"
})

startBtn.addEventListener("click" , e => {
    gameCard.className = "card"
    startGame()

})
playBtn.addEventListener("click" , e => {
    startGame()
})

// ============================================================================
//                  Init
// ============================================================================

