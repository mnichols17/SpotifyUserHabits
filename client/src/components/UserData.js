import React from 'react';
import axios from 'axios';
import cookies from 'js-cookie'

import Profile from './Profile';
import ItemList from './ItemList';

async function getUserData(headers) {
  return axios.get("/data", {headers})
}

class Data extends React.Component{
  
  state = {
    items: [],
    type:'',
    timeRange: 'short_term'
  }

  componentDidMount = async() => {
    this.getItems('artists')
  }

  setRange = async(e) => {
    await this.setState({
      timeRange: e.target.value
    })
    this.getItems(this.state.type)
  }

  getItems = async(e) => {
    const type = typeof(e) === 'string' ? e : e.target.id
    const response = await getUserData({Type: type, Token: cookies.get('access_token'), Range: this.state.timeRange})
    this.setState({
      items: response.data.items,
      type: type
    })
  }

  render(){
    return (
      <div id="content">
        <div>
          <Profile headers={{Token: cookies.get('access_token')}}/>
        </div>
        <div id="filters">
          <div id="filterButtons">
            <button onClick={this.getItems} id="artists">Get Top Artists</button>
            <button onClick={this.getItems} id="tracks">Get Top Tracks</button>
          </div>
          <div id="filterOptions">
            <label htmlFor="disabledSelect">From: </label>
            <select onChange={this.setRange}>
              <option value="short_term">Last 4 weeks</option>
              <option value="medium_term">Last 6 months</option>
              <option value="long_term">All-time</option>
            </select>
          </div>
        </div>
        <ItemList items={this.state.items} type={this.state.type} />
      </div>
    );
  }
}

export default Data;