const { mongoose } = require('../config/db');
// Tarea de investigación schemas
// Características:
/*
1.- Cada schema es un modelo de mongoose, es decir, una colección de documentos.
2.- De forma predeterminada mongo agrega un _id
3.- Mongo siempre agrega una s al final de los nombres de las colecciones
ejemplo: User -> Users
*/

const UserSchema = new mongoose.Schema({
  name: {
    type: String, // Tipo de dato
    trim: true, // Para que quite los espacios en blanco
    required: true, // Para que sea obligatorio
    lowercase: true, // Para que sea en minúsculas
    required: [true, 'El nombre es requerido'],
    minlength: [3, 'No menor a 3 caracteres'],
    maxlength: [100, 'No mayor a 100 caracteres'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'El email es requerido'],
    unique: [true, 'Email ya registrado'],
    lowercase: true,
    match: [/^[\w\.-]+@[\w]+\.[\.\w]+$/, 'Email no valido'],
  },
  password: {
    type: String,
    trim: true,
    min: 8,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'employer', 'applicant'],
  },
  createIn: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
