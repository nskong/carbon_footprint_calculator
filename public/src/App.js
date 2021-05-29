import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Travel from './components/Travel';
import Bus from './components/travel/Bus';
import Flying from './components/travel/Flying';
import Rail from './components/travel/Rail';
import Taxi from './components/travel/Taxi';

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
          <Route path='/Taxi' component={Taxi} />
          <Route path='/Vehicle' component={Taxi} />

          {/* <Route path='/Food' component={Food} /> */}
        </main>
      </Router>
    </div>
  );
}

export default App;
