import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Prompt, Link, useHistory } from 'react-router-dom'
import Pagination from "react-js-pagination";

import { fetchPrivacy } from '../../actions/privacy'
import Header from '../header/Header'
import Menu from '../menu/Menu'
import Footer from '../footer/Footer'
import Privacy  from './Privacy'
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
const PrivacyList = props => {
    console.log(props)
    useEffect( ()=>(
        props.fetchPrivacy()
    ), [])
    let history = useHistory()
    let handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}  `);
        props.fetchPrivacy(undefined, pageNumber ,3)
    }

    let handlePageSearch = (e) => {
        console.log(`search name is ${e.target.value}  `);
        props.fetchPrivacy(undefined, undefined ,undefined,e.target.value)
    }

    let handleClear = () => {
        console.log(`clear`);
        document.getElementById('searchinput').value=''
        props.fetchPrivacy(undefined, undefined ,undefined,'')
    }

    return ( 
        <div className="wrapper">
            <Header />
            <Menu />
           <div className="content-wrapper" style={{minHeight:'576px'}}>
                <section className="content-header">
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h5 className="box-title">Privacy Management</h5>
                                   
                                </div>

                                <div className="search-box">
            
                                         

                                </div>

                                <div className="box-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered  table-condensed table-hover">
                                            <thead>
                                                <tr>
                                                    <th style= {{ textAlign: 'center' }}>SNo.</th>
                                                    <th style= {{ textAlign: 'center' }}>Description</th>
                                                    <th style= {{ textAlign: 'center' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {(function() {
                                                
                                                     if (props.isloading) {
                                                        return (
                                                            <Loader fullPage loading />

                                                        )
                                                     }else 
                                                    if (props.privacylist.success !== false && props.privacylist.STATUSCODE !== 4000) {

                                                        return props.privacylist.response.docs
                                                        .map( privacylist => <Privacy key={privacylist._id} {...privacylist}/> );

                                                    } else if (props.privacylist.success === false && props.privacylist.STATUSCODE === 4000){
                                                        if (props.login && props.login.success !== false)
                                                        {
                                                            return  history.push('/privacy')

                                                        }
                                                        return  history.push('/login')
                                                    }
                                                    })
                                             ()}

                                           </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div className="col-xs-12">
                            <div className="pagination-center">
                            { 
                                props.privacylist.success !== false && 
                                <Pagination
                                            activePage={props.privacylist.response.page}
                                            itemsCountPerPage={props.privacylist.response.limit}
                                            totalItemsCount={props.privacylist.response.total}
                                            pageRangeDisplayed={5}
                                            onChange={handlePageChange}
                                />
      
                            }
                            </div>
                            
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
   
  
        </div>
    )
}

const mapStateToProps = ({privacyReducer}) => ({

    privacylist:privacyReducer.privacylist,
    isloading:privacyReducer.isloading
})

export default connect(mapStateToProps,{fetchPrivacy})(PrivacyList)