const Users = require('./../models/users.model');

exports.findAll = async (req, res) => {
  const users = await Users.findAll({
    where: {
      status: 'available',
    },
  });
  return res.status(200).json({
    results: users.length,
    message: 'find all users',
    users,
  });
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //* crear producto con el modelo
    const user = await Users.create({
      name,
      email,
      password,
      role,
    });
    //* enviar R= al usuario
    return res.status(201).json({
      message: 'create user',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    //* traer id de la Req del usuario
    const { id } = req.params;
    //* buscar usuario en bd
    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    //* verificar si el usuario existe
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user with id ${id} not found!`,
      });
    }

    //* R= al cliente
    return res.status(200).json({
      message: 'user finded',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something its fk 🤪',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    //* traer prod a actualizar
    const { id } = req.params;
    //* traer del body la info a actualizar
    const { name, email } = req.body;

    //* se busca prod a actializar
    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    //* verificar si el usuario existe
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user with id ${id} not found!`,
      });
    }
    //* actualizar el usuerio encontrado
    await user.update({
      name,
      email,
    });
    //* enviar R= al usuario
    return res.status(200).json({
      message: 'update user',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something its fk 🤪',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    //* traer el usuario a eliminar
    const { id } = req.params;

    //* buscar usuario
    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    //* verificar si el usuario existe
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user with id ${id} not found!`,
      });
    }

    //* remover el user encontrado y cambiar status parcial
    await user.update({
      status: false,
    });
    //* enviar R= al usuario
    return res.status(200).json({
      message: 'delete user',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something its fk 🤪',
    });
  }
};
