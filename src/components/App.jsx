import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { FormContacts } from './FormContacts/FormContacts';
import { FilterContacts } from './FilterContacts/FilterContacts';
import { ContactList } from './ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  // метод,  загружает сохраненные контакты из localStorage,
  //  устанавливает их в состояние contacts и сохраняет их в
  // localStorage при первом рендере компонента.
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setContacts(savedContacts);
  }, []);
  // сохраняем текущее состояние contacts в localStorage, когда contacts изменяется.
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // добавляем новый контакт, в массив contacts в state
  const addContact = ({ name, number }) => {
    const names = contacts.map(contact => contact.name);
    // проверяем, существует ли контакт с таким же
    // именем, и если да, то выводим предупреждение
    if (names.indexOf(name) >= 0) {
      alert(`${name} is already in contacts`);
      return;
    }
    // Если контакт не существует, то добавляем его в
    // массив с помощью nanoid, генерирующей уникальный id
    setContacts(prevContacts => [
      { name, number, id: nanoid() },
      ...prevContacts,
    ]);
    //  сохраняем массив контактов в localStorage, используя
    // JSON - строку с ключом "contacts".Массив состоит из
    // нового контакта и всех предыдущих контактов.
    localStorage.setItem(
      'contacts',
      JSON.stringify([{ name, number, id: nanoid() }, ...contacts])
    );
  };

  // удаляем контакт из массива contacts в state
  // компонента на основе его id
  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <>
      <Section title="Phonebook">
        <FormContacts onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <FilterContacts
          name={'filter'}
          filterInput={e => setFilter(e.target.value)}
        />
        <ContactList
          contacts={contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
}

export default App;
