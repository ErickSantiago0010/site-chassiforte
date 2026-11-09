import { useInView } from "../hooks/useInView";

export default function SectionHead({ title, children, id, as: Tag = "h2" }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`section-head reveal${inView ? " is-visible" : ""}`}>
      <Tag id={id}>{title}</Tag>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
