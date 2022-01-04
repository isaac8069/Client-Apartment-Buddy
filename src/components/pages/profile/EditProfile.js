import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import e from 'express'

const EditProfile = (props) => {
    const navigate = useNavigate()

    const [currentProfile, setCurrentProfile] = useState(props.profile)
    const [tags, setTags] = useState([])
    const [tageNames, setTagNames] = useState(props.profile.tags.map((e) => e.name))
    
    useEffect(() => {
        getTags()
    }, [])
    const handleChange = e => {
        setCurrentProfile({ ...currentProfile, [e.target.name]: e.target.value })
    }

    const handleCheck = e => {
        if (e.target.checked) {
            setCurrentProfile({ ...currentProfile, tags: [...currentProfile.tags, {_id: e.target.id, name: e.target.name }] })
            setTagNames([...tageNames, e.target.name])
        } else {
            let bufferTags = currentProfile.tags
            let index = tagNames.indexOf(e.target.name)
            bufferTags.splice(index, 1)
            setCurrentProfile(currentProfile.tags.map((e) => e.name))
        }
    }

    // api call that gets the tags























}

export default EditProfile