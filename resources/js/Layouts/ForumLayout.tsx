import { router } from '@inertiajs/core';
import { Link, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Team } from '@/types';

import FNavLink from '@/Components/Forum/NavLink';
import LogoRow from '@/Components/Forum/LogoRow';

import { deleteAllApiTokens } from '@/Components/Helper/ApiTokenManager';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const logoSource = "img/logo.png";
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const classes = route().current('forum')
    ? 'flex-shrink-0 flex items-center border-b-2 border-c1'
    : 'flex-shrink-0 flex items-center';

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  function logout(e: React.FormEvent) {
    e.preventDefault();
    deleteAllApiTokens();
    router.post(route('logout'));
  }

  return (
    <div>
      <Head title={title} />

      <Banner />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-c21 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          {/* <!-- Primary Navigation Menu --> */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* <!-- Logo --> */}
                <div className={classes}>
                  <Link href={route('posts')}>
                    <LogoRow />
                  </Link>
                </div>

{/* <!-- Navigation Links --> */}
                <div className="hidden space-x-8 sm:-my-px ml-6 sm:flex">
                  
                  <FNavLink
                    href={route('posts')}
                    active={route().current('posts')}
                  >
                    Posts
                  </FNavLink>
                  <FNavLink
                    href={route('new_post')}
                    active={route().current('new_post')}
                  >
                    New Post
                  </FNavLink>
                </div>
              </div>

{/* <!-- Profile image --> */}
              <div className="hidden sm:flex sm:items-center sm:ml-6">

{/* <!-- Settings Dropdown --> */}
                <div className="ml-3 relative">
                  <Dropdown
                    align="right"
                    width="48"
                    renderTrigger={() =>
                      page.props.jetstream.managesProfilePhotos ? (
                        <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={page.props.auth.user?.profile_photo_url}
                            alt={page.props.auth.user?.name}
                          />
                        </button>
                      ) : (
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
                          >
                            {page.props.auth.user?.name}

                            <svg
                              className="ml-2 -mr-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </button>
                        </span>
                      )
                    }
                  >
                    {/* <!-- Account Management --> */}
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Manage Account
                    </div>

                    <DropdownLink href={route('profile.show')}>
                      Settings
                    </DropdownLink>

                    {/*page.props.jetstream.hasApiFeatures ? (
                      <DropdownLink href={route('api-tokens.index')}>
                        API Tokens
                      </DropdownLink>
                    ) : null*/}

                    <div className="border-t border-gray-200 dark:border-gray-600"></div>

                    {/* <!-- Authentication --> */}
                    <form onSubmit={logout}>
                      <DropdownLink as="button">Log Out</DropdownLink>
                    </form>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Responsive Navigation Menu --> */}
          <div
            className={classNames('sm:hidden', {
              block: showingNavigationDropdown,
              hidden: !showingNavigationDropdown,
            })}
          >
            <div className="pt-2 pb-3 space-y-1">
              <ResponsiveNavLink
                href={route('posts')}
                active={route().current('posts')}
              >
                Forum
              </ResponsiveNavLink>
            </div>

            {/* <!-- Responsive Settings Options --> */}
            <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center px-4">
                {page.props.jetstream.managesProfilePhotos ? (
                  <div className="flex-shrink-0 mr-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={page.props.auth.user?.profile_photo_url}
                      alt={page.props.auth.user?.name}
                    />
                  </div>
                ) : null}

                <div>
                  <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                    {page.props.auth.user?.name}
                  </div>
                  <div className="font-medium text-sm text-gray-500">
                    {page.props.auth.user?.email}
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <ResponsiveNavLink
                  href={route('profile.show')}
                  active={route().current('profile.show')}
                >
                  Profile
                </ResponsiveNavLink>

                {page.props.jetstream.hasApiFeatures ? (
                  <ResponsiveNavLink
                    href={route('api-tokens.index')}
                    active={route().current('api-tokens.index')}
                  >
                    API Tokens
                  </ResponsiveNavLink>
                ) : null}

                {/* <!-- Authentication --> */}
                <form method="POST" onSubmit={logout}>
                  <ResponsiveNavLink as="button">Log Out</ResponsiveNavLink>
                </form>

                {/* <!-- Team Management --> */}
                {page.props.jetstream.hasTeamFeatures ? (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-600"></div>

                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Manage Team
                    </div>

                    {/* <!-- Team Settings --> */}
                    <ResponsiveNavLink
                      href={route('teams.show', [
                        page.props.auth.user?.current_team!,
                      ])}
                      active={route().current('teams.show')}
                    >
                      Team Settings
                    </ResponsiveNavLink>

                    {page.props.jetstream.canCreateTeams ? (
                      <ResponsiveNavLink
                        href={route('teams.create')}
                        active={route().current('teams.create')}
                      >
                        Create New Team
                      </ResponsiveNavLink>
                    ) : null}

                    <div className="border-t border-gray-200 dark:border-gray-600"></div>

                    {/* <!-- Team Switcher --> */}
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Switch Teams
                    </div>
                    {page.props.auth.user?.all_teams?.map(team => (
                      <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                        <ResponsiveNavLink as="button">
                          <div className="flex items-center">
                            {team.id ==
                              page.props.auth.user?.current_team_id && (
                              <svg
                                className="mr-2 h-5 w-5 text-green-400"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            )}
                            <div>{team.name}</div>
                          </div>
                        </ResponsiveNavLink>
                      </form>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </nav>


        {/* <!-- Page Content --> */}
        <main>{children}</main>
      </div>
    </div>
  );
}
