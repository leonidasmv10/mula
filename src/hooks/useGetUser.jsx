import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromToken } from "../services/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUser = () => {
    setLoading(true);
    const userFromToken = getUserFromToken();
    setUser(userFromToken);
    console.log(user);
    setLoading(false);
    return userFromToken;
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setUser(getUserFromToken());
    // console.log(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        getUser,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useGetUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useGetUser must be used within a UserProvider");
  }
  return context;
};
