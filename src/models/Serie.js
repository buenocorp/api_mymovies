const mongoose = require("mongoose");

const SerieSchema = new mongoose.Schema(
  {
    thumbnail: String,
    nome: String,
    data: String,
    genero: String,
    comentarios: String,
    episodio: {
      default: 1,
      type: Number
    },
    temporada: {
      default: 1,
      type: Number
    },
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

module.exports = mongoose.model("Serie", SerieSchema);
