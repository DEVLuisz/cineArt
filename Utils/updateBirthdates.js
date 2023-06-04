function updateBirthdates() {
  db.query("SELECT * FROM usuarios", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = result.rows;
    for (let user of users) {
      const currentDate = new Date(user.data_nascimento);
      const formattedDate = currentDate.toISOString().split("T")[0];
      db.query(
        "UPDATE usuarios SET data_nascimento = $1 WHERE id = $2",
        [formattedDate, user.id],
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Data de nascimento atualizada para o usuário:", user.nome_usuario);
        }
      );
    }
  });
}
/* updateBirthdates(); */
export default function updateBirthdates()