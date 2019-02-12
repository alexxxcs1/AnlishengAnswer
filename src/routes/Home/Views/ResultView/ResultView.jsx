import React, { Component } from 'react'
import style from './ResultView.scss'
import result from 'assets/result.png'
import buttonicon from 'assets/buttonicon.png'
  
export class ResultView extends Component {
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
    <div className={[style.ViewBox, "childcenter childcolumn"].join(" ")}>
        <div className={style.ResultBox}>
            <img src={result} alt=""/>
        </div>
        <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
            <div className={[style.Button,'childcenter'].join(' ')}>
                <div className={[style.ButtonIconBox, "childcenter"].join(" ")}>
                    <img src={buttonicon} className={style.ButtonIcon} alt="" />
                </div>
                <div className={[style.ButtonValue, "childcenter"].join(" ")}>
                    抢红包
                </div>
            </div>
            <div className={[style.Button,'childcenter'].join(' ')}>
                <div className={[style.ButtonIconBox, "childcenter"].join(" ")}>
                    <img src={buttonicon} className={style.ButtonIcon} alt="" />
                </div>
                <div className={[style.ButtonValue, "childcenter"].join(" ")}>
                    年终大竞猜
                </div>
            </div>
        </div>
    </div>
   )
   }
}
export default ResultView