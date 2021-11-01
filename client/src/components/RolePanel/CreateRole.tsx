import React, { FC, useState, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useUserContext } from '../../contexts/UserContext'
import { roleRequests } from '../../api'
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

interface CreateRoleProps {
  fetchRoles: () => void;
}

const CreateRole: FC<CreateRoleProps> = ({fetchRoles}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const { token } = useUserContext()
  
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        roleName: yup.string().required("A role needs a name")
      }),
    []
  )

  const initialValues = useMemo(
    () => ({
      roleName: ""
    }),
    []
  )

  const onSubmit = useCallback((values) => {
    if (token) {
      roleRequests.create({ name: values.roleName }, { token: token, tokenName: "bearer" }).then((res) => {
        setOpen(false)
        fetchRoles()
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
          <Input placeholder="Role name"
            id="roleName"
            name="roleName"
            value={formik.values.roleName}
            onChange={formik.handleChange}
            error={formik.touched.roleName && Boolean(formik.errors.roleName)}
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
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>Create Role</Button>
      }
      </>
  )
}

export default CreateRole