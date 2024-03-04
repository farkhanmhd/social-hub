"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "@/app/components/Form/FormInput";
import useInput from "@/app/hooks/useInput";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncSetAuthUser } from "@/app/states/authUser/thunk";
import Modal from "@/app/components/CommonModal/Modal";
import useClickOutside from "@/app/hooks/useClickOutside";

export default function LoginPage() {
  const { value: email, onChange: setEmail } = useInput("");
  const { value: password, onChange: setPassword } = useInput("");
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  useClickOutside(modalRef, () => {
    setOpenModal(false);
  });

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { status, message } = await dispatch(
      asyncSetAuthUser({ email, password }),
    );
    setOpenModal(true);
    setModalMessage(`${message}`);
    if (status === "success") {
      setTimeout(() => {
        push("/");
      }, 2000);
    }
  };

  return (
    <>
      {openModal && (
        <Modal ref={modalRef} title="Login" message={modalMessage} />
      )}
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight ">
            <span>Log in to Social</span>
            <span className="text-blue-500">Hub</span>
          </h2>
        </div>

        <div className="mt-10 w-full sm:mx-auto sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => onLogin(e)}>
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
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/register"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
