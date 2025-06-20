import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate()

    }
    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname ==="/" ? "active" : "" }`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname ==="/about" ? "active" : "" }`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                        <form className="d-flex" role="search">
                            <Link className="btn btn-outline-light mx-2" to="/login" role='button'>Login</Link>
                            <Link className="btn btn-outline-light mx-2" to="/signup" role='button'>Sign Up</Link>
                        </form> : <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
