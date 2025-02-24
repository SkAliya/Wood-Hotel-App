import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/APICabins";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";

function Cabins() {
  // useEffect(function () {
  //   getCabins()
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, []);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
        {/* <img
        alt="hotel img"
        src="https://ongwclrnfeefcrlxbgzy.supabase.co/storage/v1/object/public/cabinImages//cabin-001.jpg"
        /> */}
      </Row>
      <CabinTable />
      <Row type="vertical">
        <Button
          variation="primary"
          size="large"
          onClick={() => setFormOpen((formOpen) => !formOpen)}
        >
          Create cabin
        </Button>
        {formOpen && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
