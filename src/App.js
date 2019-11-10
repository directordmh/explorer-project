import React from 'react';
import './App.css';
import Header from "./components/Header";
import HomeContainer from "./components/HomeContainer";
import {Redirect, Route} from "react-router-dom";
const InformationContainer = React.lazy(() => import ("./components/InformationContainer"))

function App(props) {
  return (
      <>
        <Header />
          {/*<Redirect from='/' to="/home"/>*/}
          <Route exact path='/' render={() => <HomeContainer />} />
          <Route path='/home' render={() => <HomeContainer />} />
          <Route path='/information/:id' render={() => {return <React.Suspense fallback={<div>Загрузка...</div>}>
                  <InformationContainer/>
              </React.Suspense>
          }} />
      </>
  );
}

export default App;
