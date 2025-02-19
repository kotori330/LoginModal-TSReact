import { useState } from "react";
import LoginModal from "./Modal/LoginModal";

const App = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-center my-auto pt-50">
      <button
        className="p-4  border-2 rounded-2xl hover:opacity-70 font-bold hover:cursor-pointer bg-slate-200"
        onClick={openModal}
      >
        Click here to login
      </button>

      {open ? <LoginModal open={open} closeModal={closeModal} /> : <></>}
    </div>
  );
};

export default App;




