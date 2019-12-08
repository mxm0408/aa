import React, { Component } from 'react';
import {  NavLink } from "react-router-dom";
import RouterView from "../router/RouterView";

class Layout extends Component {
    render() {
        let {routes}=this.props
        return (
            <div>
                <RouterView routes={routes}></RouterView>
                <div id="nav">
                    <NavLink to="/layout/home">首页</NavLink>
                    <NavLink to="/layout/my">我的</NavLink>
                </div>
            </div>
        );
    }
}

export default Layout;