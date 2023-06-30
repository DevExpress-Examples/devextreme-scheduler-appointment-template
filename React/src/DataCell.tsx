import React from 'react';

function isWeekEnd(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function getCurrentTraining(date: number, employeeID: number): string {
  const result = (date + employeeID) % 3;

  return `training-background-${result}`;
}

function DataCell(props: any): JSX.Element {
  const { data: { startDate, groups: { employeeID }, text } } = props;
  const dayClasses = [
    'day-cell',
    getCurrentTraining(startDate.getDate(), employeeID),
  ];

  const employeeClasses = [`employee-${employeeID}`, 'dx-template-wrapper'];
  if (isWeekEnd(startDate)) {
    employeeClasses.push(`employee-weekend-${employeeID}`);
  }

  return (
    <div className={employeeClasses.join(' ')}>
      <div className={dayClasses.join(' ')}>
        {text}
      </div>
    </div>
  );
}

export default DataCell;
