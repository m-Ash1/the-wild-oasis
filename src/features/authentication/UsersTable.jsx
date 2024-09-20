import Table from "../../ui/Table";
import UserRow from "./UserRow";
import useUsers from "./useUsers";

function UsersTable() {
  const { profiles, isLoading } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  return (
    <Table columns="1fr 1fr 3fr">
      <Table.Header>
        <div></div>
        <div>Name</div>
        <div>Email</div>
      </Table.Header>
      <Table.Body
        data={profiles}
        render={(profile) => <UserRow key={profile.id} profile={profile} />}
      ></Table.Body>
    </Table>
  );
}

export default UsersTable;
