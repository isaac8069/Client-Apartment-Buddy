import { Button, FormControl, InputGroup } from "react-bootstrap"
import { useState, useEffect, useRef } from 'react'

const Home = (props) => {
    // const { msgAlert, user } = props
    console.log('props in home', props)

    return (
        <>
            <h2>Apartment Buddy</h2>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Location"
                    aria-label="Location"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>
        </>
    )
}

export default Home