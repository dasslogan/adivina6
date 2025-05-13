let currentRiddle = null;
let answerReveal = [];
let gameTimer;
let revealInterval;
let participants = new Map();

function connect() {
    const websocket = new WebSocket("ws://localhost:21213/");
    
    websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event === 'chat') {
            handleChatMessage(data.data);
        }
    };

    websocket.onerror = () => setTimeout(connect, 1000);
}

function handleChatMessage(chatData) {
    const message = chatData.comment.toLowerCase().trim();
    if(message.startsWith('.') && currentRiddle) {
        const guess = message.slice(1);
        checkAnswer(chatData.uniqueId, chatData.nickname, guess);
    }
}

async function checkAnswer(userId, username, guess) {
    if(guess === currentRiddle.answer.toLowerCase() && !participants.has(userId)) {
        const time = Date.now() - gameStartTime;
        participants.set(userId, {username, time});
        updateLeaderboard();
    }
}

async function loadNewRiddle() {
    const response = await fetch('/get-riddle.php');
    currentRiddle = await response.json();
    initializeGame();
}

function initializeGame() {
    answerReveal = currentRiddle.answer.split('').map(() => '_');
    gameStartTime = Date.now();
    
    updateDisplay();
    startTimers();
}

function startTimers() {
    let timeLeft = 120;
    
    gameTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timerBar').style.width = `${(timeLeft/120)*100}%`;
        
        if(timeLeft <= 0) endGame();
    }, 1000);

    revealInterval = setInterval(() => {
        const hiddenIndexes = answerReveal.reduce((acc, char, index) => {
            if(char === '_') acc.push(index);
            return acc;
        }, []);
        
        if(hiddenIndexes.length > 0) {
            const revealIndex = hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)];
            answerReveal[revealIndex] = currentRiddle.answer[revealIndex];
            updateDisplay();
        }
    }, 30000);
}

function updateDisplay() {
    document.getElementById('currentRiddle').textContent = currentRiddle.question;
    document.getElementById('answerDisplay').textContent = answerReveal.join(' ');
}

function endGame() {
    clearInterval(gameTimer);
    clearInterval(revealInterval);
    showResults();
}

function showResults() {
    const top10 = Array.from(participants.entries())
        .sort((a, b) => a[1].time - b[1].time)
        .slice(0, 10);
    
    // Enviar resultados a la base de datos
    fetch('/save-results.php', {
        method: 'POST',
        body: JSON.stringify(top10)
    });
}

window.addEventListener('load', () => {
    connect();
    loadNewRiddle();
});
