import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

import BackLink from '../back-link';
import Button from '../button';
import DefaultContainer from '../../containers/default';
import ErrorMessagesFactory from '../../factories/error-messages';
import Form from '../form';
import Post from '../../services/fetch';
import TextInput from '../text-input';

function Create() {
  const [errorApi, setErrorApi] = useState(null);
  const [errorForm, setErrorForm] = useState(null);
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState(null);

  errorForm && name && setErrorForm(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const _errorForm = name ? null : 'This field is required';

    if (!_errorForm) {
      try {
        await Post('/create', { name })
          .then((res) => {
            setRedirect(`/join/${res.gamecode}/${res.password}`);
          });
      } catch (e) {
        setErrorApi('Unable to create quiz');
      }
    } else {
      setErrorApi(null);
      setErrorForm(_errorForm);
    }
  };

  return (
    <>
      {redirect ? (
        <Navigate to={redirect} />
      ) : (
        <DefaultContainer>
          <Form onSubmit={handleSubmit}>
            <TextInput
              label="Set the quiz name..."
              onChange={setName}
              placeholder="...it will replace Old Skool Quiz"
              value={name}
            />

            <Button>Create</Button>

            {ErrorMessagesFactory({ errorApi, errorForm })}
          </Form>

          <BackLink url="/" />
        </DefaultContainer>
      )}
    </>
  );
}

export default Create;
