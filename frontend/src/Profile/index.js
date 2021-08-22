import axios from "axios";
import React, { useEffect, useState } from "react";
import "./profile.css";

const Profile = () => {
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const data = localStorage.getItem('user');
    const loggedUser = JSON.parse(data);
    // console.log("loggedUser.data  ", loggedUser);
    useEffect(() => {
        axios.get("/users").then(response => {
            var tempUsers = response.data;
            if (loggedUser.role === "EMPLOYEE") {
                tempUsers = tempUsers.filter(function (item) {
                    if (item.role !== "ADMIN")
                        return item;
                });
            }
            // console.log("response.data  ", response.data);
            setUsers(tempUsers);
            setLoading(false);
        }).catch(erro => {
            console.error("error in fetching user  ", erro);
            setLoading(false);
        })
    })

    if (isLoading) {
        return <div className="appStyle">Loading...</div>
    }
    return (
        <div>
            <div className="appStyle">
                <div className="formStyle">
                    <div className="header">Profile</div>
                    <div>
                        <table>
                            <tr className="labelStyle">
                                <td>Name: </td>
                                <td className="rightAlign">{loggedUser.username}</td>
                            </tr>
                            <tr className="labelStyle">
                                <td>Email: </td>
                                <td className="rightAlign">{loggedUser.email}</td>
                            </tr>
                            <tr className="labelStyle">
                                <td>Role: </td>
                                <td className="rightAlign">{loggedUser.role}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div><br /><hr />
            <div>
                <div className="formStyle">
                    <div className="header">User Details</div>
                    <table className="table-class">
                        <thead>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </thead>
                        <tbody>
                            {
                                users.map(function (item) {
                                    return <tr>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Profile;