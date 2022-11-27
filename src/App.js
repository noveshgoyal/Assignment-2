import { useEffect, useState } from "react";
import "./styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function App() {
  const [list, setList] = useState([]);
  const [keys, setKeys] = useState([]);
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  useEffect(() => {
    apiData();
  }, []);
  function apiData() {
    fetch("https://gorest.co.in/public/v2/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setList(result);
          setKeys(Object.keys(result[0]));
          maleFemaleCount(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  function maleFemaleCount(list) {
    let males = 0;
    list.map((person) => (person.gender === "male" ? males++ : males));
    setMales(males);
    setFemales(list.length - males);
  }
  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {keys.map((key) => (
                <TableCell align="center">{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((person) => (
              <TableRow
                key={person.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {person.id}
                </TableCell>
                <TableCell align="center">{person.name}</TableCell>
                <TableCell align="center">{person.email}</TableCell>
                <TableCell align="center">{person.gender}</TableCell>
                <TableCell align="center">{person.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No. Of Males</TableCell>
              <TableCell align="center">No. Of Females</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{males}</TableCell>
              <TableCell align="center">{females}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
