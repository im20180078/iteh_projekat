import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';


import LogoRow from '@/Components/Forum/LogoRow';
import {F3BlockContainer, F1BlockContainer} from '@/Components/Forum/BlockContainer';
import FContainer from '@/Components/Forum/Container';
import FInputText from '@/Components/Forum/InputText';
import FPrimaryButton from '@/Components/Forum/PrimaryButton';
import Dropdown from '@/Components/Forum/Dropdown';

import { checkApiToken, deleteAllApiTokens } from '@/Components/Helper/ApiTokenManager';

interface ComponentArguments{
  user_types: any,
}

export default function Register(props: ComponentArguments) {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    type_id: 1,
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    deleteAllApiTokens();
    console.log(form);
    checkApiToken(form.data.email, form.data.password);
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
      <>
    <Head title="Register" />
    <FContainer>
      <LogoRow />
      <form onSubmit={onSubmit}>
        <F3BlockContainer>

{/* first left block */}
        <div>
        
        <FInputText 
          htmlFor="name" 
          name="Username" 
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          message={form.errors.name}
          onChange={e => form.setData('name', e.currentTarget.value)} 
          required
          autoFocus
          autoComplete="name"
        />

        <FInputText 
          htmlFor="first_name" 
          name="First Name" 
          id="first_name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.first_name}
          message={form.errors.first_name}
          onChange={e => form.setData('first_name', e.currentTarget.value)} 
          required
          autoFocus
        />

        <FInputText 
          htmlFor="last_name" 
          name="Last Name" 
          id="last_name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.last_name}
          message={form.errors.last_name}
          onChange={e => form.setData('last_name', e.currentTarget.value)} 
          required
          autoFocus
        />

        {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
          <div className="mt-4">
            <InputLabel htmlFor="terms">
              <div className="flex items-center">
                <Checkbox
                  name="terms"
                  id="terms"
                  checked={form.data.terms}
                  onChange={e => form.setData('terms', e.currentTarget.checked)}
                  required
                />

                <div className="ml-2">
                  I agree to the
                  <a
                    target="_blank"
                    href={route('terms.show')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    target="_blank"
                    href={route('policy.show')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
              <InputError className="mt-2" message={form.errors.terms} />
            </InputLabel>
          </div>
        )}

        
        </div>

{/* second middle block */}
        <div className="justify-center">

        <Dropdown
          options={props.user_types.map((type) => ({
            value: type.id,
            label: type.type_name,
          }))}
          selectedValue={form.data.type_id}
          onSelect={(value) => form.setData('type_id', value)}
        />
        
        <FPrimaryButton 
          name="Register"
          alternative="Already registered?"
          href={route('login')}
          className={classNames('my-6  mt-24', { 'opacity-25': form.processing }, 'text-c2')}
          disabled={form.processing}
        />
        </div>

{/* third right block */}
        <div>
        <FInputText 
          htmlFor="email"
          name="Email" 
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={form.data.email}
          onChange={e => form.setData('email', e.currentTarget.value)}
          required
          message={form.errors.email}
        />

        <FInputText 
          htmlFor="password" 
          name="Password" 
          id="password"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password}
          onChange={e => form.setData('password', e.currentTarget.value)}
          required
          autoComplete="new-password"
          message={form.errors.password}
        />

        <FInputText 
          htmlFor="password_confirmation" 
          name="Confirm Password" 
          id="password_confirmation"
          type="password"
          className="mt-1 block w-full"
          value={form.data.password_confirmation}
          onChange={e =>
            form.setData('password_confirmation', e.currentTarget.value)
          }
          required
          autoComplete="new-password"
          message={form.errors.password_confirmation}
        />

        </div>

      </F3BlockContainer>
      </form>
    </FContainer>
    </>
  );
}
