const connectionDB = require("../ConnectionDB");

const InfoCleaningDAO = {
  async insertInfoCleaning(infoCleaningModel) {
    try {
      var connection = await connectionDB.openConnectionDB();

      var result = await connection.execute(
        `INSERT INTO infoCleaning(id_cleaner, typeCleaning, initHourJob, endHourJob, cleanMaterial, priceDay) 
        VALUES (?,?,?,?,?,?)`,
        [
          infoCleaningModel.id_cleaner,
          infoCleaningModel.typeCleaning,
          infoCleaningModel.initHourJob,
          infoCleaningModel.endHourJob,
          infoCleaningModel.cleanMaterial,
          infoCleaningModel.priceDay
        ]
      );

      await connection.end();

      if (result != null) {
        console.log("Sucesso na inserção!");
        return { result: true, message: "Sucesso na inserção!" };
      } else {
        console.log("Erro na inserção!");
        return { result: false, message: "Erro na inserção!" };
      }
    } catch (error) {
      console.log(error);
      return { result: false, message: error };
    }
  },

  async selectInfoCleaning(infoCleaningModel) {
    try {
      var connection = await connectionDB.openConnectionDB();

      const result = await connection.promise().execute(
        "SELECT * FROM infoCleaning WHERE id_cleaner = ?",
        [infoCleaningModel.id_cleaner]
      );

      await connection.end();

      if (result != null) {
        console.log("Sucesso na seleção!");
        return { result: true, message: "Sucesso na seleção!", data: result[0] };
      } else {
        console.log("Erro na seleção!");
        return { result: false, message: "Erro na seleção!", data: [] };
      }
    } catch (error) {
      console.log(error);
      return { result: false, message: error, data: [] };
    }
  },

  async selectInfoAllCleaners() {
    try {
      var connection = await connectionDB.openConnectionDB();

      const result = await connection.promise().execute(
        `SELECT
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.tell AS user_tell,
        u.about AS user_about,
        ic.typeCleaning AS cleaning_type,
        ic.initHourJob AS cleaning_start_time,
        ic.endHourJob AS cleaning_end_time,
        ic.cleanMaterial AS cleaning_material,
        ic.priceDay AS cleaning_price,
        c.id AS cleaning_id,
        c.typeClear AS cleaning_type_detail,
        c.date AS cleaning_date,
        c.qtyHour AS cleaning_hours,
        c.initHour AS cleaning_init_time,
        c.description AS cleaning_description,
        c.price AS cleaning_price_detail,
        c.status AS cleaning_status,
        c.rooms AS cleaning_rooms,
        c.address AS cleaning_address,
        se.coment AS evaluation_comment,
        se.qtyStar AS evaluation_stars,
        i.link AS image_link,
        i.profile AS image_profile,
        i.after AS image_after
    FROM
        users u
    JOIN
        infoCleaning ic ON u.id = ic.id_cleaner
    LEFT JOIN
        cleaning c ON u.id = c.id_cleaner
    LEFT JOIN
        serviceEvaluation se ON c.id = se.id_cleaning
    LEFT JOIN
        images i ON c.id = i.id_cleaning
    WHERE
        u.id IN (
            SELECT DISTINCT id_cleaner
            FROM infoCleaning
        )
    ORDER BY
        u.id, c.id, i.id`
      );

      await connection.end();

      if (result != null) {
        console.log("Sucesso na seleção!");
        return { result: true, message: "Sucesso na seleção!", data: result};
      } else {
        console.log("Erro na seleção!");
        return { result: false, message: "Erro na seleção!", data: [] };
      }
    } catch (error) {
      console.log(error);
      return { result: false, message: error, data: [] };
    }
  },

  async updateInfoCleaning(infoCleaningModel) {
    try {
      var connection = await connectionDB.openConnectionDB();

      var result = await connection.execute(
        `UPDATE infoCleaning SET typeCleaning = ?, initHourJob = ?, endHourJob = ?, cleanMaterial = ?, priceDay = ? WHERE id = ?`,
        [
          infoCleaningModel.typeCleaning,
          infoCleaningModel.initHourJob,
          infoCleaningModel.endHourJob,
          infoCleaningModel.cleanMaterial,
          infoCleaningModel.priceDay,
          infoCleaningModel.id
        ]
      );

      await connection.end();

      if (result != null) {
        console.log("Sucesso na atualização!");
        return { result: true, message: "Sucesso na atualização!" };
      } else {
        console.log("Erro na atualização!");
        return { result: false, message: "Erro na atualização!" };
      }
    } catch (error) {
      return { result: false, message: error };
    }
  },

  async deleteInfoCleaning(infoCleaningModel) {
    try {
      var connection = await connectionDB.openConnectionDB();

      var result = await connection.execute(
        `DELETE FROM infoCleaning WHERE id = ?`,
        [infoCleaningModel.id]
      );

      await connection.end();

      if (result != null) {
        console.log("Sucesso na remoção!");
        return { result: true, message: "Sucesso na remoção!" };
      } else {
        console.log("Erro na remoção!");
        return { result: false, message: "Erro na remoção!" };
      }
    } catch (error) {
      return { result: false, message: error };
    }
  }
};

module.exports = InfoCleaningDAO;
