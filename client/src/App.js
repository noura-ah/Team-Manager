import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'
import ListPlayers from './components/ListPlayers';
import NewPlayer from './components/NewPlayer';
import PlayerStatus from './components/PlayerStatus'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavLink to="">Manage Players</NavLink>
        <span> | </span>
        <NavLink to="/status/game/1">Manage Player Status</NavLink>
        <Switch>
          <Route exact path='/' element={<Redirect to="/players/list" />}>
            <ListPlayers />
          </Route>
          <Route path="/new">
            <NewPlayer />
          </Route>
          <Route path="/status/game/1">
            <PlayerStatus/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
