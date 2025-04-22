import React, { useState, useEffect } from 'react';
import NaviBar from '../components/NavBar_1';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HomePage.css';
import Lottie from 'lottie-react';
import animationData from '../lottie/maiN-l.json'; // Path to your Lottie JSON file

// Import your images
import adminLoginImg from '../image/imgs_home_page/admin_login.png';
import facultyLoginImg from '../image/imgs_home_page/faculty_login.png';
import studentLoginImg from '../image/imgs_home_page/student_login.png';
import adminDashboardImg from '../image/imgs_home_page/admin_dashboard.png';
import facultyDashboardImg from '../image/imgs_home_page/faculty_dashboard.png';
import studentDashboardImg from '../image/imgs_home_page/student_dashboard.png';
import studentListImg from '../image/imgs_home_page/student_list.jpg';
import facultyListImg from '../image/imgs_home_page/faculty_list.jpg';
import surveyListImg from '../image/imgs_home_page/survey_list.png';
import cesResponseImg from '../image/imgs_home_page/ces_response.jpeg';


const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationHeight, setAnimationHeight] = useState(window.innerHeight * 0.5); // 50% of screen height
  // Auto-rotate carousels
  useEffect(() => {
    const handleResize = () => {
      setAnimationHeight(window.innerHeight * 0.5); // Adjust height as per screen size (50%)
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const loginImages = [
    { src: adminLoginImg, alt: "Admin Login", title: "Admin Login Portal" },
    { src: facultyLoginImg, alt: "Faculty Login", title: "Faculty Login Portal" },
    { src: studentLoginImg, alt: "Student Login", title: "Student Login Portal" }
  ];

  const dashboardImages = [
    { src: adminDashboardImg, alt: "Admin Dashboard", title: "Admin Dashboard" },
    { src: facultyDashboardImg, alt: "Faculty Dashboard", title: "Faculty Dashboard" },
    { src: studentDashboardImg, alt: "Student Dashboard", title: "Student Dashboard" }
  ];

  const listImages = [
    { src: studentListImg, alt: "Student List", title: "Student Management" },
    { src: facultyListImg, alt: "Faculty List", title: "Faculty Management" },
    { src: surveyListImg, alt: "Survey List", title: "Survey Management" }
  ];
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };


  return (
    <div className="homepage" style={{
      background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', // Blue background gradient
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
<section className="hero-section">
  {/* Left Content */}
  <div className="hero-text">
    <h1>Welcome to the Course Exit Survey</h1>
    <p>
      Please take a few minutes to provide your feedback about the course.
      Your input will help us improve it for future students.
    </p>
    <div className="navbar-wrapper">
      <NaviBar />
    </div>
  </div>

  {/* Right Lottie Animation */}
  <div className="hero-animation">
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      className="lottie"
    />
  </div>
</section>


      {/* Navbar Section */}
      <div className="navbar-section" style={{

      }}>
        <NaviBar /> {/* Updated to use NaviBar component */}
      </div>

      {/* Marquee */}
      <div className="marquee" style={{
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <marquee behavior="scroll" direction="left">
          <h4 style={{ margin: 0 }}>📢 Course Exit Survey link is now active...</h4>
        </marquee>
      </div>

      {/* Login Portals Section */}
      <div className="login-portals" style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{
          color: '#2c3e50',
          borderBottom: '2px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>Login Portals</h2>
        <div className="carousel-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            selectedItem={currentSlide}
          >
            {loginImages.map((img, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    maxHeight: '300px',
                    width: 'auto',
                    borderRadius: '8px'
                  }}
                />
                <p style={{
                  fontSize: '1.2rem',
                  color: '#2c3e50',
                  marginTop: '10px'
                }}>
                  {img.title}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Dashboard Views Section */}
      <div className="dashboard-views" style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{
          color: '#2c3e50',
          borderBottom: '2px solid #3498db',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>Dashboard Views</h2>
        <div className="carousel-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            selectedItem={currentSlide}
          >
            {dashboardImages.map((img, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    maxHeight: '300px',
                    width: 'auto',
                    borderRadius: '8px'
                  }}
                />
                <p style={{
                  fontSize: '1.2rem',
                  color: '#2c3e50',
                  marginTop: '10px'
                }}>
                  {img.title}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Footer */}
      <div className="footer" style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
