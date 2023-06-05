const Repairs = require('../models/repairs.model');

exports.findAll = async (req, res) => {
  const repairs = await Repairs.findAll({
    where: {
      status: 'pending',
    },
  });

  return res.status(200).json({
    results: repairs.length,
    message: 'find all repairs',
    repairs,
  });
};

exports.create = async (req, res) => {
  try {
    const { date, id } = req.body;
    const repair = await Repairs.create({
      id,
      date,
      status: 'pending',
    });
    return res.status(201).json({
      message: 'create repair',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something its fk 🤪',
    });
  }
};

exports.findRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `The repair with id ${id} not found!`,
      });
    }

    return res.status(200).json({
      message: 'find repair',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something its fk 🤪',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    //* traer repair  a actualizar
    const { id } = req.params;
    //* traer del body la info a actualizar
    const { status } = req.body;
    //* buscar la repair que se va a actualizar
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    //* Verificar si la repair existe
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `The repair with id ${id} not found!`,
      });
    }

    //* actualizar la repair
    await repair.update({ status });

    return res.status(200).json({
      message: 'update repair',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'something its fk 🤪',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    //* traer repair por id y parametros dle usuario
    const { id } = req.params;
    //* buscar producto
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });
    //* Verificar si la repair existe
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `The repair with id ${id} not found!`,
      });
    }

    //* actualizar la repair encontrada y cambiar el status a  cancel/false elim parcial
    await repair.update({ status: 'cancel' });
    //* enviar R= al cliente

    return res.status(200).json({
      message: 'the repair its cancel now ',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something its fk 🤪',
    });
  }
};
