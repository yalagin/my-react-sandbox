import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';


class EmailMessageForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  renderField = data => {
    data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <div className={`form-group`}>
        <label
          htmlFor={`emailmessage_${data.input.name}`}
          className="form-control-label"
        >
          {data.input.name}
        </label>
        <input
          {...data.input}
          type={data.type}
          step={data.step}
          required={data.required}
          placeholder={data.placeholder}
          id={`emailmessage_${data.input.name}`}
        />
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          component={this.renderField}
          name="id"
          type="text"
          placeholder=""
        />
        <Field
          component={this.renderField}
          name="sender"
          type="text"
          placeholder="A sub property of participant. The participant who is at the sending end of the action."
        />
        <Field
          component={this.renderField}
          name="toRecipient"
          type="text"
          placeholder="A sub property of recipient. The recipient who was directly sent the message."
        />
        <Field
          component={this.renderField}
          name="about"
          type="text"
          placeholder="the subject matter of the content"
        />
        <Field
          component={this.renderField}
          name="text"
          type="text"
          placeholder="the textual content of this CreativeWork"
        />
        <Field
          component={this.renderField}
          name="dateReceived"
          type="dateTime"
          placeholder="the date/time the message was received if a single recipient exists"
        />
        <Field
          component={this.renderField}
          name="attachment"
          type="checkbox"
          placeholder=""
        />

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'emailmessage',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EmailMessageForm);
