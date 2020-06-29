import LineChart from "./graficoPuntos/graficoPuntos";
import React from "react";
import { withRouter } from "react-router-dom";

const Grafico = props => {
  return (
    <div className="App">
      <div className="main chart-wrapper">
        <LineChart data={props.datos} title="Dolar" color="#1ab188" />
      </div>
    </div>
  );
};

export default withRouter(Grafico);
