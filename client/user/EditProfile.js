import React, {Component} from 'react'
import Card, {CardActions, CardContent,CardMedia} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Avatar from 'material-ui/Avatar'
import FileUpload from 'material-ui-icons/FileUpload'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import Grid from 'material-ui/Grid'
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

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      about: '',
      photo: '',
      email: '',
      banner:'',
      password: '',
      location:'',
      userId:'',
      redirectToProfile: false,
      error: '',
      editprofile:[],
      open:false,
      loading:false
    }
  //this.props =props;
  }

  
  componentDidMount = () => {
    sleep(500).then(() => {
    this.userData = new FormData()
    const jwt = auth.isAuthenticated()
   
    read({
      userId: this.props.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({id: data._id, name: data.name, email: data.email, about: data.about,location: data.location, loading:true })
      }
    })
  })
  }
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined,
      about: this.state.about || undefined,
      location: this.state.location || undefined
    }
    update({
      userId: this.props.userId
    }, {
      t: jwt.token
    }, this.userData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'redirectToProfile': false,open:true, profilemsg:`Your Profile is updated Successfully.` })
      }
    })
    
  }

  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.userData.set(name, value)
    this.setState({ [name]: value })
  }
  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }
  handleBackgroundChange = name => event => {
    const value = name === 'banner'
      ? event.target.files[0]
      : event.target.value
    this.userData.set(name, value)
    this.setState({ [name]: value })
    // update({
    //   userId: this.props.userId
    // }, {
    //   t: jwt.token
    // }, this.userData).then((data) => {
    //   if (data.error) {
    //     this.setState({error: data.error})
    //   } else {
    //     this.setState({'redirectToProfile': false,open:true, profilemsg:`${data.name} profile is updated Successfully.` })
    //   }
    // })
}
  render() {
    const {classes} = this.props
    const photoUrl = this.state.id
                 ? `/api/users/photo/${this.state.id}?${new Date().getTime()}`
                 : '/api/users/defaultphoto'
    const bannerUrl = this.state.id
                    ? `/api/users/banner/${this.state.id}?${new Date().getTime()}`
                    : '/api/users/defaultbanner'           
    if (this.state.redirectToProfile) {
      return (<Redirect to={'/setting/' + this.state.id}/>)
    }
    if (this.state.loading) {
    return ( 
      <Card className={classes.card} style={{width:"400px"  }}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Profile
          </Typography> 
          <Grid style={{width:"350px"  }}>
          <img src={bannerUrl}
            title="banner image" style={{ width:"250px", height:"100px" }}
          />
            <Typography style={{ float:"left",width:"100px" }}>
            <Avatar src={photoUrl} className={classes.bigAvatar}/><br/>    
          <input accept="image/*" onChange={this.handleChange('photo')} className={classes.input} id="icon-button-file" type="file"  />
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="default" component="span">
              Change Picture
              <FileUpload/>
            </Button>
          </label> <span className={classes.filename}>{this.state.photo ? this.state.photo.name : ''}</span><br/>
            </Typography>
            <Typography style={{ float:"right" }}>
          <input accept="image/*" onChange={this.handleBackgroundChange('banner')} className={classes.input} id="icon-button-file1" type="file" />
          <label htmlFor="icon-button-file1">
            <Button variant="raised" color="default" component="span">
               Upload cover Image
              <FileUpload onClick={this.handleBackgroundChange}/>
            </Button>
          </label> <span className={classes.filename}>{this.state.banner ? this.state.banner.name : ''}</span><br/>
          </Typography>
          </Grid>
          <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
          <TextField id="email" type="email" label="Username" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="Location (Optional)"
            multiline
            rows="2"
            value={this.state.location}
            onChange={this.handleChange('location')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField
            id="multiline-flexible"
            label="BIO"
            multiline
            rows="2"
            value={this.state.about}
            onChange={this.handleChange('about')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal" style={{ display:"none" }}/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {this.state.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          onClose={this.handleRequestClose}
          autoHideDuration={6000}
          message={<span >{this.state.profilemsg}</span>}
      />
      </Card>
      
    )
    }
    else
    {
      return null;
    }
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  editprofile: PropTypes.array.isRequired
}

export default withStyles(styles)(EditProfile)
