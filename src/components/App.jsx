import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { FormContacts } from './FormContacts/FormContacts';
import { FilterContacts } from './FilterContacts/FilterContacts';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    // console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      // console.log('update contacts');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    // console.log(prevState);
    // console.log(this.state);
  }

  addContact = ({ name, number }) => {
    const names = this.state.contacts.map(contact => contact.name);
    if (names.indexOf(name) >= 0) {
      alert(name + ' is already in contacts');
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
      };
    });
  };

  filterInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  

  render() {
    const { contacts, filter } = this.state;
    const contactFilter = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <Section title="Phonebook">
          <FormContacts onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <FilterContacts name={'filter'} filterInput={this.filterInput} />
          <ContactList
            contacts={contactFilter}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
