import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import './styles/main.scss'

import Home from "./pages/home";
import Play from "./pages/play"

ReactDOM.render(
    <Router>
        <div>
            <main>
                <Route exact path="/" component={Home} />
                <Route path="/play/:names" component={Play} />
            </main>
        </div>
    </Router>, 
    document.getElementById("root")
    
)
