import React from "react";
import {Switch,Route,Redirect} from "react-router-dom"

const RouteView =(props)=>{
    let {routes}=props;
    return (
        <Switch>
            {
                routes.map((item,index)=>item.redirect?<Redirect key={index} to={item.redirect}></Redirect>:
                <Route key={index} path={item.path} render={(props)=>{
                    return <item.component {...props} routes={item.children} />
                }}></Route>
                )
            }
        </Switch>
    )
}

export default RouteView 