import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Game from './models';
import {IndexView, GameView} from './views';

class Router extends Backbone.Router {
  get routes() {
    return {
      '' : 'showIndex',
      'game/:id' : 'showGame'
    }
  }

  showIndex() {
    console.log('index routed');
    var indexView = new IndexView();
    $('main').html(indexView.render());
  }

  showGame(gameId) {
    console.log('game routed');
    var game = new Game({id: gameId});
    var gameView = new GameView({model: game});
    $('main').html(gameView.render());
  }

  initialize() {
    Backbone.history.start();
  }
};

export default Router;
