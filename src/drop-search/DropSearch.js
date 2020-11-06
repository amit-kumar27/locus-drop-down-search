import React, { Component } from 'react';
import clsx from 'clsx';
import './dropSearch.css';
import data from '../data/data.json';

export class DropSearch extends Component {
    constructor(props) {
        super(props)
        
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            users: data,
            filteredUsers: [],
            cursor: 0,
            query: '',
        }
    }

    getElementIntoView() {
        const ele = document.querySelector('.active');
        if(ele) {
            ele.scrollIntoView();
        }
    }

    handleKeyDown(e) {
        const { cursor, filteredUsers } = this.state;
        
        if (e.keyCode === 38 && cursor > 0) {
          this.setState( prevState => ({
            cursor: prevState.cursor - 1
          }), this.getElementIntoView);
        } else if (e.keyCode === 40 && cursor < filteredUsers.length - 1) {
          this.setState( prevState => ({
            cursor: prevState.cursor + 1
          }), this.getElementIntoView);
        }
        
    }

    updateCursor(ind) {
        this.setState({
            cursor: ind
        })
    }


    userContainsStr=(usr, searchStr)=>{
        let flag = usr.id.toLowerCase().indexOf(searchStr)>-1 ||
        usr.name.toLowerCase().indexOf(searchStr)>-1 ||
        usr.address.toLowerCase().indexOf(searchStr)>-1 ||
        usr.pincode.toLowerCase().indexOf(searchStr)>-1;
        for(let i=0;i<usr.items.length;i++){
            if(usr.items[i].toLowerCase().indexOf(searchStr)>-1){
                flag=true;
                break;
            }
        }
        return flag;
    }

    filter=(e)=>{
        let searchStr=e.target.value;
        let filteredUsers=[];
        if(searchStr) {
            let users= [...this.state.users];
            for(let i=0;i<users.length;i++){
                if(this.userContainsStr(users[i],searchStr.trim().toLowerCase())) {
                    filteredUsers.push(users[i]);
                }
            }
        }
        
        this.setState({
            filteredUsers,
            query: searchStr,
            cursor: 0
        })
    }

    render() {
        const {filteredUsers, query, cursor}=this.state;
        return (
            <div className="dropdown">
                <input className="input" type="text" placeholder="Search User by Id, Name, Address"
                    id="myInput" onChange={this.filter} onKeyDown={ this.handleKeyDown } />
                {
                    filteredUsers.length && query ?
                    <div id="myDropdown" className="dropdown-content">
                        {
                            filteredUsers.map((user, index) => (
                                <div 
                                    className={clsx('element', cursor === index ? 'active' : '')} 
                                    onMouseEnter={() => this.updateCursor(index)}
                                    key={user.id}>
                                    <p>{user.id}</p>
                                    <i>{user.name}</i>
                                    <p>{user.address}, {user.pincode}</p>
                                </div>    
                            ))
                        } 
                    </div>

                    :

                    <div className="no-data">
                        <h4>No Data Found!</h4>
                    </div>  
               }
            </div>
        )
    }
}

export default DropSearch;
