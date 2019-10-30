const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    thumbnail: String,
    nome: String,
    data: String,
    genero: String,
    comentarios: String,
    favorito: {
      default: 0,
      type: Number
    },
    assistiu: {
      default: 0,
      type: Number
    },
    maisTarde: {
      default: 0,
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
