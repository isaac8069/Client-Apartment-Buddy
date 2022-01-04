import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

const bgc = {
    backgroundColor: 'lightgrey',
    marginTop: "20px",
    padding: '25px'
  }
  const title = {
    fontSize: '40px',
    textAlign: 'left',
    margin: '20px'
  }

const Apartment = (props) => {
console.log('Profile:', props.profile)
const navigate = useNavigate()

const [newApartment, setNewApartment] = useState({

    tags: props.tag.name,
    userId: props.user._id
})

const [tags, setTags] = useState([])

useEffect(() => {
    getTags()
}, [])

const handleCheck = e => {
    if (e.target.checked) {
    setNewApartment({ ...newApartment, tags: [...newApartment.tags, e.taget.id] })
} else {
    let bufferTags = newApartment.tags
    let index = newApartment.tags.indexOf(e.target.id)
    bufferTags.splice(index, 1)
    setNewApartment({ ...newApartment, tags: bufferTags})
}
}

const getTags = () => {
    fetch('http://localhost:8000/tags')
      .then(res => res.json())
      .then(foundTags => {
        console.log('Found Tags by INDEX', foundTags.tags)
        setTags(foundTags.tags)
      })
      .catch(err => console.log(err))
  }

  const postApartment = (e) => {
      e.preventDefault()
      console.log('SUBMIT PRESSED')
      let preJSONBody = {
          title: newApartment.title,
          rent: newApartment.rent,
          description: newApartment.description,
          location: newApartment.description,
          bedrooms: newApartment.bedrooms,
          bathrooms: newApartment.bathrooms,
          tags: newApartment.tags,
          userId: newApartment.userId
      }
      const requestOptions = {
          method: 'POST',
          body: JSON.stringify(preJSONBody),
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.user.token}`
          }
      }
      fetch('http://localhost:8000/apartments', requestOptions)
        .then(postedApartment => {
            props.getApartment()
            navigate('/')
        })
        .catch(err => console.error(err))
  }

  return (
    <div className='container' style={bgc}>
    <h1 style={title}>Create Apartment</h1>
    <Form>
<Row className="mb-3">
<Form.Group as={Col} controlId="formGridEmail">
<Form.Label>Email</Form.Label>
<Form.Control type="email" placeholder="Enter email" />
</Form.Group>

<Form.Group as={Col} controlId="formGridPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password" />
</Form.Group>
</Row>

<Form.Group className="mb-3" controlId="formGridAddress1">
<Form.Label>Address</Form.Label>
<Form.Control placeholder="1234 Main St" />
</Form.Group>

<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>Address 2</Form.Label>
<Form.Control placeholder="Apartment, studio, or floor" />
</Form.Group>

<Row className="mb-3">
<Form.Group as={Col} controlId="formGridCity">
<Form.Label>City</Form.Label>
<Form.Control />
</Form.Group>

<Form.Group as={Col} controlId="formGridState">
<Form.Label>State</Form.Label>
<Form.Select defaultValue="Choose...">
<option>Choose...</option>
<option>...</option>
</Form.Select>
</Form.Group>

<Form.Group as={Col} controlId="formGridZip">
<Form.Label>Zip</Form.Label>
<Form.Control />
</Form.Group>
</Row>

<Form.Group className="mb-3" id="formGridCheckbox">
<Form.Check type="checkbox" label="Check me out" />
</Form.Group>

<Button variant="primary" type="submit">
Submit
</Button>
</Form>
</div>
  )

}

export default Apartment