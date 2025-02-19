import { ChangeEvent, useEffect, useRef, useState } from "react";
import { regexPassword } from "../utils/regex";
import { loginUser } from "../services/fetchData";
import Input from "../component/Input";

const LoginModal = ({
  closeModal,
  open,
}: {
  closeModal: () => void;
  open: boolean;
}) => {
  // -----------Handle click outside modal-----------
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Modal is existing && modalRef doesn't contain the clicked point
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent background scrolling when open modal
      document.body.style.overflow = "hidden";
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [open, closeModal]);

  // -----------Form's data-----------
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorUsername, setErrorUsername] = useState("");

  const [errorPassword, setErrorPassword] = useState("");

  // ------------Validation-----------
  const validateUsername = () => {
    if (formData.username === "") {
      setErrorUsername("You must enter your username!");
      return false;
    } else if (formData.username !== loginUser.username) {
      setErrorUsername("Your username is incorrect!");
      return false;
    } else {
      setErrorUsername("");
      return true;
    }
  };

  const validatePassword = () => {
    if (formData.password === "") {
      setErrorPassword("You must enter your password!");
      return false;
    } else if (formData.password !== loginUser.password) {
      setErrorPassword("Your password is incorrect!");
      return false;
      // Cannot compare string to a Regex directly -> Use 'test' method
    } else if (!regexPassword.test(formData.password)) {
      setErrorPassword(
        "Password must contains at least 8 characters, an uppercase letter, a number and a special character"
      );
      return false;
    } else {
      setErrorPassword("");
      return true;
    }
  };

  // -----------Event handlers-----------
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // e.target.name and e.target.value
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value, // Brackets [] make the key property become dynamic following the e.target.name
      };
    });
  };

  const handleLogin = () => {
    let isValid = true;
    if (!validateUsername()) {
      isValid = false;
    }

    if (!validatePassword()) {
      isValid = false;
    }

    if (isValid) {
      alert("Login successful.");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="fixed bg-gray-600/60 top-0 left-0 flex justify-center items-center h-full w-full">
        <div className="relative bg-white rounded-2xl w-1/3 p-4" ref={modalRef}>
          <span
            className="absolute top-2 right-2 text-3xl rounded-full hover:bg-gray-200/50 hover:cursor-pointer px-4"
            onClick={closeModal}
          >
            &times;
          </span>

          <div className="grid auto-rows-auto mt-10">
            <h2 className="text-center font-bold text-3xl mb-8">Login Modal</h2>

            {/* Content */}

            {/* Username */}

            <Input
              src="./src/assets/user.png"
              type="text"
              name="username"
              id="username"
              placeholder={`Enter your username`}
              value={formData.username}
              handleChange={handleChange}
              errorMessage={errorUsername}
            />

            <div className="border opacity-10 w-1/2 mx-auto my-1"></div>

            {/* Password */}
            <Input
              src="./src/assets/padlock.png"
              type="password"
              name="password"
              id="password"
              placeholder={`Enter your password`}
              value={formData.password}
              handleChange={handleChange}
              errorMessage={errorPassword}
            />

            <div className="border opacity-10 w-1/2 mx-auto my-1"></div>

            {/* SIGN IN BUTTON */}
            <div className="grid auto-rows-auto">
              <button
                // type="submit"
                className="cold-color-linear text-white w-2/3 mx-auto my-4 p-4 font-bold rounded-xl hover:cursor-pointer"
                onClick={handleLogin}
              >
                SIGN IN
              </button>

              <a
                className="mx-auto text-blue-800 hover:opacity-70 hover:cursor-pointer block"
                href=""
              >
                Forgot Password?
              </a>
            </div>

            {/* Divider */}
            <div className="border my-2"></div>

            {/* Footer */}
            <div className="flex justify-center items-center">
              <span>
                Don't have an account?
                <a
                  href=""
                  className="mx-auto text-blue-800 hover:opacity-70 hover:cursor-pointer px-1"
                >
                  Create one!
                </a>
              </span>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
