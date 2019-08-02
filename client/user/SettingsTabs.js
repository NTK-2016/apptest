import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'
import {Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import Tabs, { Tab } from 'material-ui/Tabs'
import Paper from 'material-ui/Paper'
import EditProfile from './EditProfile'
import Account from './Account'
import Social from './Social'
import Payment from './Payment'
import Privacy from './Privacy'
import Notification from './Notification'

class SettingsTabs extends Component {
  constructor({match}) {
    super()
    this.state = {  
      tab: 0,
      account:[],
      editprofile:[],
      social:[],
      privacy:[],
      notification:[],
      payment:[],
     }
     this.match = match
    }
     componentWillReceiveProps = (props) => {
        this.setState({tab:0})
      }
      handleTabChange = (event, value) => {
        this.setState({ tab: value })
      }

      render() {
        return (
        <div style={{ width:"50px"}}>
          
            <AppBar position="static" color="default" style={{ width:"1345px",height:"100%" }} >
                  <Tabs
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                    indicatorColor="secondary"
                    textColor="primary" >
                           <Tab label="EditProfile" />
                            <Tab label="Account" />  
                            <Tab label="Social" />
                            <Tab label="Payment" />
                            <Tab label="Creator"/>
                            <Tab label="Notification"/>
                            <Tab label="Privacy" />
                  </Tabs> 
            </AppBar>
           {this.state.tab === 0 && <TabContainer><EditProfile editprofile={this.props.editprofile} userId={this.props.userId} /></TabContainer>} 
           {this.state.tab === 1 && <TabContainer><Account account={this.props.account} userId={this.props.userId} /></TabContainer>}
           {this.state.tab === 2 && <TabContainer><Social social={this.props.social}  userId={this.props.userId}/></TabContainer>}
           {this.state.tab === 3 && <TabContainer><Payment payment={this.props.payment} userId={this.props.userId} /></TabContainer>} 
           {this.state.tab === 5 && <TabContainer><Notification privacy={this.props.notification} userId={this.props.userId}/></TabContainer>}
           {this.state.tab === 6 && <TabContainer><Privacy privacy={this.props.privacy} userId={this.props.userId}/></TabContainer>} 
      </div>)
      }
}
SettingsTabs.propTypes = {
  
  account :PropTypes.array.isRequired
}
const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default SettingsTabs