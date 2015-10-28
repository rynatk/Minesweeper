import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Router from './router';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

$(() => {
  console.log('hello!');
  let router = new Router();
});
