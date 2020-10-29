import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation,  } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);
function Login() {

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })


  const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
 
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  const handleFbSignIn = () =>{
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log('fb', user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res =>{
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
        error: '',
        success: false
      }
      setUser(signedOutUser)
    })
    .catch( err => {

    })
  }

  const handleBlur =(e) => {
    let isFildValid = true;
    if(e.target.name === 'email'){
      isFildValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHaseNumber = /\d{1}/.test(e.target.value);
      isFildValid = isPasswordValid && passwordHaseNumber;

    }
    if(isFildValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) =>{
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then( res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch( error => {
        // Handle Errors here.
       const newUserInfo = {...user};
       newUserInfo.error = error.message;
       newUserInfo.success = false;
       setUser(newUserInfo);
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then( res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        console.log('sign in user info', res.user);
      })
      .catch(function(error) {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }


    e.preventDefault();
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
     console.log(error);
    });
  }

  return (
    <div style={{textAlign: 'center'}} >
     {
       user.isSignedIn ? <button onClick={handleBlur}>Sign out</button> : <button onClick={handleSignIn}>Sign In</button> 
     }
     <br/>
     <button onClick={handleFbSignIn}>sign In using facebook</button>
     {
       user.isSignedIn && <div>
         <p>welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
         </div>
     }
     <h1>Name: {user.name}</h1>
     <h1>Our own Authentication</h1>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
          <label htmlFor="newUser">New User Sign up</label>
          <form onSubmit={handleSubmit}>
            {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your name"/>}
            <br/>
            <input type="text" name="email" onBlur={handleBlur} placeholder="Your email address" required/>
            <br/>
            <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/>
            <br/>
            <input type="submit" value={newUser ? 'sign up' : 'sign in'}/>
          </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success && <p style={{color: 'green'}}>User { newUser ? 'Created' : 'Loged In'} Successfully</p>
        }
    </div>
  );
}

export default Login;
