import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import iconClip from "../../../images/icon_clip.svg"
import emailIcon from "../../../images/icon_mail_sp.svg"
import arrowRight from "../../../images/icon_arrow02.svg"
import moment from "moment";
import ClampLines from 'react-clamp-lines';


export default function TableRow(props) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  //emailCounter
  let toRecipient = props.item['toRecipient'];
  let emailCounter = false;
  if (toRecipient && props.item['toRecipient'].split(" ").length > 1) {
    let emailSplit = props.item['toRecipient'].split(" ");
    toRecipient = emailSplit[0] + "...";
    emailCounter = emailSplit.length;
  }


  const [redirect, setRedirect] = useState(false);
  const toDetails = () => {
    setRedirect(true);
  }
  if (redirect) {
    return <Redirect push to={`show/${encodeURIComponent(props.item['@id'])}`}/>;
  }

  return (
    <tbody className={"tbody"}>
    <tr onClick={toDetails} className={"table__row"} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <td>{props.item['sender']}</td>
      <td>{toRecipient}</td>
      <td>{emailCounter ? <span key={emailCounter}
                                className="input-group-text email__counter border-0">+{emailCounter}</span> : false}</td>
      <td>{props.item['about']}</td>
      <td>{props.item['attachment'] ? <img src={iconClip} alt="iconClip"
                                           className={hovered ? 'hovered' : ''}
                                           style={{"height": "1rem"}}/> : false}
      </td>
      <td>{moment(props.item['dateReceived']).calendar()}</td>
      <div className="small__screen">
        <div className="small__screen__up">
          <div className="left__icon">
            <div className="left__icon"><img className="left__icon__image" src={emailIcon} alt="icon__email"/></div>
          </div>
          <div className="center__emails__addresses"><span className={'sender'}>{props.item['sender']}</span>
            <br/>{toRecipient}</div>
          <div className="right__info">
            <div className="right__info__upper">
              {props.item['attachment'] ? <img src={iconClip} alt="iconClip"
                                               className={hovered ? 'hovered' : ''}
                                               style={{
                                                 "height": "1rem",
                                                 marginRight: "0.5rem"
                                               }}/> : false}{moment(props.item['dateReceived']).calendar()}
              <img className="right__icon__image__arrow__right" src={arrowRight} alt="arrow right"/>
            </div>
            <div className="right__info__downer">
              {emailCounter ? <span key={emailCounter}
                                    className="input-group-text email__counter border-0">+{emailCounter}</span> : false}
            </div>
          </div>
        </div>
        <div className="small__screen__down">
          <ClampLines
            text={props.item['about']}
            id="really-unique-id"
            lines={1}
            ellipsis="..."
            className="custom-class"
            innerElement="div"
            buttons={false}
          />
        </div>
        <div>{props.body && (
          props.item['text']
        )}</div>
      </div>
    </tr>
    <tr>
      {props.body && (
        <td colSpan={7}>{props.item['text']}
        </td>
      )}
    </tr>
    </tbody>
  );
}
