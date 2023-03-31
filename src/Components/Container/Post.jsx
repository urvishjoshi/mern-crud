import axios from "axios";
import { useContext } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { GlobalContext } from "../../App";

export default function Post({getData}) {
  const { auth } = useContext(GlobalContext)
  const authData = auth('authData')
  const addPost = async (e) => { e.preventDefault()
    let formData = new FormData(e.target), data = {}
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    axios.post('http://localhost:3001/api/v1/post', data, {
      headers: { 'Authorization': 'Bearer: ' + authData.token },
    }).then(res=> getData() ).catch(err=>alert(err))
  }

  return (
    <Form onSubmit={addPost} className="card shadow bg-white rounded p-3">
      <FloatingLabel controlId="title" label="Title">
        <Form.Control name="title" className="mb-2" placeholder="Title"/>
      </FloatingLabel>
      <FloatingLabel controlId="message" label="Message">
        <Form.Control style={{ height: '150px' }} className="border rounded" name="message" as="textarea" placeholder="Message" />
      </FloatingLabel>
      <div className="d-flex justify-content-end">
        <Button type="submit" variant="primary" className="btn-sm mt-2" >Submit</Button>
      </div>
    </Form>
  );
}