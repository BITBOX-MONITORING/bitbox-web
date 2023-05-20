var maquinaModel = require('../models/maquinaModel');

function selectmaquinas(req, res) {
  maquinaModel.selectmaquinas()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  selectmaquinas
};
