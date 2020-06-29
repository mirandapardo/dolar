import React, { useState, useEffect } from "react";
import Dolar from "../containers/dolar";
import logo from "../logo.png";

const Landing = () => {
  const modificaFechaFinal = event => {
    document.getElementById("fechaInicial").max = event.target.value;
    setFechaFinal(event.target.value.replace(/-/g, ""));
  };
  const modificaFechaInicio = event => {
    document.getElementById("fechaFinal").min = event.target.value;
    setFechaInicio(event.target.value.replace(/-/g, ""));
  };

  const [deshabilitado, setDeshabilitado] = useState(true);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);

  useEffect(() => {
    document.getElementById("fechaFinal").max = new Date()
      .toISOString()
      .split("T")[0];
    document.getElementById(
      "fechaInicial"
    ).max = new Date().toISOString().split("T")[0];

    if (fechaFinal && +fechaFinal - +fechaInicio >= 0) {
      setDeshabilitado(false);
    } else {
      setDeshabilitado(true);
    }
  }, [fechaFinal, fechaInicio]);

  let dolar = null;
  if (!deshabilitado) {
    dolar = (
      <Dolar
        fechaInicio={fechaInicio}
        fechaFinal={fechaFinal}
        apiKey="9c84db4d447c80c74961a72245371245cb7ac15f"
      />
    );
  }
  return (
    <div>
      <div className="container">
        <div className="logo">
          <img src={logo}></img>
        </div>
        <h1>Valor histórico del dolar</h1>
        <p>
          Ingresa un rango de fechas para ver los valores históricos del dolar
        </p>
        <div className="form">
          <div className="fechas">
            <div>
              <label>Fecha inicial</label>
              <input
                type="date"
                name="fechaInicio"
                id="fechaInicial"
                onChange={modificaFechaInicio}
              />
            </div>
            <div>
              <label>Fecha final</label>
              <input
                type="date"
                name="fechaFinal"
                id="fechaFinal"
                disabled={!fechaInicio}
                onChange={modificaFechaFinal}
              />
            </div>
          </div>
          {fechaFinal && deshabilitado ? <p>Rango de fecha inválido</p> : ""}
        </div>
        {dolar}
      </div>
    </div>
  );
};

export default Landing;
