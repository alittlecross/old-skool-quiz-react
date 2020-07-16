import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import AnswerForm from '../class/answer-form'
import AskNextQuestionLink from '../function/ask-next-question-link'
import EndCountdownButton from '../class/end-countdown-button'
import GameContainer from '../container/game'
import GuideLink from '../function/guide-link'
import MenuTables from '../class/menu-tables'
import PointsTable from '../function/points-table'
import QuestionTables from '../function/question-tables'

class Play extends Component {
  componentDidMount () {
    const { cookie, io, updateGame } = this.props

    if (io) {
      io.on('remove player', id => {
        if (cookie === +id) {
          updateGame()
        }
      })

      io.on('update game', game => updateGame(game))
    }
  }

  componentWillUnmount () {
    const { io } = this.props

    if (io) {
      io.off('remove player')
      io.off('update game')
    }
  }

  render () {
    const { cookie, game } = this.props

    const _redirect = game ? game.host.id ? null : '/game/host' : '/'

    if (_redirect) {
      return <Redirect to={_redirect} />
    }

    return (
      <>
        <GameContainer game={game}>
          <div className='sub-heading'>Asking the questions is... <span id='host'>{game.host.name}</span></div>

          {(!game.counting && cookie === game.host.id ? <AskNextQuestionLink /> : null)}
          {(!game.counting ? <PointsTable {...this.props} /> : null)}
          {(!game.counting && cookie === game.host.id ? <MenuTables {...this.props} /> : null)}

          {(game.counting && cookie !== game.host.id ? <AnswerForm {...this.props} /> : null)}
          {(game.counting && cookie === game.host.id ? <EndCountdownButton {...this.props} /> : null)}

          <QuestionTables {...this.props} />

          <GuideLink />
        </GameContainer>
      </>
    )
  }
}

export default Play
