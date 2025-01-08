import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRouteAdmin({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenAdmin");

  useEffect(() => {
    if (!token) {
      navigate("/loginAdmin");
    }
  }, [token, navigate]);

  return children;
}
