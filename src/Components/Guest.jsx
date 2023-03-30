import React, { useContext, useEffect } from 'react'
import axios from 'axios'
// import { navigate } from './utils';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';
// import { auth } from './utils';

export default function Guest() {
    const { auth, setAuth } = useContext(GlobalContext)
    const navigate = useNavigate()
    useEffect(()=>{
        if(auth('authData')) return navigate('/feed')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const login = async (e) => { e.preventDefault();
        let formData = new FormData(e.target), data = {}
        for (let [key, value] of formData.entries()) {
            data[key] = value
        }
        try {
            const response = await axios.post('http://localhost:3001/api/v1/signin', data)
            setAuth('authData', response.data.data)
            navigate('/feed')
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div className="container-fluid mt-0">
        <div className="container col-6">

            <div className="mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body p-0">

                        <ul className="nav nav-tabs justify-content-around w-100" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login"
                                    aria-selected="true">Login</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link" id="signup-tab" data-toggle="tab" href="#signup" role="tab" aria-controls="signup"
                                    aria-selected="false">Signup</a>
                            </li>
                        </ul>
                        
                        <div className="tab-content p-3" id="myTabContent">
                            <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                                <h3 className="text-center mb-3">User Login</h3>
                                
                                <form action="/api/v1/signin" onSubmit={login} method="POST">
                                    <div className="form-group mb-3">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block w-100" value="1">Sign in</button>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                                <h3 className="text-center mb-3">User Signup</h3>
                                
                                <form action="/api/v1/signup" method="POST">
                                    <div className="form-group mb-3">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" className="form-control" required/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block w-100" value="1">Sign up</button>
                                </form>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}
