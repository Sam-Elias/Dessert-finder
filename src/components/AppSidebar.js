import React, {Component} from 'react'

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

  render() {
    let filteredByDessert
    if (this.state.query) {
      const match = new RegExp(this.state.query, 'i')
      filteredByDessert = this.props.users.filter((user) => match.test(user.dessert))
    } else {
      filteredByDessert = this.props.users
    }
    {console.log(this.state.query)}
    return (
      <nav className="sidebar">
        <input type="search" value={this.state.query} onChange={this.updateQuery} id="search" placeholder="Enter a dessert type"></input>
        <ul className="sidebar">
          {filteredByDessert.map((user) => 
            <li key={user.id}>
              {user.dessert}
            </li>
            )}
        </ul>
    </nav>
    )
  }
}

export default AppSidebar