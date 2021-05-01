//firebase.js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEKHRncL5tlEgRHYNG78F5691Ad_izF6k",
  authDomain: "myfirstcalendar-96d3c.firebaseapp.com",
  projectId: "myfirstcalendar-96d3c",
  storageBucket: "myfirstcalendar-96d3c.appspot.com",
  messagingSenderId: "85216262106",
  appId: "1:85216262106:web:8ab919eb94001d095cb2e3",
  measurementId: "G-BK47LY38D3",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
