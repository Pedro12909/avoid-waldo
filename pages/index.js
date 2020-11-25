import Layout from '../components/Layout';
import Instructions from '../components/Instructions';

// the game component
import Game from '../components/Game';

const Index = () => (
  <Layout title={`Minesweeper (tsmotta)`}>
    <Instructions aditionalInfo={`Good luck!`} />
    <Game />
  </Layout>
);

export default Index;
