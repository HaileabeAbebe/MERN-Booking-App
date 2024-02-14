import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-950 py-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to="/">FindTheBestSpot.com</Link>
        </span>
        <span className="flex space-x-2 items-center">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 py-2 font-bold rounded hover:bg-blue-800 transition-colors duration-200 ease-in-out"
                to="/my-bookings">
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 py-2 font-bold rounded hover:bg-blue-800 transition-colors duration-200 ease-in-out"
                to="/my-hotels">
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white rounded items-center py-1 text-blue-700 px-3 font-bold hover:bg-gray-300 transition-colors duration-200 ease-in-out">
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
