import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from './QuestionView.scss'
import publictitlerow from 'assets/publictitlerow.png'
import questionicon from 'assets/questionicon.png'
import buttonicon from 'assets/buttonicon.png'

import {api} from 'common/app'

export class QuestionView extends Component {
constructor(props) {
  super(props);
  this.state = {
    onAjax:false,
    userselected:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.Select = this.Select.bind(this);
     this.AnswerQuestion = this.AnswerQuestion.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
Select(optionkey){
    this.state.userselected = optionkey;
    this.setState(this.state);
}
AnswerQuestion(){
    if (this.state.onAjax) return;
    let self = this;
    this.state.onAjax = true;
    this.setState(this.state);
    api.AnswerQuestion(this.state.userselected).then(res=>{
        if(res.code == 200){
            self.context.HandleRoute(7);
        }else{
            alert(res.msg);
        }
        this.state.onAjax = false;
        this.setState(this.state);
    },err=>{
        console.log(err);
        
    })
}
render() {
  return (
    <div className={[style.ViewBox, "childcenter childcolumn"].join(" ")}>
        <div className={style.TitleBox}>
            <img src={publictitlerow} alt=""/>
        </div>
        <div className={[style.QuestionDetial,'childcenter childcolumn'].join(' ')}>
            <div className={[style.Question,'childcenter'].join(' ')}>
                <div className={style.QuestionIcon}>
                    <img src={questionicon} alt=""/>
                </div>
                <div className={[style.QuetionValue,'childcenter childcolumn childalignstart'].join(' ')}>
                    <p>5时间穿梭回第一亿，</p>
                    <p>2018年，安理申的市场策略是？</p>
                </div>
                
            </div>
            <div className={[style.OptionBox,'childcenter childcolumn'].join(' ')}>
                <div className={[style.Option,this.state.userselected=='A'?style.SelectedOption:''].join(' ')} Optionkey={'A'} onClick={this.Select.bind(this,'A')}>
                    <div className={[style.OptionValue,'childcenter'].join(' ')}>
                        题目答案题目答案题目答案题目答案题目答案题目答案
                    </div>
                </div>
                <div className={[style.Option,this.state.userselected=='B'?style.SelectedOption:''].join(' ')} Optionkey={'B'} onClick={this.Select.bind(this,'B')}>
                    <div className={[style.OptionValue,'childcenter'].join(' ')}>
                        题目答案题目答案题目答案题目答案题目答案题目答案
                    </div>
                </div>
                <div className={[style.Option,this.state.userselected=='C'?style.SelectedOption:''].join(' ')} Optionkey={'C'} onClick={this.Select.bind(this,'C')}>
                    <div className={[style.OptionValue,'childcenter'].join(' ')}>
                        题目答案题目答案题目答案题目答案题目答案题目答案
                    </div>
                </div>
                <div className={[style.Option,this.state.userselected=='D'?style.SelectedOption:''].join(' ')} Optionkey={'D'} onClick={this.Select.bind(this,'D')}>
                    <div className={[style.OptionValue,'childcenter'].join(' ')}>
                        题目答案题目答案题目答案题目答案题目答案题目答案
                    </div>
                </div>
            </div>
        </div>
        <div className={[style.Button,'childcenter'].join(' ')}>
          <div className={[style.ButtonIconBox, "childcenter"].join(" ")}>
            <img src={buttonicon} className={style.ButtonIcon} alt="" />
          </div>
          <div className={[style.ButtonValue, "childcenter"].join(" ")} onClick={this.AnswerQuestion}>
            下一题
          </div>
        </div>
    </div>
   )
   }
}
QuestionView.contextTypes = {
    HandleRoute: PropTypes.func
  };
export default QuestionView