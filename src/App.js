import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login/LoginForm'
import AdminList from './components/admin/AdminList'
import AdminForm from './components/admin/AdminForm'
import UserList from './components/users/UserList'
import UserForm from './components/users/UserForm'

import TermList from './components/terms/TermList'
import TermForm from './components/terms/TermForm'

import PrivacyList from './components/privacy/PrivacyList'
import PrivacyForm from './components/privacy/PrivacyForm'

import ChangePassword from './components/admin/ChangePassword'

import Dashboard from './components/dashboard/Dashboard'

import Header from './components/header/Header'
import Menu from './components/menu/Menu'
import Footer from './components/footer/Footer'

import { getToken } from './actions/admin'
import { Switch, Redirect,  Route } from 'react-router-dom';




function SecuredPath(props){

      const authentication ={
            isAuthenticated : getToken() !== null ? JSON.parse(getToken()).isAuthenticated: false
      }
      
      console.log('JSON.parse(getToken())---',JSON.parse(getToken()))

      console.log('authentication.isAuthenticated--',authentication.isAuthenticated)

      return (
            <Route path={props.path} render = { data => 
                  authentication.isAuthenticated ? 
                  (
                        <props.component {...data}>
                              
                        </props.component>
                  )
                  :
                  (
                        <Redirect to="/login"  />
                  )
                  }>

            </Route>
      )
}


function App() {
                  console.log('getToken----',getToken());
                  console.log('window.location.href----',window.location.href);
                  var lastIndex = window.location.href.lastIndexOf("/")

                  var urlPath = window.location.href.substring(lastIndex + 1); //after this urlPath="true"
                  console.log('path----',urlPath);

                  let isAuthenticated = getToken() !== null ? JSON.parse(getToken()).isAuthenticated: false
                  return (
                              
                              <div className="App">

                                    <Switch>
                                          {/* <Route exact path="/" render={ () => {
                                                      return (
                                                            isAuthenticated === false ?
                                                            <Redirect to="/login" /> :
                                                            <Redirect to="/dashboard" /> 
                                                      )
                                                }}
                                          /> */}
                                          <SecuredPath path="/dashboard" exact component={() => { return <Dashboard />}} />
                                          <Route path="/" exact component={() => { return <LoginForm />}} /> 
                                          <Route path="/login" exact component={() => { return <LoginForm />}} /> 
                                          
                                          <SecuredPath path="/admin" exact component={() => { return <AdminList />}} /> 
                                          <SecuredPath path='/admin/view/:id' exact component={AdminForm} />    
                                          <SecuredPath path='/admin/edit/:id' exact component={AdminForm} />    
                                          <SecuredPath path='/admin/add' exact component={AdminForm} />    
                                          <SecuredPath path="/admin/delete/:id" exact component={AdminForm} />

                                          <SecuredPath path="/changepassword" exact component={() => { return <ChangePassword />}} /> 

                                          
                                          
                                          <SecuredPath path="/user" exact component={() => { return <UserList />}} /> 
                                          <SecuredPath path='/user/view/:id' component={UserForm} />    
                                          <SecuredPath path='/user/edit/:id' component={UserForm} />    
                                          <SecuredPath path='/user/add' component={UserForm} />    
                                          <SecuredPath path="/user/delete/:id" component={UserForm} />

                                          <SecuredPath path="/term/" exact component={() => { return <TermList />}} /> 
                                          <SecuredPath path="/term/edit/:id" exact component={() => { return <TermForm />}} /> 
                                            
                                          <SecuredPath path="/privacy/" exact component={() => { return <PrivacyList />}} /> 
                                          <SecuredPath path="/privacy/edit/:id" exact component={() => { return <PrivacyForm />}} /> 
                                            

                                    </Switch>
                                    <Footer />
                              </div>
                             
                  );
}

export default App;
