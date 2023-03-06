import {
  useState,
  useEffect,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import "./styles.css";

// imports
import { Card, CardProps } from "../../components/Card";
//types

type User = {
  name: string;
  avatar: string;
};

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  // add student
  function handleAddStudent() {
    const newStudent = {
      id: Date.now(),
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  //delete student

  const handleClear = () => {
    setStudents([]);
  };

  function handleKeyDown(
    event: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) {
    if (event.key === "Enter") {
      handleAddStudent();
    }
  }

  function handleDelete(id: string) {
    const newStudents = students.filter((student) => student.id != Number(id));

    setStudents(newStudents);
  }

  // api
  useEffect(() => {
    fetch("https://api.github.com/users/VictorAsz")
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      });
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="divButton">
        <button className="button1" onClick={handleAddStudent}>
          Add
        </button>
        <button className="button2" onClick={handleClear}>
          Clear
        </button>
      </div>
      {students.map((student) => (
        <Card key={student.id} student={student} handleDelete={handleDelete} />
      ))}
    </div>
  );
}
