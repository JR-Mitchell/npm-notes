import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorldElem extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                This is an example React page written using Webpack and Babel!
            </div>
        )
    }
}

ReactDOM.render(
  <HelloWorldElem></HelloWorldElem>,
  document.getElementById('root')
);
