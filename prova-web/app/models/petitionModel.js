const client = require("../../config/dbConnection");
const { ObjectId } = require("mongodb");

module.exports = class PetitionModel {
  static async getAllPetition() {
    console.log("Get ALL Petition");
    const result = await client.db("prova").collection("peticoes").find();
    const petitions = await result.toArray();
    return petitions;
  }

  static async getOnePetitionById(Id) {
    console.log(`Get One Petition by: ${Id}`);
    const petition = await client
      .db("prova")
      .collection("peticoes")
      .findOne({ _id: new ObjectId(Id) });
    return petition;
  }

  static async addPetition(data, usuario) {
    console.log(`Add Petition => ${data}`);
    try {
      const newPetition = {
        titulo: data.titulo,
        descricao: data.descricao,
        usuario: usuario,
        dataCriacao: new Date(),
        foto: data.foto,
        listaAssinantes: [usuario],
      };
      const addedPetition = await client
        .db("prova")
        .collection("peticoes")
        .insertOne(newPetition);
      return addedPetition;
    } catch (error) {
      console.log(`[POST PETITION ERROR: ${error}]`);
    }
  }

  static async deletePetitionById(Id) {
    console.log(`DELETE Petition by:  ${Id}`);
    try {
      const petition = await client
        .db("prova")
        .collection("peticoes")
        .findOne({ _id: new ObjectId(Id) });
      if (petition == null) return null;
      return client
        .db("prova")
        .collection("peticoes")
        .deleteOne({ _id: new ObjectId(Id) });
    } catch (error) {
      console.log(`[DELETE PETITION ERROR: ${error}]`);
    }
  }

  static async updatePetitionById(Id, Obj) {
    console.log(`PUT Petition by: ${Id}`);
    try {
      const petition = await client
        .db("prova")
        .collection("peticoes")
        .findOne({ _id: new ObjectId(Id) });

      if (!petition) return null;

      return await client
        .db("prova")
        .collection("peticoes")
        .updateOne(
          { _id: new ObjectId(Id) },
          {
            $set: {
              titulo: Obj.titulo,
              descricao: Obj.descricao,
            },
          }
        );
    } catch (error) {
      console.log(`PUT PETITION ERROR: ${error}`);
    }
  }

  static async signPetition(Id, Obj) {
    try {
      console.log(`PUT Sign Petition by: ${Id}`);
      console.log("A: " + Obj);

      const singed = await client
        .db("prova")
        .collection("peticoes")
        .findOne({ _id: new ObjectId(Id), listaAssinantes: Obj});

      const petition = await client
        .db("prova")
        .collection("peticoes")
        .findOne({ _id: new ObjectId(Id) });

      if (singed != null) return singed;
      if (!petition) return null;

      return await client
        .db("prova")
        .collection("peticoes")
        .updateOne(
          { _id: new ObjectId(Id) },
          {
            $push: {
              listaAssinantes: Obj,
            },
          }
        );
    } catch (error) {
      console.log(`PUT SIGN PETITION ERROR: ${error}`);
    }
  }

  static async removeSign(Id, Obj){
    try {
      const petition = await client.db("prova").collection("peticoes").findOne({ _id: new ObjectId(Id) });
      if(!petition) return null;
      return await client.db("prova").collection("peticoes").updateOne({ _id: new ObjectId(Id) }, {
        $pull: {
          listaAssinantes: Obj,
        },
      });
    } catch (error) {
      console.log(`PUT REMOVE SIGN PETITION ERROR: ${error}`);
    }
  }
};
