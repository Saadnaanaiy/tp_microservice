const userService = require('../Services/userService');

exports.createUser = async (req, res) => {
  try {
    if (!req.body || !req.body.name || !req.body.email) {
      return res
        .status(400)
        .json({ message: 'Données utilisateur incomplètes' });
    }

    const newUser = await userService.createUser(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur création user:', error);

    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    return res
      .status(500)
      .json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'ID utilisateur invalide' });
    }

    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Erreur récupération user:', error);
    return res
      .status(500)
      .json({ message: 'Erreur serveur', error: error.message });
  }
};
