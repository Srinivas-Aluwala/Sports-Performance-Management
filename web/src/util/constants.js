import { pages } from "../routes/pages"
import { roleIds } from "./roles"


export const getRoute = (logedInUser) => {
    switch(logedInUser){
        case roleIds.ADMIN : return pages.root.children.admin.path
        case roleIds.COACHE : return pages.root.children.coache.path
        case roleIds.ATHLETE : return pages.root.children.athlete.path
        default : return "/"
    }
}


export const baseUrl = 'http://localhost:9000';

export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const TOKEN_INVALID = "TOKEN_INVALID";