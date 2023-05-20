var maquinaModel = require('../models/maquinaModel');

function selectMaquinas(req, res) {
  maquinaModel.selectMaquinas()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  selectMaquinas
};
