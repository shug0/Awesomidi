const Rebase = require('re-base');

const initBase = Rebase.createClass({
	apiKey: "AIzaSyDbW6kUyevj7tEYQ2c6p-s7fwuz0xxx8ps",
	authDomain: "awesomidi.firebaseapp.com",
	databaseURL: "https://awesomidi.firebaseio.com",
	storageBucket: "awesomidi.appspot.com",
	messagingSenderId: "181061673796"
});

const firebaseState = {
	base: initBase
};

function firebase(state = firebaseState) {
	return state;
}

export default firebase