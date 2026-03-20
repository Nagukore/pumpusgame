const GRID_SIZE = 8;
const NUM_PITS = 3;
const NUM_BATS = 3;
const MAX_ARROWS = 5;

let grid = [];
let playerPos = { r: 0, c: 0 };
let wumpusPos = { r: 0, c: 0 };
let explored = [];
let arrows = MAX_ARROWS;
let gameState = 'HUNTING'; // 'HUNTING', 'WIN', 'LOSE'
let arrowsDropped = [];

const boardEl = document.getElementById('game-board');
const arrowsEl = document.getElementById('arrows-count');
const stateEl = document.getElementById('game-state');
const logEl = document.getElementById('message-log');
const restartBtn = document.getElementById('restart-btn');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', () => {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    initGame();
});

function initGame() {
    gameState = 'HUNTING';
    arrows = MAX_ARROWS;
    arrowsDropped = [];
    updateStats();
    logEl.innerHTML = '';
    logMessage('You enter the dark caves...', 'important');

    // Initialize blank grid
    grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('E'));
    explored = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));

    // Place Wumpus
    wumpusPos = getRandomEmptyPos();
    grid[wumpusPos.r][wumpusPos.c] = 'W';

    // Place Pits
    for (let i = 0; i < NUM_PITS; i++) {
        let p = getRandomEmptyPos();
        grid[p.r][p.c] = 'P';
    }

    // Place Bats
    for (let i = 0; i < NUM_BATS; i++) {
        let p = getRandomEmptyPos();
        grid[p.r][p.c] = 'B';
    }

    // Place Player
    playerPos = getRandomEmptyPos();
    grid[playerPos.r][playerPos.c] = 'E'; // Ensure no hazard
    explored[playerPos.r][playerPos.c] = true;

    renderBoard();
    checkPerceptions();
}

function getRandomEmptyPos() {
    let r, c;
    do {
        r = Math.floor(Math.random() * GRID_SIZE);
        c = Math.floor(Math.random() * GRID_SIZE);
    } while (grid[r] && grid[r][c] !== 'E');
    return { r, c };
}

function renderBoard() {
    boardEl.innerHTML = '';
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            
            if (explored[r][c]) {
                cell.classList.add('explored');
            }

            if (r === playerPos.r && c === playerPos.c) {
                cell.classList.add('player');
                if (gameState === 'LOSE') cell.classList.add('dead');
                
                // Add perception classes if applicable
                const senses = getSenses(r, c);
                if (senses.breeze) cell.classList.add('near-pit');
                if (senses.flap) cell.classList.add('near-bat');
                if (senses.smell) cell.classList.add('near-wumpus');
            }

            // If game is over, reveal everything
            if (gameState !== 'HUNTING') {
                if (grid[r][c] === 'W') cell.classList.add('revealed-wumpus');
                if (grid[r][c] === 'P') cell.classList.add('revealed-pit');
                if (grid[r][c] === 'B') cell.classList.add('revealed-bat');
            }

            // Mark dropped arrows (only visible if explored or game over)
            const hasArrow = arrowsDropped.some(a => a.r === r && a.c === c);
            if (hasArrow && (explored[r][c] || gameState !== 'HUNTING')) {
                const arrowIndicator = document.createElement('div');
                arrowIndicator.style.position = 'absolute';
                arrowIndicator.style.color = '#58a6ff';
                arrowIndicator.innerHTML = '➹';
                cell.appendChild(arrowIndicator);
            }

            boardEl.appendChild(cell);
        }
    }
}

function updateStats() {
    arrowsEl.textContent = arrows;
    stateEl.textContent = gameState;
    stateEl.className = 'value'; // reset
    if (gameState === 'HUNTING') stateEl.classList.add('active');
    else if (gameState === 'WIN') stateEl.classList.add('win');
    else if (gameState === 'LOSE') stateEl.classList.add('lose');
}

function logMessage(msg, type = '') {
    const p = document.createElement('div');
    p.className = `message ${type}`;
    p.textContent = msg;
    logEl.appendChild(p);
    
    // Smooth scroll to bottom
    setTimeout(() => {
        logEl.scrollTop = logEl.scrollHeight;
    }, 10);
}

function getNeighbors(r, c) {
    const neighbors = [];
    if (r > 0) neighbors.push({ r: r - 1, c });
    if (r < GRID_SIZE - 1) neighbors.push({ r: r + 1, c });
    if (c > 0) neighbors.push({ r, c: c - 1 });
    if (c < GRID_SIZE - 1) neighbors.push({ r, c: c + 1 });
    return neighbors;
}

function getSenses(r, c) {
    let breeze = false;
    let flap = false;
    let smell = false;
    
    getNeighbors(r, c).forEach(n => {
        const item = grid[n.r][n.c];
        if (item === 'P') breeze = true;
        if (item === 'B') flap = true;
        if (item === 'W') smell = true;
    });
    
    return { breeze, flap, smell };
}

