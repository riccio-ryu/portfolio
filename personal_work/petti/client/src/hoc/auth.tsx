import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import { actAuth } from '../api'
import { isLoginUser } from '../atoms'

 

export default function Auth(SpecificComponent:any, option:any, adminRoute = null) {

    function AuthenticationCheck(props:any) {
        const authMutation = useMutation( () => actAuth())

        const [ loginUser, setLoginUser ] = useRecoilState(isLoginUser)

        useEffect(() => {
            authMutation.mutateAsync()
                .then(response => {
                    //console.log(response)
                    // console.log(response.data.isAuth)
                    if(response.data.isAuth){
                        //login 된상태라면 recoil save
                        setLoginUser(response.data._id)
                    }
                    if(!response.data.isAuth){//not login
                        if(option){//Only logged in users can access
                            alert('Login is required')
                            props.history.push('/signin')
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