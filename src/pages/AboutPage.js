import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native';
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button className='styledbuttonabout' onClick={() => navigate(-1)}>Back</button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h1>About Page</h1></div>
      <h2>Course Exit Survey</h2>
      <span>
        <p1>
          In order for the PG Accreditation Automation system to function smoothly
          without any performance issues, threshold criteria for the number of residents
          simultaneously accessing the platform and uploading related attachments must
          be properly defined according to the server side system capabilities. Also the
          connection to the system is based on attributes of the user like his/her location,
          and the system will be working 24x7, so quality of network connectivity at the
          user end will also affect the system performance.
        </p1>
      </span>

      <h2>Team</h2>
      <View style={styles.Container}>

        <Image
          source={require('../image/yugam.jpg')}
          style={styles.circleImageLayout}
        />
        <Text style={styles.text}>Lead Developer: YUGAM PARASHAR</Text>
        <Image
          source={require('../image/subedar.png')}
          style={styles.circleImageLayout}
        />
        <Text style={styles.text}>Developer: SUBEDAR CHAURASIYA</Text>

        <Image
          source={require('../image/sujeet.jpg')}
          style={styles.circleImageLayout}
        />
        <Text style={styles.text}>Developer: SUJEET KUMAR SINGH</Text>

        <Image
          source={require('../image/sushal.jpg')}
          style={styles.circleImageLayout}
        />
        <Text style={styles.text}>Developer: SUSHAL DEVASARI</Text>

        <Image
          source={require('../image/Swapnil.jpg')}
          style={styles.circleImageLayout}
        />
        <Text style={styles.text}>Project Coordinator: SWAPNIL BAVISKAR</Text>

        <Image
          source={require('../image/vaibhav.jpg')}
          style={styles.circleImageLayout}
        />
        <Text style={styles.text}>Developer & Query Handler: VAIBHAV RAIBOLE</Text>


      </View>




    </div>
  )
}
const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10
  },
  circleImageLayout: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    margin: 30
  }
});


export default AboutPage
