var IndexView = Ember.View.extend({
  email: Ember.computed.alias('controller.libratoEmail'),
  apiToken: Ember.computed.alias('controller.libratoApiToken'),
  instrumentId: Ember.computed.alias('controller.instrumentId'),
  didInsertElement: function(){
    this.graph = new LibratoMetrics.LineGraph({
      divID: 'graph',
      email: this.get('email'),
      apiToken: this.get('apiToken'),
      instrumentID: this.get('instrumentId')
    });
  }
});

export default IndexView;
