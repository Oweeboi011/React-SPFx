# OweeBear Apps -  React SPFX
[![Build Status](https://github.com/Oweeboi011/React-SPFx/blob/master/src/images/oweebearApps.png?raw=true)](https://github.com/Oweeboi011)

React SPFX is a SharePoint Framework testing material that uses both UI Fabric and Bootstrap 4 via React.
  - Suitable only for SharePoint Online
  - React 

![Image Screenshot](https://github.com/Oweeboi011/React-SPFx/blob/master/src/images/screenshot.jpg?raw=true)
### Tech and plug-ins

SPFX React uses a number of open source projects to work properly:

* REACT - https://reactjs.org/
* NODEJS - https://nodejs.org/en/ - v8
* GULP - https://gulpjs.com/
* YEOMAN - https://yeoman.io/
* TYPESCRIPT - https://www.typescriptlang.org/
* BOOTSTRAP - https://getbootstrap.com/docs/4.0/getting-started/introduction/
* UI FABRIC - https://developer.microsoft.com/en-us/fabric

### Installation

This requires [Node.js](https://nodejs.org/) v8 to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd react-spfx
$ npm install --save
$ node app
$ npm run srv
```

For production deployments...

```sh
$ gulp bundle --ship
$ gulp package-solution --ship
```

### Todos

 - Write MORE Boostrap and UI Fabric Components
 - Azure Configuration and Function integration
 - CI / CD implementation
