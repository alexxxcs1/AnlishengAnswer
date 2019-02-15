import React, { Component } from 'react'
import style from './DateView.scss'
import resultbkg from 'assets/resultbkg.png'
import rings from 'assets/rings.png'
import rollcorner from 'assets/rollcorner.png'
import slidetips from 'assets/slidetips.png'
import buttonicon from 'assets/buttonicon.png'
import DatePick from 'components/DatePick'
import DarkBox from 'components/DarkBox'
  
let touchstartPosY = null;
export class DateView extends Component {
constructor(props) {
    super(props);
    this.state = {
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
    if (num>30) {
        touchstartPosY = posY;
        this.state.HourValue -= 1;
        if(this.state.HourValue<0) this.state.HourValue = 23;
    }else if(num<-30){
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
submit(){
    let self = this;
    this.state.AlertOption={
        show:true,
        value:'您已经没有机会了',
        callback:()=>{
            self.state.AlertOption={
                show:false,
                value:'',
                callback:()=>{},
            }
            self.setState(self.state);
        },
    }
    this.setState(this.state);
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
                提交
            </div>
        </div>
    </div>
   )
   }
}
export default DateView