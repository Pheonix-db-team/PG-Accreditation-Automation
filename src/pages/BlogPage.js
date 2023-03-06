import React from 'react'
import NavBar from '../components/NavBar'
import { useLocation } from 'react-router-dom';
function BlogPage() {
    let { state } = useLocation();
    return (
        <div>
            <div>{state.some}</div>
            <NavBar></NavBar>
            <div>BlogPage</div>
        </div>
    )
}

export default BlogPage