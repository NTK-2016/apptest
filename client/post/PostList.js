import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Post from './Post'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

class PostList extends Component {
  render() {
    return (
      <div style={{marginTop: '24px'}}>
        {this.props.posts.map((item, i) => {
            return <Post post={item} key={i} onRemove={this.props.removeUpdate}/>
                 
          })
        }
          <Grid>
                <CardContent>
                <Typography>
                Post your own Creative Content
                project and showcase your talents
                <Grid>
                <Button variant="raised" color="default" component="span">
                Become a Content Creator 
                </Button>  
                </Grid>
              </Typography>
              </CardContent>
        </Grid>
      </div>
    )
  }
}
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
export default PostList
