import React, { Component } from 'react'
import style from './RedpackView.scss'
import publictitlerow from 'assets/publictitlerow.png'
import light from 'assets/light.png'
import {api} from 'common/app'

import Opened from './components/Opened'
  
export class RedpackView extends Component {
constructor(props) {
  super(props);
  this.state = {
      opened:false,
      onOpen:false,
      data:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.OpenRedpack = this.OpenRedpack.bind(this);
     this.HandleOpen = this.HandleOpen.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
OpenRedpack(){
    this.state.onOpen = true;
    this.setState(this.state);
    api.getRedpack().then(res=>{
        console.log(res);
        if (res.code == 200) {
            this.state.data = res.data;
            this.state.opened = true;
        }else{
            alert(res.msg);
        }
        this.state.onOpen = false;
        this.setState(this.state);
    },err=>{
        console.log(err);
    })
}
HandleOpen(boolean){
    console.log(this);
    
    this.state.opened = boolean;

    this.setState(this.state);
}
    
render() {
  return (
    <div className={[style.ViewBox,'childcenter childcolumn'].join(' ')}>

        {this.state.opened?<Opened data={this.state.data} onReturn={this.HandleOpen.bind(this,false)}/>
        :[
        <img src={publictitlerow} className={style.rowtitle} alt=""/>,
        <div className={style.RedPack}>
            <div className={style.PackTop}>
                <div className={[style.TopText,'childcenter childcolumn childcontentstart'].join(' ')}>
                    <div>昂扬5亿</div>
                    <div>安理申专属红包</div>
                </div>
                {/* <div className={style.Light}>
                    <img src={light} alt=""/>
                </div> */}
                <div className={[style.OpenButton,'childcenter'].join(' ')} onClick={this.state.onOpen?()=>{}:this.OpenRedpack}>
                    開
                </div>
            </div>
        </div>
        ]}

    </div>
   )
   }
}
export default RedpackView