function checkPerceptions() {
    const senses = getSenses(playerPos.r, playerPos.c);
    if (senses.breeze) logMessage('You feel a cold breeze...', 'important');
    if (senses.flap) logMessage('You hear flapping nearby...', 'magic');
    if (senses.smell) logMessage('You smell a terrible stench...', 'warning');

    // Check for dropped arrow
    const droppedIdx = arrowsDropped.findIndex(a => a.r === playerPos.r && a.c === playerPos.c);
    if (droppedIdx !== -1) {
        arrows++;
        arrowsDropped.splice(droppedIdx, 1);
        logMessage('You found an arrow on the ground!', 'success');
        updateStats();
        // Since we picked up an arrow, re-render to remove visual indicator
        renderBoard();
    }
}

function handleMove(dr, dc) {
    const nr = playerPos.r + dr;
    const nc = playerPos.c + dc;

    if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) {
        logMessage('You bump into a hard wall.', 'system');
        return;
    }

    moveTo(nr, nc);
}

function moveTo(r, c) {
    playerPos = { r, c };
    explored[r][c] = true;
    
    const cellValue = grid[r][c];

    if (cellValue === 'P') {
        logMessage('Aiiieeeeee! You fell into a bottomless pit!', 'warning');
        gameOver('LOSE');
    } else if (cellValue === 'W') {
        logMessage('Chomp chomp! The Wumpus ate you!', 'warning');
        gameOver('LOSE');
    } else if (cellValue === 'B') {
        logMessage('A colony of giant bats grabs you and whisks you away!', 'magic');
        // Pick random cell for dropping
        let dropPos;
        do {
            dropPos = {
                r: Math.floor(Math.random() * GRID_SIZE),
                c: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (dropPos.r === r && dropPos.c === c); // Don't drop exactly where we were
        
        // Timeout to simulate flying
        setTimeout(() => {
            logMessage('The bats drop you in a new location.', 'system');
            moveTo(dropPos.r, dropPos.c);
        }, 500);
    } else {
        renderBoard();
        checkPerceptions();
    }
}

function handleShoot(dr, dc) {
    if (arrows <= 0) {
        logMessage('You have no arrows left!', 'warning');
        return;
    }

    arrows--;
    updateStats();

    // Arrow travels through rooms in straight line
    let hitWumpus = false;
    let arrowR = playerPos.r + dr;
    let arrowC = playerPos.c + dc;

    // Arrow flies until it hits a wall
    let path = [];
    while (arrowR >= 0 && arrowR < GRID_SIZE && arrowC >= 0 && arrowC < GRID_SIZE) {
        path.push({r: arrowR, c: arrowC});
        if (grid[arrowR][arrowC] === 'W') {
            hitWumpus = true;
            break;
        }
        arrowR += dr;
        arrowC += dc;
    }

    if (hitWumpus) {
        logMessage('Aha! You shot the Wumpus! You win!', 'success');
        gameOver('WIN');
    } else {
        logMessage('Whoops, you missed...', 'system');
        // Drop arrow in last room
        if (path.length > 0) {
            const finalPos = path[path.length - 1];
            arrowsDropped.push(finalPos);
        }

        renderBoard(); // Update dropped arrows visual

        // Wumpus might move
        if (Math.random() < 0.75) {
            moveWumpus();
        }
    }
}

function moveWumpus() {
    // Wumpus moves to an adjacent empty room or just stays
    const neighbors = getNeighbors(wumpusPos.r, wumpusPos.c);
    const validMoves = neighbors.filter(n => grid[n.r][n.c] === 'E');
    
    if (validMoves.length > 0) {
        const move = validMoves[Math.floor(Math.random() * validMoves.length)];
        grid[wumpusPos.r][wumpusPos.c] = 'E';
        grid[move.r][move.c] = 'W';
        wumpusPos = { r: move.r, c: move.c };
        logMessage('You hear a heavy footstep moving in the dark...', 'warning');

        // Check if wumpus moved onto player
        if (wumpusPos.r === playerPos.r && wumpusPos.c === playerPos.c) {
            logMessage('The Wumpus stumbled into your room and ate you!', 'warning');
            gameOver('LOSE');
        } else {
            renderBoard();
            checkPerceptions();
        }
    }
}

function gameOver(state) {
    gameState = state;
    updateStats();
    renderBoard();
}

window.addEventListener('keydown', (e) => {
    if (gameState !== 'HUNTING') return;

    const isCtrl = e.ctrlKey || e.metaKey;
    const isAlt = e.altKey;

    let dr = 0, dc = 0;
    if (e.key === 'ArrowUp') dr = -1;
    else if (e.key === 'ArrowDown') dr = 1;
    else if (e.key === 'ArrowLeft') dc = -1;
    else if (e.key === 'ArrowRight') dc = 1;

    // We only process if exactly one of dr,dc is non-zero
    if (dr !== 0 || dc !== 0) {
        if (isCtrl && !isAlt) {
            e.preventDefault();
            handleMove(dr, dc);
        } else if (isAlt && !isCtrl) {
            e.preventDefault();
            handleShoot(dr, dc);
        }
    }
});

restartBtn.addEventListener('click', initGame);
