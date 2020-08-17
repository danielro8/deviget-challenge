import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import InitForm from './components/InitForm'
import StartForm from './components/StartForm'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <BrowserRouter>
    <div className="container-fluid">
      <div className="row">
        <Header />
        <Provider store={store}>
          <Switch>
            <Route path="/" component={InitForm} exact={true} />
            <Route path="/start-game" component={StartForm} exact={true} />
          </Switch>
        </Provider>
        <Footer />
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
