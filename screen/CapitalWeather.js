import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
TextInput,TouchableOpacity,FlatList,Image
} from 'react-native';
import { Card } from 'native-base';
export default class CapitalWeather extends Component{
    constructor(props){
        super(props);
      }
      state = {
        ButtonStateHolder : false,
        showList: false,
        showdetails:false,
        matched_id:true,
        Capitalname:'',
        Countrydetails:[]
      };
     async componentDidMount() {
          this.setState({Capitalname:this.props.route.params.Capitalname});
          const response = await fetch("http://api.weatherstack.com/current?access_key=53ac32b458f8f858752fc1dfa3103c26&QUERY="+this.props.route.params.Capitalname)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({Countrydetails:responseJson.current});
           });  
      }
    //   53ac32b458f8f858752fc1dfa3103c26
        render(){
            return(
                <View>
                     <Card style={styles.card_style}>
                    <View style={{flex:0,flexDirection:'column'}}>
                        <View style={styles.name_f}>
                            <Text>Temperature:</Text>
               <Text style={styles.font}>{this.state.Countrydetails.temperature}</Text>
                        </View>
                        <View style={styles.hairline}></View>
                        <View style={styles.url_ln}>
                            <Text>Weather icons:</Text>
               {/* <Image  style={{height:50,width:50,justifyContent:'center',alignItems:'center'}}
                    source={{ uri: this.state.Countrydetails.weather_icons }}>
                  </Image> */}
                        </View>
                        <View style={styles.hairline}></View>
                        <View style={styles.name_f}>
                            <Text>wind speed:</Text>
                            <Text style={styles.font}>{this.state.Countrydetails.wind_speed}</Text>
                        </View>
                        <View style={styles.hairline}></View>
                        <View style={styles.name_f}>
                            <Text>precip:</Text>
                            <Text style={styles.font}>{this.state.Countrydetails.wind_speed}</Text>
                        </View>
                    </View>
                   </Card>
                </View>
            );
        }
    }
    const styles = StyleSheet.create({
       
        hairline: {
            backgroundColor: '#f2f2f2',
            height: 1,
            width: 300,
            marginLeft:15,marginTop:0,flex:0
          },
  
        card_style:{
            marginTop:40,
            marginLeft:10,
            width:'95%',alignContent:'center',alignItems:'center'
        },
          url_ln:{
            flex:0,flexDirection:'row',padding:10,width:250
          },
          name_f:{
            flex:0,flexDirection:'row',padding:10
          },
          font:{
            fontWeight:'bold',marginLeft:10
          },
    })