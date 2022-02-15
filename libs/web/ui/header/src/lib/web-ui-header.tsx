import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/home', current: true },
  { name: 'Keypair', href: '/keypair', current: false },
  { name: 'Airdrop', href: '/airdrop', current: false },
  { name: 'Legacy', href: '/legacy', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export interface WebUiHeaderProps {}

export function WebUiHeader(props: WebUiHeaderProps) {
  const appLogo = '/assets/logo.svg';

  const networks = ['Mainnet', 'Devnet'];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-20"
                    src={appLogo}
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-20"
                    src={appLogo}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      activeClassName="bg-gray-900 text-white"
                      className={
                        'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {/*<div className="flex-shrink-0 flex space-x-2">*/}
                {/*  {networks.map((network) => (*/}
                {/*    <button*/}
                {/*      key={network}*/}
                {/*      type="button"*/}
                {/*      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"*/}
                {/*    >*/}
                {/*      <span>{network}</span>*/}
                {/*    </button>*/}
                {/*  ))}*/}
                {/*</div>*/}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default WebUiHeader;
