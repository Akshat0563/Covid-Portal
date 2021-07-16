import './vaccination.css';
import { NavBar } from '..';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

const Vaccination = () => {
    const {user} = useContext(UserContext);

    if(! user.signedIn) {return <Redirect to="/"/>}
    return (
        <>
            <NavBar />
            <div className="wrapper">
                <div className="typing">
                    Coming Soon.
                </div>
            </div>
        </>
    )
}

export default Vaccination;