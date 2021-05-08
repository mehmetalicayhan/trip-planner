import React, {Component} from "react";
import styles from "../login/index.module.css";
import axios from "axios";
import TravelImage from "../login/travel.jpeg";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            userName:"",
            password: "",
            firstName:"",
            lastName:"",
            errors: {},
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const registerRequest = {
            email: this.state.email,
            password: this.state.password,
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        };
        await axios
            .post(
                "https://trip-planner-mm.herokuapp.com/users/sign-up",
                registerRequest
            )
            .then(() => {
                this.props.history.push("login/");
            })
            .catch((errors) => {
                console.log(errors);
            });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className={styles.authContainer}>
                <div className={styles.logoSide}>
                    <img src={TravelImage} className="h-full w-full" alt=""/>

                </div>
                <div className={styles.loginCard}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.formRow}>
                            <label htmlFor="firstName">Adınız</label>
                            <input
                                name="firstName"
                                placeholder="Adınızı Giriniz."
                                type="text"
                                className={styles.authInput}
                                value={this.state.firstName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <label htmlFor="lastName">Soyadınız</label>
                            <input
                                name="lastName"
                                placeholder="Soyadınızı giriniz"
                                type="text"
                                className={styles.authInput}
                                value={this.state.lastName}
                                onChange={this.handleChange}

                            />
                        </div>
                        <div className={styles.formRow}>
                            <label htmlFor="userName">Kullanıcı Adı</label>
                            <input
                                name="userName"
                                placeholder="Kullanıcı adınızı giriniz"
                                type="text"
                                className={styles.authInput}
                                value={this.state.userName}
                                onChange={this.handleChange}

                            />
                        </div>
                        <div className={styles.formRow}>
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                placeholder="Email Adresinizi Giriniz"
                                type="email"
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
                            <input type="submit" className={styles.loginButton} value="Kaydol"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;