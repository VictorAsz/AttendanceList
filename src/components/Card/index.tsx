import "./styles.css";

export type CardProps = {
  name: string;
  time: string;
};

export function Card(props: any) {
  const { name, time } = props.student;
  return (
    <div className="card">
      <strong>{name}</strong>
      <small>{time}</small>
      <span
        className="delete"
        onClick={() => {
          props.handleDelete(time);
        }}
      >
        {" "}
        X{" "}
      </span>
    </div>
  );
}
