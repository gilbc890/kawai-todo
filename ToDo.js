import React, { Component } from 'react';
import { View, 
          Text, 
          TouchableOpacity, 
          StyleSheet, 
          Dimensions,
          TextInput
        } 
from 'react-native';
import PropTypes from "prop-types";


const { width, height } = Dimensions.get("window");
export default class ToDo extends Component{
  constructor(props){
    super(props);
    this.state = {
      isEditing:false,
      toDoValue: props.text
    }
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted:PropTypes.bool.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompletedToDo: PropTypes.func.isRequired,
    completedToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired
  }
  render(){
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteTodo, isCompleted } = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View 
              style={[
                styles.circle, 
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]}
            />
          </TouchableOpacity>
          {isEditing? 
            (<TextInput
              style={[styles.input, 
                      styles.text,
                      isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finsihEditing}
              underlineColorAndroid={"transparent"}
            />) 
            : 
            (          
              <Text 
                style={[styles.text, 
                      isCompleted ? styles.completedText : styles.uncompletedText
                ]}>
                  { text }
              </Text>
            )}
          </View>
          
          {isEditing ? (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._finsihEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✅</Text>
                </View>
              </TouchableOpacity>
            </View>
            ) 
            : (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✏️</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={(e) => {
                e.stopPropagation;
                deleteTodo(id)
                }}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
            )}
      </View>
    )
  }
  _toggleComplete = (e) => {
    e.stopPropagation();
    const { isCompleted, completedToDo, uncompletedToDo, id } = this.props;
    if(isCompleted) {
      uncompletedToDo(id);
    } else {
      completedToDo(id);
    }
  }
  _startEditing = (e) => {
    e.stopPropagation();
    this.setState({
      isEditing:true,
    })
  }
  _finsihEditing = (e) => {
    e.stopPropagation();
    const {toDoValue} = this.state;
    const {id, updateToDo} = this.props;
    updateToDo(id, toDoValue);
    this.setState({
      isEditing: false
    })
  }
  _controlInput = text => {
    this.setState({
      toDoValue: text
    })
  }


}

const styles = StyleSheet.create({
  container: {
    width: width - 25,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginLeft: 10,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input:{
    marginVertical:20,
    width: width / 2,

  }
})

