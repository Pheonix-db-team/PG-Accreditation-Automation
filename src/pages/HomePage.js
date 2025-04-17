import React from 'react';
import NaviBar from '../components/NavBar_1';

function HomePage() {
  return (
<div className="homepage">
  {/* Logo + Navbar */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    }}
  >




  {/* Title + Description */}
  <div
    style={{
      textAlign: 'center',
      padding: '0 20px',
      marginBottom: '40px',
    }}
  >
    <h1
      style={{
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '20px',
      }}
    >
      Welcome to the Course Exit Survey
    </h1>
    <p
      style={{
        fontSize: '18px',
        color: '#ccc',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      Please take a few minutes to provide your feedback about the course. Your input will help us improve it for future students.
    </p>
  </div>

    {/* Navbar */}
    <div style={{ marginBottom: '30px' }}>
      <NaviBar />
    </div>
  </div>


  {/* Marquee Line */}
  <div
    style={{
      backgroundColor: 'red',
      padding: '10px',
      marginBottom: '20px',
    }}
  >
    <marquee behavior="scroll" direction="left">
      <h4
        style={{
          color: 'white',
          fontWeight: '600',
          fontSize: '16px',
          margin: 0,
        }}
      >
        📢 Course Exit Survey link is now active...
      </h4>
    </marquee>
  </div>

  {/* Banner Image */}
  <div style={{ marginBottom: '30px' }}>
    <img
      src="https://nitc.ac.in/imgserver/uploads/compressed/slider_d__7257f7ac-5273-47c5-8835-78cd6f4fc0ea_0.png"
      alt="Course Exit Banner"
      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
    />
  </div>
</div>


  );
}

export default HomePage;
