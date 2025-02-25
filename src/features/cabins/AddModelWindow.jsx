import { useState } from "react";
import Button from "../../ui/Button";
import CreateEditCabinForm from "./CreateCabinForm";
import Model from "../../ui/Modal";

function AddModelWindow() {
  const [showModel, setShowModel] = useState(false);
  return (
    <div>
      <Button
        variation="primary"
        size="large"
        onClick={() => setShowModel((show) => !show)}
      >
        Create cabin
      </Button>
      {/* {formOpen && <CreateEditCabinForm />} */}
      {showModel && (
        <Model setShowModel={setShowModel}>
          <CreateEditCabinForm formType="model" setShowModel={setShowModel} />
        </Model>
      )}
    </div>
  );
}

export default AddModelWindow;
