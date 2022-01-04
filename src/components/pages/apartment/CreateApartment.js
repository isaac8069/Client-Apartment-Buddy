import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'

const CreateApartment = (props) => {

    const navigate = useNavigate();
  
    // Setting a state to hold our users newApartment that will be sent to data Base to be stored with usersId as reference
    // Also setting a state for our tags
    const [newApartment, setNewApartment] = useState({
      //Other stuff will go in this object but basically we need to declare a property called tags as an array so that the spread operator will work in the first call of handleCheck
      tags: [],
      isSubscribed: false,
      userId: props.user._id
    })
    const [tags, setTags] = useState([])
  
    // useEffect that calls getTags everytime the component renders
    useEffect(() => {
      getTags()
    }, [])
  
    // Function that runs everytime that a input for either name or address changes
    // Function sets all inputs to our newApartment state
    const handleChange = e => {
      setNewApartment({ ...newApartment, [e.target.name]: e.target.value })
    }
  
    // This function will run everytime one of the Apartment checkboxes change
    // Based on checked stats of the checkbox will either add or remove the targeted tag to newApartment
    const handleCheck = e => {
      if (e.target.checked) {
        setNewApartment({ ...newApartment, tags: [...newApartment.tags, e.target.id] })
      }
      else {
        let bufferTags = newApartment.tags
        let index = newApartment.tags.indexOf(e.target.id)
        bufferTags.splice(index, 1)
        setNewApartment({ ...newApartment, tags: bufferTags })
      }
    }

    return (
        <div>
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




            <Form onSubmit={postProfile}>
              <div className='container' style={box}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={subtitle}>Name</Form.Label>
                  <Form.Control style={{ width: '18rem' }} placeholder="Enter name" onChange={handleChange} type="text" name="name" id="name" />
                </Form.Group>
              </div>
              <div className='container' style={box}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={subtitle}>Address</Form.Label>
                  <Form.Control style={{ width: '18rem' }} placeholder="Address" onChange={handleChange} type="text" name="address" id="address" />
                </Form.Group>
              </div>
              <div className='container' style={box}>
                <Card style={{ width: '18rem' }}>
                  <Card.Header style={subtitle}>Favorites</Card.Header>
                  {
                    tags.map(tag => (
                      <li style={list}>
                        <label htmlFor={tag.name}>{tag.name}</label>
                        <input onChange={handleCheck} type="checkbox" name={tag.name} id={tag._id} style={button} />
                      </li>
                    ))
                  }
                </Card>
              </div>
              <Button variant="light" type="submit" style={button}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      )



}
export default CreateApartment