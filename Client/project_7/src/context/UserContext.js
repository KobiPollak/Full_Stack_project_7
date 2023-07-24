import { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

// export function useUser() {
//   return useContext(UserContext);
// }
const getUser = () => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  if (user) {
    return user;
  } else {
    return null;
  }
};
function UserContextProvider({ children }) {
  const [user, setUser] = useState(getUser());

  // useEffect(() => {
  //   let u = getUser();
  //   if (u) {
  //     setUser(u);
  //   } else {
  //     localStorage.setItem(
  //       'user',
  //       JSON.stringify({
  //         user: null,
  //         admin: null,
  //       })
  //     );
  //   }
  //   console.log(user);
  // }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
