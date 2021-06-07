const userModel = require('../models/user.model')

const editUser = async (req, res) => {
  let updatedFields = Object.entries(req.body).filter((el) => el[1].trim())
  if (updatedFields.length) {
    updatedFields = Object.fromEntries(updatedFields)
    try {
      // eslint-disable-next-line max-len
      const updatedUser = await userModel.findByIdAndUpdate(req.session.user.id, updatedFields, { new: true })
      return res.json(updatedUser)
    } catch (error) {
      return res.sendStatus(500)
    }
  }
  return res.sendStatus(418)
}

const getUser = async (req, res) => {
  const { id } = req.params
  const currentUser = await userModel.findById(id, { password: 0 })
  setTimeout(() => {
    res.json(currentUser)
  }, 2e3)
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find()
    return res.json(allUsers)
  } catch (error) {
    return res.sendStatus(500)
  }
}

module.exports = {
  editUser,
  getUser,
  getAllUsers,
}
