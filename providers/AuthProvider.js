import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { getRealmApp } from "../getRealmApp";

// Access the Realm App.
const app = getRealmApp();

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef(null);
  const [projectData, setProjectData] = useState([]);
  const [userData, setUserData] = useState({});



  useEffect(() => {
    if (!user) {
      return;
    }




    // The current user always has their own project, so we don't need
    // to wait for the user object to load before displaying that project.
   // const myProject = { name: "My Project", partition: `project=${user.id}` };
   // setProjectData([myProject]);

    const config = {
      sync: {
        user,
        partitionValue: `user=${user.id}`,
      },
    };
  
    // Open a realm with the logged in user's partition value in order
    // to get the projects that the logged in user is a member of
    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
      const users = userRealm.objects("User");
      let sortedusers= users.sorted("name");
      setUserData([...sortedusers]);

      users.addListener(() => {
        setUserData([...sortedusers]);
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.
        if (users.length > 0) {
         
       
          const { memberOf,name, address, age, full_name, gender,  hotel_id} = users[0];
          setUserData({ name, address, age, full_name, gender,  hotel_id});
          setProjectData([...memberOf]);
        }
      });
    });

    return () => {
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;
        setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
        setUserData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
      }
    };
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
  };
  const ups = async () => {
    Alert.alert('Success', 'Forward your Email to the admin to activate your Account')
  };
  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser(email, password);
  };
  const UpdateUser = (item,full_name,address,gender,age ) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.

    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      item.address = address==""? item.address:address ;
      item.age = age==""? item.age:age ;
      item.full_name = full_name==""? item.full_name:full_name ;
      item.gender = gender==""? item.gender:gender ;
    });
  };
  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };


  const EditUser = async (userData,full_name,address,gender,age,hotel_id,hot_name,hot_mobile,hotel_tel,hotel_email,hot_address,hot_website) => {
  
 
  

    try {
     
      await user.functions.EditAccountStaff(userData,full_name,address,gender,age,hotel_id,hot_name,hot_mobile,hotel_tel,hotel_email,hot_address,hot_website);
      setUserData({userData, address, age, full_name, gender,  hotel_id });
    } catch (err) {
     
      Alert.alert("An error occurred while Updating", err.message);
      
    }
    
  };
  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        ups,
        UpdateUser,
        EditUser,
        user,
        projectData, // list of projects the user is a memberOf
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
