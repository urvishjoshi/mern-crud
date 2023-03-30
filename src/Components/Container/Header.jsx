import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";

export default function Header() {
  const { flushAuth } = useContext(GlobalContext)
  const navigate = useNavigate()
  const signOut = () => {
    flushAuth('authData')
    navigate('/')
  }
  return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-between">
                <Link className="navbar-brand" to="/">Dynamic next practical</Link>
                <b>Welcome, <span id="username"></span></b>
                <button className="btn" onClick={signOut}>Sign out</button>
            </div>
        </nav>
    </header>
  );
}