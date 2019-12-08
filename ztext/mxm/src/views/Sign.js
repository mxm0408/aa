import React, { Component } from 'react';
import axios from "axios"

class Login extends Component {
    state = {
        user: "",
        pwd: ""
    }
    componentDidMount() {
        document.getElementsByTagName("input")[0].focus()
    }
    MyLogin = () => {
        let { user, pwd } = this.state
        if (user && pwd) {
            axios("/api/sign", { params: { name: user, pwd } }).then(res => {
                if (res.data.code === 1) {
                    localStorage.user = JSON.stringify(user)
                    localStorage.pwd = JSON.stringify(pwd)
                    this.props.history.push("/layout/home")
                } else {
                    alert(res.data.msg);
                    this.setState({
                        user: "", pwd: ""
                    })
                }
            })
        } else {
            alert("请输入完整")
        }
    }
    render() {
        let { user, pwd } = this.state
        return (
            <div>
                <p><input value={user} onChange={(e) => { this.setState({ user: e.target.value }) }}></input></p>
                <p><input type="password" value={pwd} onChange={(e) => { this.setState({ pwd: e.target.value }) }}></input></p>
                <button onClick={() => { this.MyLogin() }}>注册并登录</button>
            </div>
        );
    }
}

export default Login;