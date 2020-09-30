
import React, { Fragment, useEffect } from 'react'
import { Link , Redirect, useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import { baseUrl, localUrl } from '../../shared/baseUrl'
const Term = (props) => {

    console.log('admin props --->',props);

    return ( 
                <Fragment>
                    <tr >
                        <td >1.</td>  
                        <td dangerouslySetInnerHTML={{__html: props.description}} />                     
                        <td>
                          

                                <Link to= {{ pathname: `/term/edit/${props._id}` }}  >

                                    <button type="button"   className="btn btn-primary" id="modalprintedit"
                                    data-toggle="modal" style={{'marginRight':'10px'}} data-target="#modal-form-Edit"
                                    title="Edit">
                                    <i className="fa fa-edit"></i>
                                    </button>
                                </Link>

                               
                        </td>
                    </tr>
   
                </Fragment>                 
            )
    }
    export default connect(null, { })(Term)

//export default Term