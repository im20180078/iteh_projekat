import React from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function FInputText(props){
    const { name, htmlFor, message, ...otherProps } = props;
    /*

    textinp:
    id="name"
    type="text"
    className="mt-1 block w-full"
    value={form.data.name}
    onChange={e => form.setData('name', e.currentTarget.value)}
    required
    autoFocus
    autoComplete="name"
    

    label:
    htmlFor="name"
    {name}

    error:
    className="mt-2" message={form.errors.name}
    */
    return(
        <div className="mt-4">
          <InputLabel htmlFor={htmlFor}>{name}</InputLabel>
          <TextInput
            className="mt-1 block w-full"
            {...otherProps}
          />
          <InputError className="mt-2" message={message} />
        </div>
    );
}