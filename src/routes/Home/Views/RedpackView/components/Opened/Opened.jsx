import React, { Component } from 'react'
import style from './Opened.scss'
import redpack from 'assets/redpack.png'
import pointer from 'assets/pointer.png'
  
export class Opened extends Component {
constructor(props) {
  super(props);
  this.state = {
      data:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleReturn = this.HandleReturn.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.state.data = props.data;
  this.setState(this.state);
}
HandleReturn(){
    console.log('asdasd');
    console.log(this.props);
    
    this.props.onReturn(false);
}
render() {
  return (
    <div className={[style.realredpack,'childcenter childcolumn childcontentstart'].join(' ')}>
        {this.state.data?[
        <div className={style.letterbox}>
            <div className={[style.RMBtext,'childcenter childcolumn childcontentstart'].join(' ')}>
                <span className={'childcenter'}> <img src={pointer} className={style.poniter} alt=""/> 恭喜获得 <img src={pointer} className={style.poniter} alt=""/> </span>
                <span>{this.state.data.num}</span>
                <span>RMB</span>
            </div>
        </div>,
        <div className={style.redpackbot}>
            <div className={[style.ReturnButton,'childcenter'].join(' ')} onClick={this.HandleReturn}>安理申专属红包</div>
            <img src={redpack} className={style.redpackbkg} alt=""/>
        </div>
        ]:''}
    </div>
   )
   }
}
export default Opened