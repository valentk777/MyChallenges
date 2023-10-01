// import React, { useContext, useState } from 'react';
// import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
// import { ThemeContext } from '../../contexts/themeContext';
// import { customTheme } from '../../styles/customTheme';
// import Carousel from 'react-native-snap-carousel';

// interface ImagesCarouselProps {
// }

// const DATA = [] as number[];
// for (let i = 0; i < 10; i++) {
//   DATA.push(i);
// }

// export const ImagesCarousel = (props: ImagesCarouselProps) => {
//     const { theme } = useContext(ThemeContext);
//     const styles = createStyles(theme);

//     const [aIndex, setIndex] = useState(0);




//     const _renderItem = ({ item, index }) => {
//         return (
//             <View style={styles.slide}>
//                 <Text style={styles.title}>{item}{index}</Text>
//             </View>
//         );
//     }


//     // useEffect(() => {
//     //   navigation.addListener('focus', () => {
//     //     readData();
//     //   });
//     // }, [navigation]);

//     // function readData() {
//     // }

//     // const onRefresh = () => {
//     //   setDataSource([]);
//     //   readData();
//     // };

//     return (
//         <SafeAreaView style={styles.container}>
//             <Carousel
//                 ref={(c) => { this._carousel = c; }}
//                 data={DATA}
//                 renderItem={_renderItem}
//                 sliderWidth={50}
//                 onSnapToItem={(index) => setIndex(index)}
//                 itemWidth={50}
//             />
//         </SafeAreaView>
//     );
// };

// const createStyles = (theme: typeof customTheme) => {
//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//         },
//         slide: {
//             flex: 1,
//         },
//         title: {
//             flex: 1,
//         },
//         container: {
//             flex: 1,
//         },
//         container: {
//             flex: 1,
//         },
//         container: {
//             flex: 1,
//         },
//         container: {
//             flex: 1,
//         },
//         container: {
//             flex: 1,
//         },
//     });

//     return styles;
// };
