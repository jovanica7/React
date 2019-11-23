import React, { PureComponent } from 'react'
import { fetchUserList, sleep } from '../../services/'

class Users extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      usernameToAdd: '',
      emailToAdd: '',
      ageToAdd: '',
      loading: true
    }
  }

async componentDidMount() {
    await sleep(1500);
    const data = fetchUserList();
    this.setState({
        userList: data, loading: false
    });
}

selectItem = user => event => {
  this.setState({
    selected: user.id
  });
}

unselectItem = () => this.setState({
    selected: null
});

handleInputChange = field => event => {
    this.setState({ 
        [field]: event.target.value 
    });
}

addNewUser = () => {
    const { usernameToAdd, emailToAdd, ageToAdd } = this.state;
    this.setState((prevState, props) => {
      let newList = [...prevState.userList];
      newList.push({
          id: newList.length + 2,
          username: usernameToAdd, 
          email: emailToAdd, 
          age:ageToAdd
      });
      
    return {
        userList: newList, 
        usernameToAdd: '', 
        emailToAdd: '',
        ageToAdd: ''
      } 
    })
  }

editUser = () => {
  const userIndex = this.state.userList.map(user => user.id).indexOf(this.state.selected);
  let newList = [...this.state.userList]
  newList[userIndex] = {
      id: this.state.selected,
      username: this.state.usernameToAdd, 
      email: this.state.emailToAdd, 
      age: this.state.ageToAdd
    }

  this.setState({
      userList: newList, 
      selected: null
    });
}

deleteUser = () => {
  const userIndex = this.state.userList.map(user => user.id).indexOf(this.state.selected)
  const newList = [...this.state.userList] 
  newList.splice(userIndex, 1)
  this.setState({
    userList:  newList,
    selected: null
  });
}


renderUserList = () => {
  return this.state.userList.map(user => {
    return (
    <div onClick={ this.selectItem(user) } key={`user_${user.id}`} style={{ marginTop: '20px', cursor: 'pointer', background: this.state.selected === user.id ? 'lightgreen' : 'white' }} >
    <p style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: this.state.selected === user.id ? 'white' : 'green'  }}>{ user.username }</p>
    <p style={{ textAlign: 'center', fontSize: 12, color: this.state.selected === user.id ? 'white' : 'green' }}>Email: { user.email } Age: { user.age }</p>
    </div>
    )
  });
}

render() {
  const { loading, usernameToAdd, emailToAdd, ageToAdd } = this.state;
  
  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center' }}>
      <h1 onClick={ this.unselectItem } style={{ cursor: 'pointer', color: 'orange' }}>Users:</h1>
      { this.renderUserList() }
      <div style={{ display: 'flex', flex: 1, marginTop: '20px', flexDirection: 'column' }}>
        <input type='text' value={ usernameToAdd } placeholder='Username' onChange={ this.handleInputChange('usernameToAdd') } />
        <input type='text' value={ emailToAdd } placeholder='Email' onChange={ this.handleInputChange('emailToAdd') } />
        <input type='number' value={ ageToAdd } placeholder='Age' onChange={ this.handleInputChange('ageToAdd') } />
        <button onClick={ this.state.selected ? this.editUser : this.addNewUser }>{ this.state.selected ? 'Edit' : 'Add new'}  user</button>
        <button disabled={ !this.state.selected } onClick={ this.state.selected ? this.deleteUser : null }>Delete user</button> 
      </div>
    </div>
  )
}

}


export default Users