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