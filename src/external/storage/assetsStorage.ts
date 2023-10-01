// // https://rnfirebase.io/reference/storage
// import firestore from '@react-native-firebase/storage';

// export const usersRef = firestore().ref('/images/sports');

// const getPicturesForChallenges = () => {
//   console.log('Finished listing');

//     function listFilesAndDirectories(reference) {
//         return reference.list().then(result => {
//           // Loop over each item
//           result.items.forEach(ref => {

//             console.warn(ref.uri);
//           });
      
//           return Promise.resolve();
//         });
//       }

//     listFilesAndDirectories(usersRef).then(() => {
//         console.log('Finished listing');
//       });
// }

// const assetsStorage= {
//     getPicturesForChallenges,
//   };
  
//   export default assetsStorage;
  