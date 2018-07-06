import React, { Component } from "react";
import firebase from "firebase";
import FriendsList from "../FriendsList";
// import InviteButton from '../InviteButton';
// import TimePicker from "../TimePicker";
import { Paper, Typography } from "@material-ui/core";
import "./PageBody.css";
import API from "../../utils/API";

const styles = {
  Paper: { padding: 20, width: 600, margin: 'auto' },
}

class Invite extends Component { 
  constructor(props) {
    super(props); 
    this.state = {
      isSignedIn: true,
      user: {},
      group: [],
      checked: false || true,
      liveUsers: [],
      handleChange: this.handleChange
    };
  };

  componentWillUpdate(nextProps, nextState){
    console.log("Invite Js line 27", nextState.group);
    // this.props.groupStateUpdate(this.state.group);
  }

  handleGroupSubmit = (e) => {
    e.preventDefault();
    console.log("In Submit Function");
   
  }
  

  handleChange = event => {
    var tempArr= [];
    console.log(event.target);
    if(event.target.checked === true){
      tempArr= [...this.state.group, event.target.value];
      this.setState({ 
        group: tempArr,
        checked: true
      });
      //event.target.checked = true;
      console.log(tempArr, "You checked one");
    } else if (event.target.checked === false) {
      tempArr = [...this.state.group];
      let index = tempArr.indexOf(event.target.value);
      tempArr.splice(index, 1);
      this.setState({
        group: tempArr,
        checked: false
      });
      //event.target.checked = false;
      console.log(tempArr, "you unchecked one");
    }
    //console.log("this is tempARRY",tempArr);
    //console.log(this.state.group);
  };

  componentDidMount() {
    API.getUsers()
    .then((response)=> {
      this.setState(()=>{
        return {
          liveUsers: response.data
        }
      })
    })
    .catch(err=>console.log(err))
  }    
    
    render(){
      
      let users = this.state.liveUsers;
      console.log(users, "Invite JS");
      return (
        <div className='page-body'>
          <Paper style={styles.Paper}>
            {/* <button className="btn" onClick={()=>firebase.auth().signOut()}> Sign out!</button> */}
            <Typography variant='Title'>
              <img alt="user" width="50px" margin='5px'src={firebase.auth().currentUser.photoURL} />
              Welcome {firebase.auth().currentUser.displayName}! You are signed in.
            </Typography> 
          <br/>
            <Typography variant='display1'>Invite</Typography>
          </Paper>
          <br />
          <FriendsList
           users = {this.state.liveUsers}
           handleChange = {this.handleChange}
           checked = {this.checked}
           submit = {this.handleGroupSubmit}
           />
        </div>
      )
    }
  }

  //           <Inputs />

  //         </div>
  //       )
  //     }
  // }
export default Invite;
