"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "../_components/Modal";
import FlexBox from "../_components/FlexBox";

function AddProject() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="addProject">
          <button className="inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-gray-200">
            <Icon icon="icons8:plus" className="text-4xl" />
          </button>
        </Modal.Open>
        <Modal.Window name="addProject">
          <FlexBox className="flex-col">
            <button>Create My Own</button>
            <h2>Already have an invite?</h2>
            <button>Join a Server</button>
          </FlexBox>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddProject;
