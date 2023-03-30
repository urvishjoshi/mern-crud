import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";


export default function Feed({ post, getData }) {
  const {auth} = useContext(GlobalContext)
  const [deleteSpan, setDeleteSpan] = useState(false)
  const authData = auth('authData')
  useEffect(()=>{
    if (post.owner.username === authData.user.username)
      setDeleteSpan(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deletePost = (id)=>{
    axios.delete('http://localhost:3001/api/v1/post/'+id, {
      headers: { 'Authorization': 'Bearer: ' + authData.token }
    }).then(res=> getData() ).catch(err=>{alert(err)})
  }

  return (
    <div className="card mt-3 shadow bg-white rounded">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{post.title}</h5>
          <cite className={post.owner.username === authData.user.username?'text-primary':''}>{post.owner.username}</cite>
        </div>
        <p className="card-text">{post.message}</p>
        <div className="d-flex justify-content-between">
          { (new Date(post.createdAt)).toLocaleDateString() } 
          {deleteSpan && <button className="text-danger pointer btn p-0" type="button" onClick={()=>deletePost(post._id)}>Delete</button>}
            
        </div>
      </div>
    </div>
  );
}