import axios from "../axios/axios";

const userApi = () => {
  const signup = ( name:String, password:String, email:String ) => {
    console.log({ name, password, email });

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("/signup", { name, password, email });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  const login = ({ email, password }: any) => {
    return new Promise(async (resolve, reject) => {

      try {
        
        const response = await axios.post("/login", { password, email });

        resolve(response);
      } catch (error) {
        console.log(error);

        reject(error);
      }
    });
  };

  return { signup, login };
};

export default userApi;
