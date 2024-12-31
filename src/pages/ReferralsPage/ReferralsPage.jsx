import Box from "@mui/material/Box";
import ReferralsList from "../../components/ReferralsList/ReferralsList";
import NewReferralForm from "../../components/NewReferralForm/NewReferralForm";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/redux-store/slices/userSlicer.js";
import { setNotification } from "../../store/redux-store/slices/notificationSlicer";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const addNewReferral = (referral) => {
    setReferrals((prevReferrals) => {
      const updatedReferrals = [referral, ...prevReferrals];
      return updatedReferrals.slice(0, prevReferrals.length);
    });
  };

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/referrals?page=${page}`
        );

        if (response?.data?.referrals?.length > 0) {
          setReferrals(response.data.referrals || []);
        }

        setTotalPages(response.data?.total_pages);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.response?.status == 401) {
          dispatch(clearUser());
          localStorage.removeItem("token");
          dispatch(
            setNotification({
              severity: "error",
              message: "session has expired",
            })
          );
        } else {
          dispatch(
            setNotification({
              severity: "error",
              message: "somthing went wrong. please try later",
            })
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [page]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          flex: 7,
        }}
      >
        <ReferralsList
          referrals={referrals}
          loading={loading}
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Box>
      <Box
        sx={{
          flex: 3,
        }}
      >
        <NewReferralForm addNewReferral={addNewReferral} />
      </Box>
    </Box>
  );
}
