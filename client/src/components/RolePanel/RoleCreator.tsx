import React, { FC, useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useUserContext } from '../../contexts/UserContext'
import { subForumRequests, roleRequests } from '../../api'
import {
  List,
  ListItem,
  Backdrop,
  Button,
  Typography,
  Checkbox,
} from '@material-ui/core'
import _ from 'lodash'
import CreateRole from './CreateRole'
import CreateBoard from './CreateBoard'

const useStyles = makeStyles(() => ({
  selected: {
    boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
    backgroundColor: "#E6E6FA",
    borderRadius: "4px",
    textAlign: "center",
    cursor: "pointer",
  },
  unSelected: {
    borderRadius: "4px",
    textAlign: "center",
    boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F7F7F7",
      boxShadow: "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
    }
  },
  backdrop: {
    zIndex: 3000
  },
  disbandBackdropDiv: {
    zIndex: 3001,
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  rolePanel: {
    zIndex: 3002,
    borderRadius: "4px",
    boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    fontFamily: "Montserrat",
    backgroundColor: "white",
    display: "grid",
    padding: "5px 30px 5px 30px",
    gridTemplateColumns: "47% 6% 47%",
    height: "80%",
    width: "45%",
  },
  title: {
    textAlign: "center"
  },
  listItemText: {
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    fontWeight: 600
  }
}))



interface Role {
  _id: string;
  name: string;
  subForumAccess: string[];
}

interface RoleCreatorProps {
  roles: Role[];
  fetchRoles: () => void;
}

interface SelectedItem {
  role: boolean;
  position: number;
}

const RoleCreator: FC<RoleCreatorProps> = ({roles, fetchRoles}) => {
  const { token, setToken } = useUserContext()
  const [open, setOpen] = useState<boolean>(false);
  const [item, setItem] = useState<SelectedItem>({ role: true, position: 0});
  const [boards, setBoards] = useState<any>()
  const classes = useStyles();

  useEffect(() => {
    if (token) {
      subForumRequests.getAll().then((res) => {
        setBoards(res.data.data)
      })
    }
  }, [])

  const fetchSubForums = useCallback(() => {
    if (token) {
      subForumRequests.getAll().then((res) => {
        setBoards(res.data.data)
      })
    }
  }, [])
  
  const addBoardToRole = useCallback((boardID: string, roleID: string) => {
    if (token) {
      roleRequests.update({ subForumID: boardID, roleID: roleID }, { token: token, tokenName: "bearer" }).then((res) => {
        fetchRoles()
    }).catch((err) => {setToken(null)})}
  }, [])
  

  return (
    <>
      <Backdrop open={open} className={classes.backdrop}>
        <div id="disbandBackdrop" onClick={() => setOpen(false)} className={classes.disbandBackdropDiv} ></div>
        <div className={classes.rolePanel}>
          <div>
            <List>
              <ListItem style={{justifyContent: "center", display: "grid", paddingRight: "20%" }} className={classes.title}><Typography variant="h3">Roles</Typography></ListItem>
              <ListItem style={{justifyContent: "center", display: "grid", paddingRight: "20%" }}><CreateRole fetchRoles={fetchRoles}/></ListItem>
              {_.map(roles, (role, index) => (
                <ListItem
                  key={index}
                style={{ display: "grid", gridTemplateColumns: "80% 20%" }}>
                <div className={index === item.position && item.role?classes.selected:classes.unSelected} onClick={() => setItem({role: true, position: index})}>
                  <Typography className={classes.listItemText}>{role.name}</Typography>
                </div>
                  <Checkbox
                    checked={
                      (index === item.position && item.role) ||
                      (!item.role && role.subForumAccess.includes(boards[item.position]._id))}
                    onClick={() => addBoardToRole(boards[item.position]._id, role._id)}
                    disabled={item.role} />
              </ListItem>
              ))}
            </List>
          </div>
          <div/>
          <div>
            <List>
              <ListItem style={{justifyContent: "center", display: "grid", paddingLeft: "20%" }} className={classes.title}><Typography className={classes.title} variant="h3">Boards</Typography></ListItem>
              <ListItem style={{justifyContent: "center", display: "grid", paddingLeft: "20%" }}><CreateBoard fetchSubForums={fetchSubForums}/></ListItem>
              {_.map(boards, (board, index) => (
                <ListItem
                  key={index}
                style={{ display: "grid", gridTemplateColumns: "20% 80%" }}>
                  <Checkbox
                    onClick={() => addBoardToRole(board._id, roles[item.position]._id)}
                    disabled={!item.role}
                    checked={
                      (parseInt(index) === item.position && !item.role) ||
                      (item.role && roles[item.position].subForumAccess.includes(board._id))
                      } />
                <div className={parseInt(index) === item.position && !item.role?classes.selected:classes.unSelected} onClick={() => setItem({role: false, position: parseInt(index)})}>
                  <Typography className={classes.listItemText}>{board.title}</Typography>
                </div>
              </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Backdrop>
      <Button onClick={ () => setOpen(true)}>Create Roles</Button>
    </>
  )
}

export default RoleCreator