import React, { useState, useEffect } from 'react';
import NaviBar from '../components/NavBar_1';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HomePage.css';

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

  // Auto-rotate carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
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

  return (
    <div className="homepage" style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
      lineHeight: 1.6,
      backgroundColor: '#f5f5f5'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '20px',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
        }}>
          Welcome to the Course Exit Survey
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '800px',
          margin: '0 auto 30px'
        }}>
          Please take a few minutes to provide your feedback about the course. Your input will help us improve it for future students.
        </p>

        {/* Navbar */}
        <div style={{ marginBottom: '10px' }}>
          <NaviBar />
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        backgroundColor: '#e74c3c',
        padding: '12px 0',
        marginBottom: '30px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
      }}>
        <marquee behavior="scroll" direction="left">
          <h4 style={{
            color: 'white',
            fontWeight: 600,
            fontSize: '1.1rem',
            margin: 0
          }}>
            📢 Course Exit Survey link is now active...
          </h4>
        </marquee>
      </div>

      {/* Banner Image */}
      <div style={{
        marginBottom: '40px',
        padding: '0 20px'
      }}>
        <img
          src="https://nitc.ac.in/imgserver/uploads/compressed/slider_d__7257f7ac-5273-47c5-8835-78cd6f4fc0ea_0.png"
          alt="Course Exit Banner"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>

      {/* Login Portals Section */}
      <div style={{
        padding: '50px 20px',
        marginBottom: '30px',
        backgroundColor: 'white',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#103e82',
          fontSize: '2rem',
          marginBottom: '40px',
          position: 'relative'
        }}>
          Login Portals
          <span style={{
            content: '',
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #103e82, #2ecc71)'
          }}></span>
        </h2>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            selectedItem={currentSlide}
          >
            {loginImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    maxHeight: '500px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <p style={{
                  backgroundColor: '#103e82',
                  color: 'white',
                  fontSize: '1.1rem',
                  padding: '12px',
                  borderRadius: '4px',
                  opacity: 0.9,
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
      <div style={{
        padding: '50px 20px',
        marginBottom: '30px',
        backgroundColor: '#f8f9fa'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#103e82',
          fontSize: '2rem',
          marginBottom: '40px',
          position: 'relative'
        }}>
          Dashboard Views
          <span style={{
            content: '',
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #103e82, #2ecc71)'
          }}></span>
        </h2>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            selectedItem={currentSlide}
          >
            {dashboardImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    maxHeight: '500px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <p style={{
                  backgroundColor: '#103e82',
                  color: 'white',
                  fontSize: '1.1rem',
                  padding: '12px',
                  borderRadius: '4px',
                  opacity: 0.9,
                  marginTop: '10px'
                }}>
                  {img.title}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Management Lists Section */}
      <div style={{
        padding: '50px 20px',
        marginBottom: '30px',
        backgroundColor: 'white',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#103e82',
          fontSize: '2rem',
          marginBottom: '40px',
          position: 'relative'
        }}>
          Management Lists
          <span style={{
            content: '',
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #103e82, #2ecc71)'
          }}></span>
        </h2>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            selectedItem={currentSlide}
          >
            {listImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    maxHeight: '500px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <p style={{
                  backgroundColor: '#103e82',
                  color: 'white',
                  fontSize: '1.1rem',
                  padding: '12px',
                  borderRadius: '4px',
                  opacity: 0.9,
                  marginTop: '10px'
                }}>
                  {img.title}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* CES Response Section */}
      <div style={{
        padding: '50px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#103e82',
          fontSize: '2rem',
          marginBottom: '40px',
          position: 'relative'
        }}>
          CES Response Analysis
          <span style={{
            content: '',
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #103e82, #2ecc71)'
          }}></span>
        </h2>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <img
            src={cesResponseImg}
            alt="CES Response Analysis"
            style={{
              maxHeight: '500px',
              width: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}
          />
          <p style={{
            marginTop: '20px',
            color: '#555',
            fontSize: '1.1rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Detailed analytics and visualization of course feedback responses
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
