import React, { Suspense, lazy, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import fetch from 'node-fetch'
import socket from 'socket.io-client'

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

const App = () => {
  const api = process.env.REACT_APP_API || 'http://localhost:3001'

  const [cookie, setCookie] = useState(+document.cookie.split('=')[1])
  const [counting, setCounting] = useState(false)
  const [game, setGame] = useState(cookie && JSON.parse(window.sessionStorage.getItem('game')))
  const [io, setIo] = useState(game && socket(`${api}/${game.gamecode}`))
  const [listen, setListen] = useState(true)
  const [picture, setPicture] = useState(null)

  useEffect(() => {
    fetch(api)

    if (io && listen) {
      io.on('remove player', id => {
        if (cookie === +id) {
          updateGame()
        }
      })

      io.on('update game', game => updateGame(game))
    }

    return () => {
      if (io && listen) {
        io.off('remove player')
        io.off('update game')
      }
    }
  })

  const handleClick = (_, _picture) => {
    setPicture(picture ? null : _picture)
  }

  const updateCookie = (_cookie = cookie) => {
    setCookie(_cookie)

    document.cookie = `id=${_cookie}; max-age=${60 * 60}; path=/`
  }

  const updateGame = _game => {
    const game = _game ? Personalise(cookie, _game) : null

    if (game && counting !== game.counting) {
      handleClick()
    }

    if (!io) {
      setIo(socket(`${api}/${game.gamecode}`))
    }

    if (!listen) {
      setListen(true)
    }

    setCounting(game && game.counting)
    setGame(game)

    window.sessionStorage.setItem('game', JSON.stringify(game))
  }

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
                render={() => <HostPage {...{ api, cookie, game, setListen, updateGame }} />}
              />

              <Route
                exact path='/game/play'
                render={() => <PlayPage {...{ cookie, game, handleClick, io, updateCookie }} />}
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

      {picture && <ImgEnlargedContainer onClick={handleClick} picture={picture} />}
      {game && game.counting && <div id='countdown'>{game.seconds}</div>}
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
