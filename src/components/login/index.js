import React, {Component} from "react";

import {connect} from "react-redux";
import {login, logout} from "../../actions/authAction";
import TravelImage from "./travel.jpeg";
import styles from "./index.module.css";
import {Link} from "react-router-dom";

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
        const {dispatch} = this.props;
        const {email, password} = this.state;
        dispatch(login(email, password));
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {isAuthenticated, error, errorMessage} = this.props;
        if (isAuthenticated) {
            this.props.history.push(`/user/${JSON.parse(localStorage.getItem("user")).id}`);
        }
        return (
            <div className={styles.authContainer}>
                <div className={styles.logoSide}>
                    <img src={TravelImage} className="h-auto" alt=""/>
                </div>
                <div className={styles.loginCard}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.formRow}>
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                placeholder="Email Adresinizi Giriniz"
                                type="text"
                                className={styles.authInput}
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
                                className={styles.authInput}
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
                        <div className="flex flex-col mt-5">
                            <div className="text-sm">Üye değil
                                misin? <Link className="hover:text-red-400 hover:underline cursor-pointer" to="/account/register">Kaydol</Link>
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
    const {isAuthenticated, error, errorMessage, user} = state.auth;
    return {
        isAuthenticated,
        error,
        errorMessage,
        user
    }
}

export default connect(mapStateToProps)(Login);
