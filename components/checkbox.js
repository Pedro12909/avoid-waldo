import { createComponent } from 'cf-style-container';

const Label = createComponent(() => ({
        display: 'block',
        padding: '5px 10px',
        margin: '0.5rem 0',
        cursor: 'pointer',
        color: '#66d',
        lineHeight: 1,
        fontSize: 16
    }),
    'label'
);

class Checkbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isChecked: props.isChecked,
		}
	}

    componentDidUpdate(oldProps) {
		// opened tile indirectly by the game comp
		if (oldProps.isChecked != this.props.isChecked) {
			this.setState({
				isChecked: this.props.isChecked
			})
		}
	}
    
    render() {
        return (
            <Label for={this.key}>
                <input type="checkbox" id={this.key} 
                    checked={this.state.isChecked ? '"checked"' : ''}
                    onChange={this.props.onCheckboxChange}
                />
                {this.props.children}
            </Label>
        );
    }     
}

export default Checkbox;