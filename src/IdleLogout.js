// IdleLogout.js
import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/userActions";

const IdleLogout = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const idleTimeout = useRef(null);

  const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 mins
  // const INACTIVITY_LIMIT = 2 * 60 * 1000; // 2 mins

  const handleLogout = useCallback(() => {
    localStorage.removeItem("userInfo");
    dispatch(logout());
    window.location.href = "/login";
  }, [dispatch]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }

    idleTimeout.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_LIMIT);
  }, [handleLogout, INACTIVITY_LIMIT]);

  useEffect(() => {
    if (userInfo) {
      const events = ["click", "mousemove", "keypress", "scroll"];

      events.forEach((event) => window.addEventListener(event, resetIdleTimer));

      resetIdleTimer();

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, resetIdleTimer)
        );
        clearTimeout(idleTimeout.current);
      };
    }
  }, [userInfo, resetIdleTimer]);

  return null;
};

export default IdleLogout;
