import { useNavigate } from "react-router-dom";
import useCurrentUser from "../features/authentication/useCurrentUser";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

const FullpageSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1.load the user data
  const { isAuthenticated, isLoading } = useCurrentUser();

  // 2.check if no user exits or no loading navigate to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );
  // 3.if loading render spinner
  if (isLoading)
    return (
      <FullpageSpinner>
        <Spinner />
      </FullpageSpinner>
    );
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
