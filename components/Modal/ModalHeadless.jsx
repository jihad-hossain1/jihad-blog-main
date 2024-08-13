"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ACTION_TYPES } from "@/reducer/categoryReducer";

export default function ModalHeadless({ isOpen, setIsOpen, title, children ,dispatch  }) {
  function closeModal() {
    dispatch({ type: ACTION_TYPES.SET_MODAL_STATE, payload: false });
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as={motion.div}
          className="relative z-50 top-11"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </AnimatePresence>
  );
}
