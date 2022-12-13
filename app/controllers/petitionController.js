const res =require("express/lib/response");
const Joi = require("joi");
const jtw = require("jsonwebtoken");
const config = require("../../config/auth.json");
const Petition = require("../models/petitionModel");


const generateToken = (properties) => jtw.sign(properties, config.secret, {
    expiresIn: 3600,
} )

const schema = Joi.object().keys({
  titulo: Joi.string().required(),
  descricao: Joi.string().required(),
  foto: Joi.string().required(),
});

module.exports = class Petitions {
  static async apiGetAllPetition(req, res, next) {
    console.log("Controller Get Petitions");
    try {
      const petitions = await Petition.getAllPetition();
      if (petitions.length <= 0) {
        res.status(404).json("Não existe petições cadastradas");
        return;
      }
      res.status(200).json(petitions);
    } catch (error) {
      console.log(`GET ALL PETITIONS ERROR: ${error}`);
      res.status(500).json({ error: error });
    }
  }

  static async apiGetOnePetition(req, res, next) {
    try {
      const onePetition = await Petition.getOnePetitionById(req.params.id);
      if (onePetition.length <= 0) {
        res.status(404).json("Não existe petições cadastradas");
        return;
      }
      res.status(200).json(onePetition);
    } catch (error) {
      console.log(`GET ONE PETITION ERROR: ${error}`);
      res.status(404).json(`Id incorreto`);
      return;
    }
  }

  static async addPetition(req, res, next) {
    console.log(`Controller Post Petition`, req.body);
    const { error, value } = schema.validate(req.body);
    if (error) {
      const result = {
        msg: `Campos não foram preenchidos corretamente`,
        error: error.details,
      };
      res.status(404).json(result);
      return;
    }
    try {
      await Petition.addPetition(req.body, req.id);
      res.status(200).json(`Petição ${req.body.titulo} adicionada com sucesso`);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async deletePetitionById(req, res, next) {
    try {
      const findPetition = await Petition.getOnePetitionById(req.params.id);
      if(!findPetition.usuario.includes(String(req.id))) return res.status(401).json(`Apenas o usuário que criou pode alterar a petição`);
      const petitionDelete = await Petition.deletePetitionById(req.params.id);
      if(!petitionDelete) return res.status(404).json(`Petição não encontrada`);
      res.status(200).json(`Petição: ${req.params.id} removida com sucesso`);
    } catch (error) {
      res.status(500).json({error: error});
    }
  }

  static async updatePetitionById(req, res, next) {
    try {
      const findPetition = await Petition.getOnePetitionById(req.params.id);
      if(!findPetition.usuario.includes(String(req.id))) return res.status(401).json(`Apenas o usuário que criou pode alterar a petição`);
      const obj = {};
      obj["titulo"] = req.body.titulo;
      obj["descricao"] = req.body.descricao;
      const petition = await Petition.updatePetitionById(req.params.id, obj);
      if(!petition) return res.status(404).json(`Petição não encontrada`);
      res.status(200).json(`Petição ${req.params.id} alterado com sucesso`);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async signPetition(req, res, next) {
    try {
      const signedPetition = await Petition.signPetition(req.params.id, req.id);
      if(!signedPetition) return res.status(404).json(`Petição não encontrada`);
      if(signedPetition.listaAssinantes.includes(String(req.id))) return res.status(302).json(`Você já assinou essa petição`);
    } catch (error) {
      return res.status(200).json(`Petição ${req.params.id} assinada com sucesso`);
      // res.status(500).json(`Vai dar ruim demais`);
    }
  }

  static async authUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        res.status(400).send({
          message: `Email inválido`,
        });
      }
      const emailUsuario1 = "sla1234";
      const passwordUsers = "123"
      const isValidUser = password==passwordUsers && (email==emailUsuario1)
      if(!isValidUser){
        return res.status(401).send({message: `Usuário inválido`});
        }
        const token = generateToken({
            id: email,
        });
        return res.send({token});
} catch (error) {
      res.status(500).json({ error: error });
    }
}

  static async removeSign(req, res, next){
    try {
      const findPetition = await Petition.getOnePetitionById(req.params.id);
      if(!findPetition.listaAssinantes.includes(String(req.id))) return res.status(302).json(`Você já removeu sua assinatura dessa petição`);
      const petition = await Petition.removeSign(req.params.id, req.id);
      if(!petition) return res.status(404).json(`Petição não encontrada`);
      res.status(200).json(`Assinatura do usuário foi removida da petição ${req.params.id}`);
    } catch (error) {
      res.status(500).json({error:error});
    }
  }

};
