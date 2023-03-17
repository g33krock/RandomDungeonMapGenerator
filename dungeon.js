// Configuration object (instead of YAML)
const config = {
  dungeon: {
    width: 50,
    height: 50,
    steps: 1000
  }
};

function addWalls(dungeon) {
  const height = dungeon.length;
  const width = dungeon[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (dungeon[y][x] === 2) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;

            if (
              ny >= 0 && ny < height &&
              nx >= 0 && nx < width &&
              dungeon[ny][nx] === 0
            ) {
              dungeon[ny][nx] = 1;
            }
          }
        }
      }
    }
  }
}


function generateDungeon(width, height, steps) {
  let dungeon = Array(height).fill(null).map(() => Array(width).fill(0));
  let x = Math.floor(width / 2);
  let y = Math.floor(height / 2);
  dungeon[y][x] = 2; // Start at the center

  for (let i = 0; i < steps; i++) {
    const direction = Math.floor(Math.random() * 4);
    switch (direction) {
      case 0: x++; break; // Right
      case 1: y++; break; // Down
      case 2: x--; break; // Left
      case 3: y--; break; // Up
    }
    x = Math.min(Math.max(x, 1), width - 2);
    y = Math.min(Math.max(y, 1), height - 2);
    dungeon[y][x] = 2
}
return dungeon
}

function displayDungeon(dungeon) {
  const dungeonElement = document.getElementById('dungeon');

  for (const row of dungeon) {
    for (const cell of row) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');

      switch (cell) {
        case 0:
          cellElement.classList.add('empty');
          break;
        case 1:
          cellElement.classList.add('wall');
          break;
        case 2:
          cellElement.classList.add('floor');
          break;
        case 3:
          cellElement.classList.add('door');
          break;
      }

      dungeonElement.appendChild(cellElement);
    }
  }
}

// Generate the dungeon
const dungeonWidth = config.dungeon.width;
const dungeonHeight = config.dungeon.height;
const steps = config.dungeon.steps;
const dungeon = generateDungeon(dungeonWidth, dungeonHeight, steps);

// Add walls around the floor tiles
addWalls(dungeon);

// Display the dungeon
displayDungeon(dungeon);