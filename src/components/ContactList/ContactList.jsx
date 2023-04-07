import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={css.item}>
            <p>
              {name}:{number}
            </p>
            <button
              className={css.button}
              type="button"
              onClick={() => deleteContact(id)}
              value="delete"
            >
              Delete contact
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
