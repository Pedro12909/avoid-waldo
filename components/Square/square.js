import { createComponent } from 'cf-style-container';

class Colors {
  static black = '#000'
  static blue = '#00c'
  static orange = '#db0'
  static red = '#c00'
  static brightRed = '#f00'
  static ofNumber(number) {
    switch (number) {
      case 0: return this.black
      case 1: return this.blue
      case 2: return this.orange
      case 3: return this.red
      default: return this.brightRed
    }
  }
}

const Square = createComponent(
  ({ disabled, number }) => ({
    width: 40,
    height: 40,
    padding: 10,
    color: Colors.ofNumber(number),
    cursor: disabled ? 'initial' : 'pointer',
    backgroundColor: disabled ? '#FFF' : '#CCC',
    border: `1px solid black`,
    lineHeight: 1,
    textAlign: 'center',
    fontSize: 18
  }),
  'div',
  ['onClick', 'onContextMenu']
);

export default Square;
