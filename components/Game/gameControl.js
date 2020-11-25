class GameControl {
    flaggedTilesNr = 0
    openedTiles = []
    tiles = []

    constructor(boardSize, minesNr) {
        this.boardSize = boardSize
        this.minesNr = minesNr
    }

    /**
     * Return the number o tiles of this game
     * @return {integer} number of tiles
     */
    get nrOfTiles() {
        return (this.boardSize * this.boardSize)
    }

    /**
     * Return the tile at the correponding index
     */
    getTile(i) {
        return this.tiles[i]
    }

    isMine(i) {
        return (this.getTile(i).type == '*')
    }

    startGame() {
        // start tiles
        let tilesNr = this.nrOfTiles;
        let i = 0;
        for (i = 0; i < tilesNr; i++) {
            this.tiles[i] = {
                type: '_',
                number: 0,
                opened: false
            };
        }
        // randomly set the mines
        let minesInstalled = 0;
        let position = 0;
        while (minesInstalled < this.minesNr) {
            position = this.getRandomPosition();
            if (!this.isMine(position)) {
                this.tiles[position] = {
                    type: '*',
                    number: -1,
                    opened: false
                };
                minesInstalled++;
            }
        }
        // set number of mines nearby
        for (i = 0; i < tilesNr; i++) {
            if (!this.isMine(i)) {
                this.tiles[i].number = this.getNumberOfMinesNearby(i);
            }
        }
    }

    /**
     * Opens tile. If setted and tile isn't near a mine, open
     * neighbors until a number is found
     * @param {integer} i tile index
     * @return {integer} number of tiles opened
     */
    openTile(i, openNeighborsOnBlank) {
        this.openedTiles.push(i);
        if (this.getTile(i).number == 0 && openNeighborsOnBlank) {
            let neighborhood = this.getNeighborhood(i)
            neighborhood.forEach((ni) => {
                if (!this.openedTiles.includes(ni)) {
                    this.openTile(ni, openNeighborsOnBlank)
                }
            })
        }
    }

    flagTile(i) {
        if (this.isMine(i)) {
            this.openedTiles.push(i)
            this.flaggedTilesNr++
            return true
        }
        return false
    }

    getStatusMessage() {
        let nrTilesLeft = this.nrOfTiles - this.openedTiles.length;
        let nrBombsLeft = this.minesNr - parseInt(this.flaggedTilesNr)
        if (nrBombsLeft == 0) {
            return 'Congrats! You\'ve found all mines! :D'
        }
        else if (nrTilesLeft > 0) {
            return 'There are ' + nrTilesLeft + ' tiles and ' + nrBombsLeft + ' bombs left'
        }
    }

    /**
     * Return a random number between 0 and boardSize^2
     * @return {integer} random number
     */
    getRandomPosition() {
        let tilesNr = this.boardSize * this.boardSize;
        return Math.floor(tilesNr * Math.random());
    }

    /**
     * Return the number of miles in the immediate neighborhood of the tile
     * @param {Array} tiles the tile configuration
     * @param {integer} i index of the tile
     * @return {integer} number of mines
     */
    getNumberOfMinesNearby(i) {
        let minesNearby = 0;
        let neighborhood = this.getNeighborhood(i)
        neighborhood.forEach((ni) => {
            if (this.getTile(ni).type == '*') {
                minesNearby++;
            }
        })
        return minesNearby;
    }

    /**
     * Get array of indexes of neighboar tiles
     * @param {integer} i index of the tile
     * @return {Array} array of indexes
     */
    getNeighborhood(i) {
        let neighborhood = [];
        let lineSize = this.boardSize;
        let lastLineStart = this.nrOfTiles - lineSize;
        if (i > lineSize && i % lineSize > 0) { // top left
            neighborhood.push(i - lineSize - 1);
        }
        if (i >= lineSize) { // top
            neighborhood.push(i - lineSize);
        }
        if (i >= lineSize && (i + 1) % lineSize > 0) { // top right
            neighborhood.push(i - lineSize + 1);
        }
        if (i % lineSize > 0) { // left
            neighborhood.push(i - 1);
        }
        if ((i + 1) % lineSize > 0) { // right
            neighborhood.push(i + 1);
        }
        if (i < lastLineStart && i % lineSize > 0) { // bottom left
            neighborhood.push(i + lineSize - 1);
        }
        if (i < lastLineStart) { // bottom
            neighborhood.push(i + lineSize);
        }
        if (i < lastLineStart && (i + 1) % lineSize > 0) { // bottom right
            neighborhood.push(i + lineSize + 1);
        }
        return neighborhood;
    }
}

export default GameControl