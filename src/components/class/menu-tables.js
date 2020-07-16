import React, { Component } from 'react'

import MenuTable from '../function/menu-table'
import MenuTableCell from '../function/menu-table-cell'

class MenuTables extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleClickSign = this.handleClickSign.bind(this)

    this.state = {
      merge: null,
      tables: [false, false, false, false]
    }
  }

  handleClick (event, i) {
    const tables = [false, false, false, false]

    tables[i] = !this.state.tables[i]

    this.setState({
      tables
    })
  }

  handleClickSign (event, i, id) {
    const { io } = this.props
    const { merge } = this.state

    const handlers = [
      () => {
        io.emit('switch host', id)
      },
      () => {
        io.emit('add/remove bonus points', id, parseInt(`${event.target.innerText}1`))
      },
      () => {
        if (merge) {
          if (id !== merge) {
            io.emit('merge players', id, merge)
          }

          this.setState({
            merge: null
          })
        } else {
          this.setState({
            merge: id
          })
        }
      },
      () => {
        io.emit('remove player', id)
      }
    ]

    handlers[i]()
  }

  render () {
    const { merge, tables } = this.state

    const cells = [[], [], [], []]

    for (const [key] of Object.entries(this.props.game.players)) {
      cells[0].push(<MenuTableCell key={key} id={key} i={0} onClick={this.handleClickSign} sign='✓' />)
      cells[2].push(<MenuTableCell key={key} id={key} i={2} merge={merge} onClick={this.handleClickSign} sign='#' />)
      cells[3].push(<MenuTableCell key={key} id={key} i={3} onClick={this.handleClickSign} sign='✗' />)

      cells[1].push(
        <td key={key} data-id={key}>
          <span className='sign' onClick={event => this.handleClickSign(event, 1, key)}>-</span>
          &nbsp;&nbsp;
          <span className='sign' onClick={event => this.handleClickSign(event, 1, key)}>+</span>
        </td>
      )
    }

    return (
      <div id='menu'>
        <span className='highlight-yellow' id='switch-host' onClick={event => this.handleClick(event, 0)}>Switch host...</span>
        &nbsp;
        <span className='highlight-green' id='bonus-points' onClick={event => this.handleClick(event, 1)}>Bonus points...</span>
        &nbsp;
        <span className='highlight-blue' id='merge-players' onClick={event => this.handleClick(event, 2)}>Merge players...</span>
        &nbsp;
        <span className='highlight-pink' id='remove-player' onClick={event => this.handleClick(event, 3)}>Remove player...</span>

        {(tables[0] ? <MenuTable cells={cells[0]} id='switch-host-table' /> : null)}
        {(tables[1] ? <MenuTable cells={cells[1]} id='bonus-points-table' /> : null)}
        {(tables[2] ? <MenuTable cells={cells[2]} id='merge-players-table' /> : null)}
        {(tables[3] ? <MenuTable cells={cells[3]} id='remove-player-table' /> : null)}

      </div>
    )
  }
}

export default MenuTables
