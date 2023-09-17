import { atom } from "recoil";
//import axios from 'axios'

export const isTabletSize = atom({//size tablet
    key: "isTable",
    default: "pc",//ww > tw
})

export const isHamburgerClose = atom({
    key: "isHamburgerClose",
    default : false
})
export const isHamburgerOpen = atom({
    key: "isHamburgerOpen",
    default : false
})

export const isProfileOpen = atom({
    key: "isProfileOpen",
    default: false
})

export const isLoginUser = atom({// login 여부
    key: "isLoginUser",
    default: ""
})