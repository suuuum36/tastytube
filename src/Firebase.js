import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

//새로 로그인시 유저 변경
auth.onAuthStateChanged((user) => {
  console.log(user);
});

//구글 로그인 팝업
const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      console.log("Login");
    })
    .catch((error) => {
      console.log("Error :", error);
    });
};

//찜 기능
const setJjim = (places, currentUser) => {
  currentUser&&db.collection("users")
    .doc(currentUser && currentUser.uid)
    .collection("JjimLists")
    .doc(places.place_name)
    .set({
      placeName: places.place_name,
      placeLocationX: places.x,
      placeLocationY: places.y,
    })
    .then(() => {
      console.log("Document successfully written");
    })
    .catch((error) => {
      console.log("Error :", error);
    });
};

//찜목록 불러오기
const getJjim = (currentUser) => {
  const jjimLists = []
  currentUser&&db.collection("users")
    .doc(currentUser && currentUser.uid)
    .collection("JjimLists")
    .get()
    .then((jjimList) => {
      jjimList.docs.map((doc)=>{
        let list = doc.data();
        jjimLists.push(list.placeName)
      })
    });
    return jjimLists
};

//찜목록 삭제
const deleteJjim = (currentUser, docId) => {
  currentUser&&db.collection("users")
    .doc(currentUser && currentUser.uid)
    .collection("JjimLists")
    .doc(docId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted");
    })
    .catch((error) => {
      console.log("Error :", error);
    });
};

export { firebase, auth, db, signInWithGoogle, setJjim, getJjim, deleteJjim };
