import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

import FPrimaryButton from '@/Components/Forum/PrimaryButton';
import LogoRow from '@/Components/Forum/LogoRow';
import {F3BlockContainer, F1BlockContainer} from '@/Components/Forum/BlockContainer';
import FContainer from '@/Components/Forum/Container';

import { checkApiToken, deleteAllApiTokens } from '@/Components/Helper/ApiTokenManager';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    deleteAllApiTokens();
    checkApiToken(form.data.email, form.data.password);

    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <>
      <Head title="Business Forum" />

{/* Main container of the website */}

        <FContainer>
          <LogoRow />
          <F1BlockContainer>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
            autoFocus
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="current-password"
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={form.data.remember === 'on'}
              onChange={e =>
                form.setData('remember', e.currentTarget.checked ? 'on' : '')
              }
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
        </div>

        <div className="flex flex-col justify-center space-y-2 md:flex-row md:items-center md:space-y-0 mt-4">
          {canResetPassword && (
            <div>
              <Link
                href={route('password.request')}
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          <FPrimaryButton 
            name="Login"
            alternative="Need an account?"
            href={route('register')}
            className={classNames('my-6', { 'opacity-25': form.processing }, 'text-c2')}
            disabled={form.processing}
          />

        </div>
      </form>
        </F1BlockContainer>
      </FContainer>
    </>
  );
}
