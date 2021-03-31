import React, {Component} from "react";
import styles from "./index.module.css";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {},
        };
    }

    render() {
        return (
            <div className={styles.authContainer}>
                <div className={styles.logoSide}>
                </div>
                <div className={styles.loginCard}>
                    <form>
                        <div className={styles.formRow}>
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                placeholder="Email Adresinizi Giriniz"
                                type="email"
                                value={this.state.email}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <label htmlFor="password">Parola</label>
                            <input
                                name="password"
                                placeholder="Parolanızı Giriniz"
                                type="password"
                                //value={this.state.password}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.details}>
                                <div className="flex justify-center items-center">
                                    <input name="rememberMe" className="mr-2"  type="checkbox"/>
                                    <span className="text-sm"> Beni Hatırla</span>
                                </div>
                                <div className="text-sm hover:text-red-400 hover:underline cursor-pointer">Parolamı Unuttum</div>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <input type="submit" className={styles.loginButton} value="Giriş Yap"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;