import { StyleSheet, Text, View , Button, TextInput, ScrollView, FlatList, Image, Modal} from 'react-native';

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

// import GoalItem from './components/GoalItem';
// import GoalInput from './components/GoalInput';


export default function App() {

  //manage list of goals, UI should be updated, it will be an array
  const [displayGoals, setDisplayGoals] = useState([])

  const [modalVisible, setModalVisible] = useState(false)

  const addGoal = (goalText) => {
    //console.log(newGoal);

    //append new goals
    //In react we use map method to displa data
    setDisplayGoals((latestGoal) => [
      ...latestGoal,
      { text: goalText, id: Math.random().toString() },
    ]);
    //newGoal is added to display goals and updated the setDisplayGoals
    //everynew val is an object with text and key property
    //console.log(displayGoals);

    endModalHandler();
  };


  const deleteGoal = (id) =>{
    //console.log('Delete Goalvv');
    setDisplayGoals(goals => {
      return goals.filter( (goal) => goal.id !== id)
    });                //take old state remove selected item
    
  }

  //goal model handler
  const modalHandler = () =>{
    setModalVisible(true)
  }

  const endModalHandler = () =>{
    setModalVisible(false)
  }

  const displayModal = () =>{
    setModalVisible(true)
  }

  return (
    <>
      <StatusBar style="light" />

      <View style={styles.appContainer}>
        <Image style={styles.image} source={require("./assets/petrol.png")} />

        <TextInput
          onChangeText={() => {}}
          placeholder="email..."
          style={styles.textInput}
          // value={}
        />

        <TextInput
          onChangeText={() => {}}
          placeholder="password..."
          style={styles.textInput}
          // value={}
        />

        {/* <Button title="Add New Goal" color="#5e0acc" onPress={modalHandler} /> */}

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="log in" color="#5e0acc" onPress={displayModal} />
            {/** onAddGoal provided by parent element */}
          </View>
          <View style={styles.button}>
            <Button title="create account" color="#f31282" />
          </View>
        </View>

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
      </View>
    </>
  );
}

const styles = StyleSheet.create({


  appContainer: {
    flex:1,
    paddingTop: 50,
    paddingHorizontal:16,
    backgroundColor:'#1e085a',
    justifyContent:'center',
    alignItems: 'center',
    
  },

  inputModalContainer:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    padding:16,
    backgroundColor:'#311b6b'
  },

 

  goalsContainer:{
    flex:5,
  },

  textInput:{
    borderWidth:1,
    borderRadius: 6,
    borderColor:'#e4d0ff',
    backgroundColor:'#e4d0ff',
    width:'100%',
    padding:8,
    marginRight:5,
    color:'#120438',
    marginTop:20

  },

  image: {
    width:100,
    height: 100,
    margin:20,
    
  },

  buttonContainer : {
    flexDirection: 'column',
    margin:20,
    width: '100%',
    //borderRadius: 20,
    borderColor:'#e4d0ff',
  },

  button: {
    //width: '80%',
    marginHorizontal: 60,
    margin:10,
    borderRadius: 20,
    overflow:'hidden'
    
  },

  fuelView: {
    flex:1,
    flexDirection: 'row',
    padding: 10,
    //paddingHorizontal:16,
    backgroundColor:'#311b6b',
    //justifyContent:'center',
    //alignItems: 'center',
    //borderColor: "white",
    //borderWidth:5,
    width:'100%',
    height: 100

  },


  fuelCurrent:{
    flex:1,
    flexDirection: 'column',
    padding:10,
    backgroundColor:'#5d4299',
    //justifyContent:'center',
    //alignItems: 'center',
    //borderColor: "white",
    //borderWidth:5,
    margin:10,
    borderRadius:6,
    overflow:'hidden',
    width:'100%'
  },


  modalText: {
    fontWeight:'bold',
    fontSize:15,
    color: "white",
    padding: 3,
    //borderRadius: 6,
  },

  modalTextInput: {
    color: "white",
    fontSize:12,
    padding: 10,
    //borderRadius: 6,
  },


});