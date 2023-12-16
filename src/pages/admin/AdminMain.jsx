import React, { useContext } from "react";
import { AdminContext } from "../../context";

const AdminMain = () => {
  const { employeeName } = useContext(AdminContext)
  document.title = "Панель администратора - МФ МАДИ"
  
  return (
    <section>
      <div className="container">
        <h1 className="title">Добро пожаловать, {employeeName}</h1>
      </div>
    </section>
  );
};

export default AdminMain;
