// game components
import Desk from './desk';
import GameTile from './gameTile';
import Button from './button';
import Checkbox from './checkbox';

class Game extends React.Component {
	boardSize = 10
	minesNr = 20
	openedTiles = []

	constructor(props) {
		super(props)
		// start tiles
		let tilesNr = this.boardSize * this.boardSize;
		let tiles = [];
		let i = 0;
		for (i = 0; i < tilesNr; i++) {
			tiles[i] = {
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
			if (tiles[position].type == '_') {
				tiles[position] = {
					type: '*',
					number: -1,
					opened: false
				};
				minesInstalled++;
			}
		}
		// set number of mines nearby
		for (i = 0; i < tilesNr; i++) {
			if (tiles[i].type == '_') {
				tiles[i].number = this.getNumberOfMinesNearby(tiles, i);
			}
		}
		this.state = {
			openedTilesNr: 0,
			flaggedTilesNr: 0,
			mineExploded: false,
			flagMisplaced: false,
			tiles: tiles,
			openNeighborsOnBlank: true
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
	getNumberOfMinesNearby(tiles, i) {
		let minesNearby = 0;
		let neighborhood = this.getNeighborhood(i)
		neighborhood.forEach((ni) => {
			if (tiles[ni].type == '*') {
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
		let lastLineStart = (lineSize * lineSize) - lineSize;
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

	/**
	 * Open all tiles - usually when the game is over
	 */
	openAllTiles() {
		this.setState(state => {
			let tiles = state.tiles.map((tile) => {
				tile.opened = true;
				return tile;
			});
			return {
				tiles: tiles
			}
		})
	}

	/**
	 * Opens tile. If setted and tile isn't near a mine, open
	 * neighbors until a number is found
	 * @param {integer} i tile index
	 * @return {integer} number of tiles opened
	 */
	openTile(i) {
		let openedTilesNr = 1
		this.openedTiles.push(i);
		this.setState(state => {
			let tiles = [...state.tiles]
			tiles[i].opened = true
			return {
				tiles: tiles
			}
		})
		if (this.state.tiles[i].number == 0 && this.state.openNeighborsOnBlank) {
			let neighborhood = this.getNeighborhood(i)
			neighborhood.forEach((ni) => {
				if (!this.openedTiles.includes(ni)) {
					openedTilesNr += this.openTile(ni)
				}
			})
		}
		return openedTilesNr;
	}

	leftClickTile(i) {
		if (this.state.tiles[i].type == '*') {
			this.setState({
				mineExploded: true
			})
			this.openAllTiles()
		}
		else {
			let openedTilesNr = this.openTile(i)
			this.setState({
				openedTilesNr: this.state.openedTilesNr + openedTilesNr
			})
		}
	}

	rightClickTile(i) {
		if (this.state.tiles[i].type == '*') {
			this.openedTiles.push(i)
			this.setState({
				flaggedTilesNr: this.state.flaggedTilesNr + 1
			})
		}
		else {
			this.setState({
				flagMisplaced: true
			})
			this.openAllTiles()
		}
	}

	/**
	 * Get message text to communicate with the player
	 */
	getMessage() {
		if (this.state.mineExploded) {
			return 'A mine exploded! Game over. :('
		}
		else if (this.state.flagMisplaced) {
			return 'You misplaced a flag! Game over. :('
		}
		else {
			let nrTilesLeft = (this.boardSize * this.boardSize) - (this.state.openedTilesNr + this.state.flaggedTilesNr);
			let nrBombsLeft = this.minesNr - parseInt(this.state.flaggedTilesNr)
			if (nrBombsLeft == 0) {
				return 'Congrats! You\'ve found all mines! :D'
			}
			else if (nrTilesLeft > 0) {
				return 'There are ' + nrTilesLeft + ' tiles and '+nrBombsLeft+' bombs left'
			}
			else {
				return 'Congrats! You won! :D'
			}
		}
	}

	render() {
		return (
			<div>
				<h2>{this.getMessage()}</h2>
				<Desk boardSize={this.boardSize}>
					{[...Array(this.boardSize * this.boardSize).keys()].map(i => (
						<GameTile key={i}
							number={this.state.tiles[i].number}
							type={this.state.tiles[i].type}
							opened={this.state.tiles[i].opened}
							gameLeftClick={() => { this.leftClickTile(i) }}
							gameRightClick={() => { this.rightClickTile(i) }}
						/>
					))}
				</Desk>
				<h3>Options</h3>
				<Checkbox key='openNeighboars' isChecked={this.state.openNeighborsOnBlank} 
					onCheckboxChange={() => {
						this.setState({
							openNeighborsOnBlank: !this.state.openNeighborsOnBlank
						})
					}}>
					Open neighbors when I click in a blank tile
				</Checkbox>
				<Button onClick={() => {window.location.reload(false)}}>New game</Button>
			</div>
		)
	}
}

export default Game;