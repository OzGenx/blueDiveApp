import React, { useEffect } from 'react'

import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Col, Row, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'





const HomeScreen = ({ match }) => {

    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList =useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList
   

    /* useEffect makes a request to the back end 
        whatever we put inside the function runs as soon as the component loads
    */
    useEffect (() => {
        dispatch(listProducts(keyword, pageNumber))
        
    }, [dispatch, keyword, pageNumber])   
    
     return (
        <>
            <Meta />
                                   
            
            {!keyword ?  <ProductCarousel />  : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Products</h1>
            <Row>
                <Col md={2}>
                    <p>
                <LinkContainer to={'/organisations'}>
                                            <Button className='btn-sm' variant='light'>Organisations</Button>
                                        </LinkContainer>
                                        </p>
                                        <p>
             <LinkContainer to={'/createorganisation'}>
                                            <Button className='btn-sm' variant='light'>Add New Organisation</Button>
                                        </LinkContainer> 
                                        </p>

                </Col>
    {loading ? <Loader /> : error ? (<Message variant='danger'>{error} </Message> ): 
                ( <>
                <Row>
                {products.map( product => (
                <Col key={product._id} sm={12} /* small screens 12 columns*/ md={6} lg={4}>
                    <Product product={product} />
                </Col>
                ))}
                
            </Row>

            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>) }
            </Row>
     
        </>
    )
}

export default HomeScreen
