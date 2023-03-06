import "./styles.css";

export type CardProps = {
  id: number;
  name: string;
  time: string;
};

export function Card(props: any) {
  const { id, name, time } = props.student;
  return (
    <div className="card">
      <strong>{name}</strong>
      <small>{time}</small>
      <span
        className="delete"
        onClick={() => {
          props.handleDelete(id);
        }}
      >
        {" "}
        X{" "}
      </span>
    </div>
  );
}
