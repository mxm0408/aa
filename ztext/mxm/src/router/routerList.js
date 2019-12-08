
import Login from "../views/Login";
import Sign from "../views/Sign";
import Layout from "../views/Layout";
import Home from "../views/layout/Home";
import My from "../views/layout/My";


const routerList = [
    {
        path: "/layout",
        component: Layout,
        children: [
            {
                path: "/layout/home",
                component: Home
            },
            {
                path: "/layout/my",
                component: My
            },
            {
                redirect: "/layout/home"
            }
        ]
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/sign",
        component: Sign
    },
    {
        redirect: "/login"
    }
]

export default routerList