import React, { Component } from 'react'
import style from './Detial.scss'
import publictitlerow from 'assets/publictitlerow.png'
import buttonicon from 'assets/buttonicon.png'
  
export class Detial extends Component {
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
        <div className={style.PublicTitle}>
            <img src={publictitlerow} alt=""/>
        </div>
        <div className={style.InfoBox}>
            <p>"喝彩"安理申，共分为2个环节</p>
            <p>1.有奖问答：共设置5轮问题，参与过"告白"及"助力"安理申的玩家，至多可获得5次抽红包机会。两者只参与其一至多可获得3次抽红包机会。若没有参与，红包只能跟您Say Bye~红包将于销量达到5亿的那天分发。</p> 
            <p>2.年终大竞猜："助力"安理申所获得的奖券数，是您参与年终大竞猜的次数。</p> 

        </div>
        <div className={[style.RuleButton,'childcenter'].join(' ')}>
          <div className={[style.ButtonIconBox, "childcenter"].join(" ")}>
            <img src={buttonicon} className={style.ButtonIcon} alt="" />
          </div>
          <div className={[style.ButtonValue, "childcenter"].join(" ")}>
            我已了解规则
          </div>
        </div>
    </div>
   )
   }
}
export default Detial