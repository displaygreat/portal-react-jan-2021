import React, { useContext } from 'react';
import './users.css'
import PortalNavbar from '../../components/navbar/PortalNavbar';
import ActiveUserContext from '../../shared/activeUserContext'
import { Redirect } from 'react-router-dom'

const UserDetailsPage = (props) => {
    const { handleLogout } = props;
    const activeUser = useContext(ActiveUserContext);
    
    if (!activeUser) {
        return <Redirect to='/' />
    }

    return (
        <div className="p-user-details">
            <PortalNavbar 
            handleLogout={handleLogout}
            activeUser={activeUser}
            pageName={'פרטי משתמש'}
            />
            <h1>פרטי משתמש</h1>
        </div>
    );
}

export default UserDetailsPage;