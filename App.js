// "expo-splash-screen": "~0.18.1"


import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Modal,
} from "react-native";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";


import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


export default function App() {
  //manage list of goals, UI should be updated, it will be an array
  const [displayGoals, setDisplayGoals] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [newUserEmail, setNewUserEmail] = useState();

  const [newUserPassword, setNewUserPassword] = useState();

  const [CredentialsModalVisible, setCredentialsModalVisible] = useState(false);

  const [loginEmail, setLoginEmail] = useState();

  const [loginPasswd, setLoginPasswd] = useState();

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,

    sync: {
      // we'll talk about the details later.
    }
  
  })

  const getName = (data) => {
    setNewUserEmail(data);
    console.log(newUserEmail);
  };

  const getPassword = (data) => {
    setNewUserPassword(data);
    console.log(newUserPassword);
  };




  const saveData = () => {
    setCredentialsModalVisible(false);
    // alert('Testing')
    let obj= {
      name: newUserEmail,
      passwd: newUserPassword
      
    }

    AsyncStorage.setItem(newUserEmail, JSON.stringify(obj))

  };

  const loadCredentials = () => {
    // alert('loading good morning')
    // setModalVisible(true);
    displayData()
    
  }



  const endModalHandler = () => {
    setModalVisible(false);
  };




  displayData = async () =>{
    try {
      let user = await AsyncStorage.getItem(loginEmail)
      let parsed = JSON.parse(user)

      // alert(parsed.passwd)

      if(loginPasswd == parsed.passwd){
        setModalVisible(true);
      }

      else{
        alert('Invalid username or password. Try again')
      }
    }

    catch(error){
      alert('No account exist, create one')
    }
  }

  return (
    <>
      <StatusBar style="light" />

      <View style={styles.appContainer}>
        <Image style={styles.image} source={require("./assets/petrol.png")} />

        <TextInput
          onChangeText={(data) => {
            setLoginEmail(data);
            console.log(loginEmail);
          }}
          placeholder="email..."
          style={styles.textInput}
          // value={}
        />

        <TextInput
          onChangeText={(data) => {
            setLoginPasswd(data);
            console.log(loginPasswd);
          }}
          placeholder="password..."
          style={styles.textInput}
          // value={}
        />

        <TextInput
          onChangeText={() => {}}
          placeholder="ip address..."
          style={styles.textInput}
          // value={}
        />

        {/* <Button title="Add New Goal" color="#5e0acc" onPress={modalHandler} /> */}

        <View style={styles.buttonContainer}>
          <View style={styles.button}>

            <Button title="log in" color="#5e0acc" onPress={
              loadCredentials 
            } />

            {/** onAddGoal provided by parent element */}
          </View>
          <View style={styles.button}>
            <Button
              title="create account"
              color="#f31282"
              onPress={
                ()=>{
                  setCredentialsModalVisible(true)
                }
              }
            />
          </View>
        </View>

        {/* FUEL MODAL */}
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.inputModalContainer}>
            <Image style={styles.image} source={require("./assets/drop.png")} />

            <View style={styles.fuelView}>
              <View style={styles.fuelCurrent}>
                <Text style={styles.modalText}>Current Fuel</Text>
                <Text style={styles.modalTextInput}>10 Litres</Text>
              </View>

              <View style={styles.fuelCurrent}>
                <Text style={styles.modalText}>Fuel Door</Text>
                <Text style={styles.modalTextInput}>Status:Closed </Text>
              </View>
            </View>

            <View style={styles.fuelView}>
              <View style={styles.fuelCurrent}>
                <Text style={styles.modalText}>Fuel</Text>
              </View>

              <View style={styles.fuelCurrent}>
                <Text style={styles.modalText}>Fuel</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title="cancel"
                  onPress={endModalHandler}
                  color="#f31282"
                />
              </View>
            </View>
          </View>
        </Modal>

        {/**Create account model */}
        <Modal visible={CredentialsModalVisible} animationType="slide">
          <View style={styles.createAccount}>
            <View style={{ width: "90%" }}>
              <Text style={{ color: "white", fontSize: 10 }}>
                Enter your email
              </Text>
              <TextInput
                onChangeText={getName}
                placeholder="email..."
                style={styles.textInput}
                // value={}
              />
            </View>

            <View style={{ width: "90%", marginTop: 20 }}>
              <Text style={{ color: "white", fontSize: 10 }}>
                Enter your password
              </Text>

              <TextInput
                onChangeText={getPassword}
                placeholder="password..."
                style={styles.textInput}
                // value={}
              />
            </View>

            <View
              style={{ marginTop: 20, borderRadius: 10, overflow: "hidden" }}
            >
              <Button
                title="submit"
                color="#5d4299"

                onPress={saveData}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );

}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
    justifyContent: "center",
    alignItems: "center",
  },

  inputModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },

  createAccount: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    backgroundColor: "#311b6b",
  },

  goalsContainer: {
    flex: 5,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    width: "100%",
    padding: 8,
    marginRight: 5,
    color: "#120438",
    marginTop: 20,
  },

  image: {
    width: 100,
    height: 100,
    margin: 20,
  },

  buttonContainer: {
    flexDirection: "column",
    margin: 20,
    width: "100%",
    borderColor: "#e4d0ff",
  },

  button: {
    marginHorizontal: 60,
    margin: 10,
    borderRadius: 20,
    overflow: "hidden",
  },

  fuelView: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#311b6b",
    width: "100%",
    height: 100,
  },

  fuelCurrent: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#5d4299",
    margin: 10,
    borderRadius: 6,
    overflow: "hidden",
    width: "100%",
  },

  modalText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    padding: 3,
  },

  modalTextInput: {
    color: "white",
    fontSize: 12,
    padding: 10,
  },
});
