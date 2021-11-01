import React, { FC, useState, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useUserContext } from '../../contexts/UserContext'
import { subForumRequests } from '../../api'
import { Button, Input } from '@material-ui/core'
import { useFormik } from "formik"
import * as yup from "yup"

const useStyles = makeStyles(() => ({
  mainDivider: {
    display: "grid"

  },
  buttonDivider: {
    display: "grid",
    gridTemplateColumns: "50% 50%"
  },
  cancelButton: {
    justifySelf: "start"
  },
  createButton: {
    justifySelf: "end"
  }
}))

interface CreateBoardProps {
  fetchSubForums: () => void;
}

const CreateBoard: FC<CreateBoardProps> = ({fetchSubForums}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const { token } = useUserContext()
  
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        boardName: yup.string().required("A board requires a title")
      }),
    []
  )

  const initialValues = useMemo(
    () => ({
      boardName: ""
    }),
    []
  )

  const onSubmit = useCallback((values) => {
    if (token) {
      subForumRequests.create({ title: values.boardName }).then((res) => {
        setOpen(false)
        fetchSubForums()
      })
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <>
      {open ? <div className={classes.mainDivider}>
        <form onSubmit={formik.handleSubmit}>
          <Input placeholder="Board name"
            id="boardName"
            name="boardName"
            value={formik.values.boardName}
            onChange={formik.handleChange}
            error={formik.touched.boardName && Boolean(formik.errors.boardName)}
          />
          <div className={classes.buttonDivider}>
            <Button className={classes.cancelButton} onClick={() => {
              // Reset input field
              setOpen(false)
            }}>Cancel</Button>
              <Button type="submit" className={classes.createButton}>Create</Button>
          </div>
        </form>
      </div> :
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>Create Board</Button>
      }
      </>
  )
}

export default CreateBoard