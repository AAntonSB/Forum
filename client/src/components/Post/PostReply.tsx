import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

const useStyles = makeStyles(() => ({

}))

const PostReply: FC = () => {
  const classes = useStyles();
  const { name, id } = useParams<{ name: string, id: string }>();

  return (
    <div>
      
    </div>
  )
}

export default PostReply