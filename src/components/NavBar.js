
import React from 'react'
import { Link } from "react-router-dom";
const style_item = {

    textDecoration: 'none',
    backgroundColor: '#9CFF2E',
    fontSize: '25px',
    borderRadius: '66px',
    background: '#e0e0e0',
    backgroundColor: '#e0e0e0',
    boxShadow: 'rgba(156, 255, 46) 0px 3px 8px',
    paddingRight: '10px',
    paddingLeft: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',

}
function NaviBar() {
    return (
        <div className='navbar'>
            <div className='navbar-menu'>
                <Link to="/" style={style_item}>Home🏠</Link>
                <Link to="/adminsignin" style={style_item} >Admin Login🔐</Link>
                <Link to="/facultysignin" style={style_item} >Faculty Login🔐</Link>
                <Link to="/studentsignin" style={style_item} >Student Login🔐</Link>
                <Link to="/aboutpage" style={style_item} >About📄</Link>

            </div>
        </div >
    )
}



export default NaviBar