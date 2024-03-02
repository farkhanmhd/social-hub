"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import FormInput from "@/app/components/Form/FormInput";
import useInput from "@/app/hooks/useInput";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncRegister } from "@/app/states/authUser/thunk";
import { useRouter } from "next/navigation";
import useClickOutside from "@/app/hooks/useClickOutside";
import Modal from "@/app/components/Modal/Modal";

export default function RegisterPage() {
  const { value: name, onChange: setName } = useInput("");
  const { value: email, onChange: setEmail } = useInput("");
  const { value: password, onChange: setPassword } = useInput("");
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    setOpenModal(false);
  });

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { status, message } = await dispatch(
      asyncRegister({ name, email, password }),
    );
    setOpenModal(true);
    setModalMessage(message);
    if (status === "success") {
      setTimeout(() => {
        push("/login");
      }, 2000);
    }
  };

  return (
    <>
      {openModal && (
        <Modal title="Register" message={modalMessage} ref={modalRef} />
      )}
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            <span>Register to Social</span>
            <span className="text-blue-500">Hub</span>
          </h2>
        </div>

        <div className="mt-10 w-full sm:mx-auto sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => onRegister(e)}>
            <FormInput
              label="Your Name"
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={setName}
            />
            <FormInput
              label="Email address"
              type="email"
              id="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={setEmail}
            />
            <FormInput
              label="Password"
              type="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={setPassword}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm duration-200 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
