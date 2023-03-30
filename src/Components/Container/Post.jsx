import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../../App";


export default function Post({getData}) {
  const { auth, setAuth } = useContext(GlobalContext)
  const authData = auth('authData')
  const addPost = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target), data = {}
    for (let [key, value] of formData.entries()) {
      data[key] = value
    }
    axios.post('http://localhost:3001/api/v1/post', data, {
      headers: { 'Authorization': 'Bearer: ' + authData.token },
    }).then(res=>{
      getData()
    }).catch(err=>alert(err))
      
  }
  return (
    <form id="postForm" onSubmit={addPost} action="/api/v1/post" method="POST" className="card shadow bg-white rounded p-3">
        <input type="text" name="title" id="title" placeholder="Title" className="form-control mb-2 p-2" required/>
        <textarea className="border rounded p-2" name="message" id="message" placeholder="Message" cols="30" rows="8"></textarea>
        <div className="d-flex justify-content-end">
            <button className="btn btn-primary btn-sm mt-2" value="1">Submit</button>
        </div>
    </form>
  );
}