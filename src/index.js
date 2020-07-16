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

class App extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    const api = process.env.REACT_APP_API
    const cookie = +document.cookie.split('=')[1] || null
    const game = JSON.parse(window.sessionStorage.getItem('game')) || null

    this.state = {
      api: api,
      cookie: cookie,
      counting: false,
      game: cookie ? game : null,
      io: game ? io(`${api}/${game.gamecode}`) : null,
      picture: null
    }
  }

  componentDidMount () {
    fetch(this.state.api)
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

  updateGame (g) {
    const { api, cookie, counting, io: socket } = this.state

    const game = g ? Personalise(cookie, g) : null

    if (g && counting !== g.counting) {
      this.handleClick()
    }

    this.setState({
      counting: g ? g.counting : false,
      game,
      io: game ? socket || io(`${api}/${game.gamecode}`) : null
    }, () => {
      window.sessionStorage.setItem('game', JSON.stringify(game))
    })
  }

  render () {
    const { game, picture } = this.state

    const props = (props) => ({
      ...props,
      ...this.state,
      handleClick: (event, picture) => this.handleClick(event, picture),
      updateCookie: cookie => this.updateCookie(cookie),
      updateGame: game => this.updateGame(game)
    })

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
                  render={() => <CreatePage {...props()} />}
                />

                <Route
                  path='/join/:gamecode?/:password?'
                  render={route => <JoinPage {...props(route)} />}
                />

                <Route
                  exact path='/game/host'
                  render={() => <HostPage {...props()} />}
                />

                <Route
                  exact path='/game/play'
                  render={() => <PlayPage {...props()} />}
                />

                <Route
                  exact path='/game/question'
                  render={() => <QuestionPage {...props()} />}
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

        {(picture ? <ImgEnlargedContainer onClick={this.handleClick} picture={picture} /> : null)}
        {(game && game.counting ? <div id='countdown'>{game.seconds}</div> : null)}
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
