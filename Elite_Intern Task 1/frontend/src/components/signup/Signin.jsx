import axios from "axios";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store";
import { HeadingComp } from './HeadingComp';
import "./signup.css";

const Signin = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [Inputs, setInputs] = useState({ email: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:1000/api/v1/signin", Inputs)
        .then((response) => {
            if (response.data && response.data.others && response.data.others._id) {
                sessionStorage.setItem("id", response.data.others._id);
                dispatch(authActions.login());
                history("/todo");
            } else {
                console.error("Invalid response structure:", response.data);
            }
        })
        .catch((err) => {
            console.error("Error during API call", err);
        });
    };

    return (
        <div className="signin">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 d-flex justify-content-center align-items-center column">
                        <div className="d-flex flex-column w-100 p-5">
                            <input
                                className="p-2 my-3 input-signup"
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                value={Inputs.email}
                                onChange={change}
                            />
                            <input
                                className="p-2 my-3 input-signup"
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                value={Inputs.password}
                                onChange={change}
                            />
                            <div>
                            <button className="btn-signup p-2" onClick={submit}>SignIn</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-left d-flex justify-content-center align-items-center column">
                        <HeadingComp first="Sign" second="In" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
