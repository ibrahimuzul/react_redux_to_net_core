import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const UPDATE_POST = 'update_post';
export const DELETE_POST = 'delete_post';

//const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const ROOT_URL = 'https://localhost:44306/api';
const API_KEY = '?key=ibr123';

export function fetchPosts() {
   // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
   const request = axios.get(`${ROOT_URL}/blog`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/blog`, values)
    .then(()=> callback());

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function updatePost(values, callback) {
    const request = axios.put(`${ROOT_URL}/blog`, values)
    .then(()=> callback());

    return {
        type: UPDATE_POST,
        payload: request
    };
}

export function fetchPost(id){
    const request = axios.get(`${ROOT_URL}/blog/${id}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export function deletePost(id,callback){
    const request = axios.delete(`${ROOT_URL}/blog/${id}`)
    .then(()=> callback());

    return {
        type: DELETE_POST,
        payload: id
    };
}