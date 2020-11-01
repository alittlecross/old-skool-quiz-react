import React, { Component, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import fetch from 'node-fetch'
import io from 'socket.io-client'

import './index.css'

import Fallback from './components/page/fallback'
import ImgEnlargedContainer from './components/function/img-enlarged-container'
import Personalise from './lib/personalise'

const CreatePage = lazy(() => import('./components/page/create'))
const GuidePage = lazy(() => import('./components/page/guide'))
const HostPage = lazy(() => import('./components/page/host'))
const IndexPage = lazy(() => import('./components/page/index'))
const JoinPage = lazy(() => import('./components/page/join'))
const PlayPage = lazy(() => import('./components/page/play'))
const QuestionPage = lazy(() => import('./components/page/question'))

const api = process.env.REACT_APP_API || 'http://localhost:3001'

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
      io: game ? io(`${api}/${game.gamecode}`) : null,
      picture: null
    }
  }

  componentDidMount () {
    fetch(api)
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
    const { cookie, counting, io: socket } = this.state

    const game = _game ? Personalise(cookie, _game) : null

    if (game && counting !== game.counting) {
      this.handleClick()
    }

    this.setState({
      counting: game && game.counting,
      game,
      io: game ? socket || io(`${api}/${game.gamecode}`) : null
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
                  render={() => <CreatePage {...{ api }} />}
                />

                <Route
                  path='/join/:gamecode?/:password?'
                  render={route => <JoinPage {...{ api, cookie, ...route, updateCookie, updateGame }} />}
                />

                <Route
                  exact path='/game/host'
                  render={() => <HostPage {...{ api, cookie, game, io, updateGame }} />}
                />

                <Route
                  exact path='/game/play'
                  render={() => <PlayPage {...{ cookie, game, handleClick, io, updateCookie, updateGame }} />}
                />

                <Route
                  exact path='/game/question'
                  render={() => <QuestionPage {...{ api, cookie, game, handleClick, updateGame }} />}
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

        {(picture && <ImgEnlargedContainer onClick={this.handleClick} picture={picture} />)}
        {(game && counting && <div id='countdown'>{game.seconds}</div>)}
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
