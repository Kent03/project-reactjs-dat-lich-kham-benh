import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            isShowPassword:false,
            errMessage:''
        }
    }


handleOnchangeUsername=(event)=>{
    this.setState({
        username:event.target.value
    })
    console.log(event.target.value)
}
handleOnchangePassword=(event)=>{
    this.setState({
        password:event.target.value
    })
    console.log(event.target.value)
}

// ẩn hiện nút eye password
handleShowHidePassword=()=>{
    this.setState({
        isShowPassword:! this.state.isShowPassword
    })
}
//in ra ten +pass kiểu array (vip)
handleLogin=async()=>{
    this.setState({
        errMessage:''
    })
//     console.log('username:', this.state.username, 'password:',this.state.password);
// console.log('all state'+this.state);
try{
let data= await handleLoginApi(this.state.username, this.state.password);
console.log('admin', data)
}catch(error){
    if(error.response){
        if(error.response.data){
            this.setState({
        errMessage:error.response.data.message
    })
        }
    }
    console.log('admin ', error.response)
    
}
}

    render() {
        //JSX
        return (
            <div className="login-background">
                <div className="login-container">
                 <div className="login-content row">
                     <div className='col-12 text-login'>Login</div>
                     <div className='col-12 form-group login-input'>
                         <label>Username:</label>
                         <input type='text' className='form-control'placeholder="Enter your username" 
                         value={this.state.username}
                         onChange={(event)=> this.handleOnchangeUsername(event)}
                         ></input>
                     </div>
                     <div className='col-12 form-group login-input'>
                         <div className="custom-input-password">
                         <label>Password:</label>
                         <input type={this.state.isShowPassword ? 'text': 'password'} className='form-control' placeholder="Enter your password"
                         onChange={(event)=> this.handleOnchangePassword(event)} ></input>
                         <span
                         onClick={()=>{this.handleShowHidePassword()}}
                         >
                             <i class={this.state.isShowPassword ? 'far fa-eye': 'fas fa-eye-slash'}></i>
                         </span>
                         
                         </div>
                     </div>
                     <div className='col-12' style={{color:'red'}}>
                         {this.state.errMessage}
                     </div>
                     <div className="col-12">
                        <button className="btn-login" onClick={()=>{this.handleLogin()}}>Login</button>     
                        </div>
                        <div className='col-12'>
                            <span className="forget-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                        <i className="fab fa-google-plus-g google"></i>
                        <i className="fab fa-facebook-f facebook"></i>
                        </div>
                 </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
