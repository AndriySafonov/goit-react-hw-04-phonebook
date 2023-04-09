import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './FormContacts.module.css';

export function FormContacts({ onSubmit }) {
  // Используем два состояния, одно для имени, другое для номера
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Обработчик изменения полей ввода имени и номера
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  // Обработчик отправки формы
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor="">
        Name
      </label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
        value={name}
      />
      <label htmlFor="">
        Number
      </label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
        value={number}
      />

      <button type="submit" className={css.btn}>
        Submit
      </button>
    </form>
  );
}

FormContacts.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormContacts;