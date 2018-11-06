import React, {Component} from 'react'
import escapeStringRegexp from 'escape-string-regexp'

class AppSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
 
  componentDidUpdate = (prevProp) => {
    let filteredByDessert
    if (this.props.query !== prevProp.query) {
      const match = new RegExp(escapeStringRegexp(this.props.query), 'i')
      console.log(prevProp.currentUsers)
      filteredByDessert = this.props.allUsers.filter((user) => match.test(user.dessert))
      console.log(filteredByDessert)
      this.props.filterUsers(filteredByDessert)
      console.log('filteredByDessert')
    } 
    console.log(prevProp.query)
    console.log(this.props.query)
  }

  render() {
    
    return (
      <nav className="sidebar">
        <input type="search" value={this.props.query} onChange={this.props.updateQuery} id="search" placeholder="Enter a dessert type"></input>
        <ul className="sidebar">
          {this.props.currentUsers.map((user) => 
            <li 
              key={user.id}
              onClick={this.props.handleClick}
            >
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