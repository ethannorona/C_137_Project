import React, {Componet} from 'react';
import {Text, View, FlatList, StyleSheet, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import { Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios'

export default class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []    
    };
  }

  componentDidMount(){
    this.getData();
  }

  getData = async () => {
    const {url} = "http://localhost:5000/";
    axios.get(url).then(response => {
      this.setState({
        data: response.data.data
      });
    })
    .catch(error => {
      console.log(error.message);
    });
  };

  renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress = {() => {
        this.props.navigation.navigate("Star", {name: item.name});
      }}
    >
      <Card
        image = {require("../assets/card_bg.png")}
        imageStyle = {{marginTop: RFValue(30)}}
        featuredTitle = {item.name}
        featuredTitleStyle = {styles.cardTitle}
        containerStyle = {styles.cardContainer}>
      </Card>
    </TouchableOpacity>
  );

  keyExtractor = (item, index) => index.toString();

  render(){
    const {data} = this.state;
    return(
      <View style = {styles.container}>
        <View style = {styles.headerContainer}>
          <Header
            centerComponent = {{
              text: "Stars",
              style: styles.headerTitle
            }}
            backgroundColor = {"#3A51FF"}
          />
        </View>
        {data.length > 0 ? (
          <View style = {styles.upperContainer}>
            <FlatList
              data = {data}
              renderItem = {this.renderItem}
              keyExtractor = {this.keyExtractor}
            />
        </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 0.12,
    backgroundColor: "#1A2D5F"
  },
  headerTitle: {
    color: "#fff",
    fontSize: RFValue(28),
    fontWeight: "bold"
  },
  upperContainer: {
    flex: 0.88,
    backgroundColor: "#1A2D5F"
  },
  cardTitle: {
    fontSize: RFValue(25),
    textAlign: "center"
  },
  cardContainer: {
    backgroundColor: "#1A2D5F",
    borderWidth: 0
  }
});