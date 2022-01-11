import React from 'react';
import { useDispatch } from "react-redux";

import { createBrowserHistory } from "history";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from './landing';
import Pool from './pools';
import SubmitProject from './submitproject';
import ProjectDetails from './project-details';
import AdminProject from './admin/Adminproject';
import Projects from './projects';
import '../static/css/style.css';
import ClosePool from "./closepool";
import SignIn from "./signin";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import 'font-awesome/css/font-awesome.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css'; 
import 'owl.carousel/dist/assets/owl.theme.default.css';
import useEagerConnect from "../hooks/useEagerConnect";
import {useContarctAction,useClosingContarctAction} from "../redux/action"
import { usePendingContarctAction } from '../redux/action';
import ComingsoonPool from './comingsoon';

const hist = createBrowserHistory();

const App=()=>{
useEagerConnect()
  const dispatch = useDispatch();
  dispatch(useContarctAction())
  dispatch(usePendingContarctAction())
  dispatch(useClosingContarctAction());

    return (
      <div>
        <ToastContainer
          closeOnClick
          position="top-center"
        />
        <Router history={hist}>
          <Switch>
            <Route exact path='/' component={props => <Landing {...props} />} />
            <Route exact path='/landing' component={props => <Landing {...props} />} />
            
            <Route exact path='/pools/:id/:tier' component={props => <Pool {...props} />} />
            <Route exact path='/closepool/:id/:tier' component={props => <ClosePool {...props} />} />
            <Route exact path='/submit-project' component={props => <SubmitProject {...props} />} />
            <Route exact path='/sign-in' component={props => <SignIn {...props} />} />
            <Route exact path='/project-details/:id' component={props => <ProjectDetails {...props} />} />
            <Route exact path='/projects' component={props => <Projects {...props} />} />
            <Route exact path='/comingsoom/:id/:tier' component={props => <ComingsoonPool {...props} />} />
            {/* admin routes */}
            <Route exact path='/adminproject' component={props => <AdminProject {...props} />} />
          </Switch>
        </Router>
      </div>
    );
  }
// }

export default App;