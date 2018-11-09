import React, {Component} from 'react'

class AppSidebar extends Component {

  render() {
    return (
      <section role="search" className="sidebar">
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
    </section>
    )
  }
}

export default AppSidebar