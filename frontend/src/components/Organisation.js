import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


            /* parsing in a prop using destructuring, 
            an alternative is to parse in (prop) and then prop.product.image . . .
            instead of ({ product }) */
const Organisation = ({ organisation }) => {
    return (
        <Card className = 'my-3 p-3 rounded' /* margin top and bottom of 3, padding of 3 all round  */ >
            <Link to={`/organisation/${organisation._id}`}>
                <Card.Img src={organisation.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/organisation/${organisation._id}`}>
                <Card.Title as='div'><strong>{organisation.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='h4'>${organisation.town}         
            </Card.Text>

            <Card.Text as='h4'>${organisation.segment}         
            </Card.Text>
            </Card.Body>
            
        </Card>
    )
}

export default Organisation
