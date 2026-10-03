import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeUser, addUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { logo_URL } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // it will be unsubscribed when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2  bg-gradient-to-b from-black z-40 flex justify-between ">
      <img className="w-24 ml-6" src={logo_URL} alt="logo" />
      {user && (
        <div className="flex ">
          <img
            className="w-8 h-8 rounded-sm"
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white mt-3 text-xs"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
