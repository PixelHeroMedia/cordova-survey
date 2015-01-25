App.Survey = DS.Model.extend({
    title: DS.attr('string'),
    fname: DS.attr('string'),
    lname: DS.attr('string'),
    dob: DS.attr('string'),
    location: DS.attr('string'),
    dt: DS.attr('string'),
    feedback: DS.attr('string')
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Stage1View = Ember.View.extend();
App.Stage2View = Ember.View.extend();
App.Stage3View = Ember.View.extend();
App.Stage4View = Ember.View.extend();

App.Survey.FIXTURES = [];

App.Stage1Controller = Ember.Controller.extend({
    titles: ["Mr", "Miss", "Mrs"],
    actions: {
        toStage2: function () {
            var data = {}, survey;
            data.id = 1;

            data.dob = this.get('dob');
            if (!data.dob) { alert('What is your date of birth?'); return; }

            data.fname = this.get('fname');
            if (!data.fname) { alert('What is your name?'); return; }

            data.lname = this.get('lname');
            if (!data.lname) { alert('What is your last name?'); return; }

            data.title = this.get('title');
            if (!data.title) { alert('What is your title?'); return; }

            survey = this.store.createRecord('survey', data);
            survey.save();

            this.transitionToRouteAnimated('stage2', {main: 'slideLeft'});
        }
    }
});

App.Stage2Controller = Ember.Controller.extend({
    location: "",
    actions: {
        toStage3: function () {
            var location = this.get('location'), dt = this.get('dt');
            if (!location) { alert('Please enter your location'); return; }
            if (!dt) { alert('Please enter the date and time'); return; }

            this.store.find('survey',1).then(function (survey) {
                survey.set('location',location);
                survey.set('dt',dt);
                survey.save();
            });

            this.transitionToRouteAnimated('stage3', {main: 'slideLeft'});
        }
    }
});

App.Stage3Controller = Ember.Controller.extend({
    actions: {
        submitSurvey: function () {
            var feedback = this.get('feedback'), data = {};

            this.store.find('survey', 1).then(function (survey) {
                survey.set('feedback', feedback);
                survey.save();
                data.title = survey.get('title');
                data.fname = survey.get('fname');
                data.lname = survey.get('lname');
                data.dob = survey.get('dob');
                data.location = survey.get('location');
                data.dt = survey.get('dt');
                data.feedback = survey.get('feedback');

                // if no network coverage save to device
                if (navigator.connection.type === Connection.UNKNOWN || Connection.NONE) {
                    fEntry.createWriter(gotFileWriter, errorHandler);
                    gWriter.write(JSON.stringify(data));
                } else {
                    console.log(data);
                }
            });
            this.transitionToRouteAnimated('stage4', {main: 'slideLeft'});
        }
    }
});