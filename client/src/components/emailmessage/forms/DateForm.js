import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import calendar from "../../../images/icon_calender.svg";
import iconSearch from "../../../images/icon_search.svg";

class DateForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  renderField = data => {
    data.input.className = 'form-control border-right-0 border-left-0 ';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <input
        {...data.input}
        type={data.type}
        step={data.step}
        required={data.required}
        placeholder={data.placeholder}
        id={`date_form_${data.input.name}`}
      />
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className={`input-group datepicker`} >
        <div className="input-group-prepend ">
          <span className="input-group-text bg-white border-right-0">
            <img src={calendar} alt="calendar"
                 className="calendar__logo"
                 style={{"height": "1rem"}}/></span>
        </div>
        <Field
          component={this.renderField}
          name="dateReceived%5Bafter%5D"
          type="date"
          placeholder="Starting date"
        />
        <div className="dash">-</div>
        <Field
          component={this.renderField}
          name="dateReceived%5Bbefore%5D"
          type="date"
          placeholder="Ending date"
        />
        <div className="input-group-append">
          <button type="submit" className="btn input-group-text">
            <img src={iconSearch} alt="calendar"
                 className="calendar__logo"
                 style={{"height": "1rem"}}/>
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'date_form',
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(DateForm);
