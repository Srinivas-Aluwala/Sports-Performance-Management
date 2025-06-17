import { NavLink, useNavigate } from "react-router-dom";
import { pages } from "../routes/pages";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Label } from "semantic-ui-react";
import { getRoute } from "../util/util";
import { login } from "../store/store";

const Header = () => {
  const isUserloggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  const [userProfile, setUserProfile] = useState('');

  console.log(userProfile);

  const navigate = useNavigate();

  const dispatch = useDispatch()
  const navReff = useRef({ navigate });

  const onLogoClickHandler = () => {
    navReff.current.navigate(pages.root.children.home.path);

  };


  useEffect(() => {

    if (isUserloggedIn) {

      const profileRoute = getRoute(loggedInUser);
      setUserProfile(profileRoute);

    } else {
      setUserProfile('');
      // const loginUser = localStorage.getItem("loggedInUser");
      // if (loginUser) {
      //   dispatch(login({ roleId: Number(loginUser) }))
      // }
    }
  }, [isUserloggedIn]);


  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen mx-auto px-20  py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div
          className="text-2xl font-bold text-black hover:cursor-pointer"
          onClick={onLogoClickHandler}
        >
          Athletics
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-12 text-md font-semibold text-black">
          <NavLink
            to={pages.root.children.news.path}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-black pb-1"
                : "hover:text-gray-600 transition"
            }
          >
            News
          </NavLink>
          <NavLink
            to={pages.root.children.events.path}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-black pb-1"
                : "hover:text-gray-600 transition"
            }
          >
            Events
          </NavLink>
          <NavLink
            to={pages.root.children.results.path}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-black pb-1"
                : "hover:text-gray-600 transition"
            }
          >
            Results
          </NavLink>
          <NavLink
            to={pages.root.children.coaches.path}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-black pb-1"
                : "hover:text-gray-600 transition"
            }
          >
            Coaches
          </NavLink>
          <NavLink
            to={pages.root.children.athletes.path}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-black pb-1"
                : "hover:text-gray-600 transition"
            }
          >
            Athletes
          </NavLink>

          {
            isUserloggedIn
              ? (<>
                <NavLink
                  to={userProfile}
                  className="flex items-center justify-center gap-1 hover:text-gray-600 transition"
                >
                  <Icon name="user" className="w-4 h-4" />
                  Profile
                </NavLink>
                <NavLink
                  to={pages.root.children.logout.path}
                  className="flex items-center justify-center gap-1 hover:text-gray-600 transition"

                >
                  <Icon name="sign-out" className="w-4 h-4" />
                  <p>Logout</p>
                </NavLink>
              </>)
              : (<>
                <NavLink
                  to={pages.root.children.login.path}
                  className="flex items-center justify-center hover:text-gray-600 transition"
                >
                  <Icon name="sign-in" />
                  Login
                </NavLink>
                <NavLink
                  to={pages.root.children.signup.path}
                  className="flex items-center gap-1 hover:text-gray-600 transition"

                >
                  Sign Up
                </NavLink>
              </>)
          }

        </nav>
      </div>
    </header >
  );
};

export default Header;
