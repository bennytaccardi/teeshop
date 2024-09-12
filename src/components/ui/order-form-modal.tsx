/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { addOrderInfo } from "@/app/actions/form-order";
import { User } from "@/entities/user";
import { TeeSize } from "@/entities/tee-size";
import { Gender } from "@/entities/gender";
import BuyButton from "./buy-button";
import CustomSignInButton from "./custom-sing-in-btn";

interface OrderFormModalProps {
  handleBuyModal: (showModal: boolean) => void;
  showModal: boolean;
}

interface OrderFormData {
  address: string;
  phoneNumber: string;
  tShirtSize: TeeSize;
  gender: Gender;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({
  handleBuyModal,
  showModal,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    address: "",
    phoneNumber: "",
    tShirtSize: TeeSize.MEDIUM,
    gender: Gender.NON_SPECIFIED,
  });
  const orderModalRef = useRef<any>();

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [orderModalRef]);

  const handleClickOutside = (e: any) => {
    if (
      !orderModalRef ||
      !orderModalRef.current ||
      !orderModalRef.current.contains(e.target)
    ) {
      handleBuyModal(true);
    }
  };

  const keyDownHandler = (e: any) => {
    if (e.repeat) return;

    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const user: User = {
      address: formData.address,
      tee_size: formData.tShirtSize,
      phone_number: formData.phoneNumber,
      gender: Gender.NON_SPECIFIED,
    };
    try {
      const insertedUser = await addOrderInfo(user);
    } catch (e) {
      console.error(e);
    }
    handleBuyModal(true);
  };

  const handleClose = () => {
    handleBuyModal(true);
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <div
          className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          ref={orderModalRef}
        >
          <SignedOut>
            <SignInButton>
              <CustomSignInButton />
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-white">
              Order Your T-Shirt
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  placeholder="1234567890"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="tShirtSize"
                  className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300"
                >
                  T-Shirt Size
                </label>
                <select
                  id="tShirtSize"
                  name="tShirtSize"
                  value={formData.tShirtSize}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select a size</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">X-Large</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="tShirtSize"
                  className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Your gender</option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                  <option value="N">Non specified</option>
                </select>
              </div>

              <BuyButton
                price="29,99"
                description="nice tee"
                priceId="price_1PsXkCKLUr3CgMrlPiwyIHZs"
              ></BuyButton>
            </form>
          </SignedIn>

          {/* Close button positioned outside the modal */}
        </div>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderFormModal;
