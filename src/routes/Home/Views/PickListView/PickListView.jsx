import React, { Component } from 'react'
import PropTypes from "prop-types";
import style from './PickListView.scss'
import resultbkg from 'assets/resultbkg.png'
import rings from 'assets/rings.png'
import rollcorner from 'assets/rollcorner.png'
import slidetips from 'assets/slidetips.png'
import buttonicon from 'assets/buttonicon.png'
import DarkBox from 'components/DarkBox'

import {api} from 'common/app'
  
let touchstartPosY = null;
export class PickListView extends Component {
constructor(props) {
    super(props);
    this.state = {
        datalist:[],
        AlertOption:{
            show:false,
            value:'',
            callback:()=>{},
        }
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createList = this.createList.bind(this);
    this.return = this.return.bind(this);
}
componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
}
componentDidMount() {
    this.refreshProps(this.props);
    this.getCompeteList();
}
refreshProps(props) {
  
}
getCompeteList(){
    let self = this;
    api.getCompeteList().then(res=>{
        if (res.code == 200) {
            if (res.data.length == 0) {
                this.state.AlertOption={
                    show:true,
                    value:'还未竞猜时间，赶紧去竞猜吧',
                    callback:()=>{
                        self.state.AlertOption={
                            show:false,
                            value:'',
                            callback:()=>{
                                
                            },
                        }
                        self.context.HandleRoute(8);
                        self.setState(self.state);
                    },
                }
                this.setState(this.state);
            }else{
                this.state.datalist = res.data;
                this.setState(this.state);
            }
            
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
                    self.context.HandleRoute(7);
                    self.setState(self.state);
                },
            }
            this.setState(this.state);
        }
    },err=>{
        console.log(err);
        this.context.HandleRoute(7);
        this.setState(self.state);
    })
}
createList(){
    let result = [];
    for (let z = 0; z < this.state.datalist.length; z++) {
        let date = new Date(this.state.datalist[z].compete);
        result.push(
            <div className={[style.TableRow, "childcenter"].join(" ")}>
                <div className={[style.MonthColumn, "childcenter"].join(" ")}>{date.format('MM')}</div>
                <div className={style.Line}></div>
                <div className={[style.DayColumn, "childcenter"].join(" ")}>{date.format('dd')}</div>
                <div className={style.Line}></div>
                <div className={[style.TimeColumn, "childcenter"].join(" ")}>{date.format('hh:mm')}</div>
            </div>
        );
    };
    return result;
}
return(){
    this.context.HandleRoute(7);
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
                <div className={[style.PickListTitle, "childcenter"].join(" ")}>您的竞猜时间为</div>
                <div className={[style.TableRow, "childcenter"].join(" ")}>
                    <div className={[style.MonthColumn, "childcenter"].join(" ")}>月</div>
                    <div className={style.Line}></div>
                    <div className={[style.DayColumn, "childcenter"].join(" ")}>日</div>
                    <div className={style.Line}></div>
                    <div className={[style.TimeColumn, "childcenter"].join(" ")}>时间</div>
                </div>
                {this.createList()}
            </div>
            
            <img src={resultbkg} className={style.resultbkg} alt=""/>
        </div>
        <div className={[style.Button,'childcenter'].join(' ')}>
            <div className={[style.ButtonIconBox, "childcenter"].join(" ")}>
                <img src={buttonicon} className={style.ButtonIcon} alt="" />
            </div>
            <div className={[style.ButtonValue, "childcenter"].join(" ")} onClick={this.return}>
                返回
            </div>
        </div>
    </div>
   )
   }
}
PickListView.contextTypes = {
    HandleRoute: PropTypes.func
  };
export default PickListView