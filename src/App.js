// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/alerts/AutoDismissAlert/AutoDismissAlert'
import Header from './components/pages/home/Header'
import RequireAuth from './components/auth/RequireAuth'
import Home from './components/pages/home/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Apartment from './components/pages/apartment/Apartment'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [foundApartment, setFoundApartment] = useState({})

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

  useEffect(()=>{
		getApartment()
	}, [user])

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return (prevState.filter((msg) => msg.id !== id))
    })
  }

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(() => {
      return (
        [{ heading, message, variant, id }]
      )
    })
  }

  const getApartment = () => {
		if(user){
			fetch(`http://localhost:8000/apartments/user/${user._id}`)
			.then(res => res.json())
			.then(foundObject => {
				setFoundApartment(foundObject.apartment[0])
			})
			.catch(err => console.log('THIS IS ERR',err))
		}
	}

  const patchApartment = () => {
		let preJSONBody = {
		  title: foundApartment.title,
          rent: foundApartment.rent,
          description: foundApartment.description,
          location: foundApartment.description,
          bedrooms: foundApartment.bedrooms,
          bathrooms: foundApartment.bathrooms,
          tags: foundApartment.tags,
          userId: foundApartment.userId
		}
		const requestOptions = {
		  method: 'PATCH',
		  body: JSON.stringify(preJSONBody),
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${user.token}`
		  },
		}
		fetch(`http://localhost:8000/profiles/user/${user._id}`, requestOptions)
		  .then(patchedApartment => patchedApartment)
		  .catch(err => console.error(err))
	}

  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
        <Route
          path='/sign-up'
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path='/sign-in'
          element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path='/sign-out'
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/change-password'
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>}
        />
        <Route
					path='/apartments'
					element={<Apartment msgAlert={msgAlert}
									getApartment={getApartment}
									patchApartment= {patchApartment}
									user={user} />}
				/>
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  )
}

export default App