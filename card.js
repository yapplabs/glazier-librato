import Conductor from 'conductor';
import TestConsumer from 'app/consumers/test';

/* Uncomment/add required javascript files */
Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/ember_card_bridge.js');
Conductor.require('/vendor/loader.js');

/* css files */
Conductor.requireCSS('/css/glazier_card.css');
Conductor.requireCSS('card.css');

import remoteEmberObjectConsumer from 'app/consumers/remote_ember_object';
remoteEmberObjectConsumer.controllers = ['cardMetadata'];

var card = Conductor.card({
  /* uncomment or add needed services here */
  consumers: {
    'test': TestConsumer,
    'adminStorage': Conductor.Oasis.Consumer,
    'remoteEmberObject': Conductor.Oasis.Consumer.extend(remoteEmberObjectConsumer)
  },
  defaultContentDiv: "<div id=\"card\"></div>",
  bootstrapDiv: "<div id=\"card\">Hello New Card!! (remove me from /card.js)</div>",
  render: function (intent, dimensions) {
    if (!document.getElementById('card')) {
      document.body.innerHTML = "<div id=\"card\"></div>";
    }

    return App.render(intent, dimensions);
  },

  activate: function() {
    var Application = requireModule('app/application');
    window.App = Application.create();
    App.deferReadiness();
    App.register('card:main', this, { instantiate: false });
  },

  metadata: {
    document: function(promise) {
      promise.resolve({
        title: "Give this card a proper title in card.js card.metadata"
      });
    }
  }

});

export default card;

