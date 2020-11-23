import { createComponent } from 'cf-style-container';

const Instructions = createComponent(() => ({
  color: '#00d'
}));

export default ({ aditionalInfo = '' }) => (
  <Instructions>
    <ul>
      <li>Left-click to uncover a tile</li>
      <li>The tile will uncover the number of bombs in the immediate neighborhood</li>
      <li>Right-click to flag a tile as a bomb - only when you are sure of it</li>
      <li>You win when you opened or flagged all tiles</li>
      <li>{aditionalInfo}</li>
    </ul>
  </Instructions>
);