import axios from "axios";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./todo.css";
import TodoCards from './TodoCards';
import Update from './Update';

let id = sessionStorage.getItem("id");
let toUpdateArray = [];
const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);
    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };
    
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async () => {
        if (!Inputs.title || !Inputs.body) {
            toast.error("Title or Body Can't Be Empty");
        } else {
            if (id) {
                await axios.post("http://localhost:1000/api/v2/addTask", { title: Inputs.title, body: Inputs.body, id: id })
                    .then((response) => {
                        console.log(response);
                        // Update the Array with the newly added task
                        setArray((prevArray) => [...prevArray, response.data.list]);
                        toast.success("Your Task Is Added");
                    })
                    .catch((error) => {
                        console.error("Error adding task:", error);
                        toast.error("Failed to add task.");
                    });
                setInputs({ title: "", body: "" });
            } else {
                setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.error("Your Task Is Not Saved! Please Signup!");
            }
        }
    };

    const del = async (Cardid) => {
        if (id) {
            await axios.delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`, { data: { id: id } })
                .then(() => { toast.success("Your Task Is Deleted"); });
        }
        else {
            toast.error("Please Signup First");
        }
    };

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    };

    const update = (value) =>{
        toUpdateArray=(Array[value]);
    }
    useEffect(() => {
        if (id) {
            const fetch = async () => {
                await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`)
                    .then((response) => {
                        setArray(response.data.list);
                    });
            }; 
            fetch();
        }
        } , [submit]);
 
    return (
        <>
            <div className="todo">
                <ToastContainer />
                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className="d-flex flex-column todo-inputs-div w-100 p-3">
                        <input
                            type="text"
                            placeholder="TITLE"
                            className="my-2 p-2 todo-inputs"
                            onClick={show}
                            name="title"
                            value={Inputs.title}
                            onChange={change}
                        />
                        <textarea
                            id="textarea"
                            placeholder="BODY"
                            name="body"
                            value={Inputs.body}
                            className="p-4 todo-inputs"
                            onChange={change}
                        />
                        <button className="home-btn px-2 py-1" onClick={submit}>Add</button>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {Array && Array.map((item, index) => (
                            <div className="col-lg-3 col-11 bg-blue mx-lg-5 mx-3 my-2" key={index}>
                                <TodoCards 
                                title={item.title} 
                                body={item.body} 
                                id={item._id} 
                                delid={del}
                                display = {dis}
                                updateId={index} 
                                toBeUpdate={update}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="todo-update" id="todo-update">
                <div className="container update">
                    <Update display = {dis} update={toUpdateArray} />
                </div>
            </div>
        </>
    );
};

export default Todo;
