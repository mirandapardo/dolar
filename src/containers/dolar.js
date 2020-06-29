import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Grafico from "../components/Grafico/grafico";

class Dolar extends Component {
  state = {
    datos: null,
    promedio: null,
    max: null,
    min: null,
    error: false,
    errorMessage: null,
    loading: false
    // apiKey: '9c84db4d447c80c74961a72245371245cb7ac15f'
  };
  conectaAPI = () => {
    const { apiKey, fechaInicio, fechaFinal } = this.props;
    const aInicial = fechaInicio.slice(0, 4);
    const mInicial = fechaInicio.slice(4, 6);
    const dInicial = fechaInicio.slice(6, 8);
    const aFinal = fechaFinal.slice(0, 4);
    const mFinal = fechaFinal.slice(4, 6);
    const dFinal = fechaFinal.slice(6, 8);

    let url = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/${aInicial}/${mInicial}/dias_i/${dInicial}/${aFinal}/${mFinal}/dias_f/${dFinal}?apikey=${apiKey}&formato=json`;
    this.setState({ loading: true });
    fetch(url)
      .then(response => response.json())
      .then(data => this.calculos(data))
      .catch(error => {
        this.setState({
          error: true,
          errorMessage: "Red no disponible",
          loading: false
        });
      });
  };
  componentDidMount = () => {
    this.conectaAPI();
  };
  componentDidUpdate = prevProps => {
    if (
      prevProps.fechaFinal !== this.props.fechaFinal ||
      prevProps.fechaInicio !== this.props.fechaInicio
    ) {
      this.conectaAPI();
    }
  };

  calculos = response => {
    const datos = Object.values(response.Dolares);
    const arregloDolares = datos.map(item => parseFloat(item.Valor));
    const promedioDolar =
      arregloDolares.reduce((previous, current) => previous + current) /
      datos.length;
    const minimo = Math.min(...arregloDolares);
    const maximo = Math.max(...arregloDolares);
    this.setState({
      promedio: promedioDolar,
      min: minimo,
      max: maximo,
      datos: datos,
      error: false
    });
    this.setState({ loading: false });
  };
  reprocesar = () => {
    this.setState({
      errorMessage: null
    });
    this.conectaAPI();
  };
  render() {
    let contenido = (
      <div className="container-graficos">
        <div className={this.state.loading ? "hidden" : "medidas"}>
          <div className="medida izquierda">
            <div className="numero">${this.state.min}</div>
            <div className="texto-inferior">Valor mínimo</div>
          </div>
          <div className="medida centro">
            <div className="numero">
              ${Math.round(this.state.promedio * 10) / 10}
            </div>
            <div className="texto-inferior">Promedio</div>
          </div>

          <div className="medida derecha">
            <div className="numero">${this.state.max}</div>
            <div className="texto-inferior">Valor máximo</div>
          </div>
        </div>
        <div className="graficos">
          {this.state.loading && <p className="loading">Cargando</p>}
          {this.state.datos && !this.state.loading && (
            <Grafico datos={this.state.datos} />
          )}
        </div>
      </div>
    );
    if (this.state.error)
      contenido = (
        <div>
          <p>Error: {this.state.errorMessage}</p>
          <button onClick={this.reprocesar}>Reintentar</button>
        </div>
      );
    return <div>{contenido}</div>;
  }
}

export default withRouter(Dolar);
