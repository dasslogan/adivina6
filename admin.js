document.getElementById('riddleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newRiddle = {
        question: document.getElementById('question').value,
        answer: document.getElementById('answer').value.toLowerCase()
    };

    await fetch('/save-riddle.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newRiddle)
    });

    loadLeaderboard();
});

async function loadLeaderboard() {
    const response = await fetch('/get-leaderboard.php');
    const data = await response.json();
    
    const leaderboardHTML = data.map((entry, index) => `
        <div class="leaderboard-item">
            <span>#${index + 1} ${entry.username}</span>
            <span>${(entry.time/1000).toFixed(2)}s</span>
        </div>
    `).join('');
    
    document.getElementById('leaderboard').innerHTML = leaderboardHTML;
}

loadLeaderboard();
