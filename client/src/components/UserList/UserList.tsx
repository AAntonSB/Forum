import React, { FC, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, CircularProgress } from '@material-ui/core'
import {UserPayload} from '../../types/Mongo/types'
import userRequests from '../../api'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
}))

interface fetchPayload {
  error: boolean;
  loading: boolean;
}

const UserList: FC = () => {
  // const classes = useStyles();
  const [data, setData] = useState<{ success: boolean, data: UserPayload[] }>()
  const [get, setGet] = useState<fetchPayload>({error: false , loading: true})

  useEffect(() => {
    userRequests.getAll().then(response => {
      setGet({ error: false, loading: false })
      setData(response.data)
    }).catch(err => {
        setGet({error: true, loading: false})
    })

  }, [])

  if (get.loading || !data) {
    return <CircularProgress />
  }

  if (get.error) {
    return <div> an error has occured </div>
  }

  return (
    <div>
      {_.map(data.data, (user, index) => (
        <Accordion key={index}>
          <AccordionSummary> {user.username} </AccordionSummary>
            <AccordionDetails>
              {/* <List>
                {_.map(user.role.access, (acess) => (
                <ListItem>
                  {acess.name}
                </ListItem>
                ))}
              </List> */}
            </AccordionDetails>
          </Accordion>
          ))}
    </div>
  )
}

export default UserList