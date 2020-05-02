import React, {useState, useEffect} from 'react';
import TableRow from "./TableRow";
import logo from "../../../images/logo.png";
import PropTypes from "prop-types";
import iconArrowUp from "../../../images/icon_arrow01.svg";

export const Table = (props) => {
  // get arrow up or down depending on the parsed query params
  function getArrow(parsedElement) {
    return <>
      {parsedElement === "asc" ?
        <img src={iconArrowUp} alt="icon arrow up" className="icon__sorting"/> :
        parsedElement === "desc" ?
          <img src={iconArrowUp} alt="icon arrow down" style={{transform: "scaleY(-1)"}}
               className="icon__sorting"/> : ""
      }
    </>;
  }

  if (props.retrieved && props.retrieved['hydra:totalItems']) {
    return <>
      <table className="table thead-light ">
        <thead className={"table__head table-secondary"}>
        <tr>
          <th className={'pointer'} onClick={() => props.addToParsedSorting("order[sender]")} >From {getArrow(props.query["order[sender]"])} </th>
          <th className={'pointer'} onClick={() => props.addToParsedSorting("order[toRecipient]")} colSpan={2}>To {getArrow(props.query["order[toRecipient]"])}</th>
          <th className={'pointer'} onClick={() => props.addToParsedSorting("order[about]")} colSpan={2}>Subject {getArrow(props.query["order[about]"])}</th>
          <th className={'pointer'} onClick={() => props.addToParsedSorting("order[dateReceived]")}>Date {getArrow(props.query["order[dateReceived]"])}</th>
        </tr>
        </thead>
        {props.retrieved['hydra:member'].map(item => <TableRow key={item['@id']} item={item} body={props.body}/>)}
      </table>
    </>;
  } else {
    return (<div>
      <hr/>
      <img src={logo} alt="React Logo" className="welcome_logo mx-auto"/>
    </div>)
  }
}
