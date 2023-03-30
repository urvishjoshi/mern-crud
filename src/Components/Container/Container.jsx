import Post from './Post';
import Feed from './Feed';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../App';

export default function Container() {
  const { auth, flushAuth } = useContext(GlobalContext)
  const authData = auth('authData')
  const navigate = useNavigate()
  const [posts, setPosts] = useState(null)

  const getData = async () => { try {
      const response = await axios.get('http://localhost:3001/api/v1/feed', {
        headers: { 'Authorization': 'Bearer: ' + authData.token }
      })
      setPosts(response.data.data)
    } catch (error) {
      flushAuth('authData')
      return navigate('/')
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container-fluid my-3">
        <div className="container col-6">
          <Post getData={getData} />

              <div className="col-11 mx-auto mt-4" id="feed">
                {!posts && <i className="text-muted text-center d-block">No posts</i>}

                {posts && posts.map(post => <Feed getData={getData} key={post._id} post={post} /> ) }
                
              </div>

        </div>
    </div>
  );
}