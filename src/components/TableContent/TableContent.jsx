import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

export default function TableContent({ referrals, headings }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ marginTop: "20px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headings.map((heading, index) => (
              <TableCell key={index}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow
              key={referral.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {referral.created_at}
              </TableCell>
              <TableCell>{referral.email}</TableCell>
              <TableCell>
                <Chip
                  label={referral.status}
                  color={referral.status === "pending" ? "primary" : "success"}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
