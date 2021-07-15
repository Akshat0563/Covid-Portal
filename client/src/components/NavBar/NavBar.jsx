import './NavBar.css';
import { useLocation } from 'react-router-dom'

const NavBars = () => {
    return <NavBar />
}

const NavBar = () => {

    const location = useLocation();

    return (
        <>
            <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
            
            <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                <div className="spinner diagonal part-1"></div>
                <div className="spinner horizontal"></div>
                <div className="spinner diagonal part-2"></div>
            </label>
            <div id="sidebar">
                {/* <div className="toggle-btn" onClick={toggleSidebar}>
                    <span></span><span></span><span></span>
                </div> */}
                <nav>
                    <ul>
                    <li className="sidebar-brand"><a href="./">Covid Portal</a></li>
                    <li className="list"><a href="./Hospital">Hospital</a></li>
                    <li className="list"><a href="#">Vaccination</a></li>
                    <li className="list"><a href="./Guidelines">Guideline</a></li>
                    </ul>
                </nav>
            </div>
            <div className="nav1">
                <div className="nav">
                    <ul className="navList">
                        {location.pathname==='/Hospital' && <li><input type="text" placeholder="Search Hospital" className="inputSearch"/></li>}
                    </ul>
                    <ul className="navList">
                        <li className="navItem"><a href="./SignUp">SIGNUP / SIGNIN</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavBar;