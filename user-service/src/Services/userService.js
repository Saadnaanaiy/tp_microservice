const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(data) {
  try {
    // Ensure email is valid
    if (!data.email || !data.email.includes('@')) {
      throw new Error('Email invalide');
    }

    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  } catch (error) {
    console.error('Service error - createUser:', error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      throw new Error('ID utilisateur invalide');
    }

    return await prisma.user.findUnique({
      where: { id: parsedId },
    });
  } catch (error) {
    console.error('Service error - getUserById:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
};
