import { StyleProvider } from 'cf-style-nextjs';
import { createComponent } from 'cf-style-container';

const Center = createComponent(({ theme }) => ({
  margin: '0px auto',
  width: '420px'
  //margin: theme.space[4]
}));

export default ({ children, title = 'Minesweeper' }) => (
  <StyleProvider>
    <Center>
      <h1>{title}</h1>
      {children}
    </Center>
  </StyleProvider>
);
