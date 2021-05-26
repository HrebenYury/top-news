import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinTongueWink } from '@fortawesome/free-solid-svg-icons'

const NotFound = () => {
    
    return (
        <div className='errorBox' >    
            <p><FontAwesomeIcon icon={faGrinTongueWink}/>   Bad News. Something wrong.</p>
        </div>
    );
}

export default NotFound;