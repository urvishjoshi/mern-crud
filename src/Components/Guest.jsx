import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';
import { Button, Card, Col, Container, FloatingLabel, Form, Tab, Tabs } from 'react-bootstrap';

export default function Guest() {
    const { auth, setAuth } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [key, setKey] = useState('login');
    useEffect(()=>{
        if(auth('authData')) navigate('/feed')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const login = async (e) => { e.preventDefault();
        let formData = new FormData(e.target), data = {}
        for (let [key, value] of formData.entries()) data[key] = value

        try {
            const response = await axios.post('http://localhost:3001/api/v1/signin', data)
            setAuth('authData', response.data.data)
            navigate('/feed')
        } catch (err) {alert(err)}
    }

    const signUp = async (e) => { e.preventDefault();
        let formData = new FormData(e.target), data = {}
        for (let [key, value] of formData.entries()) data[key] = value

        try {
            const response = await axios.post('http://localhost:3001/api/v1/signup', data)
            setAuth('authData', response.data.data)
            navigate('/feed')
        } catch (err) {alert(err)}
    }

  return (
    <Container fluid className="mt-0">
        <Container className="col-6">

            <div className="mt-5">
                <Col md={6} className="m-auto">
                    <Card.Body className="p-0">

                        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3 d-flex justify-content-around w-100">
                            <Tab eventKey="login" title="Login">
                                <h3 className="text-center mb-3">User Login</h3>
                                <Form onSubmit={login}>
                                    <FloatingLabel controlId="username" label="Username">
                                        <Form.Control name="username" placeholder="username"/>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="password" className="my-3" label="Password">
                                        <Form.Control name="password" placeholder="password" />
                                    </FloatingLabel>
                                    <Button type="submit" className="btn-block w-100" value="1">Login</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="signup" title="Signup">
                                <h3 className="text-center mb-3">User Signup</h3>
                                <Form onSubmit={signUp}>
                                    <FloatingLabel controlId="username" label="Username">
                                        <Form.Control name="username" placeholder="username"/>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="password" className="my-3" label="Password">
                                        <Form.Control name="password" placeholder="password" />
                                    </FloatingLabel>
                                    <Button type="submit" className="btn-block w-100" value="1">Signup</Button>
                                </Form>
                            </Tab>
                        </Tabs>

                    </Card.Body>
                </Col>
            </div>
            
        </Container>
    </Container>
  )
}
