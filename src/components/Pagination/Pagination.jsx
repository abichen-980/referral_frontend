import Pagination from "@mui/material/Pagination";
import { Stack, Box } from "@mui/material";

export default function PaginationRounded({
  page,
  totalPages,
  handlePageChange,
}) {
  const nextPage = (event, value) => {
    handlePageChange(value);
  };

  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={10}>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={nextPage}
        />
      </Stack>
    </Box>
  );
}
