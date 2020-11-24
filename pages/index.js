import Layout from '../components/layout';
import Instructions from '../components/instructions';

// the game component
import Game from '../components/game';

const Index = () => (
  <Layout title={`Minesweeper (tsmotta)`}>
    <Instructions aditionalInfo={`Good luck!`} />
    <Game />
  </Layout>
);

export default Index;
