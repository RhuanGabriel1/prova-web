const app = require("./config/server");
const routes = require('./app/routes/routes');


routes.addPetition(app);
routes.getAllPetition(app);
routes.apiGetOnePetition(app);
routes.deletePetitionByid(app);
routes.updatePetitionById(app);
routes.signPetition(app);
routes.authUser(app);
routes.removeSign(app);