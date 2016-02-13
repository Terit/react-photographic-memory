import React from 'react';

import Header from './Header';
import Body from './Body';


var App = React.createClass({
  render : function() {
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <Header />
        <Body />
      </div>
    )
  }
});

export default App;
