import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import ActiveQuestion from './active-question';
import AskNextQuestionLink from './ask-next-question-link';
import EndCountdownButton from './end-countdown-button';
import GameContainer from '../../../containers/game';
import GuideLink from '../../guide-link';
import MenuBar from './menu-bar';
import PastQuestions from './past-questions';
import ScoresTable from './scores-table';

function Play({
  cookie, game, handleClick, io, updateCookie, updateGame,
}) {
  useEffect(() => {
    if (io) {
      io.on('remove player', (id) => {
        if (cookie === +id) updateGame();
      });

      io.on('update game', (game) => updateGame(game));
    }

    return () => {
      if (io) {
        io.off('remove player');
        io.off('update game');
      }
    };
  });

  const redirect = game ? game.host.id ? null : '/game/host' : '/';

  return (
    <>
      {
        redirect ? (
          <Navigate to={redirect} />
        ) : (
          <GameContainer {...{ game }}>
            <div className="sub-heading">
              {'Asking the questions is... '}
              <span id="host">{game.host.name}</span>
            </div>

            {
              cookie === game.host.id
              && !game.active
                && <AskNextQuestionLink />
            }
            {
              !game.active
                && <ScoresTable {...{ game }} />
            }
            {
              cookie === game.host.id
              && !game.active
                && <MenuBar {...{ game, io }} />
            }
            {
              cookie === game.host.id
              && game.active
                && <EndCountdownButton {...{ io }} />
            }
            {
              game.active
                && (
                <ActiveQuestion {...{
                  cookie, game, handleClick, io, updateCookie,
                }}
                />
                )
            }

            <PastQuestions {...{
              cookie, game, handleClick, io, updateCookie,
            }}
            />

            <GuideLink />
          </GameContainer>
        )
      }
    </>
  );
}

export default Play;
