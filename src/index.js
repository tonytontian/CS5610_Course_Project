import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import MovieAppContainer from './Containers/MovieAppContainer'
import './index.css'

ReactDOM.render(
    <div className="container padded-body">
        <MovieAppContainer/>
    </div>,
    document.getElementById('root')
);
