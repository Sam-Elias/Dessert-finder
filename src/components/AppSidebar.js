import React, {Component} from 'react'
import escapeStringRegexp from 'escape-string-regexp'

class AppSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query:""
    }
  }
 
  updateQuery = (query) => {
    this.setState({query: query.target.value.trim()})
  }
  componentDidUpdate = (prevProp, prevState) => {
    let filteredByDessert
    console.log(`prop: ${prevProp} sidebar query: ${prevState.query}`)
    if (this.state.query !== prevState.query) {
      const match = new RegExp(escapeStringRegexp(this.state.query), 'i')
      filteredByDessert = this.props.users.filter((user) => match.test(user.dessert))
      this.props.filterUsers(filteredByDessert)
    } 
    {console.log(filteredByDessert)}
    {console.log(this.state.query)}
    }

  
  render() {
    
    return (
      <nav className="sidebar">
        <input type="search" value={this.state.query} onChange={this.updateQuery} id="search" placeholder="Enter a dessert type"></input>
        <ul className="sidebar">
          {this.state.query? 
            this.props.filteredUsers.map((user) => 
            <li key={user.id}>
              {user.dessert}
            </li>
            ) : 
            this.props.users.map((user) => 
            <li key={user.id}>
              {user.dessert}
            </li>
            )
          }
        </ul>
    </nav>
    )
  }
}

export default AppSidebar