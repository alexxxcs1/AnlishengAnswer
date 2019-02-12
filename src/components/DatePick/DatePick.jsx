import React, { Component } from 'react'
import style from './DatePick.scss'
  
export class DatePick extends Component {
constructor(props) {
  super(props);
  this.state = {
    minDate:null,
    maxDate:null,
    beforeArray:[],
    dayArray:[],
    afterArray:[],
    selected:null,
    today:new Date(),
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.RefreshDayList = this.RefreshDayList.bind(this);
  this.createBeforeDay = this.createBeforeDay.bind(this);
  this.createDay = this.createDay.bind(this);
  this.createAfterDay = this.createAfterDay.bind(this);
  this.Select = this.Select.bind(this);
  this.ChangeMonth = this.ChangeMonth.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.RefreshDayList();
}
refreshProps(props) {
    this.state.minDate = props.minDate?props.minDate:this.state.minDate;
    this.state.maxDate = props.maxDate?props.maxDate:this.state.maxDate;
    this.setState(this.state);
}
RefreshDayList(){
    let today = new Date(this.state.today.getTime());
    let _today = today;
    let beforemonth = new Date(_today.getFullYear(),_today.getMonth()-1);
    let aftermonth = new Date(_today.getFullYear(),_today.getMonth()+1);
    let beforeArray = [];
    let dayArray = [];
    let afterArray = [];


    let _FirstDay = today.setDate(1);
    let FirstDay = new Date(_FirstDay).getDay();

    let maxRenderBefore = FirstDay;
    
    //添加上个月日期
    let maxBeforeMonthDay = this.GetMaxDate(beforemonth.getFullYear(),beforemonth.getMonth());

    for (let z = 0; z < maxRenderBefore; z++) {
        beforeArray.push(maxBeforeMonthDay - z);
    }
    
    this.state.beforeArray = beforeArray.reverse();
    
    //添加这个月日期
    let maxMonthDay = this.GetMaxDate(today.getFullYear(),today.getMonth());

    for (let x = 1; x <= maxMonthDay; x++) {
        dayArray.push(x);
    }

    this.state.dayArray = dayArray;

    //添加下个月日期
    let MaxAfterMonth = 42 - (this.state.beforeArray.length + this.state.dayArray.length);
    for (let a = 1; a <= MaxAfterMonth; a++) {
        afterArray.push(a);
    }
    this.state.afterArray = afterArray;
    this.setState(this.state);
    
}
GetMaxDate(year, month) {
    var d = new Date(year, month+1, 0);
    return d.getDate();
}
Select(day){
    let daydate = new Date(day);

    if(this.state.minDate){
        if (daydate.getTime()<this.state.minDate.getTime()) return;
    }        
    if(this.state.maxDate){
        if (daydate.getTime()>this.state.maxDate.getTime()) return;
    }
    
    this.state.selected = day;
    
    this.setState(this.state);
    this.props.onSelect(new Date(day))
}
createBeforeDay(){
    if(this.state.beforeArray.length<=0) return;
    let result = [];
    let today = new Date(this.state.today.getTime());
    let beforedata = new Date(today.setMonth(today.getMonth()-1));
    for (let z = 0; z < this.state.beforeArray.length; z++) {
        result.push(<div key={beforedata.format('yyyy/MM/') + this.state.beforeArray[z]} className={[style.DayBox,style.othermonth,'childcenter'].join(' ')}>{this.state.beforeArray[z]}</div>)
    }
    return result;
}
createDay(){
    if(this.state.dayArray.length<=0) return;
    let result = [];
    let today = this.state.today;
    let realtoday = new Date();
    for (let z = 0; z < this.state.dayArray.length; z++) {
        result.push(<div key={today.format('yyyy/MM/') + this.state.dayArray[z]} className={[style.DayBox,
            realtoday.format('yyyy/MM/dd') == this.state.today.format('yyyy/MM/')+(z+1)?style.realtoday:'',
            this.state.today.format('yyyy/MM/')+(z+1) == this.state.selected?style.onSelected:'',
            'childcenter'].join(' ')} onClick={this.Select.bind(this,this.state.today.format('yyyy/MM/')+(z+1))}>{this.state.dayArray[z]}</div>)
    }
    return result;
}
createAfterDay(){
    if(this.state.afterArray.length<=0) return;
    let result = [];
    let today =  new Date(this.state.today.getTime());;
    let afterdate = new Date(today.setMonth(today.getMonth()+1));
    for (let z = 0; z < this.state.afterArray.length; z++) {
        result.push(<div key={afterdate.format('yyyy/MM/') + this.state.afterArray[z]} className={[style.DayBox,style.othermonth,'childcenter'].join(' ')}>{this.state.afterArray[z]}</div>)
    }
    return result;
}
ChangeMonth(cutnum){
    let today = new Date(this.state.today.getTime());
    let futerday = new Date(new Date(this.state.today.getTime()).setDate(1));
    let beforeday = new Date(this.state.today.getTime());
    
    if(this.state.minDate){
        if (new Date(beforeday.setMonth(today.getMonth()+cutnum)).getTime()<new Date(this.state.minDate.setDate(1)).getTime()) return;
    }        
    if(this.state.maxDate){
        if (new Date(futerday.setMonth(today.getMonth()+cutnum)).getTime()>this.state.maxDate.getTime()) return;
    }
    this.state.today = new Date(today.setMonth(today.getMonth()+cutnum));
    this.setState(this.state);
    this.RefreshDayList();
}
render() {
  return (
    <div className={style.DateBox}>
        <div className={[style.DateTitle,'childcenter'].join(' ')}>
            <div className={style.HandleArrow} onClick={this.ChangeMonth.bind(this,-1)}></div>
            <div className={[style.DateValue,'childcenter'].join(' ')}>
                {this.state.today.format('yyyy年 MM月')}
            </div>
            <div className={[style.HandleArrow,style.rotate].join(' ')} onClick={this.ChangeMonth.bind(this,1)}></div>
        </div>
        <div className={[style.WeekGroup,'childcenter'].join(' ')}>
            <div className={[style.DayBox,style.WeekName,'childcenter'].join(' ')}>Su</div>
            <div className={[style.DayBox,style.WeekName,'childcenter'].join(' ')}>Mo</div>
            <div className={[style.DayBox,style.WeekName,'childcenter'].join(' ')}>Tu</div>
            <div className={[style.DayBox,style.WeekName,'childcenter'].join(' ')}>We</div>
            <div className={[style.DayBox,style.WeekName,'childcenter'].join(' ')}>Th</div>
            <div className={[style.DayBox,style.WeekName,'childcenter'].join(' ')}>Fr</div>
            <div className={[style.DayBox,style.WeekName,'childcenter'].join(' ')}>Sa</div>
        </div>
        <div className={[style.DayGroup,'childcenter childcontentstart'].join(' ')}>
            {this.createBeforeDay()}
            {this.createDay()}
            {this.createAfterDay()}
        </div>
    </div>
   )
   }
}
export default DatePick