import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import List, {ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Edit from 'material-ui-icons/Edit'
import {Redirect,Link} from 'react-router-dom'
import GridList, { GridListTile } from 'material-ui/GridList'
import {ProductList,ProductRemove} from './api-user.js'
import Shop from './Shop'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import Grid from 'material-ui/Grid'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import DeleteProduct from './DeleteProduct'
import auth from './../auth/auth-helper'
const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit*2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
})
class ShopGrid extends Component {
  constructor() {
    super()
    this.state = {
      shop:[],

    }
  }

  componentDidMount = () => {
    ProductList().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({shop: data})
      }
    })
  }
 
  render() {
    const {classes} = this.props
    return (<ListItem className={classes.root}>
      <Grid>
      <Grid>
         {this.state.shop.map((item, i) => {
          return <CardContent>
                      <Grid >
                          <IconButton aria-label="Edit" color="primary">
                          <List dense style={{ width:"500px",padding:"5px 0px 5px 50px" }}>
                         <ListItem >
                          <ListItemText primary={item.productname}/>
                          <ListItemText primary={item.price}/>
                          <ListItemText primary={item.description}/><Link to={"/editproduct/" + item._id} key={i}><Edit/></Link><DeleteProduct productId={item._id}/>
                          </ListItem>
                          </List>
                          </IconButton>
                          <ListItemSecondaryAction>
                          </ListItemSecondaryAction>
                      </Grid>
           </CardContent>
               })
             }
        </Grid>
           <CardContent>
                <Grid>
                    <Link to="/shop">
                          <Button color="primary" autoFocus="autoFocus" variant="raised">
                              Add Product
                          </Button>
                    </Link>
                  </Grid>
           </CardContent> 
      </Grid>
 </ListItem>
    )
  }
}

ShopGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  shop: PropTypes.array.isRequired,
}

export default withStyles(styles)(ShopGrid)
