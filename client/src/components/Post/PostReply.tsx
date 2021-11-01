import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import {TextField} from '@material-ui/core'
import { useFormik } from "formik"
import * as yup from "yup"

const useStyles = makeStyles(() => ({

}))

const PostReply: FC = () => {
  const classes = useStyles();
  

  return (
    <div>
      <TextField></TextField>
    </div>
  )
}

export default PostReply