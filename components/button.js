import { createComponent } from 'cf-style-container';

const Button = createComponent(
  () => ({
    padding: '5px 10px',
    margin: '0.5rem 0',
    cursor: 'pointer',
    backgroundColor: '#00d',
    color: '#fff',
    lineHeight: 1,
    textAlign: 'center',
    fontSize: 16
  }),
  'button',
  ['onClick']
);

export default Button;
