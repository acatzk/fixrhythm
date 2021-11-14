import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import DeleteForm from './DeleteForm'

interface TypeProps {
  host: any
  composition: any
  setIsDropdown: any
  postUrl?: any
}

const EditCard: React.FC<TypeProps> = ({ host, composition, setIsDropdown, postUrl }) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setIsDropdown(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        className="w-full px-3 py-2 border-t border-pantone-white border-opacity-10 font-light text-xs text-left transition ease-linear duration-200 bg-pantone-darkblack hover:bg-pantone-white hover:bg-opacity-10"
        type="button"
        onClick={openModal}
      >
        Delete
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform text-pantone-white bg-pantone-darkblack bg-opacity-10 backdrop-blur-sm shadow-xl rounded-xl border-2 border-pantone-white border-opacity-10">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row items-center justify-between w-full px-5 py-3 bg-pantone-darkblack">
                    <h3 className="font-black text-xl text-pantone-red">FIXRHYTHM</h3>
                    <h3 className="font-light text-sm">Delete Composition</h3>
                  </div>
                  <DeleteForm
                    host={host}
                    composition={composition}
                    closeModal={closeModal}
                    postUrl={postUrl}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default EditCard