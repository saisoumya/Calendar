import React from 'react'
import Month from './Month.jsx';
import {days,months} from '../Constants/Constants.js'

export default class CalendarPage extends React.Component{
    constructor(props){
        super(props);
        const today = new Date();
        this.state={
            month:today.getMonth(),
            year:today.getFullYear(),
            selectedDate:today
        }
    }
    handleDecrease=()=>{
        if(this.state.month==0){
            this.setState((prevState)=>({month:11,year:prevState.year-1}));
        }else{
            this.setState((prevState)=>({month:prevState.month-1}));
        }
    }
    handleIncrease=()=>{
        if(this.state.month==11){
            this.setState((prevState)=>({month:0,year:prevState.year+1}));
        }else{
            this.setState((prevState)=>({month:prevState.month+1}));
        }
    }
    dateSelected=(e)=>{
        let selectedDate = e.target.value;
        this.setState({selectedDate});
        e.target.classList.add("selectedDay");
    }
    
    getDaysfMonth=()=>{
        const firstDayOfMonth = new Date(this.state.year,this.state.month,1);
        let firstDayOfWeek = new Date(firstDayOfMonth);
        // const lastDayOfMonth = new Date(this.state.year,this.state.month+1,0)
        let m = Array(6).fill().map((value,step)=>{
            let monday  = this.getMonday(firstDayOfWeek);
            if(step>3 && monday.getMonth()!=this.state.month){ return [];}
            let date = new Date(monday);
            firstDayOfWeek = new Date(date.setDate(monday.getDate()+7));
            return this.getDaysInWeek(monday);
        });
        return m;
    }

    getMonday=(date)=>{
        date = new Date(date);
        let day = date.getDay();
        if(day===0)
            return date;
        let diff = date.getDate() - day+1;
        return (new Date(date.setDate(diff)));
    }

    getDaysInWeek = (firstDay)=>{
        let daysList = [];
        let date = new Date(firstDay);
        days.map((day)=>{
            let newDate = new Date(date);
            let dateObj = {
                dateOfWeek:newDate.getDate(),
                day,
                date:newDate
            }
            daysList.push(dateObj);
            let diff = date.getDate()+1;
            date = new Date(date.setDate(diff));
        });
        return daysList;
    }
    render(){
        let weeksList = this.getDaysfMonth();
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th><button onClick={this.handleDecrease}>-</button></th>
                            <th colSpan="5">{months[this.state.month]},{this.state.year}</th>
                            <th><button onClick={this.handleIncrease}>+</button></th>
                        </tr>
                        <tr>
                            {days.map((day)=>(<td>{day}</td>))}
                        </tr>
                    </thead>
                        <Month weeks={weeksList} month = {this.state.month} handleChange={(i)=>{this.dateSelected(i)}}/>
                    
                </table>
            </div>
        );
    }
}