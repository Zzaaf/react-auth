import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import * as endPoints from '../../config/endPoints'
import { disableLoader, enableLoader } from "../../redux/ac/loader.ac"
import Loader from "../Loader/Loader"

const UserList =() => {

  const [list, setList] = useState([])

  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader)
  const userId = useSelector(state => state.user._id)

  useEffect(() => {
    dispatch(enableLoader())
    fetch(endPoints.getAllUsers(), {credentials: 'include'})
      .then(response => response.json())
      .then(users => setList(users))
      .catch((e) => console.error('>>>>>>>>>', e)) 
      .finally(() => {
        dispatch(disableLoader())
      })
  }, []) 

  console.log(userId)

  return (
    <>
    {
      loader ? <Loader /> :
      list.length ? 
        <div className="d-flex justify-content-center">
          <div className="list-group">
            {list.map(user => (
              <Link 
                key={user._id} 
                className={`list-group-item list-group-item-action ${userId === user._id ? 'active' : ''}`}
                to={`/users/${user._id}`}>
                  {user.userName}
                </Link>
            ))}
          </div>
        </div>
        : 
        <p>Not users</p>
    }
    </>
  )
}

export default UserList