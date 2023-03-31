import { useContext } from "react";
import { Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";

export default function Header() {
  const { auth, flushAuth } = useContext(GlobalContext)
  const navigate = useNavigate()
  const authData = auth('authData')
  const signOut = () => {
    flushAuth('authData')
    navigate('/')
  }

  return (
    <header>
        <Nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-between">
                <Link className="navbar-brand" to="/">React mern practical</Link>
                <b>Welcome, {authData.user.username}</b>
                <Button variant="secondary" onClick={signOut}>Sign out</Button>
            </div>
        </Nav>
    </header>
  );
}