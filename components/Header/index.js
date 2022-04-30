import { Fragment, useRef, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  MenuIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  XIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { navigation } from "@utils/Mocks/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { numberFormat } from "@utils/helpers";
import { EmptyCart } from "@components/EmptyCart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Header = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [isCartShowing, setIsCartShowing] = useState(
    Object.keys(cart).length === 0 ? false : true
  );
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { query } = router;

  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-full w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-indigo-600 border-indigo-600"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel
                      key={category.name}
                      className="px-4 py-6 space-y-12"
                    >
                      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative">
                            <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover"
                              />
                            </div>
                            <a
                              href={item.href}
                              className="mt-6 block text-sm font-medium text-gray-900"
                            >
                              <span
                                className="absolute z-10 inset-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-gray-900 transition-200 hover:text-primary"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <Link href="/auth/register">
                    <a className="-m-2 p-2 block font-medium text-gray-900">
                      Create an account
                    </a>
                  </Link>
                </div>
                <div className="flow-root">
                  <Link href="/auth/login">
                    <a className="-m-2 p-2 block font-medium text-gray-900">
                      Sign in
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav className="relative" aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="max-w-screen-2xl mx-auto h-10 px-4 flex items-center justify-end sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6 ">
                <Link href="/auth/login">
                  <a className="text-sm font-medium text-gray-300 hover:text-white transition-200">
                    Sign in
                  </a>
                </Link>
                <Link href="/auth/register">
                  <a className="text-sm font-medium text-gray-300 hover:text-white transition-200">
                    Create an account
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="h-16 flex items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex-1 lg:flex lg:items-center">
                    <Link href="/">
                      <a>
                        <h1 className="text-2xl text-primary font-semibold select-none">
                          CodeDeck
                        </h1>
                      </a>
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="px-4 bottom-0 inset-x-0 ">
                      <div className="h-full flex justify-center space-x-8">
                        {navigation.categories.map((category) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-700 hover:text-primary",
                                      "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500 z-30">
                                    <div
                                      className="absolute inset-0 top-1/2 bg-white shadow-lg"
                                      aria-hidden="true"
                                    />

                                    <div className="relative bg-gray-50">
                                      <div className="max-w-screen-2xl mx-auto px-8">
                                        <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                          {category.featured.map((item) => (
                                            <div
                                              key={item.name}
                                              className="group relative"
                                            >
                                              <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-center object-cover"
                                                />
                                              </div>
                                              <a
                                                href={item.href}
                                                className="mt-4 block font-medium text-gray-900 text-lg"
                                              >
                                                <span
                                                  className="absolute z-10 inset-0"
                                                  aria-hidden="true"
                                                />
                                                {item.name}
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 transition-200 hover:text-primary"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex-1 flex items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                      onClick={() => setOpen(!open)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a
                      href="#"
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">CodeDeck</span>
                    <Link href="/">
                      <a>
                        <h1 className="text-2xl text-primary font-semibold select-none">
                          CodeDeck
                        </h1>
                      </a>
                    </Link>
                  </a>

                  <div className="flex-1 flex items-center justify-end space-x-3">
                    <SearchIcon className="w-7 h-7 text-gray-400 cursor-pointer transition-200 hover:text-primary hidden lg:inline-flex" />

                    <div className="relative flex items-center select-none">
                      {/* Cart */}
                      <div className="p-2 cursor-pointer">
                        <div className="relative group flex items-center">
                          <ShoppingBagIcon
                            className="flex-shrink-0 h-8 w-8 transition-200 text-gray-400 group-hover:text-primary"
                            aria-hidden="true"
                            onClick={() => setIsCartShowing(!isCartShowing)}
                          />
                          <span className="absolute top-1/2 left-1/2 transform -translate-y-[15%] -translate-x-1/2 text-[10px] font-bold text-gray-400 group-hover:text-primary transition-200">
                            10
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </div>
                      </div>

                      {/* Flyout cart */}
                      <Transition
                        as={Fragment}
                        show={isCartShowing}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="sidebar absolute top-12 right-2 bg-white p-4 w-[375px] shadow-xl z-50 select-none">
                          {Object.keys(cart).length === 0 && (
                            <div>
                              <EmptyCart size="sm" />
                            </div>
                          )}
                          {Object.keys(cart).length !== 0 && (
                            <>
                              <div className="cart-header flex justify-between items-center border-b pb-2">
                                <h2 className="font-bold">Cart</h2>
                                <span>
                                  <XIcon
                                    className="w-5 h-5 cursor-pointer transition-200 text-gray-600 hover:text-primary"
                                    aria-hidden="true"
                                    onClick={() => setIsCartShowing(false)}
                                  />
                                </span>
                              </div>
                              <div className="mt-2">
                                <table width="100%" className="font-bold">
                                  <tr>
                                    <td width="50%" align="left">
                                      Item
                                    </td>
                                    <td width="30%" align="center">
                                      Qty.
                                    </td>
                                    <td width="20%" align="right">
                                      Total
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <div className="mt-2 pb-2">
                                <table width="100%">
                                  {Object.keys(cart).map((k) => {
                                    return (
                                      <tr key={k}>
                                        <td width="50%">
                                          <div className="line-clamp-2">
                                            {cart[k].name} ({cart[k].size}/
                                            {cart[k].variant})
                                          </div>
                                        </td>
                                        <td width="30%" align="center">
                                          <MinusIcon
                                            className="w-6 h-6 inline-flex shadow-md border rounded-md p-1 cursor-pointer"
                                            onClick={() =>
                                              removeFromCart(
                                                k,
                                                1,
                                                cart[k].price,
                                                cart[k].name,
                                                cart[k].size,
                                                cart[k].variant
                                              )
                                            }
                                          />
                                          <span className="mx-2">
                                            {cart[k].qty}
                                          </span>
                                          <PlusIcon
                                            onClick={() =>
                                              addToCart(
                                                query.slug,
                                                1,
                                                499,
                                                "Tshirt (XL, Red)",
                                                "XL",
                                                "Red"
                                              )
                                            }
                                            className="w-6 h-6 inline-flex shadow-md border rounded-md p-1 cursor-pointer"
                                          />
                                        </td>
                                        <td width="20%" align="right">
                                          {cart[k].price}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </table>
                              </div>
                              {Object.keys(cart).length !== 0 && (
                                <div className="flex justify-between mt-2 border-t pt-4">
                                  <b className="bold">Subtotal</b>
                                  <b>{numberFormat(subTotal)}</b>
                                </div>
                              )}
                              <div className="flex items-center justify-between space-x-4 mt-5">
                                {Object.keys(cart).length === 0 ? (
                                  <>
                                    <button
                                      className="btn-ghost w-full flex items-center justify-center space-x-1 transition-200"
                                      onClick={clearCart}
                                    >
                                      <span className="text-base">
                                        Shop Now
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn-ghost w-full flex items-center justify-center space-x-1 transition-200"
                                      onClick={clearCart}
                                    >
                                      <span className="text-base">
                                        Clear Cart
                                      </span>
                                    </button>
                                    <Link href={"/checkout"} passHref>
                                      <button
                                        className="btn-black w-full flex items-center justify-center space-x-1 transition-200"
                                        onClick={() => setIsCartShowing(false)}
                                      >
                                        <ShoppingCartIcon className="w-[18px] h-[18px]" />
                                        <span className="text-base">
                                          Checkout
                                        </span>
                                      </button>
                                    </Link>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </Transition>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
