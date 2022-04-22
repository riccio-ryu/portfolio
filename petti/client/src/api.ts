import axios from 'axios';

//const BASE_USER = `api/users`;

const API_KEY = "4de9f22b35bd87922db9fa7e7348fb77";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id: number;
    backdrop_path: string;
    title: string;
    poster_path: string;
    overview: string;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies (){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json())
}

//////////////////
/* interface */

export interface ITableSize {
    winSize: boolean;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    nick: string;
    password: string;
    password2: string;
    name?: string;
    image?: string;
    introduce?: string;
}


/* func */
    //login
export const actLogin = async (loginData:ILogin) => {
    return axios.post(`api/users/login`, loginData)
}
    //logout
export const actLogout = async () => {
    return axios.get(`api/users/logout`)
}
    //register
export const actRegister = async (registerData:IRegister) => {
return axios.post(`api/users/register`, registerData)
}
    //auth
export const actAuth = async () => {
    return axios.get('/api/users/auth')
}