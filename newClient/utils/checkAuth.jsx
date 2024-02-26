import React, { useEffect, useLayoutEffect, useState } from "react";
import useStore from "@/store/projectStrore";

const CheckAuth = (Component) => {
  const CheckAuthWrapper = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const store = useStore();
    let storeUser = store.currentuser;

    useLayoutEffect(() => {
      const storedUser = localStorage.getItem("user");

      console.log({ storedUser });

      if (storedUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);

    if (isLoggedIn) {
      return <Component {...props} />;
    } else {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl font-bold">Not Authorized</div>
        </div>
      );
    }
  };

  return CheckAuthWrapper;
};

export default CheckAuth;
