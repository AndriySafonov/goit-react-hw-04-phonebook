import PropTypes from 'prop-types';
import css from './FilterContacts.module.css';

export const FilterContacts = ({ name, filterInput }) => {
    return (
        <label >
        Find contacts by name
        <input
          className={css.filterInput}
          type="text"
          name={name}
          onChange={filterInput}
        />
      </label>
    )
}

FilterContacts.propTypes = {
    name: PropTypes.string,
    filterInput: PropTypes.func.isRequired,
  };