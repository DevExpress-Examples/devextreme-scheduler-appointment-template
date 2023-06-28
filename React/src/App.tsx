import React, { useRef, useCallback } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';

import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { ClickEvent } from 'devextreme/ui/button';
import { AppointmentTooltipTemplateData } from 'devextreme/ui/scheduler';

import { employees, data, Employee } from './data';
import DataCell from './DataCell';
import ResourceCell from './ResourceCell';
import Tooltip from './Tooltip';

const currentDate = new Date(2021, 5, 2, 11, 30);
const groups = ['employeeID'];
const views = ['month'] as any;

function App(): JSX.Element {
  const schedulerRef = useRef(null);

  const appointmentTooltip = useCallback((props: AppointmentTooltipTemplateData): JSX.Element => {
    const scheduler = schedulerRef.current as any;
    const onDeleteButtonClick = useCallback((e: ClickEvent): void => {
      scheduler.instance.deleteAppointment(props.appointmentData);
      e.event?.stopPropagation();
      scheduler.instance.hideAppointmentTooltip();
    }, []);

    function getDisabled(employeeID: number): boolean | undefined {
      return employees.find((employee: Employee) => employee.id === employeeID)?.disabled;
    }

    function getColor(employeeID: number): string | undefined {
      return employees.find((employee: Employee) => employee.id === employeeID)?.color;
    }

    const color = getColor(props.appointmentData.employeeID);

    const isDeleteButtonExist = !getDisabled(props.appointmentData.employeeID) && ((scheduler.instance.option('editing') && scheduler.instance.option('editing.allowDeleting') === true) || scheduler.instance.option('editing') === true);

    return (
      <Tooltip
        {...props}
        isDeleteButtonExist={isDeleteButtonExist}
        onDeleteButtonClick={onDeleteButtonClick}
        color={color}
      />
    );
  }, []);

  return (
    <Scheduler
      ref={schedulerRef}
      timeZone='America/Los_Angeles'
      dataSource={data}
      dataCellComponent={DataCell}
      resourceCellComponent={ResourceCell}
      groups={groups}
      views={views}
      defaultCurrentView='month'
      defaultCurrentDate={currentDate}
      height={600}
      showAllDayPanel={true}
      firstDayOfWeek={1}
      startDayHour={8}
      endDayHour={18}
      appointmentTooltipRender={appointmentTooltip}
    >
      <Resource
        label='Employee'
        fieldExpr='employeeID'
        dataSource={employees}
        allowMultiple={false}
      />
    </Scheduler>
  );
}

export default App;
