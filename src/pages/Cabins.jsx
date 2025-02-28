import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/APICabins";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import AddModelWindow from "../features/cabins/AddModelWindow";
import CabinOperations from "../features/cabins/CabinOperations";

function Cabins() {
  // useEffect(function () {
  //   getCabins()
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinOperations />
        {/* <img
        alt="hotel img"
        src="https://ongwclrnfeefcrlxbgzy.supabase.co/storage/v1/object/public/cabinImages//cabin-001.jpg"
        /> */}
      </Row>
      <CabinTable />
      <AddModelWindow />
      {/* <Row type="vertical"></Row> */}
    </Row>
  );
}

export default Cabins;
