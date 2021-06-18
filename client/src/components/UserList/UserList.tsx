import React, { FC, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, CircularProgress } from '@material-ui/core'
import { UserPayload, FetchPayload } from '../../types/Mongo/types'
import {useHistory} from 'react-router-dom'
import {userRequests} from '../../api'
import _ from 'lodash'

const useStyles = makeStyles(() => ({
}))

const UserList: FC = () => {
  // const classes = useStyles();
  const [data, setData] = useState<{ success: boolean, data: UserPayload[] }>()
  const [get, setGet] = useState<FetchPayload>({ error: false, loading: true })
  const history = useHistory()

  useEffect(() => {
    userRequests.loggedInUser().then(res => {
      if (!res.data) {
        history.push("/")
      } else {
            userRequests.getAll().then(response => {
      setGet({ error: false, loading: false })
      setData(response.data)
    }).catch(err => {
        setGet({error: true, loading: false})
    })
      }
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
          <AccordionSummary> {user.email} </AccordionSummary>
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