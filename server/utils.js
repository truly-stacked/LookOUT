
const express = require('express'),
  morgan = require ('morgan'),
  bodyParser = require('body-parser');

module.exports.createApp = function (){

const app = express();
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static('./client'));
  require('./routes.js')(app, express);
  return app;
};


module.exports.nullChecker = function (event, arrayKeys){
  let solution = "",
    position = 0,
    checkAllValue = (obj, key) => {
      position +=1;
      if (obj[key] === null){
        return "TBD";
      } else if (obj[key] === undefined){
        return obj;
      }
        return checkAllValue(obj[key], arrayKeys[position]);
    };
  solution = checkAllValue(event, arrayKeys[position]);
  return solution;
};
