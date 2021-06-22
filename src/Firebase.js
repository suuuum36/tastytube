import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7iFXzpZ0kOYRuqiHdsev8HjLltaO209o",
  authDomain: "tastytube-5d6d3.firebaseapp.com",
  projectId: "tastytube-5d6d3",
  storageBucket: "tastytube-5d6d3.appspot.com",
  messagingSenderId: "966362210591",
  appId: "1:966362210591:web:76873314e2651b8f25102a",
  measurementId: "G-XLQ9EJ4LP9",
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
  currentUser &&
    db
      .collection("users")
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
  const jjimLists = [];
  currentUser &&
    db
      .collection("users")
      .doc(currentUser && currentUser.uid)
      .collection("JjimLists")
      .get()
      .then((jjimList) => {
        jjimList.docs.map((doc) => {
          let list = doc.data();
          jjimLists.push({
            place_name: list.placeName,
            x: list.placeLocationX,
            y: list.placeLocationY,
          });
        });
      }).catch((error)=>{
        console.log("Error :", error)
      });
  return jjimLists;
};

//찜목록 삭제
const deleteJjim = (currentUser, docId) => {
  currentUser &&
    db
      .collection("users")
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
