import Post from './Post';
import Feed from './Feed';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../App';
import Container from 'react-bootstrap/Container'
import { Col } from 'react-bootstrap';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
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
      navigate('/')
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container fluid className="my-3">
      <Container className="col-6">

        <Post getData={getData} />

        <Col lg={11} className="mx-auto mt-4" id="feed">
          { !posts && <i className="text-muted text-center d-block">No posts</i> }
          { posts && posts.map(post => 
            <Feed getData={getData} key={post._id} post={post} /> 
          ) }
        </Col>

      </Container>
    </Container>
  );
}