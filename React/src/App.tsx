import React, {
  useRef, useMemo, useCallback, RefObject,
} from 'react';
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
const views = ['month'] as ['month'];

function getDisabled(employeeID: number): boolean | undefined {
  return employees.find((employee: Employee) => employee.id === employeeID)?.disabled;
}

function getColor(employeeID: number): string | undefined {
  return employees.find((employee: Employee) => employee.id === employeeID)?.color;
}

function createAppointmentTooltip(schedulerRef: RefObject<Scheduler>) {
  return function AppointmentTooltip({ data: props }: { data: AppointmentTooltipTemplateData }): JSX.Element {
    const scheduler = schedulerRef.current;
    const onDeleteButtonClick = useCallback((e: ClickEvent): void => {
      schedulerRef.current?.instance.deleteAppointment(props.appointmentData);
      e.event?.stopPropagation();
      schedulerRef.current?.instance.hideAppointmentTooltip();
    }, [props.appointmentData]);

    const color = getColor(props.appointmentData.employeeID);

    const isEditing = scheduler?.instance.option('editing');
    const isAllowDeleting = scheduler?.instance.option('editing.allowDeleting') === true;
    const isDeleteButtonExist = !getDisabled(props.appointmentData.employeeID)
      && ((isEditing && isAllowDeleting) || isEditing === true);

    return (
      <Tooltip
        {...props}
        isDeleteButtonExist={isDeleteButtonExist}
        onDeleteButtonClick={onDeleteButtonClick}
        color={color}
      />
    );
  };
}

function App(): JSX.Element {
  const schedulerRef = useRef<Scheduler>(null);

  const appointmentTooltip = useMemo(() => createAppointmentTooltip(schedulerRef), []);

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
      appointmentTooltipComponent={appointmentTooltip}
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
