// game components
import GameControl from './gameControl'
import GameTile from './gameTile'
import Desk from '../Desk';
import Button from '../Button';
import Checkbox from '../Checkbox';

class Game extends React.Component {
	boardSize = 10
	minesNr = 20
	gameControl;

	constructor(props) {
		super(props)
		this.gameControl = new GameControl(this.boardSize, this.minesNr)
		this.gameControl.startGame()
		this.state = {
			openedTiles: [],
			mineExploded: false,
			flagMisplaced: false,
			openNeighborsOnBlank: true
		}
	}

	restartGame() {
		this.gameControl = new GameControl(this.boardSize, this.minesNr)
		this.gameControl.startGame()
		this.setState({
			openedTiles: [],
			mineExploded: false,
			flagMisplaced: false,
			openNeighborsOnBlank: true
		})
	}

	/**
	 * Open all tiles - usually when the game is over
	 */
	openAllTiles() {
		this.setState({
			openedTiles: Array.from(Array(this.gameControl.nrOfTiles).keys())
		})
	}

	leftClickTile(i) {
		if (this.gameControl.isMine(i)) {
			this.setState({
				mineExploded: true
			})
			this.openAllTiles()
		}
		else {
			this.gameControl.openTile(i, this.state.openNeighborsOnBlank)
			this.setState({
				openedTiles: this.gameControl.openedTiles
			})
		}
	}

	rightClickTile(i) {
		if (this.gameControl.flagTile(i)) {
			this.setState({
				flaggedTilesNr: this.state.flaggedTilesNr + 1,
				openedTiles: this.gameControl.openedTiles
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
			return this.gameControl.getStatusMessage()
		}
	}

	render() {
		return (
			<div>
				<h2>{this.getMessage()}</h2>
				<Desk boardSize={this.boardSize}>
					{[...Array(this.boardSize * this.boardSize).keys()].map(i => (
						<GameTile key={i}
							number={this.gameControl.getTile(i).number}
							type={this.gameControl.getTile(i).type}
							opened={this.state.openedTiles.includes(i)}
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
				<Button onClick={() => { this.restartGame() }}>New game</Button>
			</div>
		)
	}
}

export default Game;
