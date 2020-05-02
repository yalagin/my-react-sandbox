import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import {dateRange, list, reset} from '../../actions/emailmessage/list';
import './list.css';
import DateForm from "./forms/DateForm";
import './../../fonts/HelveticaBold.ttf'
import {Table} from "./UI/Table";
import Pagination from "./UI/Pagination";


class List extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    dateRange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      body: false,
      query: {}
    };
  }

  componentDidMount() {
    this.props.list(
      this.props.match.params.page &&
      decodeURIComponent(this.props.match.params.page)
    );
    if(this.props.match.params.page) {
      this.setState(prevState => ({
        ...prevState,
        query: QueryString.parse(decodeURIComponent(this.props.match.params.page).split("?")[1]),
      }));
    }
  }


  componentDidUpdate(prevProps,prevState) {
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.props.list(
        this.props.match.params.page &&
        decodeURIComponent(this.props.match.params.page)
      );
    }
    if (prevState.query !== this.state.query) {
      let out = [];
      for (let key in this.state.query) {
        if(this.state.query[key]!=="undefined"){
          out.push(key + '=' + (this.state.query[key]));
        }
      }
      const to = encodeURIComponent(`/email_messages?` + out.join('&'));
      this.props.history.push(to);
    }
  }



  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  render() {
    const initialValues = {"dateReceived%5Bafter%5D": this.state.query['dateReceived[after]'],"dateReceived%5Bbefore%5D": this.state.query['dateReceived[before]']};
    return (

      <div className={"container email__list__main_container"}>
        {this.props.loading && (
          <div className="alert alert-info">Loading...</div>
        )}

        {this.props.deletedItem && (
          <div className="alert alert-success">
            {this.props.deletedItem['@id']} deleted.
          </div>
        )}

        {this.props.error && (
          <div className="alert alert-danger">{this.props.error}</div>
        )}

        <div className={"header__container row"}>
          <DateForm onSubmit={this.submitDateForm} initialValues={initialValues}/>
          {this.props.retrieved && Boolean(this.props.retrieved['hydra:totalItems']) &&
          <button className="btn input-group-text btn__showMailBody" onClick={this.toggle}>
            {!this.state.body ? <i className="fa fa-envelope" aria-hidden="true"></i>
              : <i className="fa fa-envelope-open" aria-hidden="true"></i>}
          </button>
          }
          <button className="btn input-group-text btn__reset" style={{marginLeft: "1rem"}} onClick={this.reset}>
            Reset
          </button>
        </div>

        <div
          className="container__info">Result: {this.props.retrieved && this.props.retrieved['hydra:totalItems']} mail(s)
          <br/>
          {(!this.props.retrieved || this.props.retrieved['hydra:totalItems'] === 0) ?? <hr/>}
        </div>

        <Table retrieved={this.props.retrieved}
               body={this.state.body}
               history={this.props.history}
               addToParsedSorting={this.addToParsedSorting}
               query={this.state.query}
        />
        <Pagination retrieved={this.props.retrieved}/>
      </div>
    );
  }
  //update object reflecting the sorting switch
   addToParsedSorting = (name)=> {
    switch (this.state.query[name]) {
      case "asc":
        this.setState(prevState => ({
          ...prevState,
          query: {...prevState.query,[name]: "desc"},
        }));
        // setParsed({...parsed, [name]: "desc"});
        break;
      case "desc":
        // setParsed({...parsed, [name]: undefined});
        this.setState(prevState => ({
          ...prevState,
          query: {...prevState.query,[name]: "undefined"},
        }));
        break;
      default:
        // setParsed({...parsed, [name]: "asc"});
        this.setState(prevState => ({
          ...prevState,
          query: {...prevState.query,[name]:  "asc"},
        }));
        break;
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      ...prevState,
      body: !prevState.body,
    }));
  }

  reset = () => {
    this.setState(prevState => ({
      ...prevState,
      query: {}
    }));
  }

  submitDateForm = (data) => {
  for(const key in data){
    data[ decodeURIComponent(key) ] = data[ key ];
    delete data[ key ];
  }
    this.setState(prevState => ({
      ...prevState,
      query: {...prevState.query,...data},
    }));
  }
}

const mapStateToProps = state => {
  const {
          retrieved,
          loading,
          error,
          eventSource,
          deletedItem
        } = state.emailmessage.list;
  return {retrieved, loading, error, eventSource, deletedItem};
};

const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  dateRange: (before, after) => dispatch(dateRange(before, after)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
