
import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';

const login = (email, password) => {
    return axios.post("https://trip-planner-mm.herokuapp.com/users/login", { email, password })
        .then(response => {
            //eğer kullanıcı bulunursa (user.data.status = true)
            if (response.data.jwtToken) {
                const { jwtToken } = response.data;
                localStorage.setItem("jwtToken", jwtToken);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setAuthorizationToken(jwtToken);
            }
            return response.data.user;
        })
        .catch(err => console.log(err));
}



const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setAuthorizationToken(false);
    window.location = "/account/login"
}

export default { login, logout };