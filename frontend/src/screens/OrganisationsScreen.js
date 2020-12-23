import React, { useEffect } from 'react'

import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import Organisation from '../components/Organisation'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listOrganisations } from '../actions/organisationActions'






const OrganisationsScreen = ({ match }) => {

    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const organisationList =useSelector(state => state.organisationList)
    const { loading, error, organisations, page, pages } = organisationList
   

    /* useEffect makes a request to the back end 
        whatever we put inside the function runs as soon as the component loads
    */
    useEffect (() => {
        dispatch(listOrganisations(keyword, pageNumber))
        
    }, [dispatch, keyword, pageNumber])   
    
     return (
        <>
            <Meta />
            
            
            <h1>Organisations</h1>
    {loading ? <Loader /> : error ? (<Message variant='danger'>{error} </Message> ): 
                ( <>
                <Row>
                {organisations.map( organisation => (
                <Col key={organisation._id} sm={12} /* small screens 12 columns*/ md={6} lg={4}>
                    <Organisation organisation={organisation} />
                </Col>
                ))}
                
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>) }
     
        </>
    )
}

export default OrganisationsScreen
