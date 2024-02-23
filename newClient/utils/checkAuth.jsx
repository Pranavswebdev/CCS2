import React, { useEffect, useState } from "react";

const CheckAuth = (Component) => {

  const CheckAuthWrapper = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
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
