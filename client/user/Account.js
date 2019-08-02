import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Avatar from 'material-ui/Avatar'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Redirect} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import auth from './../auth/auth-helper'
import {read,update} from './api-user.js'
import DeleteUser from './DeleteUser'
import Snackbar from 'material-ui/Snackbar'

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
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account:[],
      oldpassword:'',
      newpassword:'',
      password:'',
      error: '',
      redirectToProfile: false,
      userId:'',
      open:false,
      msg:'',
    }
   this.props = props

  }
  componentDidMount = () =>
   {
     this.userData = new FormData()
     const jwt = auth.isAuthenticated()
     read({
       userId: this.props.userId
     }, {t: jwt.token}).then((data) => {
       if (data.error) {
         this.setState({error: data.error})
       } else {
         this.setState({id: data._id, oldpassword: data.password})
       }
     })
   }

   handleChange = name => event => {
    const value = event.target.value
    this.userData.set(name, value)
    this.setState({ [name]: value })
  }
  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
  
    const user = {
      oldpassword: this.state.oldpassword || undefined,
      newpassword: this.state.newpassword || undefined,
      password: this.state.password || undefined
    }
    if(this.state.newpassword!==this.state.password || (this.state.password.length<6 && this.state.newpassword.length<6))
    {  sleep(100).then(() => {
         this.state.msg ="Password doesnt match or must be 6 characters"
        })
     }
  else
  {  
    update({
      userId: this.props.userId
    }, {
      t: jwt.token
    }, this.userData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'redirectToProfile': false,open:true,passwordmsg:`Your Password is Updated Successfully.`})
      }
    })

  }
}

  render() {
    return (
     
      <Card style={{ width:"400px",height:"500px" }} >
        <CardContent >
          <Typography type="headline" component="h2"  >
             Change Password
          </Typography> 
          <span style={{ color:'red' }}>{this.state.msg} </span>
          <TextField id="password" type="password" label="Current Password"  value={this.state.oldpassword}  margin="normal" onChange={this.handleChange('oldpassword')} /><br/>
          <TextField id="newpassword" type="password"  value={this.state.newpassword} label="New Password"  margin="normal"   onChange={this.handleChange('newpassword')}/><br/>
          <TextField id="confirmpassword" type="password" value={this.state.password}  label="Confirm Password" margin="normal" onChange={this.handleChange('password')}/>
        </CardContent>
        <CardActions style={{ float:"right" }}>
          <Button color="secondary" variant="raised" onClick={this.clickSubmit} >Save</Button>
        </CardActions>
        <CardContent style={{ padding:"20px", margin:"50px 0px 10px 0px" }}>
        <Typography><DeleteUser userId={this.props.userId}/>Delete this Account
        </Typography>
        </CardContent>
        <CardContent>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          onClose={this.handleRequestClose}
          autoHideDuration={6000}
          message={<span >{this.state.passwordmsg}</span>}
      />
        </CardContent>
      </Card>
      
    )
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.array.isRequired,
}

export default withStyles(styles)(Account)
