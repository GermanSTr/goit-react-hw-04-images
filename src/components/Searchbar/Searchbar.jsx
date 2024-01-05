import React, { useState } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchBtnLabel,
  SearchFormInput,
} from 'styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmitForm = evt => {
    evt.preventDefault();
    onSubmit(query);
  };

  const handleChangeFilter = evt => {
    setQuery(evt.target.value);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmitForm}>
        <SearchFormButton type="submit">
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={handleChangeFilter}
          className="form"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </SearchForm>
    </Header>
  );
};
