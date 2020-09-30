
import React, { Component } from 'react'
import { runInThisContext } from 'vm';
import { Link, NavLink } from 'react-router-dom'
import {  getToken } from '../../actions/admin'
import { baseUrl, localUrl } from '../../shared/baseUrl'

class Menu extends Component 
{

    render(){
        const { name, profileImage } = JSON.parse(getToken())

        return (
                    <aside className="main-sidebar">
                    <div className="sidebar" >
        
                        <div className="user-panel">
        
                            <div className="pull-left image">
                                <img src={baseUrl+profileImage} className="img-circle" alt="Admin Image" style={{height : '50px'}} />
                            </div>
        
                            <div className="pull-left info">
                                <p>{name}</p>
                                
                            </div>
                        </div>
        
        
                        <ul className="sidebar-menu"  style= {{ float:"left"}}>
                                            
                            <li className="treeview">
                            <NavLink
                                        to="/admin"
                                        activeStyle={{
                                        background:'black',
                                        color:'white'
                                        }} 
                                        style={{paddingRight:"43px"}}
                                        >
                                   
                                        <i className="fa fa-cubes"></i> <span>Admin Management</span>
                                        <span className="pull-right-container">
                                        </span>
                                  
                            </NavLink>                                    
                            </li> 
                            
                            <li className="treeview">
                            <NavLink
                                        to="/user"
                                        activeStyle={{
                                        background:'black',
                                        color:'white'
                                        }}  
                                        style={{paddingRight:"65px"}}
                                        >
                                   
                                        <i className="fa fa-user-plus"></i> <span>User Management </span>
                                        <span className="pull-right-container">
                                        </span>
                                  
                            </NavLink>    
                            </li>                                               
        

                            <li className="treeview">
                                <NavLink
                                            to="/term/"
                                            activeStyle={{
                                            background:'black',
                                            color:'white'
                                            }}  
                                            style={{paddingRight:"62px"}}
                                            >
                                    
                                            <i className="fa fa-exclamation-circle"></i> <span>Term Management </span>
                                            <span className="pull-right-container">
                                            </span>
                                    
                                </NavLink>    
                            </li>  
                                                                
                            <li className="treeview">
                                <NavLink
                                            to="/privacy/"
                                            activeStyle={{
                                            background:'black',
                                            color:'white'
                                            }}  
                                            style={{paddingRight:"50px"}}
                                            >
                                    
                                            <i className="fa fa-exclamation-triangle"></i> <span>Privacy Management </span>
                                            <span className="pull-right-container">
                                            </span>
                                    
                                </NavLink>    
                            </li> 
                        </ul>
                        </div>
                    </aside>
            )
        }
}

export default Menu