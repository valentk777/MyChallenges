// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import React, { Component, useContext, useEffect, useState } from 'react';
// import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { ThemeContext } from '../contexts/themeContext';
// import { customTheme } from '../styles/customTheme';
// import LinearGradient from 'react-native-linear-gradient'
// import { HomeStackParamList } from '../navigators/MenuTabNavigator';
// import { AgendaSchedule, Agenda, DateData, AgendaEntry } from 'react-native-calendars';
// import { Challenge } from '../entities/challenge';
// import challengesService from '../services/challengesService';

// type StatusCalendarScreenProps = NativeStackScreenProps<HomeStackParamList, 'StatusCalendarScreen'>;

// // interface State {
// //   items?: AgendaSchedule;
// // }

// export const StatusCalendarScreen = ({ navigation }: StatusCalendarScreenProps) => {
//   const { theme } = useContext(ThemeContext);
//   const styles = createStyles(theme);


//   // reservationsKeyExtractor = (item, index) => {
//   //   return `${item?.reservation?.day}${index}`;
//   // };
//   const [challengesFromStorage, setDataSource] = useState([] as Challenge[]);
//   const [calendarItems, setCalendarItems] = useState({} as AgendaSchedule);



//   useEffect(() => {
//     navigation.addListener('focus', () => {
//       readData();
//     });
//   }, [navigation]);

//   async function readData() {
//     try {
//       const challenges = await challengesService.getAllChalenges();

//       if (challenges.length == 0) {
//         // setRefreshing(false);
//         setDataSource([]);
//         return;
//       }

//       // let filteredData = filterData(challenges);
//       // filteredData = toSorted(filteredData);
//       setDataSource(challenges);
//       // setRefreshing(false);
//     } catch (error) {
//       Alert.alert(`${error}`)
//     }
//   }

//   const loadItems = (day: DateData) => {
//     const items = calendarItems || {};

//     setTimeout(() => {
//       for (let i = -15; i < 85; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = timeToString(time);

//         if (!items[strTime]) {
//           items[strTime] = [];

//           const numItems = Math.floor(Math.random() * 3 + 1);
//           for (let j = 0; j < numItems; j++) {
//             items[strTime].push({
//               name: 'Item for ' + strTime + ' #' + j,
//               height: Math.max(50, Math.floor(Math.random() * 150)),
//               day: strTime
//             });
//           }
//         }
//       }

//       const newItems: AgendaSchedule = {};
//       Object.keys(items).forEach(key => {
//         newItems[key] = items[key];
//       });
//       setCalendarItems(newItems);
//     }, 1000);
//   };

//   const renderDay = (day) => {
//     if (day) {
//       return <Text style={styles.customDay}>{day.getDay()}</Text>;
//     }
//     return <View style={styles.dayItem} />;
//   };

//   const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
//     const fontSize = isFirst ? 16 : 14;
//     const color = isFirst ? 'black' : '#43515c';

//     return (
//       <TouchableOpacity
//         style={[styles.item, { height: reservation.height }]}
//         onPress={() => Alert.alert(reservation.name)}
//       >
//         <Text style={{ fontSize, color }}>{reservation.name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderEmptyDate = () => {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   };

//   const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
//     return r1.name !== r2.name;
//   };

//   const timeToString = (time: number) => {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }

//   return (
//     <Agenda
//       items={calendarItems}
//       loadItemsForMonth={loadItems}
//       selected={'2017-05-16'}
//       renderItem={renderItem}
//       renderEmptyDate={renderEmptyDate}
//       rowHasChanged={rowHasChanged}
//       showClosingKnob={true}
//     // markingType={'period'}
//     // markedDates={{
//     //    '2017-05-08': {textColor: '#43515c'},
//     //    '2017-05-09': {textColor: '#43515c'},
//     //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//     //    '2017-05-21': {startingDay: true, color: 'blue'},
//     //    '2017-05-22': {endingDay: true, color: 'gray'},
//     //    '2017-05-24': {startingDay: true, color: 'gray'},
//     //    '2017-05-25': {color: 'gray'},
//     //    '2017-05-26': {endingDay: true, color: 'gray'}}}
//     // monthFormat={'yyyy'}
//     theme={styles.calendarTheme}
//     // renderDay={this.renderDay}
//     hideExtraDays={false}
//     // showOnlySelectedDayItems
//     // reservationsKeyExtractor={this.reservationsKeyExtractor}
//     />
//   );
// };







// // return (
// //   <View style={styles.container}>
// //     <LinearGradient
// //       colors={styles.linearGradient.colors}
// //       style={styles.linearGradient}
// //     >
// //       <View style={styles.section}>
// //         <Text style={styles.text}>AboutUs information screen.</Text>
// //       </View>
// //     </LinearGradient>
// //   </View >
// // );

// const createStyles = (theme: typeof customTheme) => {
//   const styles = StyleSheet.create({
//     item: {
//       backgroundColor: 'blue',
//       flex: 1,
//       borderRadius: 5,
//       padding: 10,
//       marginRight: 10,
//       marginTop: 17
//     },
//     emptyDate: {
//       height: 15,
//       flex: 1,
//       paddingTop: 30
//     },
//     customDay: {
//       margin: 10,
//       fontSize: 24,
//       color: 'green'
//     },
//     dayItem: {
//       marginLeft: 34
//     },
//     calendarTheme: {
//       calendarBackground: 'red', 
//       agendaKnobColor: 'green',

//       // arrowColor: theme.colors.black,
//       textDayFontFamily: theme.fonts.light,
//       textMonthFontFamily: theme.fonts.bold,
//       textDayHeaderFontFamily: theme.fonts.medium,
//       todayTextColor: theme.colors.calendarDay,
//     }
//   });
//   //   container: {
//   //     flex: 1,
//   //   },
//   //   linearGradient: {
//   //     flex: 15,
//   //     colors: [theme.colors.primary, theme.colors.secondary]
//   //   },
//   //   section: {
//   //     alignItems: 'center',
//   //     justifyContent: 'center',
//   //     height: '70%',
//   //   },
//   //   text: {
//   //     fontSize: 20,
//   //     lineHeight: 21,
//   //     fontFamily: theme.fonts.light,
//   //     fontWeight: 'bold',
//   //     color: theme.colors.text,
//   //     marginTop: 30,
//   //   },
//   // });

//   return styles;
// };

// export default StatusCalendarScreen;
