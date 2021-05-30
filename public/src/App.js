import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Travel from './components/Travel';
import Bus from './components/travel/Bus';
import Flying from './components/travel/Flying';
import Rail from './components/travel/Rail';
import Vehicle from './components/travel/Vehicle';

import Housing from './components/Housing';
import Electricity from './components/housing/electricity';
import Fuel from './components/housing/fuel';

/**
 * Main application which holds all pages. I used react-router-dom to navigate
 * between pages, because I realized the ant components had navigation a little late.
 */
function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Route path='/' component={Main} exact />

          <Route path='/Travel' component={Travel} />
          <Route path='/Bus' component={Bus} />
          <Route path='/Flying' component={Flying} />
          <Route path='/Rail' component={Rail} />
          <Route path='/Vehicle' component={Vehicle} />

          <Route path='/Housing' component={Housing} />
          <Route path='/Electricity' component={Electricity} />
          <Route path='/Fuel' component={Fuel} />
        </main>
      </Router>
    </div>
  );
}

export default App;
