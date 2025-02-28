import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select({ filedName, fileds }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currSelect = searchParams.get(filedName) || "name-asc";

  function handleSelect(filed) {
    searchParams.set(filedName, filed);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect
      value={currSelect}
      type="white"
      onChange={(e) => handleSelect(e.target.value)}
    >
      {fileds.map((filed) => (
        <option value={filed.value} key={filed.value}>
          Sort By {filed.type}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
