import { DataTypes } from "sequelize";
import db from "../config/dbConnect.js";

const Quadro = db.define("Quadro", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

export default Quadro;
