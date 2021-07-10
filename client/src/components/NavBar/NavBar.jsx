import './NavBar.css';

const NavBar = () => {
    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('active');
    }

    return (
        <>
            <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
            
            <label for="openSidebarMenu" className="sidebarIconToggle">
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
                    <li className="sidebar-brand"><a href="#">Covid Portal</a></li>
                    <li className="list"><a href="./Hospital">Hospital</a></li>
                    <li className="list"><a href="#">Vaccination</a></li>
                    <li className="list"><a href="#">Guideline</a></li>
                    </ul>
                </nav>
            </div>
            <div className="nav1">
                <div class="nav">
                    <ul></ul>
                    <ul class="navList">
                        <li class="navItem"><a href="./SignUp">SIGNUP</a></li>
                        <li class="navItem"><a href="./SignIn">SIGNIN</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavBar;