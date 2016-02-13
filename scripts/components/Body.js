import React from 'react';
var MDL = require('mdl-reactjs');
var Card = MDL.Card;
var CardTitle = MDL.CardTitle;
var CardSupportingText = MDL.CardSupportingText;
var CardActions = MDL.CardActions;
var Button = MDL.Button;

var Body = React.createClass({
  render : function() {
    return(
      <main className="mdl-layout__content">
        <div className="page-content">
          {/* Your content goes here */}

        </div>
      </main>
    );
  }
});

export default Body;
