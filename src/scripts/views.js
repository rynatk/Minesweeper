import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Game from './models';

class IndexView extends Backbone.View {
  get template() {
    return $('#indexTemplate').text();
  }

  get events() {
    return {
      'click form.newGame button': 'createGame'
    };
  }

  createGame(event) {
    var diff = event.target.value;
    var game = new Game({difficulty: diff});
    game.save().then(function() {
      Backbone.history.navigate(`/game/${game.get('id')}`, true);
    });
  }

  render() {
    this.$el.html(this.template);
    return this.el;
  }
};

class GameView extends Backbone.View {
  get template() {
    return _.template($('#gameTemplate').html());
  }

  get events() {
    return {
      'click td.unrevealed': 'checkCell',
      'contextmenu td': 'flagCell'
    };
  }

  checkCell(event) {
    var $td = $(event.target);
    var x = $td.data('x');
    var y = $td.data('y');
    this.model.check(x,y);
  }

  flagCell(event) {
    event.preventDefault();
    var $td = $(event.target);
    var x = $td.data('x');
    var y = $td.data('y');
    if (! $td.hasClass('revealed')) {
      this.model.flag(x,y);
    }
  }

  render() {
    var gameTemplate = this.template(this.model.toJSON());
    this.$el.html(gameTemplate);
    var $table = $('table.game', this.$el);
    _.each(this.model.get('board'), function (row, y) {
      var $tr = $('<tr>');
      _.each(row, function (col, x) {
        var $td = $('<td>');
        $td.data('x', x);
        $td.data('y', y);
        switch (col) {
          case ' ':
            $td.addClass('unrevealed');
            break;
          case '_':
            $td.addClass('revealed');
            break;
          case 'F':
            $td.addClass('flagged');
            break;
          case '*':
            $td.addClass('mine');
            break;
          default:
           $td.text(col);
        }
        $tr.append($td);
      });
     $table.append($tr);
    });
    return this.el;
  }

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.model.fetch();
  }
};

export {IndexView, GameView};
