# React Bootstrap App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

**Including now :**
- SCSS integration 
- React Router
- React FontAwesome
- Classnames
- Chance.js

*The listed functionnality are optionnal, 
but if you don't need any of theses it's better for you to use the original `create react app beyond.* 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


## Added Library :
Few library are added in the `package.json`, feel free to use or remove it :).

#### [Classnames](https://github.com/JedWatson/classnames)
A simple javascript utility for conditionally joining classNames together
##### Example : 
```
import classNames from 'classnames';
// ...
var btnClass = classNames({
  'btn': true,
  'btn-pressed': this.state.isPressed,
  'btn-over': !this.state.isPressed && this.state.isHovered
});
// ...
```


#### [Chance.js](http://chancejs.com/)
Chance - Random generator helper for JavaScript
##### Example : 
```
import Chance from 'chance';
const chance = new Chance();

// Get a random zip code
const zipCode = chance.zip();

// Get a random name 
const name = chance.name();

```


#### [react-fontawesome](https://www.npmjs.com/package/react-fontawesome)
A React component for the font-awesome icon library.
##### Example : 
```
import FontAwesome from 'react-fontawesome';
// ...
<FontAwesome name='rocket' />
```

**Note :** You still need to load the fontawesome libray in the `index.html`. 