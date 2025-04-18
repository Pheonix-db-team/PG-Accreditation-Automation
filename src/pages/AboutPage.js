import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-dom';
import ParticlesBg from 'particles-bg'

function AboutPage({ navigate }) {
  const navigate1 = useNavigate();
  const goBack = () => {
    navigate1(-1);
}
  return (
    <ScrollView style={styles.scrollView}>
      {/* Particles background doesn't work in React Native, so let's skip it */}
      <ParticlesBg type="ball" bg={true} />


      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>About Page</Text>
      </View>
      <div style={{
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: 10
}}>
  <button
    onClick={goBack}
    style={{
      background: 'linear-gradient(135deg, #103e82 0%, #0c2e66 100%)',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
    onMouseOver={e => e.currentTarget.style.opacity = 0.85}
    onMouseOut={e => e.currentTarget.style.opacity = 1}
  >
    ← Back
  </button>
</div>

      {/* Course Exit Survey Info */}
      <Text style={styles.subtitle}>Course Exit Survey</Text>
      <Text style={styles.description}>
        In order for the PG Accreditation Automation system to function smoothly
        without any performance issues, threshold criteria for the number of residents
        simultaneously accessing the platform and uploading related attachments must
        be properly defined according to the server side system capabilities. Also, the
        connection to the system is based on attributes of the user like his/her location,
        and the system will be working 24x7, so quality of network connectivity at the
        user end will also affect the system performance.
      </Text>

      {/* Team Section */}
      <Text style={styles.teamTitle}>Team</Text>
      <View style={styles.row}>
        {/* Column 1 */}
        <View style={styles.column}>
          <Image source={require('../image/yugam.jpg')} style={styles.circleImageLayout} />
          <Text style={styles.text}>Lead Developer: YUGAM PARASHAR</Text>

          <Image source={require('../image/subedar.png')} style={styles.circleImageLayout} />
          <Text style={styles.text}>Developer: SUBEDAR CHAURASIYA</Text>

          <Image source={require('../image/sujeet.jpg')} style={styles.circleImageLayout} />
          <Text style={styles.text}>Developer: SUJEET KUMAR SINGH</Text>
        </View>

        {/* Column 2 */}
        <View style={styles.column}>
        <Image source={require('../image/Swapnil.jpg')} style={styles.circleImageLayout} />
        <Text style={styles.text}>Project Coordinator/UI\UX Designer: SWAPNIL BAVISKAR</Text>

          <Image source={require('../image/sushal.jpg')} style={styles.circleImageLayout} />
          <Text style={styles.text}>Developer: SUSHAL DEVASARI</Text>


          <Image source={require('../image/vaibhav.jpg')} style={styles.circleImageLayout} />
          <Text style={styles.text}>Developer & Query Handler: VAIBHAV RAIBOLE</Text>
        </View>
      </View>
    </ScrollView>


  );
}

// Styles for the page
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 15,
    textAlign: 'justify',
  },
  teamTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  circleImageLayout: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 5,
  },
});

export default AboutPage;
