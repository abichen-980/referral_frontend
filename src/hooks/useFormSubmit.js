import { useState } from "react";
import axiosInstance from "../utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/redux-store/slices/userSlicer";
import { useLocation } from "react-router-dom";

const useFormSubmit = (apiEndpoint, onSuccess, onError) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referralToken = queryParams.get("token");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const submitForm = async (data) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(apiEndpoint, {
        user: data,
        token: referralToken,
      });

      const token = response.headers["authorization"].slice(7);
      localStorage.setItem("token", token);
      dispatch(setUser(response.data.user));

      onSuccess(response);
      setLoading(false);
    } catch (error) {
      onError(error.response);
      setLoading(false);
    }
  };

  return { loading, submitForm };
};

export default useFormSubmit;
