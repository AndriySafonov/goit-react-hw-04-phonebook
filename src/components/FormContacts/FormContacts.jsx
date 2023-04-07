import { Component } from 'react'
import PropTypes from 'prop-types';
import css from './FormContacts.module.css';


export class FormContacts extends Component {
    state = { name: '', number: '' }; 

    handleChange = e => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
        // console.log({ [name]: value });
      };
     
    
      handleSubmit = e => {
          e.preventDefault();
          this.props.onSubmit(this.state);
          this.setState({ name: '', number: '' });
    };
    
    render() { 
        return (
            <form className={css.form} onSubmit={this.handleSubmit}>
          <label htmlFor="" >
            Name
          </label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            value={this.state.name}
          />
          <label htmlFor="" >
            Number
          </label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            value={this.state.number}
          />

          <button type="submit" className={css.btn}>
            Submit
          </button>
        </form>
        );
    }
}
FormContacts.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
 