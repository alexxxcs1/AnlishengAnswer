import React, { Component } from "react";
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

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageStatus:8,
    };
    this.customRoute = this.customRoute.bind(this);
  }
  componentDidMount() {}
  customRoute(){
    switch (this.state.stageStatus) {
      default:
      case 0:
        return <LoginView />;
      case 1:
        return  <RuleView />;
      case 2:
        return  <QuestionViewOne />;
      case 3:
        return  <QuestionViewTwo />;
      case 4:
        return  <QuestionViewThree />;
      case 5:
        return  <QuestionViewFour />;
      case 6:
        return  <QuestionViewFive />;
      case 7:
        return <ResultView />
      case 8:
        return <DateView />
    }
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

export default Home;
