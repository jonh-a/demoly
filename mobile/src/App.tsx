import { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import ServerClient from './apis/server';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/Login';
import Songs from './pages/Songs';
import Song from './pages/Song';
import NewSong from './pages/NewSong';
import Logout from './pages/Logout';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const checkIfAuthenticated = async () => {
    try {
      const resp = await ServerClient.get('/user/authenticated', { withCredentials: true });
      if (resp.status === 200) setAuthenticated(true);
      else setAuthenticated(false);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkIfAuthenticated();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/Login" />
            </Route>
            <Route path="/login" exact={true}>
              <Login setAuthenticated={setAuthenticated} authenticated={authenticated} />
            </Route>
            <Route path="/register" exact={true}>
              <Page name='Register' />
            </Route>
            <Route path="/new" exact={true}>
              <NewSong setAuthenticated={setAuthenticated} authenticated={authenticated} />
            </Route>
            <Route path="/songs" exact={true}>
              <Songs setAuthenticated={setAuthenticated} authenticated={authenticated} />
            </Route>
            <Route path="/song/:id" exact={true}>
              <Song setAuthenticated={setAuthenticated} authenticated={authenticated} />
            </Route>
            <Route path="/logout" exact={true}>
              <Logout setAuthenticated={setAuthenticated} />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
