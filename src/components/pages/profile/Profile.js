import React from 'react'
import CreateProfile from '/CreateProfile'
import ExistingProfile from '/ExistingProfile'

const Profile = (props) => {

    if (props.profile) {
        return <ExistingProfile changePassword={props.changePassword}
            profile={props.profile} />
    } else {
        return <CreateProfile user={props.user}
            getProfile={props.getProfile}
            msgAlert={props.msgAlert} />
    }
}

export default Profile