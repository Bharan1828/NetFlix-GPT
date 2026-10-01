import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute w-screen px-8 py-2  bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-40"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAdEhm1UzVexHjKqFOP9W6E2UVtkWFvL-vdxIEbTU81rsqNuPmDDy_dQvmQ85ath49JBruVV4aGQA3gY2Dl5SiqFf-AEwPAZBTNkW8FMxGXpDN2mHrf8KlRRiddj1P422ZW1eZkZNWLTd.svg"
        alt="logo"
      />
      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12 " alt="usericon" src={user?.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white mt-3">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
