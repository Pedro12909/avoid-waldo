const rand = (max) => Math.floor(Math.random() * max)

export const generateMineField = (size, numberOfMines) => {
    // Initialize a 2D array
    const mineField = [...Array(size).keys()].map((row, x) =>
        [...Array(size).keys()].map((square, y) => ({
            neighbors: 0,
            isMine: false,
            posX: x,
            posY: y,
            isFlagged: false,
            isRevealed: false,
        }))
    )

    const mines = []

    // Randomly populate the mine field with mines
    // If a given square is a mine, it will be equal to 1
    let remainingMines = numberOfMines
    while (remainingMines > 0) {
        const randX = rand(size)
        const randY = rand(size)

        const square = mineField[randX][randY]

        // Confirm that this square is not a mine already
        if (!square.isMine) {
            square.isMine = true
            mines.push(square)
            remainingMines--
        }
    }

    // Populate neighbor mine count
    for (let x = 0; x < mineField.length; x++) {
        const row = mineField[x]

        for (let y = 0; y < row.length; y++) {
            const square = row[y]

            // Only increment neighbor counters if this is a a mine
            if (!square.isMine) continue

            // Top left
            if (x > 0 && y > 0) {
                mineField[x - 1][y - 1].neighbors++
            }
            // Top
            if (y > 0) {
                mineField[x][y - 1].neighbors++
            }
            // Top right
            if (x < size - 1 && y > 0) {
                mineField[x + 1][y - 1].neighbors++
            }
            // Right
            if (x < size - 1) {
                mineField[x + 1][y].neighbors++
            }
            // Bottom right
            if (x < size - 1 && y < size - 1) {
                mineField[x + 1][y + 1].neighbors++
            }
            // Bottom
            if (y < size - 1) {
                mineField[x][y + 1].neighbors++
            }
            // Bottom left
            if (x > 0 && y < size - 1) {
                mineField[x - 1][y + 1].neighbors++
            }
            // Left
            if (x > 0) {
                mineField[x - 1][y].neighbors++
            }
        }
    }

    return {mineField, mines}
}