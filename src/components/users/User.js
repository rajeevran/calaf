
import React, { Fragment, useEffect } from 'react'
import { Link , Redirect, useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import { baseUrl, localUrl } from '../../shared/baseUrl'

import UserForm from './UserForm'
import { postDeleteUser } from '../../actions/admin'

const User = (props) => {

    console.log('admin props --->',props.status);

    return ( 
                    <tr >
                        <td >
                            <img style= {{ height: '50px', width: '50px'}} src={baseUrl+props.profileImage} />   
                        </td>
                        <td >{props.fullName}</td>  
                        <td>{props.gender}</td>
                        <td>{props.email}</td>
                        <td>{props.status === true ? 'Active':'DeActive'}</td>
                        
                         <td className="text-center">
                                <Link className="view" title="View" style={{marginRight:'5px'}} to= {{ pathname: `/user/view/${props._id}` }}  >
                                    <i className="fa fa-eye"></i>
                                </Link>

                                <Link className="view" title="Edit" style={{marginRight:'5px'}} to= {{ pathname: `/user/edit/${props._id}` }}  >
                                    <i className="fa fa-edit"></i>
                                </Link>

                                <Link className="view" title="Delete" to= {{ pathname: `/user/delete/${props._id}` }}  >
                                    <i className="fa fa-trash" ></i>
                                </Link>
                        </td> 
                    </tr>
               )
    }
    export default connect(null, { postDeleteUser })(User)

//export default User