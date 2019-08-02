import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import {Link} from 'react-router-dom'
import {findPeople, follow} from './api-user.js'
import auth from './../auth/auth-helper'
import Snackbar from 'material-ui/Snackbar'
import ViewIcon from 'material-ui-icons/Visibility'
import Grid from 'material-ui/Grid'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import { GridList } from 'material-ui';
const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: 0
  }),
  title: {
    margin: `${theme.spacing.unit * 0}px ${theme.spacing.unit}px ${theme.spacing.unit * 1}px  ${theme.spacing.unit*0}`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  avatar: {
    marginRight: theme.spacing.unit * 1
  },
  follow: {
    right: theme.spacing.unit * 2
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: 'middle'
  }
})
class SuggestedFollower extends Component {
  state = {
      users: [],
      open: false
  }
  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    findPeople({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }
  clickFollow = (user, index) => {
    const jwt = auth.isAuthenticated()
    follow({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, user._id).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        let toFollow = this.state.users
        toFollow.splice(index, 1)
        this.setState({users: toFollow, open: true, followMessage: `Following ${user.name}!`})
      }
    })
  }
  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }
  render() {
    const {classes} = this.props
    return (<div>
      <div className={classes.root} elevation={4} >
        <Typography type="title" className={classes.title}>
           Suggested For You
        </Typography>
        <Grid> 
          {this.state.users.map((item, i) => {
              return <span key={i} >
                <Grid>  
                    <List>
                    <ListItem  style={{ float:"right" }}>
                    <ListItemAvatar className={classes.avatar}>
                    <Link to={"/user/" + item._id}><Avatar src={'/api/users/photo/'+item._id}/></Link>
                    </ListItemAvatar>
                    <ListItemText primary={item.name}/>
                    </ListItem>
                    </List>
               </Grid>
           </span>
            })
          }
        </Grid>
      </div>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          onClose={this.handleRequestClose}
          autoHideDuration={6000}
          message={<span className={classes.snack}>{this.state.followMessage}</span>}
      />
    </div>)
  }
}

SuggestedFollower.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SuggestedFollower)
