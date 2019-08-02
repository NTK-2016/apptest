import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Link} from 'react-router-dom'
import {activatelink} from './api-user.js'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
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
  text:
  {
      color:"#fca726",
      textAlign:"center",
      margin:"10px 120px 0px 120px",
      fontSize:"1.2em",
      fontFamily:"Helventica, sans-serif,Roboto"
  }
})

class LinkActivation extends Component {
    constructor({match}) {
        super()
        this.state = {
            status: 1,
            token: '',
            error: ''
          }
        this.match = match
      }
  onLoad = () => 
   {
       const user = {
       token : this.state.token
       }
       console.log("abc"+user)
    //    activatelink({
    //     token: this.match.params.token
    //     },user).then((data) => {
    //         if (data.error) {
    //         this.setState({error: data.error})
    //         } 
    //     })

  }
  

  render() {
    const {classes} = this.props
    return (<div onLoad={this.onLoad('token')}>
      <Card className={classes.card} >
        <CardActions >
            <Typography >  
                <Typography className={classes.text}>
                Your Account is Activated Successfully.
                </Typography>
                    <Link to="/signin">
                    <Button color="primary" autoFocus="autoFocus" variant="raised">
                    Sign In
                    </Button>
                </Link>
            </Typography>
        </CardActions>
      </Card>
    </div>)
  }
}

LinkActivation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LinkActivation)
