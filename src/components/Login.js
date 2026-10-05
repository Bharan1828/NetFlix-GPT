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
    // Validate the Form Data
    const message = checkValidateData(
      email.current.value,
      password.current.value,
    );

    seterrMessage(message);

    if (message) return;

    // sign in Sign up logic
    if (!isSignInForm) {
      // sign up logic
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
        });
    } else {
      // sign in logic
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black/20 via-black/40 to-black/20">
      <Header />

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src={loginbg_URl}
          alt="Bg"
          className="w-full h-full object-cover"
        />

        {/* Black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Login / Signup Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[30%] p-6 sm:p-8 md:p-10 bg-black/75 text-white rounded-lg"
      >
        <h1 className="font-bold text-2xl sm:text-3xl py-4 px-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-600 rounded-md outline-none"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-3 w-full bg-gray-600 rounded-md outline-none"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full bg-gray-600 rounded-md outline-none"
        />

        <p className="text-red-500 font-semibold text-sm sm:text-base py-2">
          {errMessage}
        </p>

        <button
          className="p-4 my-4 bg-red-700 hover:bg-red-800 w-full rounded-lg font-semibold transition-colors"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="text-gray-300 font-sans cursor-pointer text-sm sm:text-base"
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