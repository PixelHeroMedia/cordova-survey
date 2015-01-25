userLocation = "";
gWriter = {};
fEntry = {};

App = Ember.Application.create();

App.Router.map(function() {
  this.resource('stage1', {path:'/'});
  this.resource('stage2', {path:'2'});
  this.resource('stage3', {path:'3'});
  this.resource('stage4', {path:'4'});
});

App.Stage1Route = Ember.Route.extend({
  model: function() {
    return this.store.find('survey');
  }
});

App.Stage2Route = Ember.Route.extend({
  model: function() {
    return this.store.find('survey');
   },
  setupController: function(controller, model){
	  controller.set('location',userLocation);
	  controller.set('dt',new Date().today() + " " + new Date().timeNow());
	}
});


App.Stage3Route = Ember.Route.extend({
  model: function() {
    return this.store.find('survey');
  }
});

document.addEventListener("deviceready", onDeviceReady, false);

function onSuccess(position){
	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
		userLocation = results[0].formatted_address;
		alert(userLocation);
	});
}

function onInitFs(fs) {
   fs.root.getFile("survey.json", {create: true, exclusive: false}, gotFileEntry, errorHandler);
}

function gotFileEntry(fileEntry) {
	alert('gotfs');
	fEntry = fileEntry;
}

function gotFileWriter(writer) {
	writer.truncate(0);
    gWriter = writer;
}


function readAsText(file) {
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		alert(evt.target.result);
	};
	reader.readAsText(file);
}
	
function errorHandler(e) {
  console.log(e.code);
}

function onDeviceReady() {
	 navigator.geolocation.getCurrentPosition(onSuccess, errorHandler, {enableHighAccuracy: true});
	 window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onInitFs, errorHandler);
}

Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

