import styled from "styled-components";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 10rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  transform: scale(1.2) translateX(-7px);
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;
const Email = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-grey-500);
  font-family: "Sono";
`;

function UserRow({ profile }) {
  return (
    <Table.Row>
      {profile.avatar_url ? <Img src={profile.avatar_url} alt={profile.full_name} />: <Img src="https://via.placeholder.com/150" alt={profile.full_name} />}
      <User>{profile.full_name}</User>
      <Email>{profile.email}</Email>
    </Table.Row>
  );
}

export default UserRow;
