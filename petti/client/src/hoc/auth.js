import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { actAuth } from '../api'

 

export default function Auth(SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {
        const authMutation = useMutation( () => actAuth())

        useEffect(() => {
            authMutation.mutateAsync()
                .then(response => {
                    console.log(response)
                    console.log(response.data.isAuth)
                    if(!response.data.isAuth){//not login
                        if(option){//Only logged in users can access
                            props.history.push('/')
                        }
                    } else {//login
                        if(adminRoute && !response.data.isAdmin) {
                            props.history.push('/')
                        }else{
                            if(option === false){
                                props.history.push('/')
                            }
                        }
                    }
                })
        }, [])
        
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}