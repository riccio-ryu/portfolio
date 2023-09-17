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
    winSize: string;
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

export interface IAuth {
    _id: string;
    isAdmin: string;
    isAuth : string;
    email: string;
    name?: string;
    nick : string;
    introduce?: string;
    role: string;
    image?: string;
}

export interface IGallery{
    data: {
        success: boolean;
        gallerys:{
            _id: string;
            writer: IAuth[];
            title: string;
            description: string;
            filePath: string;
            fileType: string;
            tag: string;
            views: number;
            duration: string;
            thumbnail: string;
            createdAt: string;
            updatedAt: string;
        }
    }
}

export interface IGalleryUpload {
    writer: string | undefined;
    title: string;
    description: string;
    tag: string;
    filePath: string;
    fileType: string;
    duration: string;
    thumbnail: string;
}

export interface IGalleryId {
    galleryId: string;
}

export interface IGalleryComment {
    content: string;
    writer: string;
    postId: string;
    responseTo? : string;
}

export interface IGalleryLikes {
    userId: string;
    postId?: string;
    commentId?: string;
}


// export interface 


/* func */
//const base_url = `http://3.87.90.33:4000`
    //login
export const actLogin = async (loginData:ILogin) => {
    return axios.post(`/api/users/login`, loginData)
}
    //logout
export const actLogout = async () => {
    return axios.get(`/api/users/logout`)
}
    //register
export const actRegister = async (registerData:IRegister) => {
    return axios.post(`/api/users/register`, registerData)
}
    //auth
export const actAuth = async () => {
    return axios.get('/api/users/auth')
}
    //fetch auth
export function fetchAuth() {
    return fetch('/api/users/auth').then((response) => response.json())
}


//Gallery

    //gallery get recent 
export const actGetGalleryRecent = async () => {
    return axios.get(`/api/home/getGalleryRecent`)
}
    //gallery get most Like
export const actGetGalleryPopular = async () => {
    return axios.get(`/api/home/getGalleryPopular`)
}
    //gallery get most view
export const actGetGalleryMostView = async () => {
    return axios.get(`/api/home/getGalleryMostView`)
}
    //gallery get
export const actGetGallery = async () => {
    return axios.get(`/api/gallery/getGallerys`)
}
    //gallery detail
export const actGalleryDetail = async (galleryId:IGalleryId) => {
    return axios.post(`/api/gallery/getGalleryDetail`, galleryId)
}
    //gallery comment save
export const actGalleryComment = async(commentData:IGalleryComment) => {
    return axios.post(`/api/galleryComment/saveGalleryComment`, commentData)
}
    // gallery comment receive
export const actGetGalleryComment = async(galleryId:IGalleryId) => {
    return axios.post(`/api/galleryComment/getGalleryComments`, galleryId)
}
    // gallery like receive
export const actGetGalleryLike = async(likeBody:IGalleryLikes) => {
    return axios.post(`/api/galleryLike/getLikes`, likeBody)
}
    // gallery dislike receive
export const actGetGalleryDislike = async(dislikeBody:IGalleryLikes) => {
    return axios.post(`/api/galleryLike/getDislikes`, dislikeBody)
}
    //gallery like up
export const actGalleryUplike = async(likeBody:IGalleryLikes) => {
    return axios.post(`/api/galleryLike/upLike`, likeBody)
}
    //gallery like un
export const actGalleryUnlike = async(likeBody:IGalleryLikes) => {
    return axios.post(`/api/galleryLike/unLike`, likeBody)
}
    //gallery dislike up
export const actGalleryUpdislike = async(dislikeBody:IGalleryLikes) => {
    return axios.post(`/api/galleryLike/upDislike`, dislikeBody)
}
    //gallery dislike un
export const actGalleryUndislike = async(dislikeBody:IGalleryLikes) => {
    return axios.post(`/api/galleryLike/unDislike`, dislikeBody)
}


// Goods
    
    //goods upload
export const actGoodsUpload = async (data:any) => {
    return axios.post(`/api/goods/upload`, data, {
        headers: { 'content-type': 'multipart/form-data' }
    })
}