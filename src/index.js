import React, { Component, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Socket from 'socket.io-client'

import './index.css'

import Personalise from './lib/personalise'
import { Get } from './services/fetch'

import Fallback from './components/pages/fallback'
import ImgCard from './components/img-card'

const CreatePage = lazy(() => import('./components/pages/create'))
const GuidePage = lazy(() => import('./components/pages/guide'))
const HostPage = lazy(() => import('./components/pages/host'))
const IndexPage = lazy(() => import('./components/pages/index'))
const JoinPage = lazy(() => import('./components/pages/join'))
const PlayPage = lazy(() => import('./components/pages/play'))
const QuestionPage = lazy(() => import('./components/pages/question'))

const API = process.env.REACT_APP_API || 'http://localhost:3001'

class App extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    const cookie = +document.cookie.split('=')[1] || null
    const game = JSON.parse(window.sessionStorage.getItem('game')) || null

    this.state = {
      cookie: cookie,
      counting: false,
      game: cookie ? game : null,
      io: game ? Socket(`${API}/${game.gamecode}`) : null,
      picture: null
    }
  }

  componentDidMount () {
    Get()
  }

  handleClick (event, picture) {
    this.setState({
      picture: this.state.picture ? null : picture
    })
  }

  updateCookie (cookie = this.state.cookie) {
    this.setState({
      cookie
    }, () => {
      document.cookie = `id=${cookie}; max-age=${60 * 60}; path=/`
    })
  }

  updateGame (_game) {
    const { cookie, counting, io } = this.state

    const game = _game ? Personalise(cookie, _game) : null

    if (game && counting === !game.active) this.handleClick()

    this.setState({
      counting: game && game.active && true,
      game,
      io: game ? io || Socket(`${API}/${game.gamecode}`) : null
    }, () => {
      window.sessionStorage.setItem('game', JSON.stringify(game))
    })
  }

  render () {
    const { cookie, counting, game, io, picture } = this.state

    const handleClick = (event, picture) => this.handleClick(event, picture)
    const updateCookie = cookie => this.updateCookie(cookie)
    const updateGame = game => this.updateGame(game)

    return (
      <Router>
        <div id='background'>
          <div id='background-top' />

          <div id='foreground'>
            <Suspense fallback={<Fallback />}>
              <Switch>
                <Route
                  exact path='/'
                  component={IndexPage}
                />

                <Route
                  exact path='/create'
                  render={() => <CreatePage />}
                />

                <Route
                  path='/join/:gamecode?/:password?'
                  render={route => <JoinPage {...{ cookie, ...route, updateCookie, updateGame }} />}
                />

                <Route
                  exact path='/game/host'
                  render={() => <HostPage {...{ cookie, game, io, updateGame }} />}
                />

                <Route
                  exact path='/game/play'
                  render={() => <PlayPage {...{ cookie, game, handleClick, io, updateCookie, updateGame }} />}
                />

                <Route
                  exact path='/game/question'
                  render={() => <QuestionPage {...{ cookie, game, handleClick, updateCookie, updateGame }} />}
                />

                <Route
                  exact path='/guide'
                  component={GuidePage}
                />

                <Route>
                  <Redirect to='/' />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>

        {(picture && <ImgCard enlarged onClick={this.handleClick} picture={picture} />)}
        {(counting && <div id='countdown'>{game.seconds}</div>)}
      </Router>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
