import React, {useEffect, useState, useCallback} from 'react'
import { List, CircularProgress, Typography } from '@material-ui/core'
import { useUserContext } from '../../contexts/UserContext'
import { useHistory } from 'react-router-dom'
import { userRequests, roleRequests } from '../../api'
import _ from 'lodash'
import UserObject from './UserObject'
import RoleCreator from '../RolePanel'

interface User {
  _id: string;
  email: string;
  username: string;
  role: string;
  createdAt: Date;
  comment: string;
}

interface Role {
  _id: string;
  name: string;
  subForumAccess: string[];
}

const UserList = () => {
  const { token, setToken } = useUserContext()
  const [roles, setRoles] = useState<Role[]>()
  const [users, setUsers] = useState<User[]>()
  const history = useHistory();

  useEffect(() => {
    if (token) {
    const tokenObject = { token: token, tokenName: "bearer" }

    userRequests.getAllUsers(tokenObject).then(res => {
      setUsers(res.data.data)
    })
    roleRequests.getAllFrom(tokenObject).then(res => {
        setRoles(res.data.data)
    })
    } else {
      setToken(null)
    history.push("/")
  }
  }, [token])

  const fetchRoles = useCallback(() => {
    if(token){
    roleRequests.getAllFrom({ token: token, tokenName: "bearer" }).then(res => {
        setRoles(res.data.data)
    })}
  }, [])
  
    const fetchUsers = useCallback(() => {
    if(token){
    userRequests.getAllUsers({ token: token, tokenName: "bearer" }).then(res => {
      setUsers(res.data.data)
    })}
  },[])
  
    if (!roles) {
    return <CircularProgress/>
  }

  return <>
    <List style={{ textAlign: "center"}}>
      <Typography variant="h1">Users</Typography>
      <RoleCreator roles={roles} fetchRoles={fetchRoles} />
      <div style={{display: "grid", justifyContent: "center"}}>
      {_.map(users, (user, index) => (
        <UserObject
          email={user.email}
          username={user.username}
          role={user.role}
          createdAt={user.createdAt}
          comment={user.comment}
          _id={user._id}
          key={index}
          roles={roles}
          fetchUsers={fetchUsers}
        />
      ))}
      </div>
  </List>
  </>
}

export default UserList