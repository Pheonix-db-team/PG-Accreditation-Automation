import React from 'react'
import { useNavigate } from "react-router-dom";
function HomePage() {
    const navigate = useNavigate();
    return (
        <div>Welcome
            <br></br>
            <button className="styledbutton" onClick={() => navigate('/adminsignin', { state: {} })}>Admin Login</button>
            {/* <br></br>
            <br></br> */}
            <button className="styledbutton" onClick={() => navigate('/facultysignin', { state: {} })}>Faculty Login</button>
            {/* <br></br>
            <br></br> */}
            <button className="styledbutton" onClick={() => navigate('/studentsignin', { state: {} })}>Student Login</button>
            {/* <br></br>
            <br></br> */}

        </div>
        </div>
    )
}

export default HomePage