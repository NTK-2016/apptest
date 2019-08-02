import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import SettingsTabs from './SettingsTabs'
import Grid from 'material-ui/Grid'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
const styles = theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2
    },
    title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.protectedTitle
    },
    error: {
      verticalAlign: 'middle'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2
    },
    bigAvatar: {
      width: 60,
      height: 60,
      margin: 'auto'
    },
    input: {
      display: 'none'
    },
    filename:{
      marginLeft:'10px'
    }
  })
  
  class Settings extends Component {
    constructor({match}) {
      super(match)
      this.state = {
       account :[],
       editprofile:[],
       social:[],
       privacy:[],
       notification:[],
       editprofile:[],
       payment:[],
       userId:'',
      }
      this.match = match
    }
    componentDidMount = () => {
      const jwt = auth.isAuthenticated()
      this.setState({userId:this.match.params.userId})
      read({
        userId: this.match.params.userId
      }, {t: jwt.token}).then((data) => {
        if (data.error) {
          this.setState({error: data.error})
        } else {
           
         this.setState({id: data._id})
        }
      })
    }
    render() {
      const {classes} = this.props          
      return ( <Grid>
              <SettingsTabs editprofile={this.state.editprofile} userId={this.state.userId} account={this.state.account} social={this.state.social} payment={this.state.payment} privacy={this.state.privacy} notification={this.state.notification}/>
              <Typography  style={{ float:"right" }} >
                       <Button color="primary" variant="raised">Logout</Button>
                </Typography>
           </Grid>
      )
    }
  }
  
  Settings.propTypes = {
    classes: PropTypes.object.isRequired
  }
export default withStyles(styles)(Settings)
  