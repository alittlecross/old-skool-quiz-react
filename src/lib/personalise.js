const Personalise = (cookie, _game) => {
  const game = { ..._game };

  if (game.active) {
    if (cookie !== game.host.id) delete game.active.correct;
  }

  for (const [key, value] of Object.entries(game.players)) {
    if (value.active) {
      if (cookie !== +key && cookie !== game.host.id) delete game.players[key].active.answer;
    }

    game.players[key].score = value.answers.reduce((a, c) => a + c.points, 0);

    if (!value.visible) delete game.players[key];
  }

  return game;
};

export default Personalise;
