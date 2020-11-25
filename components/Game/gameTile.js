// game components
import Square from '../Square';
import { Mine, Flag } from '../Images';

class GameTile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			opened: props.opened,
			flagged: false
		}
	}

	leftClick() {
		if (!this.state.opened && !this.state.flagged) {
			this.setState({
				opened: true
			})
			this.props.gameLeftClick()
		}
	}

	rightClick() {
		if (!this.state.opened && !this.state.flagged) {
			if (this.props.type == '*') {
				this.setState({
					flagged: true,
					opened: true
				})
			}
			this.props.gameRightClick()
		}
	}

	componentDidUpdate(oldProps) {
		// opened tile indirectly by the game comp
		if (!oldProps.opened && this.props.opened && !this.state.opened) {
			this.setState({
				opened: true
			})
		}
		else if (oldProps.opened && !this.props.opened && this.state.opened) {
			this.setState({
				opened: false,
				flagged: false,
			})
		}
	}

	render() {
		return (
			<div>
				<Square key={this.key} disabled={this.state.opened || this.state.flagged}
					number={this.props.number}
					onClick={() => { this.leftClick() }}
					onContextMenu={(e) => { e.preventDefault(); this.rightClick() }}>
					{this.state.opened && !this.state.flagged && this.props.type == '*' && <Mine />}
					{this.state.opened && this.props.type == '_' && this.props.number > 0 ? this.props.number : ''}
					{this.state.flagged && <Flag />}
				</Square>
			</div>
		)
	}
}

export default GameTile;