"use client";

import { useState } from "react";

import type { Sentido, TipoDia } from "../core/types";

import {
  listarParadasPorSentido,
  buscarServicio,
  listarHorariosParaParada,
} from "../services/horarios";

export function ConsultaHorarios() {
  const [sentido, setSentido] = useState<Sentido>(
    "Mar del Plata → Santa Clara"
  );

  const [tipoDia, setTipoDia] = useState<TipoDia>("habil");

  const [paradaId, setParadaId] = useState("");

  // Buscamos las paradas correspondientes al recorrido
  const paradas = listarParadasPorSentido(sentido);

  // Buscamos el servicio según sentido y tipo de día
  const servicio = buscarServicio(sentido, tipoDia);

  // Buscamos los horarios de la parada seleccionada
  const horarios = servicio && paradaId
    ? listarHorariosParaParada(paradaId, servicio.id)
    : [];

  return (
    <section className="consulta-horarios">
      <h2>Consulta de horarios</h2>

      <div>
        <label htmlFor="sentido">
          Sentido del recorrido
        </label>

        <select
          id="sentido"
          value={sentido}
          onChange={(event) => {
            setSentido(event.target.value as Sentido);
            setParadaId("");
          }}
        >
          <option value="Mar del Plata → Santa Clara">
            Mar del Plata → Santa Clara
          </option>

          <option value="Santa Clara → Mar del Plata">
            Santa Clara → Mar del Plata
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="tipo-dia">
          Tipo de día
        </label>

        <select
          id="tipo-dia"
          value={tipoDia}
          onChange={(event) =>
            setTipoDia(event.target.value as TipoDia)
          }
        >
          <option value="habil">Día hábil</option>
          <option value="sabado">Sábado</option>
          <option value="domingo_feriado">
            Domingo y feriado
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="parada">
          Seleccioná una parada
        </label>

        <select
          id="parada"
          value={paradaId}
          onChange={(event) =>
            setParadaId(event.target.value)
          }
        >
          <option value="">Elegir parada</option>

          {paradas.map((parada) => (
            <option key={parada.id} value={parada.id}>
              {parada.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="resultado-horarios">
        <h3>Horarios disponibles</h3>

        {!paradaId && (
          <p>Seleccioná una parada para consultar.</p>
        )}

        {paradaId && !servicio && (
          <p>
            Todavía no hay un servicio cargado para
            esta selección.
          </p>
        )}

        {paradaId && servicio && horarios.length === 0 && (
          <p>
            No hay horarios registrados para esta parada.
          </p>
        )}

        {horarios.length > 0 && (
          <ul>
            {horarios.map((horario) => (
              <li key={horario.id}>
                {horario.hora}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}