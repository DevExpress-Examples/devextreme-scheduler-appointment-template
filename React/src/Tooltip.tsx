import { ClickEvent } from 'devextreme/ui/button';
import { Button } from 'devextreme-react';
import React, { useCallback } from 'react';

function Tooltip(props: any): JSX.Element {
  const onDeleteButtonClick = useCallback((e: ClickEvent) => {
    props.onDeleteButtonClick(e);
  }, []);

  return (
    <div className="dx-tooltip-appointment-item">
      <div className="dx-tooltip-appointment-item-marker">
        <div
          className="dx-tooltip-appointment-item-marker-body"
          style={{
            backgroundColor: props.color,
          }}
        ></div>
      </div>
      <div className="dx-tooltip-appointment-item-content">
        <div className="dx-tooltip-appointment-item-content">
          <div className="dx-tooltip-appointment-item-content-subject">
            {props.appointmentData.text}
          </div>
          <div className="dx-tooltip-appointment-item-content-date">
            {props.appointmentData.startDate.toString()}
          </div>
        </div>
      </div>
      {props.isDeleteButtonExist ? (
        <div className="dx-tooltip-appointment-item-delete-button-container">
          <Button
            className="dx-tooltip-appointment-item-delete-button"
            icon="trash"
            stylingMode="text"
            onClick={onDeleteButtonClick}
          ></Button>
        </div>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}

export default Tooltip;
