import React, { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchBtnLabel,
  SearchFormInput,
} from 'styled';
export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmitForm = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  handleChangeFilter = evt => {
    this.setState({ query: evt.target.value });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmitForm}>
          <SearchFormButton type="submit">
            <SearchBtnLabel>Search</SearchBtnLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleChangeFilter}
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
  }
}
