import { useState } from "react";
import { SERVICE_OPTIONS, WA_BH_BASE } from "../data/site";
import { useInView } from "../hooks/useInView";

const INITIAL = {
  nome: "",
  telefone: "",
  servico: "",
  mensagem: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [note, setNote] = useState("");
  const [copyRef, copyInView] = useInView();

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const text = [
      "Olá, Chassi Forte!",
      `Nome: ${form.nome.trim()}`,
      `Telefone: ${form.telefone.trim()}`,
      `Serviço: ${form.servico.trim()}`,
      form.mensagem.trim() ? `Mensagem: ${form.mensagem.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${WA_BH_BASE}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setNote("Abrimos o WhatsApp com seus dados. É só enviar a mensagem.");
  };

  return (
    <section className="section contact" id="contato">
      <div className="container contact-grid">
        <div ref={copyRef} className={`contact-copy reveal${copyInView ? " is-visible" : ""}`}>
          <h2>Seu carro com a geometria de fábrica</h2>
          <p>Agende a avaliação gratuita. Devolvemos segurança e performance com correção no padrão original.</p>

          <ul className="contact-meta">
            <li>
              <span>WhatsApp</span>
              <a href={WA_BH_BASE} target="_blank" rel="noopener noreferrer">
                (31) 3656-2538
              </a>
            </li>
            <li>
              <span>Endereço</span>
              <a
                href="https://maps.google.com/?q=R.+Padre+Pedro+Pinto,+2065+-+Venda+Nova,+Belo+Horizonte+-+MG"
                target="_blank"
                rel="noopener noreferrer"
              >
                R. Padre Pedro Pinto, 2065 — Venda Nova, BH
              </a>
            </li>
            <li>
              <span>Horário</span>
              <p>Seg a sex: 8h–18h · Sáb: 8h–12h</p>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <h3>Solicite seu orçamento</h3>
          <label>
            Nome
            <input type="text" name="nome" autoComplete="name" required placeholder="Seu nome" value={form.nome} onChange={onChange} />
          </label>
          <label>
            Telefone / WhatsApp
            <input
              type="tel"
              name="telefone"
              autoComplete="tel"
              required
              placeholder="(31) 99999-9999"
              value={form.telefone}
              onChange={onChange}
            />
          </label>
          <label>
            Serviço de interesse
            <select name="servico" required value={form.servico} onChange={onChange}>
              <option value="" disabled>
                Selecione um serviço
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Mensagem
            <textarea
              name="mensagem"
              rows="4"
              placeholder="Descreva o problema do veículo..."
              value={form.mensagem}
              onChange={onChange}
            />
          </label>
          <button className="btn btn-solid btn-lg" type="submit">
            Enviar pelo WhatsApp
          </button>
          {note ? <p className="form-note">{note}</p> : null}
        </form>
      </div>
    </section>
  );
}
