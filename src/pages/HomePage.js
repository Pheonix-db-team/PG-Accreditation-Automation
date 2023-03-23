/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useNavigate} from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Carousel } from 'react-bootstrap';
import logo from '../logo.svg';

function HomePage() {
    const navigate = useNavigate();
    return (
      <div>
        <div className='swapback'>
      <img src={"logo-white.svg"} width="500" height="150" />
      </div>
        <Navbar bg="light" expand="lg" >
          <Navbar.Brand href="#home"><b>Course Exit Survey</b></Navbar.Brand>
          <Nav.Link style={{color: "black"}} href="/adminsignin">Admin Login</Nav.Link>
          <Nav.Link href="/facultysignin">Faculty Login</Nav.Link>
          <Nav.Link href="/studentsignin">Student Login</Nav.Link>
          <Nav.Link href="/aboutpage">About</Nav.Link>
       </Navbar>

  <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">
	<marquee behavior="scroll" direction="left"><h4 style={{color: "green"}}><span class="glyphicon glyphicon-bullhorn"></span>  Course Exit Survey link is now active... </h4></marquee>
	</div>


          <img
            className="homeImage"
            src="https://nitc.ac.in/imgserver/uploads/compressed/slider_d__7257f7ac-5273-47c5-8835-78cd6f4fc0ea_0.png"
            alt="First slide"
          />


      <div className="container mt-5">
        <h1>Welcome to the Course Exit Survey</h1>
        <p className="lead">Please take a few minutes to provide your feedback about the course. Your input will help us to improve the course for future students.</p>
      </div>










    </div>
    );
}

export default HomePage;
