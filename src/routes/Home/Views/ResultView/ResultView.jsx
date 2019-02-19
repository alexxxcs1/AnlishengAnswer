import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from './ResultView.scss'
import result from 'assets/result.png'
import buttonicon from 'assets/buttonicon.png'

import {api} from 'common/app'
  
export class ResultView extends Component {
constructor(props) {
  super(props);
  this.state = {
    redpackisOpen:false,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.GuessDate = this.GuessDate.bind(this);
  this.GetRedpack = this.GetRedpack.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.isOpen();
}
refreshProps(props) {
  
}
GuessDate(){
    this.context.HandleRoute(8);
}
isOpen(){
    api.getIsOpen().then(res=>{
        if(res.code == 200){
            this.state.redpackisOpen = true;
        }else{
            this.state.redpackisOpen = false;
        }
        this.setState(this.state);
    },err=>{
        console.log(err);
    })
}
GetRedpack(){
    if (this.state.redpackisOpen) {
        this.context.HandleRoute(9);
    }else{
        alert('抢红包尚未开始');
    }
}
render() {
  return (
    <div className={[style.ViewBox, "childcenter childcolumn"].join(" ")}>
        <div className={style.ResultBox}>
            <img src={result} alt=""/>
        </div>
        <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
            <div className={[style.Button,'childcenter'].join(' ')} onClick={this.GetRedpack}>
                <div className={[style.ButtonIconBox, "childcenter"].join(" ")}>
                    <img src={buttonicon} className={style.ButtonIcon} alt="" />
                </div>
                <div className={[style.ButtonValue, "childcenter"].join(" ")} >
                    抢红包
                </div>
            </div>
            <div className={[style.Button,'childcenter'].join(' ')}>
                <div className={[style.ButtonIconBox, "childcenter"].join(" ")} onClick={this.GuessDate}>
                    <img src={buttonicon} className={style.ButtonIcon} alt="" />
                </div>
                <div className={[style.ButtonValue, "childcenter"].join(" ")} >
                    年终大竞猜
                </div>
            </div>
        </div>
    </div>
   )
   }
}
ResultView.contextTypes = {
    HandleRoute: PropTypes.func
  };
export default ResultView