const app = require('../../config/server');
const Petition = require('../controllers/petitionController');
const authMidleware = require('../midlewares/auth');

module.exports = {
    getAllPetition: (app) =>{
        app.get('/api/petitions',Petition.apiGetAllPetition);
    },
    addPetition: (app) =>{
        app.post('/api/petitions',authMidleware, Petition.addPetition);
    },
    apiGetOnePetition: (app) =>{
        app.get('/api/petitions/:id', Petition.apiGetOnePetition);
    },
    deletePetitionByid: (app) =>{
        app.delete('/api/petitions/:id', Petition.deletePetitionById);
    },
    updatePetitionById: (app) =>{
        app.put('/api/petitions/:id',authMidleware, Petition.updatePetitionById);
    },
    signPetition: (app) =>{
        app.put('/api/petitions/sign/:id', authMidleware, Petition.signPetition);
    },
    removeSign: (app) =>{
        app.delete('/api/petitions/sign/remove/:id',authMidleware, Petition.removeSign);
    },
    authUser: (app) =>{
        app.post('/api/petitions/auth', Petition.authUser);
    },
}