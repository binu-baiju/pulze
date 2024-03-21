import React, { useState } from "react";

const Modal = () => {
  const [openModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!openModal);
  };
  return (
    <div>
      <button
        type="button"
        className="h-10 px-4 font-medium text-sm rounded-md text-white bg-gray-900"
        onClick={handleModal}
      >
        Open Modal
      </button>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex justify-center items-center">
          <div className="max-w-[460px] bg-white shadow-lg py-2 rounded-md">
            <h2 className="text-sm font-medium text-gray-900 border-b border-gray-300 py-3 px-4 mb-4">
              This is my modal.
            </h2>
            <div className="px-4 pb-4">
              <p className="text-sm font-medium text-gray-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et
                quod quis eaque aliquam necessitatibus vel eligendi laboriosam
                optio quisquam sunt.
              </p>
            </div>
            <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
              <div className="text-sm font-medium text-gray-700">
                Example Content
              </div>
              <button
                type="button"
                className="h-8 px-2 text-sm rounded-md bg-gray-700 text-white"
                onClick={handleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
