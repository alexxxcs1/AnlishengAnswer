import React, { Component } from 'react'
import style from './LoginView.scss'
import publictitle from 'assets/publictitle.png'
import inputicon_1 from 'assets/inputicon_1.png'
import inputicon_2 from 'assets/inputicon_2.png'
import inputicon_3 from 'assets/inputicon_3.png'
import buttonicon from 'assets/buttonicon.png'
  
export class LoginView extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
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
                    <input type="text" placeholder='请输入您的姓名'/>
                </div>
            </div>
            <div className={[style.FormInput,'childcenter'].join(' ')}>
                <div className={[style.InputIcon,'childcenter'].join(' ')}>
                    <img src={inputicon_2} alt=""/>
                </div>
                <div className={style.InputBox}>
                    <input type="text" placeholder='请输入您的大区'/>
                </div>
            </div>
            <div className={[style.FormInput,'childcenter'].join(' ')}>
                <div className={[style.InputIcon,'childcenter'].join(' ')}>
                    <img src={inputicon_3} alt=""/>
                </div>
                <div className={style.InputBox}>
                    <input type="text" placeholder='请输入您的工号'/>
                </div>
            </div>
            <div className={[style.LoginButton,'childcenter'].join(' ')}>
                <div className={[style.ButtonIconBox,'childcenter'].join(' ')}>
                    <img src={buttonicon} className={style.ButtonIcon} alt=""/>
                </div>
                <div className={[style.ButtonValue,'childcenter'].join(' ')}>
                    登  录
                </div>
            </div>
        </div>
    </div>
   )
   }
}
export default LoginView