

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg  bg-dark ">
            <div className="container-fluid">
                <div className="container-fluid">
                    <a className="navbar-brand h1 text-light" href="/">
                        The Budget Pig
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active text-light" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/login">Login</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default Nav;