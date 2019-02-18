import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from './LoginView.scss'
import publictitle from 'assets/publictitle.png'
import inputicon_1 from 'assets/inputicon_1.png'
import inputicon_2 from 'assets/inputicon_2.png'
import inputicon_3 from 'assets/inputicon_3.png'
import buttonicon from 'assets/buttonicon.png'

import {api} from 'common/app'
  
export class LoginView extends Component {
constructor(props) {
  super(props);
  this.state = {
      name:'',
      region:'',
      code:'',
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.onInputChange = this.onInputChange.bind(this);
     this.Login = this.Login.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
Login(){
    if (this.state.name&&this.state.code) {
        api.Login(this.state.name,this.state.region,this.state.code).then(res=>{
            console.log(res);
            if (res.code == 200) {
                this.context.HandleRoute(1);
            }else{
                alert(res.msg)
            }
        },err=>{
            console.log(err);
            
        });
    }else{
        alert('请输入完整的信息。')
    }
    
}
onInputChange(type,e){
    this.state[type] = e.target.value;
    this.setState(this.state);
}
render() {
  return (
    <div className={[style.ViewBox,'childcenter childcolumn'].join(' ')}>
        <div className={style.TitleBox}>
            <img src={publictitle} alt=""/>
        </div>
        <div className={[style.FormBox,'childcenter childcolumn'].join(' ')}>
            <div className={[style.FormInput,'childcenter'].join(' ')}>
                <div className={[style.InputIcon,'childcenter'].join(' ')}>
                    <img src={inputicon_1} alt=""/>
                </div>
                <div className={style.InputBox}>
                    <input type="text" placeholder='请输入您的姓名' value={this.state.name} onChange={this.onInputChange.bind(this,'name')}/>
                </div>
            </div>
            <div className={[style.FormInput,'childcenter'].join(' ')}>
                <div className={[style.InputIcon,'childcenter'].join(' ')}>
                    <img src={inputicon_2} alt=""/>
                </div>
                <div className={style.InputBox}>
                    <input type="text" placeholder='请输入您的大区' value={this.state.region} onChange={this.onInputChange.bind(this,'region')}/>
                </div>
            </div>
            <div className={[style.FormInput,'childcenter'].join(' ')}>
                <div className={[style.InputIcon,'childcenter'].join(' ')}>
                    <img src={inputicon_3} alt=""/>
                </div>
                <div className={style.InputBox}>
                    <input type="text" placeholder='请输入您的工号' value={this.state.code} onChange={this.onInputChange.bind(this,'code')}/>
                </div>
            </div>
            <div className={[style.LoginButton,'childcenter'].join(' ')}>
                <div className={[style.ButtonIconBox,'childcenter'].join(' ')}>
                    <img src={buttonicon} className={style.ButtonIcon} alt=""/>
                </div>
                <div className={[style.ButtonValue,'childcenter'].join(' ')} onClick={this.Login}>
                    登  录
                </div>
            </div>
        </div>
    </div>
   )
   }
}

LoginView.contextTypes = {
    HandleRoute: PropTypes.func
  };
export default LoginView