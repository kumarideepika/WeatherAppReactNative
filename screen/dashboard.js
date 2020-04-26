import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
TextInput,TouchableOpacity,FlatList,Image
} from 'react-native';
import { Card } from 'native-base';
export default class Dashboard extends Component{
    constructor(props){
        super(props);
      }
        state = {
          ButtonStateHolder : false,
          showList: false,
          showdetails:false,
          matched_id:false,
          Countrydetails:[],
        };
      SubmitId(){
        this.setState({matched_id: false});
      }
      async Call_Country_details(){
        this.setState({showdetails: true});
        const response = await fetch("https://restcountries.eu/rest/v2/name/"+this.state.CountryID)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson[1]==undefined){
        this.setState({matched_id: true});
        this.setState({showdetails: false});

    }else{
        this.setState({matched_id: false});
        this.setState({showdetails: true});

            this.setState({Countrydetails:responseJson[1]});
          }
      
         });    }
         GotoCapWeather(){
            this.props.navigation.navigate('Capital Weather',{Capitalname:this.state.Countrydetails.capital})
    }
    render(){
        
        return(
           <View>
               <Card style={styles.card_style}>
               
                   <TextInput style={styles.textInput}
                      name="Input"
                      placeholder="Enter Country"
                      placeholderTextColor = "#757575"
                      selectionColor="#000"
                      onChangeText={CountryID => this.setState({CountryID})}
                      value={this.state.CountryID}
                      /> 
                      <View >
                      <TouchableOpacity onPress={() => this.Call_Country_details()} disabled={!this.state.CountryID} style={[styles.button_1, { backgroundColor:!this.state.CountryID ? '#999' : '#009688' }]} >
                  <Text  style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                      </View>
               </Card>
               {/* Show No Data Found */}
               {(this.state.matched_id) &&
               <View>
                 <Card style={styles.card_styl_ND}>
                   <Text style={{marginTop:10}}>NO DATA FOUND</Text>
                   <View style={styles.hairline}></View>
                 </Card>
               </View>
               }
               {/* Show Id Detailss */}
               {(this.state.showdetails) && <View>
                   <Card style={styles.card_style}>
                    <View style={{flex:0,flexDirection:'column'}}>
                        <View style={styles.name_f}>
                            <Text>Capital:</Text>
               <Text style={styles.font}>{this.state.Countrydetails.capital}</Text>
                        </View>
                        <View style={styles.hairline}></View>
                        <View style={styles.url_ln}>
                            <Text>Population:</Text>
               <Text style={styles.font}>{this.state.Countrydetails.population}</Text>
                        </View>
                        <View style={styles.hairline}></View>
                        <View style={styles.name_f}>
                            <Text>Latlng:</Text>
                            <Text style={styles.font}>{this.state.Countrydetails.latlng}</Text>
                        </View>
                        <View style={styles.hairline}></View>
                        <View style={styles.name_f}>
                            <Text>Flag:</Text>
                            <Image  style={{height:50,width:50,justifyContent:'center',alignItems:'center'}}
                    source={{ uri: 'https://restcountries.eu/data/ind.svg' }}>
                  </Image>
                        </View>
                    </View>
                    <View><TouchableOpacity onPress={() => this.GotoCapWeather()}  style={[styles.button_1, { backgroundColor:!this.state.CountryID ? '#999' : '#009688' }]} >
                  <Text  style={styles.buttonText}>Capital Weather</Text>
                  </TouchableOpacity></View>
                   </Card>
               </View>}
           </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#d4d4d4',
      marginLeft:5,
  
    },

    hairline: {
        backgroundColor: '#f2f2f2',
        height: 1,
        width: 300,
        marginLeft:15,marginTop:0,flex:0
      },
    textInput: {
        alignSelf: 'stretch',
        padding:5,
        fontSize:17,
        // marginLeft: 50,
        borderBottomColor:'#999',
        margin:5,
        // marginRight:50,
    
        borderBottomColor: '#999', 
        borderBottomWidth:1 
    },
    card_style:{
        marginTop:40,
        marginLeft:10,
        width:'95%',alignContent:'center',alignItems:'center'
    },
    card_styl_ND:{
      marginTop:0,
      marginLeft:10,
      width:'95%',alignContent:'center',alignItems:'center',
      height:500
    },
    button_1: {
        width:310,
          marginVertical: 10,
          paddingVertical:10,
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
    buttonText: {
        fontSize:15,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
        fontFamily:'serif'
      },
})