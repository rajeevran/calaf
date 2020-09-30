
import React, { Component, Fragment, useEffect, useState, useRef } from 'react'
import { runInThisContext } from 'vm';
import { withFormik, Form, Field, Formik, ErrorMessage } from 'formik'
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { Container, Row, Col, Media } from 'reactstrap';
import { Prompt, Link, useHistory  } from 'react-router-dom'
import { baseUrl, localUrl } from '../../shared/baseUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import { postAddAdmin, fetchAdmin, postEditAdmin, postDeleteAdmin } from '../../actions/admin'
import { connect } from 'react-redux';
import Header from '../header/Header'
import Menu from '../menu/Menu'
import Footer from '../footer/Footer'
import { log } from 'util';
import { Loader } from 'react-overlay-loader';
 
import 'react-overlay-loader/styles.css';
import {usePrevious} from '../../shared/utils'


const AdminForm = props => {
   // console.log('match values--->',match);
   const history = useHistory()

   const prevIsSuccess = usePrevious(props.isSuccess);
 
    useEffect( ()=>(
        props.fetchAdmin(props.match.params.id)
    ), [])

    useEffect( ()=>{
        console.log('isSuccess hitted------->',props.isSuccess);
        console.log('prevIsSuccess ---->',prevIsSuccess);

        if(prevIsSuccess !== undefined && prevIsSuccess === false)
        {
            if(props.isSuccess === true)
            {

                toast.success(props.message)

                setTimeout( ()=>{
    
                    history.goBack() 
        
                },2000)

            }else if(props.isSuccess === false){

                toast.warn(props.message)

            }
        }

    }, [prevIsSuccess, props.message])

    console.log('props values--->',props);


    const { id } = props.match.params;
    let { path } = props.match;

    let pathEditView = path.split('/')[2]
    const isAddMode = !id;
    let definedid = ''
    let definedfirstName = ''
    let definedlastName = ''
    let definedemail = ''
    let definedstatus = ''
    let defineddeleteId = ''
    let definedprofileImage = ''
    let definedimageSavedUrl =''
    //deleteId
    if(!isAddMode && props.list.response.docs.length == 1)
    {
        
        props.list.response.docs.map((response) => 
        {
            defineddeleteId         = pathEditView == 'delete' ? response._id: ''
            definedid               = response._id
            definedfirstName        = response.firstName
            definedlastName         = response.lastName
            definedemail            = response.email
            definedprofileImage     = response.profileImage
            definedimageSavedUrl    = baseUrl+response.profileImage
            definedstatus           = response.status
        })
    }

    let valdationShape = {}
    let addEditFields = {}

    if(isAddMode)
    {

        addEditFields ={
            deleteId: defineddeleteId,
            firstName: definedfirstName,
            lastName: definedlastName,
            email: definedemail,
            profileImage:definedprofileImage,
            status: 'yes',
            password: '',
            imagePreviewUrl:''
        }

        valdationShape= {
            firstName: Yup.string()
                .required('First Name is required'),
            lastName: Yup.string()
                .required('Last Name is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .concat(isAddMode ? Yup.string().required('Password is required') : null)
                .min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string()
                .when('password', (password, schema) => {
                    if (password || isAddMode) return schema.required('Confirm Password is required');
                })
                .oneOf([Yup.ref('password')], 'Passwords must match')
        }

    }else{

        addEditFields ={
            deleteId: defineddeleteId,
            adminId: definedid,
            firstName: definedfirstName,
            lastName: definedlastName,
            profileImage:definedprofileImage,
            imageSavedUrl:definedimageSavedUrl,
            email: definedemail,
            status: definedstatus,
            imagePreviewUrl:''
        }

        valdationShape= {

            firstName: Yup.string()
                .required('First Name is required'),
            lastName: Yup.string()
                .required('Last Name is required'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string()
                .when('password', (password, schema) => {
                    if (password || isAddMode) return schema.required('Confirm Password is required');
                })
                .oneOf([Yup.ref('password')], 'Password must match')
        }
    }


    const initialValues = addEditFields

    const validationSchema = Yup.object().shape(valdationShape);



    function onSubmit(fields) {

        console.log('fields---',fields);

        if (isAddMode) {
            //toast.success("Admin Added Successfully.")

            props.postAddAdmin(fields)

        } else {
            //toast.success("Admin Data Updated Successfully.")
           // console.log('updated field value',fields);

            props.postEditAdmin(fields)

        }

        // setTimeout( ()=>{

        //     history.goBack() 

        // },2500)
    }

    function onDeleteAdmin(id){
        console.log('id---',id);
        props.postDeleteAdmin({adminId:id})
        toast.success("Admin Data Deleted Successfully.")

        setTimeout( ()=>{

            document.getElementById('close-delete-button-model').click() ;

        },2500)

    }

    return (
        <div className="wrapper">
            <ToastContainer />
            <Header />
            <Menu />
            <div className="content-wrapper" style={{minHeight:'576px'}}>
                 <Row>
                <Col xs="12" md={{size:10, offset:0}}></Col>


                {props.isloading &&

                    <Loader fullPage loading />
                }

                {/*   THIS PART FOR EDIT  START   */}

                { pathEditView == 'edit' && props.list.success !== false && props.list.response.docs.length == 1  && 
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit }>
                    {({ values, errors, touched, isSubmitting, setFieldValue }) => {

                    return (
                        <Form>

                            <h1>{isAddMode ? 'Add Admin' : 'Edit Admin'}</h1>

                            <Row>
                            <Col md={12}>
                            
                            <div className="portlet box blue">
                                <div className="portlet-title">
                                <div className="caption">
                                    <i className="fa fa-cubes"></i>
                                </div>
                                <div className="tools">
                                    <a href="" className="collapse" data-original-title="" title="">
                                    </a>

                                </div>
                                </div>
                                <div className="portlet-body form" style={{"display": "block"}}>
                                    <div className="form-body">

                                    <FormGroup row>
                                    <Col md={12}>

                                        <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                        <button style={{'margin-right': '20px'}}  type="submit"  className="pull-right btn btn-primary">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Save
                                        </button>

                                    </Col>
                                    </FormGroup>
                                    
                                    <Row>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>

                                        
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Email</label>
                                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <label>Profile Image</label>
                                        <div className="photo-upload">

                                            <input className="btn btn-warning btupload"  id="file" name="profileImage"  type="file" accept="image/*" onChange={(e) => {
                                                            e.preventDefault();
                    
                                                            let reader = new FileReader();
                                                            let file = e.target.files[0];
                                                        
                                                            reader.onloadend = () => {
                                                                console.log('reader.result---',reader.result);
                                                                
                                                                setFieldValue(`imagePreviewUrl`, reader.result)
                                                                setFieldValue(`profileImage`, file)
                                                                
                                                            }
                                                        
                                                            reader.readAsDataURL(file)
                    
                    
                                                    }} />
                        
                                                <img src={values.imageSavedUrl}  style={{height:'150px', width:'150px', marginRight:'30px'}} /> 
                    
                                                {
                                                    values.imagePreviewUrl && 
                                                    
                                                    <img src={values.imagePreviewUrl}  name="imagePreviewUrl" style={{height:'150px', width:'150px'}} /> 
                                                    
                                                } 
                                        
                                        </div>
                                    </FormGroup>

                                <Row>

                                    <Col lg={4}>
                                    <FormGroup>
                                        <label>Status</label>
                                       
                                            <Field name="status" as="select" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')}>
                                                    <option value="true">Active</option>
                                                    <option value="false">DeActive</option>
                                            </Field>

                                            <ErrorMessage name="status" component="div" className="invalid-feedback" />

                                    </FormGroup>
                                    </Col>
                                
                                </Row>


                                <Row>
                                    <p className="btn btn-warning pull-left"> Leave the password blank if you don't want to change the password</p>
                                </Row>
                                <Row>
                                        <Col lg={6}>
                                        <FormGroup>
                                            <label>Password</label>

                                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />

                                        </FormGroup>
                                        </Col>

                                        <Col lg={6}>
                                        <FormGroup>
                                            <label>Confirm Password</label>
                                        
                                                    <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                
                                                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                        </FormGroup>
                                        </Col>
                                </Row>

                                <FormGroup row>
                                <Col md={12}>

                                    <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                    <button style={{'margin-right': '20px'}}  type="submit"  className="pull-right btn btn-primary">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Save
                                    </button>

                                </Col>
                                </FormGroup>

                            </div>

                    </div>
                 </div>
                           
                </Col>
            
            </Row>
                        </Form>
                    );
                    }}
                </Formik>
                
                }

                {/*   THIS PART FOR EDIT  END   */}






                {/*   THIS PART FOR VIEW  START   */}

                { pathEditView == 'view' && props.list.success !== false && props.list.response.docs.length == 1  && 
                <Formik initialValues={initialValues}>
                    {({ values, errors, touched, isSubmitting, setFieldValue }) => {
                    values.status = (values.status === 'yes' || values.status == 'Active') ? 'Active' : 'DeActive'

                    return (
                        <Form>

                            <h1>{isAddMode ? 'Add Admin' : 'View Admin'}</h1>

                            <Row>
                            <Col md={12}>
                            
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                    <div className="caption">
                                        <i className="fa fa-cubes"></i>
                                    </div>
                                    <div className="tools">
                                        <a href="" className="collapse" data-original-title="" title="">
                                        </a>

                                    </div>
                                    </div>
                                    <div className="portlet-body form" style={{"display": "block"}}>
                                        <div className="form-body">
                                            
                                        <FormGroup row>
                                        <Col md={12}>

                                            <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                           
                                        </Col>
                                        </FormGroup>
                                        
                                        <Row>
                                            <Col lg={4}>
                                                <FormGroup>
                                                    <label>First Name</label>
                                                    <span name="firstName"  className='form-control  no-border'>
                                                        {values.firstName}
                                                    </span>
                                                                                               
                                                </FormGroup>
                                            
                                            </Col>
                                            
                                            <Col lg={4}>
                                                <FormGroup>
                                                    <label>Last Name</label>
                                                    <span name="lastName"  className='form-control  no-border'>
                                                        {values.lastName}
                                                    </span>
                                                                                               
                                                </FormGroup>
                                            
                                            </Col>

                                            <Col lg={4}>
                                            <FormGroup>
                                                <label>Email</label>
                                                <span name="email"  className='form-control  no-border'>
                                                        {values.email}
                                                </span>
                                            </FormGroup>
                                            </Col>


                                        </Row>

                                        <FormGroup>
                                            <label>Profile Image</label>
                                            <div className="photo-upload">                   
                                            
                                                    {
                                                        values.imageSavedUrl && 
                                                        <img src={values.imageSavedUrl}  
                                                        style={{height:'150px', width:'150px', marginRight:'30px'}}
                                                        />                            
                                                    }
                                            
                                            </div>
                                        </FormGroup>
                                        
                                    <Row>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Status</label>
                                                <span name="status"  className='form-control  no-border'>
                                                        {values.status}
                                                </span>
                                        </FormGroup>
                                        </Col>
                                    
                                    </Row>

                                    <FormGroup row>
                                    <Col md={12}>

                                        <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                    </Col>
                                    </FormGroup>

                                </div>

                        </div>
                    </div>
                           
                </Col>
            
            </Row>
            
                            
                        </Form>
                    );
                    }}
                </Formik>
                }

                {/*   THIS PART FOR VIEW  END   */}





                {/*   THIS PART FOR ADD  START   */}

                { isAddMode  && 
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ values, errors, touched, isSubmitting, setFieldValue }) => {

                    return (
                        <Form>

                            <h1>{isAddMode ? 'Add Admin' : 'Edit Admin'}</h1>
                            <Row>
                            <Col md={12}>
                            
                            <div className="portlet box blue">
                                <div className="portlet-title">
                                <div className="caption">
                                    <i className="fa fa-cubes"></i>
                                </div>
                                <div className="tools">
                                    <a href="" className="collapse" data-original-title="" title="">
                                    </a>

                                </div>
                                </div>
                                <div className="portlet-body form" style={{"display": "block"}}>
                                    <div className="form-body">
                                        
                                    <FormGroup row>
                                    <Col md={12}>

                                        <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                        <button style={{'margin-right': '20px'}}  type="submit"  className="pull-right btn btn-primary">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Save
                                        </button>

                                    </Col>
                                    </FormGroup>
                                    
                                    <Row>
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>
                                        
                                        <Col lg={4}>
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                                
                                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                        
                                            </FormGroup>
                                        
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <label>Email</label>
                                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                
                                        </FormGroup>
                                        </Col>


                                    </Row>

                                    <FormGroup>
                                        <label>Profile Image</label>
                                        <div className="photo-upload">

                                            <input className="btn btn-warning btupload"  id="file" name="profileImage"  type="file" accept="image/*" onChange={(e) => {
                                                        // console.log('event.target.files[0]--',event.target.files[0]);
                                                        e.preventDefault();

                                                        let reader = new FileReader();
                                                        let file = e.target.files[0];
                                                    
                                                        reader.onloadend = () => {
                                                            console.log('reader.result---',reader.result);
                                                            
                                                            setFieldValue(`imagePreviewUrl`, reader.result)
                                                            setFieldValue(`profileImage`, file)
                                                            // this.setState({
                                                            // file: file,
                                                            // imagePreviewUrl: reader.result
                                                            // });
                                                        }
                                                    
                                                        reader.readAsDataURL(file)


                                                }} />

                                                {
                                                    values.imagePreviewUrl && 
                                                    
                                                    <img src={values.imagePreviewUrl}  name="imagePreviewUrl" style={{height:'150px', width:'150px'}} /> 
                                                    
                                                } 
                                        
                                        </div>
                                    </FormGroup>
                                <Row>

                                    <Col lg={4}>
                                    <FormGroup>
                                        <label>Status</label>
                                       
                                            <Field name="status" as="select" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')}>
                                                    <option value="true">Active</option>
                                                    <option value="false">DeActive</option>
                                            </Field>

                                            <ErrorMessage name="status" component="div" className="invalid-feedback" />

                                    </FormGroup>
                                    </Col>
                                
                                </Row>

                                <Row>

                                    <Col lg={6}>
                                    <FormGroup>
                                        <label>Password</label>

                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />

                                    </FormGroup>
                                    </Col>

                                     <Col lg={6}>
                                    <FormGroup>
                                        <label>Confirm Password</label>
                                       
                                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                            
                                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup row>
                                <Col md={12}>

                                    <Link to={isAddMode ? '.' : '..'} className="pull-right btn btn-primary">Cancel</Link>

                                    <button style={{'margin-right': '20px'}}  type="submit"  className="pull-right btn btn-primary">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Save
                                    </button>

                                </Col>
                                </FormGroup>

                            </div>

                    </div>
                 </div>
                           
                </Col>
            
            </Row>
                    
                            
                        </Form>
                    );
                    }}
                </Formik>
                }
                {/*   THIS PART FOR ADD  END   */}




                {/*   THIS PART FOR DELETE  START   */}

                { pathEditView == 'delete' && props.list.success !== false && props.list.response.docs.length == 1  && 
            
                <div className="modal show" id="modal-form-delete">
                                <input type="hidden" name="deleteId" ></input>

                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <Link to={'/admin'}>

                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                        </Link>
                                            <h4 className="modal-title" id="myModalLabel"></h4>
                                        </div>
                                        <div className="modal-body">

                                                <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group" >
                                                                <label >Are You Sure You want to delete ?</label>
                                                            </div>
                                    
                                                        </div>
                                                    </div>                        

                                        </div>
                                        <div className="modal-footer">

                                                    <Link to={'/admin'} className="btn btn-link">

                                                        <button type="button" className="btn btn-default" id="close-delete-button-model"
                                                            data-dismiss="modal">Close</button>

                                                    </Link>
                                                
                                                        <button type="submit" className="btn btn-primary" onClick = { () => { onDeleteAdmin(id) } }
                                                    >Delete</button>

                                        </div>
                                    </div>
                                </div>
                                </div> 
                }

                {/*   THIS PART FOR DELETE  START   */}

            </Row>
            </div>
            <Footer />

        </div>
    );    


}

const mapStateToProps = ({adminReducer}) => ({

    list        : adminReducer.list,
    isloading   : adminReducer.isloading,
    message     : adminReducer.message,
    isSuccess   : adminReducer.isSuccess
})

export default connect(mapStateToProps, { postAddAdmin, postEditAdmin, postDeleteAdmin, fetchAdmin })(AdminForm)
