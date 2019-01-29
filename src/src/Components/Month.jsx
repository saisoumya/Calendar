import React from 'react'
export default class Month extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
    }    
    
    render(){
        let className = 'notThisMonth';
        const objs = this.props.weeks.map((weekObj)=>{
            let listDays = weekObj.map((day)=>{
                return (<td><button onClick={this.props.handleChange} class={this.props.month!=day.date.getMonth()?"notThisMonth":""}>{day.dateOfWeek}</button></td>);
            });
        return (<tr>{listDays}</tr>);
        });
        return(
            <tbody>{objs}</tbody>
        );
    }
}