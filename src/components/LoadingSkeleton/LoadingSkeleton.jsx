import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingSkeleton() {
  return (
    <Box sx={{ width: 600, margin: "auto", marginTop: "100px" }}>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}
