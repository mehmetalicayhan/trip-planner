
import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';

const login = (userName, password) => {
    return axios.post("https://trip-planner-mm.herokuapp.com/users/login", { userName, password })
        .then(response => {
            //eğer kullanıcı bulunursa (user.data.status = true)
            console.log(response);
            if (response.data.jwtToken) {
                const { jwtToken } = response.data;
                localStorage.setItem("jwtToken", jwtToken);
                setAuthorizationToken(jwtToken);
            }
            return response.data.user;
        })
        .catch(err => console.log(err));
}



const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
}

export default { login, logout };