
import _ from 'underscore';
import Backbone from 'backbone';

class Game extends Backbone.Model {
  get urlRoot() {
    const API_ROOT = 'https://minesweeper-api.herokuapp.com/';
    return API_ROOT +'games';
  }

  get defaults() {
    return {
      mines: 0,
      state: 'new'
    };
  }

  check(x, y) {
    this.cellAction(x, y, '/check');
  }

  flag(x, y) {
    this.cellAction(x, y, '/flag');
  }

  cellAction(x, y, action) {
    this.save({
      row: y,
      col: x
    },
    {
      url: this.url() + action,
      method: 'POST',
      patch: true
    });
  }
};

export default Game;
