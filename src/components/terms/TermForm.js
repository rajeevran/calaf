
import React, { Component, Fragment, useEffect, useState,useRef } from 'react'
import { runInThisContext } from 'vm';
import { withFormik, Form, Field, Formik, ErrorMessage } from 'formik'
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { Container, Row, Col, Media } from 'reactstrap';
import { Prompt, Link, useHistory  } from 'react-router-dom'
import { baseUrl, localUrl } from '../../shared/baseUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {  fetchTerm, postEditTerm } from '../../actions/terms'
import { connect } from 'react-redux';
import Header from '../header/Header'
import Menu from '../menu/Menu'
import Footer from '../footer/Footer'
import { log } from 'util';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import './TermForm.css';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    return ref.current;
  }

const TermForm = props => {
   // console.log('match values--->',match);
   const history = useHistory()

   var lastIndex = window.location.href.lastIndexOf("/")
   console.log('lastIndex----',lastIndex);
   
   var id = window.location.href.substring(lastIndex + 1); //after this id="true"
   console.log('path----',id);

    useEffect( ()=>(
        props.fetchTerm(id)
    ), [])
    console.log('props values--->',props);

    var lastIndex = window.location.href.lastIndexOf("/")
    console.log('lastIndex----',lastIndex);

    let pathEditView = window.location.href.split('/')[ window.location.href.split('/').length -2]
    console.log('pathEditView--------->',pathEditView);

    const isAddMode = id=='add' ? true:false;

    const prevIsSuccess = usePrevious(props.isSuccess);    

    useEffect( ()=>{
        console.log('isSuccess hitted',props.isSuccess);

        if(prevIsSuccess === false && props.isSuccess === true)
        {
   
                toast.success("Term Updated Successfully.")

                setTimeout( ()=>{
    
                    history.goBack() 
        
                },2000)

           
        }

    }, [props.isSuccess,prevIsSuccess])



    let definedid = ''
    let defineddescription = ''
    let defineddeleteId = ''
    //deleteId
    if(props.termlist.response.docs.length == 1)
    {
        defineddeleteId = pathEditView == 'delete' ? props.termlist.response.docs[0]._id: ''
        definedid = props.termlist.response.docs[0]._id

        defineddescription = props.termlist.response.docs[0].description

    }

    let valdationShape = {}
    let addEditFields = {}

    if(isAddMode)
    {

        addEditFields ={
            deleteId: defineddeleteId,
            description:defineddescription
        }

        valdationShape= {
            description: Yup.string()
                .required('Description is required')
        }

    }else{

        addEditFields ={
            deleteId: defineddeleteId,
            termId: definedid,
            description:defineddescription
        }

        valdationShape= {

            description: Yup.string()
                .required('Description is required')
        }
    }


    const initialValues = addEditFields

    const validationSchema = Yup.object().shape(valdationShape);

    function onSubmit(fields) {

        console.log('fields---',fields);

        if (isAddMode) {

            props.postAddTerm(fields)

        } else {

            props.postEditTerm(fields)
        }
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

            { pathEditView == 'edit' && props.termlist.success !== false && props.termlist.response.docs.length == 1  && 
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit }>
                {({ values, errors, touched, isSubmitting, setFieldValue }) => {

                return (
                    <Form>

                        <h1>{isAddMode ? 'Add Term' : 'Edit Term'}</h1>
                        

                        <FormGroup row>
                        <Label for="description" md={3}>Description</Label>
                        <Col md={9}>

                            <CKEditor
                                editor={ ClassicEditor }
                                data={values.description}
                                disabled={false}
                                onInit={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setFieldValue(`description`, data)
                                    console.log( { event, editor, data } );
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />

                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        
                        </Col>
                        </FormGroup>

                        <FormGroup row>
                        <Col md={9}>

                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>

                        </Col>
                        </FormGroup>

                        
                    </Form>
                );
                }}
              </Formik>
            
            }

            {/*   THIS PART FOR EDIT  END   */}


        </Row>
        </div>
        <Footer />
    </div>
    );    


}

const mapStateToProps = ({termReducer}) => ({
    termlist:termReducer.termlist,
    isSuccess:termReducer.isSuccess,
    isloading:termReducer.isloading
})

export default connect(mapStateToProps, {postEditTerm, fetchTerm })(TermForm)
