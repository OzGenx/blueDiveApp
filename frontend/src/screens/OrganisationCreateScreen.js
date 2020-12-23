import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createOrganisation } from '../actions/organisationActions'

const OrganisationCreateScreen = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [town, setTown] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [segment, setSegment] = useState('')
  const [orgtype, setOrgType] = useState('')
  const [size, setSize] = useState('')
  const [rating, setRating] = useState('')
  const [message, setMessage] = useState(null)
  

  const dispatch = useDispatch()

  const organisationCreate = useSelector((state) => state.organisationCreate)
  const { loading, error, organisationInfo } = organisationCreate
  




  const submitHandler = (e) => {
    e.preventDefault()
   
      dispatch(createOrganisation(
        name,
        address,
        town,
        country ,
        phone,
        email,    
        segment,
        orgtype,
        size,
        rating))
    
  }

  return (
    <FormContainer>
      <h1>Create New Organisation</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Organisation Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Organisation Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='town'>
          <Form.Label>Town</Form.Label>
          <Form.Control
            type='town'
            placeholder='Enter town'
            value={town}
            onChange={(e) => setTown(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='country'
            placeholder='Enter country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='phone'
            placeholder='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='segment'>
          <Form.Label>Segment</Form.Label>
          <Form.Control
            type='segment'
            placeholder='segment'
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='orgtype'>
          <Form.Label>Organisation Type</Form.Label>
          <Form.Control
            type='orgtype'
            placeholder='orgtype'
            value={orgtype}
            onChange={(e) => setOrgType(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='size'>
          <Form.Label>Size</Form.Label>
          <Form.Control
            type='size'
            placeholder='size'
            value={size}
            onChange={(e) => setSize(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='rating'>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type='rating'
            placeholder='rating'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
         Add New Organisation
        </Button>
      </Form>

   
    </FormContainer>
  )
}

export default OrganisationCreateScreen