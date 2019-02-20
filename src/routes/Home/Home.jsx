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
import RedpackView from "./Views/RedpackView";

import ShareBox from 'components/ShareBox'
import bkgmusic from 'assets/bkgmusic.m4a'
import music from 'assets/music.png'
import toplogo from 'assets/toplogo.png'

import {api} from 'common/app'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MusicOn:true,
      stageStatus:0,
    };
    this.customRoute = this.customRoute.bind(this);
    this.HandleRoute = this.HandleRoute.bind(this);
    this.isLogin = this.isLogin.bind(this);
    this.audioAutoPlay = this.audioAutoPlay.bind(this);
    this.HandleMusic = this.HandleMusic.bind(this);
  }
  componentDidMount() {
    this.isLogin();
    this.getQuesionGrade();
    this.audioAutoPlay();
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
        return <ResultView />;
      case 8:
        return <DateView />;
      case 9:
        return <RedpackView />
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
          // window.location.href = res.data;
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
  audioAutoPlay() {
    var audio = this.refs.music;
    let self = this;
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        audio.currentTime = 0.0;
        audio.play();
      },
      false
    );
    document.addEventListener(
      "YixinJSBridgeReady",
      function() {
        audio.currentTime = 0.0;
        audio.play();
      },
      false
    );
  }
  HandleMusic(boolean){
    console.log(boolean);
    
    if (boolean) {
      this.refs.music.play();
      
    }else{
      this.refs.music.pause();
    }
    this.state.MusicOn = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={style.Box}>
        <ShareBox />
        <img src={toplogo} className={style.toplogo} alt=""/>
        <audio src={bkgmusic} ref={'music'} style={{display:'none'}}></audio>
        <div className={[style.MusicButton,this.state.MusicOn?style.MusicOn:style.MusicOff].join(' ')} onClick={this.HandleMusic.bind(this,!this.state.MusicOn)}>
            <img src={music} alt=""/>
        </div>
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
