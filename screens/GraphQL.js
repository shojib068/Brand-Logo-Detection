// import React, {useState, useEffect } from 'react';
// import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, navigation } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { FontAwesome } from '@expo/vector-icons';
// import { auth} from '../Firebase/firebaseConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useQuery, gql } from '@apollo/client';
// import { FlatList } from 'react-native-gesture-handler';


// //graphql part 1
// const COUNTRY_QUERY = gql `
// query CountryQuery{
//   countries{
//     name
//     capital 
//     emoji 
//     code 
//     currency 
//     continent
//     {
//       name
//     }
//   }
// }
// `

// //graphql part 2
// const{data, loading} = useQuery(COUNTRY_QUERY)

// // useEffect(()=>{
// //   console.log('GraphQl===', data)
// // })

// const GraphQL = ({navigation}) => {
//   return (
//     <View>
//       {/* graphql part3*/} 
//       <FlatList
//       data={data?.countries}
//       renderItem={ ({item}) =>
//         <View style={{backgroundColor:'green', marginBottom:10, height:40}}>
//           <Text style={{color:'white'}}>{item.name}</Text>
//         </View>
//       }
//     />
//     </View>
//   );
// }

// export default GraphQL;


