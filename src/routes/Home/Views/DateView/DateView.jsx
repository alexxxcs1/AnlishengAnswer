import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from './DateView.scss'
import resultbkg from 'assets/resultbkg.png'
import rings from 'assets/rings.png'
import rollcorner from 'assets/rollcorner.png'
import slidetips from 'assets/slidetips.png'
import buttonicon from 'assets/buttonicon.png'
import DatePick from 'components/DatePick'
import DarkBox from 'components/DarkBox'

import {api} from 'common/app'
  
let touchstartPosY = null;
export class DateView extends Component {
constructor(props) {
    super(props);
    this.state = {
        guesstime:0,
        picktime:0,
        onTouch:false,
        PickDate:null,
        HourValue:new Date().getHours(),
        AlertOption:{
            show:false,
            value:'',
            callback:()=>{},
        }
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.DatePicked = this.DatePicked.bind(this);
    this.onHourTouchStart = this.onHourTouchStart.bind(this);
    this.onHourTouchMove = this.onHourTouchMove.bind(this);
    this.onHourTouchEnd = this.onHourTouchEnd.bind(this);
    this.submit = this.submit.bind(this);
}
componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
}
componentDidMount() {
    this.refreshProps(this.props);
    this.getPickTime();
}
refreshProps(props) {
  
}
DatePicked(date){
    this.state.PickDate = date;
    this.setState(this.state);
}
onHourTouchStart(e)
{
    touchstartPosY = e.touches[0].clientY;
    this.state.onTouch = true;
    this.setState(this.state);
}
onHourTouchMove(e)
{
    let posY = e.touches[0].clientY;
    let num = posY - touchstartPosY;
    this.state.onTouch = true;
    let nowHour = new Date().getHours();
    if (num > 30) {
        touchstartPosY = posY;
        this.state.HourValue -= 1;
        if(this.state.HourValue<0) this.state.HourValue = 23;
    }else if(num < -30){
        touchstartPosY = posY;
        this.state.HourValue += 1;
        if(this.state.HourValue>23) this.state.HourValue = 0;
    }
    this.setState(this.state);
}
onHourTouchEnd(e)
{
    touchstartPosY = null;
    this.state.onTouch = false;
    this.setState(this.state);
}
getPickTime(){
    api.getCountTime().then(res=>{
        console.log(res);
        if (res.code == 200) {
            if (res.data.competeTime <= 0) {
                this.context.HandleRoute(10);
                this.setState(this.state);
            }
            this.state.picktime = res.data.competeTime;
            this.setState(this.state);
        }else{
            this.state.AlertOption={
                show:true,
                value:res.msg,
                callback:()=>{
                    this.state.AlertOption={
                        show:false,
                        value:'',
                        callback:()=>{
                            
                        },
                    }
                    this.context.HandleRoute(10);
                    this.setState(this.state);
                },
            }
        }
    },err=>{
        console.log(err);
        
    })
}
submit(){
    let self = this;
    if (this.state.PickDate==null) {
        alert('请选择一个日期！')
        return;
    }else if(this.state.picktime <= 0){
        let self = this;
        this.state.AlertOption={
            show:true,
            value:'您的竞猜次数已用完',
            callback:()=>{
                self.state.AlertOption={
                    show:false,
                    value:'',
                    callback:()=>{
                        
                    },
                }
                self.context.HandleRoute(10);
                self.setState(self.state);
            },
        }
        this.setState(this.state);
        return ;
    }
    api.GuessDate(this.state.PickDate.format('yyyy/MM/dd') + ' ' + this.state.HourValue + ':00:00').then(res=>{
        if (res.code == 200) {
            this.state.guesstime +=1 ;
            this.state.AlertOption={
                show:true,
                value:res.msg,
                callback:()=>{
                    if (res.data.surplus == 0) {
                        self.context.HandleRoute(10);
                    }
                    self.state.AlertOption={
                        show:false,
                        value:'',
                        callback:()=>{},
                    }
                    self.setState(self.state);
                    
                },
            }
            this.state.picktime = res.data.surplus;
            this.setState(this.state);

        }else{
            this.state.AlertOption={
                show:true,
                value:res.msg,
                callback:()=>{
                    self.state.AlertOption={
                        show:false,
                        value:'',
                        callback:()=>{
                            
                        },
                    }
                    self.context.HandleRoute(10);
                    self.setState(self.state);
                },
            }
            this.setState(this.state);
        }
    },err=>{

    })

    
}
render() {
  return (
    <div className={[style.ViewBox, "childcenter childcolumn"].join(" ")}>
        {this.state.AlertOption.show?<DarkBox>
            <div className={style.AlertBox}>
                <div className={style.CloseButton} onClick={this.state.AlertOption.callback}></div>
                <div className={[style.ContentValue,'childcenter'].join(' ')}>
                    {this.state.AlertOption.value}
                </div>
            </div>
        </DarkBox>:''}
        <div className={[style.DateContent, "childcenter childcolumn"].join(" ")}>
            <div className={[style.DateBox,'childcenter childcolumn childcontentstart'].join(' ')}>
                <DatePick onSelect={this.DatePicked} minDate={new Date()}/> 
                <div className={style.TimeBox}>
                    <div className={[style.RingGroup,'childcenter'].join(' ')}>
                        <img src={rings} alt=""/>
                    </div>
                    <div className={[style.TimeContent,'childcenter'].join(' ')} onTouchStart={this.onHourTouchStart} onTouchMove={this.onHourTouchMove} onTouchEnd={this.onHourTouchEnd}>
                        <div className={[style.SlideTips,this.state.onTouch?style.onTouch:'','childcenter'].join(' ')}>
                            滑动改变时间
                        </div>
                        <div className={style.Hour}>
                            小时
                        </div>
                        <div className={style.HourHandle}>
                            {this.state.HourValue<10?'0'+this.state.HourValue:this.state.HourValue}:00
                        </div>
                        {/* <img src={slidetips} className={style.slidetips} alt=""/> */}
                    </div>
                    <div className={style.RollCorner}>
                        <img src={rollcorner} alt=""/>
                    </div>
                </div>
            </div>
            
            <img src={resultbkg} className={style.resultbkg} alt=""/>
        </div>
        <div className={[style.Button,'childcenter'].join(' ')}>
            <div className={[style.ButtonIconBox, "childcenter"].join(" ")}>
                <img src={buttonicon} className={style.ButtonIcon} alt="" />
            </div>
            <div className={[style.ButtonValue, "childcenter"].join(" ")} onClick={this.submit}>
                {this.state.guesstime==0?'提交':'再猜一次'}
            </div>
        </div>
    </div>
   )
   }
}
DateView.contextTypes = {
    HandleRoute: PropTypes.func
  };
export default DateView