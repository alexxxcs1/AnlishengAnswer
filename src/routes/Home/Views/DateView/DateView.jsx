import React, { Component } from 'react'
import style from './DateView.scss'
import resultbkg from 'assets/resultbkg.png'
import DatePick from 'components/DatePick'
  
export class DateView extends Component {
constructor(props) {
  super(props);
  this.state = {
      PickDate:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.DatePicked = this.DatePicked.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
DatePicked(date){
    this.state.PickDate = date;
    this.setState(this.state);
}
render() {
  return (
    <div className={[style.ViewBox, "childcenter childcolumn"].join(" ")}>
        <div className={style.DateContent}>
            <div className={[style.DateBox,'childcenter childcolumn childcontentstart'].join(' ')}>
                <DatePick onSelect={this.DatePicked} minDate={new Date()}/>
                <div className={style.TimeBox}>
                    
                </div>
            </div>
            <img src={resultbkg} className={style.resultbkg} alt=""/>
        </div>
    </div>
   )
   }
}
export default DateView