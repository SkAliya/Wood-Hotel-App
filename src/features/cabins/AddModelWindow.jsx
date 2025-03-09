// import { useState } from "react";
import Button from "../../ui/Button";
import CreateEditCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";

// function AddModelWindow() {
//   const [showModel, setShowModel] = useState(false);
//   return (
//     <div>
//       <Button
//         variation="primary"
//         size="large"
//         onClick={() => setShowModel((show) => !show)}
//       >
//         Create cabin
//       </Button>
//       {/* {formOpen && <CreateEditCabinForm />} */}
//       {showModel && (
//         <Model setShowModel={setShowModel}>
//           <CreateEditCabinForm formType="model" setShowModel={setShowModel} />
//         </Model>
//       )}
//     </div>
//
//   );
// }

function AddModelWindow() {
  return (
    <>
      <Modal>
        <Modal.Open type="FormModel">
          <span>
            <Button variation="primary" size="large">
              Create cabin
            </Button>
          </span>
        </Modal.Open>
        <Modal.Window name="FormModel">
          <CreateEditCabinForm />
        </Modal.Window>
      </Modal>

      {/* <Modal>
        <Modal.Open type="tableModel">
          <Button variation="primary" size="large">
            Open cabin table
          </Button>
        </Modal.Open>
        <Modal.Window name="tableModel">
          <CabinTable />
        </Modal.Window>
      </Modal> */}
    </>
  );
}

export default AddModelWindow;
