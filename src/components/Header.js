import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeUser, addUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { logo_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="px-8 py-2  bg-gradient-to-b from-black flex justify-between w-full fixed top-0 left-0 z-50">
      <img className="w-24 ml-6" src={logo_URL} alt="logo" />
      {user && (
        <div className="flex ">
          {showGptSearch && (
            <select
              className="px-3 py-2 mr-3 rounded-md bg-black/50 border border-gray-600 text-gray-300 text-sm outline-none cursor-pointer hover:border-gray-400 hover:text-white transition-all duration-300"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.identifier}
                  value={lang.identifier}
                  className="bg-gray-900 text-white"
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-5 py-2 mr-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium shadow-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2 "
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "HomePage" : "✨ GPT Search"}
          </button>
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
