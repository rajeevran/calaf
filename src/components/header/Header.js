
import React, { Component, Fragment } from 'react'
import { runInThisContext } from 'vm';
import { postLoginOutAdmin, getToken } from '../../actions/admin'
import { Redirect, Link, withRouter } from 'react-router-dom'
class Header extends Component 
{

    state= {
        logout:false
    }

    onClickLogOut = (e) => {

        postLoginOutAdmin()
        this.setState({logout:true})
    }

    

    render(){
        //console.log('getToken',getToken())

        const { logout } = this.state
        const { name, profileImage,id } = JSON.parse(getToken())

        if(logout) 
        {
            console.log('logout enter--------');
 
            return (<Redirect to="/login" push={true}  />)
        }
        return (

                 <Fragment>
                        <div id="overlay" style={{ position: 'fixed' , width: '100%', height: '100%', top: 0, left: 0, right: 0, bottom: 0, 
                        'backgroundColor': 'rgba(0,0,0,0.5)', zIndex: 2, cursor: 'pointer',  display: 'none'  }}>
                        <i className="fa fa-spinner fa-4x" aria-hidden="true" style={{'marginLeft': '48%', 'marginTop': '20%'}}></i>
                        </div>
            
                        <header className="main-header" >
                            <a  className="logo">
                            
                            <span className="logo-mini">Calaf</span>
                            
                            <span className="logo-lg"><b>Calaf</b> Admin</span>
                        </a>
                        
                        <nav className="navbar navbar-static-top">
                            
                            <a href="javascript:;" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </a>
            
                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    <li className="dropdown user user-menu">
                                        <a className="dropdown-toggle" data-toggle="dropdown">
                                            <span className="hidden-xs" style={{"cursor": "pointer"}}>Welcome {name}</span>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="user-footer">
                                               
                                                <div className="pull-right">
                                                    <Link className="btn btn-default btn-flat" title="View" style={{marginRight:'30px'}} to= {{ pathname: `/admin/view/${id}` }}  >
                                                        <i className="fa fa-eye">View Profile</i>
                                                    </Link>
                                                    <a className="btn btn-default btn-flat"  style={{marginRight:'10px'}} onClick={ this.onClickLogOut}  >
                                                    <i className="fa fa-sign-out">Sign out</i>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </Fragment>
            )
        }
}


export default Header