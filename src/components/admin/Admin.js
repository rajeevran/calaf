
import React, { Fragment, useEffect } from 'react'
import { Link , Redirect, useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import { baseUrl, localUrl } from '../../shared/baseUrl'

import AdminForm from './AdminForm'
import { postDeleteAdmin } from '../../actions/admin'

const Admin = (props) => {

    console.log('admin props --->',props);

    return ( 
                <Fragment>
                    <tr >
                        <td >
                            <img style= {{ height: '50px', width: '50px'}} src={baseUrl+props.profileImage} />   
                        </td>
                        <td >{props.firstName}</td>  
                        <td >{props.lastName}</td>                          
                        <td>{props.email}</td>
                        <td>{props.status === 'yes' ? 'Active':'DeActive'}</td>
                   
                        <td className="text-center">
                                <Link className="view" title="View" style={{marginRight:'5px'}} to= {{ pathname: `/admin/view/${props._id}` }}  >
                                    <i className="fa fa-eye"></i>
                                </Link>

                                <Link className="view" title="Edit" style={{marginRight:'5px'}} to= {{ pathname: `/admin/edit/${props._id}` }}  >
                                    <i className="fa fa-edit"></i>
                                </Link>

                                <Link className="view" title="Delete" to= {{ pathname: `/admin/delete/${props._id}` }}  >
                                    <i className="fa fa-trash" ></i>
                                </Link>
                        </td>
                    </tr>
   
                </Fragment>                 
            )
    }
    export default connect(null, { postDeleteAdmin })(Admin)

//export default Admin