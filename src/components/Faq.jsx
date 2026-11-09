import { useState } from "react";
import { FAQ_ITEMS } from "../data/site";
import SectionHead from "./SectionHead";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section faq" id="faq">
      <div className="container narrow">
        <SectionHead title="Perguntas frequentes">
          O essencial para saber se o problema do seu carro é estrutural.
        </SectionHead>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.question} className="faq-item" open={openIndex === index}>
              <summary
                onClick={(event) => {
                  event.preventDefault();
                  setOpenIndex((current) => (current === index ? null : index));
                }}
              >
                {item.question}
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
