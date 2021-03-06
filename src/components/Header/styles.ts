import styled from "styled-components";

export const Container = styled.header`
  background-color: var(--blue);
`

export const Content = styled.div`

  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem 12rem;

  button {
    color: #ffff;
    background-color: var(--blue-light);

    height: 3rem;
    padding: 0 2rem;
    border-radius: 0.25rem;
    border: 0;

    transition: filter 0.2s;

    :hover {
      filter: brightness(0.9)
    }
  }


`

