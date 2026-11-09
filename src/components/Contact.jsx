import { useEffect, useId, useRef, useState } from "react";
import { SERVICE_OPTIONS, WA_BH_BASE } from "../data/site";
import { useInView } from "../hooks/useInView";

const INITIAL = {
  nome: "",
  telefone: "",
  servico: "",
  mensagem: "",
};

function ServiceSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();
  const selected = options.find((option) => option === value) || "";

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`contact-select${open ? " is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="contact-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={selected ? "is-value" : "is-placeholder"}>{selected || "Selecione um serviço"}</span>
        <span className="contact-select-chevron" aria-hidden="true" />
      </button>

      {open ? (
        <ul className="contact-select-menu" id={listId} role="listbox">
          {options.map((option) => (
            <li key={option} role="option" aria-selected={option === value}>
              <button
                type="button"
                className={`contact-select-option${option === value ? " is-active" : ""}`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <select
        className="contact-select-native"
        name="servico"
        required
        value={value}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled>
          Selecione um serviço
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

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
    if (!form.servico.trim()) {
      setNote("Selecione um serviço de interesse.");
      return;
    }

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
                R. Padre Pedro Pinto, 2065, Venda Nova, BH
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
            <ServiceSelect
              value={form.servico}
              options={SERVICE_OPTIONS}
              onChange={(value) => setForm((current) => ({ ...current, servico: value }))}
            />
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
          <button className="btn btn-solid btn-lg contact-submit" type="submit">
            Enviar pelo WhatsApp
          </button>
          {note ? <p className="form-note">{note}</p> : null}
        </form>
      </div>
    </section>
  );
}
