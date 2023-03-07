import React from 'react'
import { useLocation } from 'react-router-dom';

function DashboardPage() {
    let { state } = useLocation();
    console.log(state);
    return (
        <div>DashboardPage
            <br></br>
            <div>{state.user_email}</div>
        </div>
    )
}

export default DashboardPage
