import PaginationRounded from "../Pagination/Pagination.jsx";
import { Box } from "@mui/material";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton.jsx";
import TableContent from "../TableContent/TableContent.jsx";

const HEADINGS = ["Date Referred", "Email", "Status"];

export default function ReferralsList({
  referrals,
  loading,
  page,
  totalPages,
  handlePageChange,
}) {
  if (loading) {
    return <LoadingSkeleton />;
  }

  const contentToRender =
    referrals.length > 0 ? (
      <>
        <TableContent referrals={referrals} headings={HEADINGS} />
        <PaginationRounded
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </>
    ) : (
      <p>No Referrals Found.</p>
    );

  return (
    <>
      <h3>My Referrals</h3>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {contentToRender}
      </Box>
    </>
  );
}
