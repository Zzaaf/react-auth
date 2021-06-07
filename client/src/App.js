
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import UserList from './components/UserList/UserList';
import UserDetail from './components/UserDetail/UserDetail';
import Nav from './components/Nav/Nav';
import SignUp from './components/Forms/SignUp/SignUp';
import SignOut from './components/Forms/SignOut/SignOut';
import SignIn from './components/Forms/SignIn/SignIn';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/ac/user.ac';
import Main from './components/Main/Main';
import UserEdit from './components/UserEdit/UserEdit';


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])
  
  
  return (
    <Router>
        <Nav />

        <div className="container py-5">
        <Switch>

          <PrivateRoute path="/users/:id">
            <UserDetail />
          </PrivateRoute>

          <PrivateRoute path="/users">
            <UserList />
          </PrivateRoute>

          <PrivateRoute path="/user/edit">
            <UserEdit />
          </PrivateRoute> 

          <Route path="/auth/signup">
            <SignUp />
          </Route>

          <Route path="/auth/signin">
            <SignIn />
          </Route>

          <Route path="/auth/signout">
            <SignOut />
          </Route>

          <Route path="/" >
            <Main />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
