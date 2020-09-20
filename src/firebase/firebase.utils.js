import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'



const config = {
  apiKey: "AIzaSyCNnNv9z-FyAekYiR8gm1c58__Gdn1LhQg",
  authDomain: "ecomerce-tuto.firebaseapp.com",
  databaseURL: "https://ecomerce-tuto.firebaseio.com",
  projectId: "ecomerce-tuto",
  storageBucket: "ecomerce-tuto.appspot.com",
  messagingSenderId: "602072020162",
  appId: "1:602072020162:web:7abb660a95a4ba85d2b75b",
  measurementId: "G-D66551MHGF"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithRedirect(provider)
export default firebase;
export const createUserProfileDocument = async(userAuth,additionalData) => {
 if(!userAuth) return;
 const userRef = firestore.doc(`users/${userAuth.uid}`)
 const snapshot = await userRef.get();
 if(!snapshot.exists){
   const {displayName, email} = userAuth;
   const createdAt = new Date();
   try{
     await userRef.set({
       displayName,
       email,
       createdAt,
       ...additionalData
     })

   }catch(error){
    console.log('error creating user',error.message)
   }
 }
 return userRef;
}