import request from 'supertest';
import app from './index.js'; // Asegúrate de exportar 'app' en tu index.js
import prisma from './db.js';

// Simulamos Prisma para no tocar la DB real
jest.mock('./db.js', () => ({
  usuarioTienda: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));