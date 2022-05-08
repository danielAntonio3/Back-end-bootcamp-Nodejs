const { mongoose } = require('../config/db');
const { Schema } = require('mongoose');
// Tarea de investigación schemas
// Características:
/*
1.- Cada schema es un modelo de mongoose, es decir, una colección de documentos.
2.- De forma predeterminada mongo agrega un _id
3.- Mongo siempre agrega una s al final de los nombres de las colecciones
ejemplo: User -> Users
*/

const UserSchema = new Schema({
  name: {
    type: String, // Tipo de dato
    trim: true, // Para que quite los espacios en blanco
    required: true, // Para que sea obligatorio
    lowercase: true, // Para que sea en minúsculas
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true, // Para que sea único
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    min: 8,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
  },
  createIn: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;

// minuto 36:29
