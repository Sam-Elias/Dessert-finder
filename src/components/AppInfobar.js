import React, {Component} from 'react'

class AppInfobar extends Component {

  render() {
    return (
      <section id="infobar" role="document" className="sidebar">
        <button onClick={this.props.hideInfobar} className="infoBtn" type="button" value="Back to Search">Back to Search</button>
        <h1>{this.props.selectedUser.name}</h1>
        <p>Has just made some wonderful <span>{this.props.selectedUser.dessert}!</span> </p>
        <p>Would you like to buy some?</p>
         
    </section>
    )
  }
}

export default AppInfobar