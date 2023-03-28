import React from 'react';
import { useSpring, animated } from 'react-spring';
import img1 from '../image/earth.png';
const EarthRotating = () => {
    const props = useSpring({
        from: { left: '-10%', top: '30%', rotate: 0 },
        to: { left: '110%', top: '30%', rotate: 360 },
        config: { duration: 4000 },
        reset: true,
        loop: true,
    });

    return (
        <animated.img
            src={img1}
            alt="Flying butterfly💸"
            style={props}
        />
    );
};

const NotFoundPage = () => {
    return (

        <div className="not-found-page">
            <h1>Lost in nitc world</h1>
            <EarthRotating />
            <p>Sorry, the page you are looking for could not be found.</p>
            <button onClick={() => window.location.href = '/'}>Go Home</button>
        </div>
    );
};

export default NotFoundPage;
