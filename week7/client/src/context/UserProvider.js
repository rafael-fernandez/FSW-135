import React, { useState } from 'react';
import axios from 'axios';
export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

function UserProvider(props){

    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '',
        issues: [],
        comment: [],
        errMsg: ''
    };

    const [userState, setUserState] = useState(initState);

    function handleAuthErr(errMsg){
        setUserState((prevState) => ({
            ...prevState,
            errMsg
        }))
    };


    function resetAuthErr(){
        setUserState((prevState) => ({
            ...prevState,
            errMsg: ''
        }))
    };


    // Sign up
    function signup(credentials) {
        axios.post('http://localhost:4400/auth/signup', credentials)
            .then((res) => {
                const { user, token } = res.data;
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState((prevUserState) => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch((err) => handleAuthErr(err.response.data.errMsg))
    };

    // Login
    function login(credentials) {
        axios.post('http://localhost:4400/auth/login', credentials)
            .then((res) => {
                const { user, token } = res.data;
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getUserIssues();
                setUserState((prevUserState) => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch((err) => handleAuthErr(err.response.data.errMsg))
    };


    // Logout /clear local
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({ user: {}, token: '', issues: [] })
    };

    // Get all 
    function getUserIssues() {
        userAxios.get('http://localhost:4400/api/issues')
            .then((res) => {
                setUserState((prevState) => ({
                    ...prevState,
                    issues: res.data
                })) 
            })
    };

    // Add new issues
    function addIssue(newIssue){
        userAxios.post('http://localhost:4400/api/issues', newIssue)
            .then((res) => {
                setUserState((prevState) => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch((err) => console.dir(err.response.data.errMsg))
    };

    // Delete issues  (user)
    function deleteIssue(id) {
        userAxios.delete(`http://localhost:4400/api/issues/${id}`)
            .then((res) => {
                setUserState(prevState => 
                    prevState.filter(item => item._id !== id))
            })
            .catch((err) => console.dir(err.response.data.errMsg))
    };

    // Create (post)
    function createComment(newComment){
        userAxios.post('http://localhost:4400/api/comments', newComment)
            .then((res) => {
                setUserState((prevState) => ({
                    ...prevState,
                    comment: [...prevState.comment, res.data]
                }))
            })
            .catch((err) => console.dir(err.response.data.errMsg))
    };

    // Like 
    function likeComment(id){
        userAxios.put(`http://localhost:4400/api/issues/like/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.dir(err.response.data.errMsg))
    };

    // Dislike 
    function dislikeComment(id){
        userAxios.put(`http://localhost:4400/api/issues/dislike/${id}`)
            .then((res) => console.log(res))
            .catch((err) => console.dir(err.resonse.data.errMsg))
    };





    return(
        <UserContext.Provider value = { {...userState, signup, login, logout, addIssue, resetAuthErr, deleteIssue, likeComment, dislikeComment, createComment} }>
            { props.children }
        </UserContext.Provider>
    )
}

export default UserProvider;