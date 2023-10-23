const mazeContainer = document.getElementById('maze-container');
let numRows = 5; // Initial number of rows
let numCols = 5; // Initial number of columns
let playerCell = { row: 0, col: 0 }; // Initial position of the player
let level = 1;

function createMaze() {
    mazeContainer.innerHTML = ''; // Clear the previous maze

    // Generate a new maze with increasing complexity based on the level
    const maze = generateMaze(numRows, numCols);

    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Add walls based on the maze structure
            if (maze[i][j] === 1) {
                cell.classList.add('wall');
            }

            // Add player at the starting position
            if (i === playerCell.row && j === playerCell.col) {
                cell.classList.add('player');
            }

            row.appendChild(cell);
        }
        mazeContainer.appendChild(row);
    }
}

// Function to generate a random maze
function generateMaze(rows, cols) {
    const maze = [];

    for (let i = 0; i < rows; i++) {
        maze[i] = [];
        for (let j = 0; j < cols; j++) {
            maze[i][j] = 1; // Initialize with walls
        }
    }

    for (let i = 1; i < rows; i += 2) {
        for (let j = 1; j < cols; j += 2) {
            maze[i][j] = 0; // Open path
            const neighbors = [];

            if (i > 1) neighbors.push([i - 2, j]);
            if (i < rows - 2) neighbors.push([i + 2, j]);
            if (j > 1) neighbors.push([i, j - 2]);
            if (j < cols - 2) neighbors.push([i, j + 2]);

            if (neighbors.length > 0) {
                const [randI, randJ] = neighbors[Math.floor(Math.random() * neighbors.length)];
                maze[randI][randJ] = 0; // Open path
            }
        }
    }

    maze[rows - 1][cols - 1] = 0; // Place exit at the bottom-right corner

    return maze;
}

// Function to move the player
function movePlayer(direction) {
    // Implement the logic to move the player within the maze
    // Update the player's position and re-render the maze

    if (playerCell.row === numRows - 1 && playerCell.col === numCols - 1) {
        level++;
        numRows += 2; // Increase the number of rows
        numCols += 2; // Increase the number of columns
        playerCell = { row: 0, col: 0 };
        createMaze();
    }
}

// Add event listeners for arrow key movements
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        movePlayer('up');
    } else if (event.key === 'ArrowDown') {
        movePlayer('down');
    } else if (event.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.key === 'ArrowRight') {
        movePlayer('right');
    }
});

createMaze();
