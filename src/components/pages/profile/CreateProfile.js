import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'

const CreateProfile = (props) => {

    const navigate = useNavigate();
  
    // Setting a state to hold our users newProfile that will be sent to data Base to be stored with usersId as reference
    // Also setting a state for our tags
    const [newProfile, setNewProfile] = useState({
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
    // Function sets all inputs to our newProfile state
    const handleChange = e => {
      setNewProfile({ ...newProfile, [e.target.name]: e.target.value })
    }
  
    // This function will run everytime one of the profile checkboxes change
    // Based on checked stats of the checkbox will either add or remove the targeted tag to newProfile
    const handleCheck = e => {
      if (e.target.checked) {
        setNewProfile({ ...newProfile, tags: [...newProfile.tags, e.target.id] })
      }
      else {
        let bufferTags = newProfile.tags
        let index = newProfile.tags.indexOf(e.target.id)
        bufferTags.splice(index, 1)
        setNewProfile({ ...newProfile, tags: bufferTags })
      }
    }

















}
export default CreateProfile