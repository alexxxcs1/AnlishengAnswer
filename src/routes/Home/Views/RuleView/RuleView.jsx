import React, { Component } from "react";
import style from "./RuleView.scss";
import publictitle from "assets/publictitle.png";
import buttonicon from 'assets/buttonicon.png'

import Detial from './components/Detial'

export class RuleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        detialshow:false,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.HandleDetial = this.HandleDetial.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {}
  HandleDetial(boolean){
    this.state.detialshow = boolean;
    this.setState(this.state);
  }
  render() {
    return (
      <div className={[style.ViewBox, "childcenter childcolumn"].join(" ")}>
        {this.state.detialshow?<Detial />:[
        <div className={style.TitleBox}>
          <img src={publictitle} alt="" />
        </div>,
        <div className={[style.RuleButton,'childcenter'].join(' ')}>
          <div className={[style.ButtonIconBox, "childcenter"].join(" ")}>
            <img src={buttonicon} className={style.ButtonIcon} alt="" />
          </div>
          <div className={[style.ButtonValue, "childcenter"].join(" ")} onClick={this.HandleDetial.bind(this,true)}>
            活动规则
          </div>
        </div>
        ]}
      </div>
    );
  }
}
export default RuleView;
