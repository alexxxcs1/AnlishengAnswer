import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import style from "./Home.scss";
import publicground from "assets/publicground.png";
import LoginView from "./Views/LoginView";
import RuleView from "./Views/RuleView";
import QuestionViewOne from "./Views/QuestionViewOne";
import QuestionViewTwo from "./Views/QuestionViewTwo";
import QuestionViewThree from "./Views/QuestionViewThree";
import QuestionViewFour from "./Views/QuestionViewFour";
import QuestionViewFive from "./Views/QuestionViewFive";
import ResultView from "./Views/ResultView";
import DateView from "./Views/DateView";

import {api} from 'common/app'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageStatus:0,
    };
    this.customRoute = this.customRoute.bind(this);
    this.HandleRoute = this.HandleRoute.bind(this);
    this.isLogin = this.isLogin.bind(this);
  }
  componentDidMount() {
    this.isLogin();
    this.getQuesionGrade();
    window.document.body.addEventListener(
      "touchmove",
      function(e) {
        e.preventDefault();
      },
      false
    );
    window.document.body.addEventListener(
      "ondragstart",
      function(e) {
        return false;
      },
      false
    );

  }

  getChildContext() {
    return {
      HandleRoute: this.HandleRoute
    };
  }

  customRoute(){
    switch (this.state.stageStatus) {
      default:
      case 0:
        return <LoginView />;
      case 1:
        return <RuleView />;
      case 2:
        if (this.state.stageStatus<=this.state.QuestionGrade) {
          this.HandleRoute(this.state.QuestionGrade+1);
        }
        return <QuestionViewOne />;
      case 3:
        if (this.state.stageStatus<=this.state.QuestionGrade) {
          this.HandleRoute(this.state.QuestionGrade+1);
        }
        return <QuestionViewTwo />;
      case 4:
        if (this.state.stageStatus<=this.state.QuestionGrade) {
          this.HandleRoute(this.state.QuestionGrade+1);
        }
        return <QuestionViewThree />;
      case 5:
        if (this.state.stageStatus<=this.state.QuestionGrade) {
          this.HandleRoute(this.state.QuestionGrade+1);
        }
        return <QuestionViewFour />;
      case 6:
        if (this.state.stageStatus<=this.state.QuestionGrade) {
          this.HandleRoute(this.state.QuestionGrade+1);
        }
        return <QuestionViewFive />;
      case 7:
        return <ResultView />
      case 8:
        return <DateView />
    }
  }
  HandleRoute(index){
    console.log(index);
    
    this.state.stageStatus = index;
    this.setState(this.state);
  }
  isLogin(){
    api.isLogin(window.location.href).then(res=>{
      console.log(res);
      if (res.code == 200) {
        this.state.stageStatus = 1;
        this.setState(this.state);
      }else{
        if (res.code == 203) {
          window.location.href = res.data;
        }else if(res.code == 202){
          this.state.stageStatus = 0;
          this.setState(this.state);
        }
      }
    },err=>{
      console.log(err);
      
    })
  }
  getQuesionGrade(){
    api.getQuestionGrade().then(res=>{
      if (res.code == 200) {
        this.state.QuestionGrade = res.data;
      }else{
        this.state.QuestionGrade = 1;
      }
      this.setState(this.state);
    },err=>
    {
      
    })
  }
  render() {
    return (
      <div className={style.Box}>
        <div className={style.Content}>
          {this.customRoute()}
        </div>
        <div className={style.BotGround}>
          <img src={publicground} className={style.GroundPerson} alt="" />
        </div>
      </div>
    );
  }
}
Home.childContextTypes = {
  HandleRoute: PropTypes.func
};

export default Home;
