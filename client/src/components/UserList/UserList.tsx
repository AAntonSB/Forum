import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
}))

const users = [
  { id: "id", role: { id: "", name: "name", access: [{ id: "id", name: "name"}]} }
]

const UserList: FC = () => {
  const classes = useStyles();

  return (
    <div>
      {_.map(users, (user) => (
        <Accordion>
          <AccordionSummary> {user.id} </AccordionSummary>
          <AccordionDetails>
            <List>
              {_.map(user.role.access, (acess) => (
              <ListItem>
                {acess.name}
              </ListItem>
              ))}
            </List>
          </AccordionDetails>
           </Accordion>
          ))}
    </div>
  )
}

export default UserList