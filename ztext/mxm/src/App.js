import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import RouterView from "./router/RouterView";
import routerList from "./router/routerList";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <RouterView routes={routerList}></RouterView>
        </BrowserRouter>
      </>
    );
  }
}

export default App;