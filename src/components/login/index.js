import React, {Component} from "react";

import {connect} from "react-redux";
import {login, logout} from "../../actions/authAction";

import styles from "./index.module.css";

class Login extends Component {
    componentDidMount() {
        //this.props.dispatch(logout());
    }

    state = {
        email: "",
        password: "",
        errors: {},
    };

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { email, password } = this.state;
        dispatch(login(email, password));
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { isAuthenticated, error, errorMessage } = this.props;
        if (isAuthenticated)
            this.props.history.push('/');

        return (
            <div className={styles.authContainer}>
                <div className={styles.logoSide}>
                </div>
                <div className={styles.loginCard}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.formRow}>
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                placeholder="Email Adresinizi Giriniz"
                                type="text"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <label htmlFor="password">Parola</label>
                            <input
                                name="password"
                                placeholder="Parolanızı Giriniz"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.details}>
                                <div className="flex justify-center items-center">
                                    <input name="rememberMe" className="mr-2" type="checkbox"/>
                                    <span className="text-sm"> Beni Hatırla</span>
                                </div>
                                <div className="text-sm hover:text-red-400 hover:underline cursor-pointer">Parolamı
                                    Unuttum
                                </div>
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

const mapStateToProps = state => {
    const { isAuthenticated, error, errorMessage, user } = state.auth;
    return {
        isAuthenticated,
        error,
        errorMessage,
        user
    }
}

export default connect(mapStateToProps)(Login);
