import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/site";
import SectionHead from "../components/SectionHead";

export default function Blog() {
  return (
    <main id="conteudo" className="page-shell">
      <section className="section blog">
        <div className="container">
          <SectionHead title="Blog">
            Conteúdo técnico para entender estrutura, alinhamento e quando procurar correção especializada.
          </SectionHead>

          <div className="blog-grid">
            {BLOG_POSTS.map((post) => (
              <article key={post.title} className="blog-card">
                <Link to="/#contato">
                  <img src={post.image} alt={post.alt} loading="lazy" />
                  <div className="blog-card-body">
                    <span>{post.tag}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
