import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Card, FloatingLabel } from "react-bootstrap";

export default function Feed({ post, getData }) {
  const {auth} = useContext(GlobalContext)
  const authData = auth('authData')
  const [deleteSpan, setDeleteSpan] = useState(false)
  const [editSpan, setEditSpan] = useState(false)
  const [modal, showModal] = useState(false);
  const [editData, setEditData] = useState({title:'', message: ''});

  useEffect(()=>{
    if (post.owner.username === authData.user.username) {
      setEditSpan(true); setDeleteSpan(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeHandler = e =>setEditData(data => ({...data, [e.target.name]:e.target.value}))  

  const editPost = ({ title, message, _id })=>{
    showModal(true);
    setEditData({title, message, postId: _id})
  }

  const updatePost = (e)=>{ e.preventDefault()
    axios.put('http://localhost:3001/api/v1/post/' + editData.postId, editData, {
      headers: { 'Authorization': 'Bearer: ' + authData.token }
    }).then(res=> getData() ).catch(err=>{alert(err)})
    showModal(false);
  }

  const deletePost = (id)=>{
    axios.delete('http://localhost:3001/api/v1/post/'+id, {
      headers: { 'Authorization': 'Bearer: ' + authData.token }
    }).then(res=> getData() ).catch(err=>{alert(err)})
  }

  return (
    <>
      <Card className="mt-3 shadow bg-white rounded">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{post.title}</h5>
            <cite className={post.owner.username === authData.user.username?'text-primary':''}>~{post.owner.username}</cite>
          </div>
          <p className="card-text">{post.message}</p>
          <div className="d-flex justify-content-between">
            { (new Date(post.createdAt)).toLocaleDateString() }
            { editSpan && <button className="text-dark pointer btn p-0" type="button" onClick={()=>editPost(post)}>Edit</button> }
            { deleteSpan && <button className="text-danger pointer btn p-0" type="button" onClick={()=>deletePost(post._id)}>Delete</button> }
          </div>
        </Card.Body>
      </Card>
      <Modal show={modal} onHide={() => showModal(false)}>
        <Form onSubmit={updatePost}>
          <Modal.Header closeButton>
            <Modal.Title>Edit post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="title" label="Title">
              <Form.Control name="title" placeholder="Title" value={editData.title} onChange={changeHandler} />
            </FloatingLabel>
            <FloatingLabel controlId="message" label="Comments">
              <Form.Control style={{ height: '150px' }} className="mt-3" value={editData.message} name="message" as="textarea" placeholder="Message" onChange={changeHandler} />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={()=>showModal(false)}>Close</Button>
            <Button variant="primary" type="submit">Update</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}