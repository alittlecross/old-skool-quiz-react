import React, { Component, Suspense, lazy } from 'react';

import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import Socket from 'socket.io-client';

import './index.css';

import Fallback from './components/pages/fallback';
import ImgCard from './components/img-card';
import Personalise from './lib/personalise';
import Post from './services/fetch';

const CreatePage = lazy(() => import('./components/pages/create'));
const GuidePage = lazy(() => import('./components/pages/guide'));
const HostPage = lazy(() => import('./components/pages/host'));
const IndexPage = lazy(() => import('./components/pages/index'));
const JoinPage = lazy(() => import('./components/pages/join'));
const PlayPage = lazy(() => import('./components/pages/play'));
const QuestionPage = lazy(() => import('./components/pages/question'));

const SOCKET = process.env.REACT_APP_SOCKET || 'http://localhost:3000';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    const cookie = +document.cookie.split('=')[1] || null;
    const game = JSON.parse(window.sessionStorage.getItem('game')) || null;

    this.state = {
      cookie,
      counting: false,
      game: cookie ? game : null,
      io: game ? this.createSocket(game.gamecode) : null,
      picture: null,
    };
  }

  componentDidMount() {
    Post('/', {});
  }

  createSocket(gamecode) {
    return Socket.io(`${SOCKET}/${gamecode}`);
  }

  handleClick(event, picture) {
    this.setState({
      picture: this.state.picture ? null : picture,
    });
  }

  updateCookie(cookie = this.state.cookie) {
    this.setState({
      cookie,
    }, () => {
      document.cookie = `id=${cookie}; max-age=${60 * 60}; path=/`;
    });
  }

  updateGame(_game) {
    const { cookie, counting, io } = this.state;

    const game = _game ? Personalise(cookie, _game) : null;

    if (game && counting === !game.active) this.handleClick();

    this.setState({
      counting: game && game.active && true,
      game,
      io: game ? io || this.createSocket(game.gamecode) : null,
    }, () => {
      window.sessionStorage.setItem('game', JSON.stringify(game));
    });
  }

  render() {
    const {
      cookie, counting, game, io, picture,
    } = this.state;

    const handleClick = (event, picture) => this.handleClick(event, picture);
    const updateCookie = (cookie) => this.updateCookie(cookie);
    const updateGame = (game) => this.updateGame(game);

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div id="background">
          <div id="background-top" />

          <div id="foreground">
            <Suspense fallback={<Fallback />}>
              <Routes>
                <Route
                  path="/"
                  element={<IndexPage />}
                />

                <Route
                  path="/create"
                  element={<CreatePage />}
                />

                <Route
                  path="/join/:gamecode?/:password?"
                  element={<JoinPage cookie={cookie} updateCookie={updateCookie} updateGame={updateGame} />}
                />

                <Route
                  path="/game/host"
                  element={<HostPage cookie={cookie} game={game} io={io} updateGame={updateGame} />}
                />

                <Route
                  path="/game/play"
                  element={<PlayPage cookie={cookie} game={game} handleClick={handleClick} io={io} updateCookie={updateCookie} updateGame={updateGame} />}
                />

                <Route
                  path="/game/question"
                  element={<QuestionPage cookie={cookie} game={game} handleClick={handleClick} updateCookie={updateCookie} updateGame={updateGame} />}
                />

                <Route
                  path="/guide"
                  element={<GuidePage />}
                />

                <Route
                  element={<Navigate to="/" />}
                />
              </Routes>
            </Suspense>
          </div>
        </div>

        {(picture && <ImgCard enlarged onClick={this.handleClick} picture={picture} />)}
        {(counting && <div id="countdown">{game.seconds}</div>)}
      </BrowserRouter>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
