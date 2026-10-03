import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { loginbg_URl, user_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const dispatch = useDispatch();
  const [errMessage, seterrMessage] = useState();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    //Validate the Form Data
    const message = checkValidateData(
      email.current.value,
      password.current.value,
    );
    seterrMessage(message);
    if (message) return;
    //sign in Sign up logic
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: user_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
            })
            .catch((error) => {
              seterrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={loginbg_URl} alt="Bg" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-10 bg-black absolute w-3/12 mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75"
      >
        <h1 className="font-bold text-2xl py-4 px-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-600 "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-3 w-full bg-gray-600 "
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full bg-gray-600"
        />
        <p className="text-red-500 font-semibold text-lg py-2">{errMessage}</p>
        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg "
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="text-gray-300 font-sans cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
