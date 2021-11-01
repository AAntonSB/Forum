import React, {FC, useCallback, useMemo} from 'react'
import { userRequests, roleRequests } from '../../api'
import { makeStyles } from '@material-ui/styles'
import { useUserContext } from '../../contexts/UserContext'
import { useFormik } from "formik"
import * as yup from "yup"
import { AssignmentOutlined } from '@material-ui/icons'
// import  AssignmentOutlinedIcon from '@material-ui/icons';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
} from '@material-ui/core'
import _ from 'lodash'
import RoleCreator from '../RolePanel'

const useStyles = makeStyles(() => ({
  userObject: {
    display: "grid",
    gridTemplateColumns: "10% auto auto auto"
  }
}))

interface Role {
  _id: string;
  name: string;
  subForumAccess: string[];
}

interface UserObjectProps {
  email: string;
  username: string;
  role: string;
  createdAt: Date;
  comment: string;
  _id: string;
  roles: Role[] | undefined;
  fetchUsers: () => void
}

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */


  return color;
}

const stringAvatar = (username: string) => {
  return {
    style: {
      backgroundColor: stringToColor(username),
    },
    children: username.charAt(0).toUpperCase()
  }
}

const UserObject: FC<UserObjectProps> = ({email, username, role, createdAt, comment, _id, roles, fetchUsers}) => {
  const classes = useStyles();
  const { token, setToken } = useUserContext()

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        comment: yup.string(),
        role: yup.string()
      }),
    []
  )

  const initialValues = useMemo(
    () => ({
      comment: comment,
      role: role?role:-1
    }),
    []
  )

  const onSubmit = useCallback((values) => {
    if (token) {
      //Check role
      userRequests.update({ comment: values.comment, roleID: values.role, userID: _id }, { token: token, tokenName: "bearer" }).then((res) => {
        fetchUsers()
      }).catch(() => setToken(null))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteUser = useCallback(() => {
    if(token){
      userRequests.delete({ userID: _id }, { token: token, tokenName: "bearer" }).then(() => { fetchUsers() })
      }
  },[])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
    <ListItem className={classes.userObject}>
      <ListItemAvatar><Avatar {...stringAvatar(username)}/></ListItemAvatar>
      <div>
        <Typography><b>Email:</b> {email}</Typography>
        <Typography>
          <b>Role: </b>
          <Select
              value={formik.values.role}
              onChange={(e) =>
                // Potentialy add more logic so that superadmin cant be set and switched from but only seen
                formik.setFieldValue("role", e.target.value)}
          >
            <MenuItem value={-1}>Default</MenuItem>
            {_.map(roles, (role, index) => {
              return <MenuItem key={index} value={role._id}>{role.name}</MenuItem>
            })}
          </Select>

        </Typography>
        <Typography><b>Created at:</b> {createdAt}</Typography>
        <Typography>
          <b>ID:</b> {_id}
          <IconButton
            style={{ padding: 0}}
            onClick={() => navigator.clipboard.writeText(_id)}>
            <AssignmentOutlined style={{ padding: 0}}/>
          </IconButton>
        </Typography>
      </div>
      <div>
        <Typography><b>Comment:</b></Typography>
        <TextField
            fullWidth
            multiline
            id="comment"
            name="comment"
            variant="outlined"
            rows={5}
            value={formik.values.comment}
            onChange={formik.handleChange}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            helperText={formik.touched.comment && formik.errors.comment}
            />
      </div>
      <div>
        <Button type="submit">Save Changes</Button>
        <Button onClick={() => deleteUser()}>Remove</Button>
      </div>
    </ListItem>
    </form>
  )
}

export default UserObject;