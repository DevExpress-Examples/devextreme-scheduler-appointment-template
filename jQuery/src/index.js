$(() => {
  const isWeekEnd = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const getCurrentTraining = (date, employeeID) => {
    const result = (date + employeeID) % 3;
    return `training-background-${result}`;
  };

  const appointmentTooltipTemplate = (data) => {
    const curResource = employees
      .find((resource) => resource.id === data.appointmentData.employeeID);

    const tooltip = $('<div class="dx-tooltip-appointment-item">');
    const marker = $('<div class="dx-tooltip-appointment-item-marker">')
      .append($('<div class="dx-tooltip-appointment-item-marker-body">').css('background', curResource.color));
    const content = $('<div class="dx-tooltip-appointment-item-content">')
      .append($('<div class="dx-tooltip-appointment-item-content-subject">').text(data.appointmentData.text))
      .append($('<div class="dx-tooltip-appointment-item-content-date">').text(data.appointmentData.startDate));

    tooltip.append(marker);
    tooltip.append(content);

    const isButtonExist = !curResource.disabled && (scheduler.option('editing')
        && (scheduler.option('editing.allowDeleting') === true || scheduler.option('editing') === true));

    if (isButtonExist) {
      const buttonContainer = $('<div class="dx-tooltip-appointment-item-delete-button-container">');
      const button = $('<div class="dx-tooltip-appointment-item-delete-button">').dxButton({
        icon: 'trash',
        stylingMode: 'text',
        onClick(e) {
          scheduler.deleteAppointment(data.appointmentData);
          e.event.stopPropagation();
          scheduler.hideAppointmentTooltip();
        },
      });

      buttonContainer.append(button);
      tooltip.append(buttonContainer);
    }

    return tooltip;
  };

  const dataCellTemplate = (cellData, index, container) => {
    const { employeeID } = cellData.groups;
    const currentTraining = getCurrentTraining(cellData.startDate.getDate(), employeeID);

    const wrapper = $('<div>')
      .toggleClass(`employee-weekend-${employeeID}`, isWeekEnd(cellData.startDate)).appendTo(container)
      .addClass(`employee-${employeeID}`)
      .addClass('dx-template-wrapper');

    wrapper.append($('<div>')
      .text(cellData.text)
      .addClass(currentTraining)
      .addClass('day-cell'));
  };

  const resourceCellTemplate = (cellData) => {
    const name = $('<div>')
      .addClass('name')
      .css({ backgroundColor: cellData.color })
      .append($('<h2>')
        .text(cellData.text));

    const avatar = $('<div>')
      .addClass('avatar')
      .html(`<img src=${cellData.data.avatar}>`)
      .attr('title', cellData.text);

    const info = $('<div>')
      .addClass('info')
      .css({ color: cellData.color })
      .html(`Age: ${cellData.data.age}<br/><b>${cellData.data.discipline}</b>`);

    return $('<div>').append([name, avatar, info]);
  };

  const scheduler = $('#scheduler').dxScheduler({
    timeZone: 'America/Los_Angeles',
    dataSource: data,
    views: ['month'],
    currentView: 'month',
    currentDate: new Date(2021, 5, 2, 11, 30),
    firstDayOfWeek: 1,
    startDayHour: 8,
    endDayHour: 18,
    showAllDayPanel: false,
    height: 600,
    groups: ['employeeID'],
    resources: [
      {
        fieldExpr: 'employeeID',
        allowMultiple: false,
        dataSource: employees,
        label: 'Employee',
      },
    ],
    appointmentTooltipTemplate,
    dataCellTemplate,
    resourceCellTemplate,
  }).dxScheduler('instance');
});

const employees = [{
  text: 'John Heart',
  id: 1,
  color: '#56ca85',
  avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-man.png',
  age: 27,
  discipline: 'ABS, Fitball, StepFit',
}, {
  text: 'Sandra Johnson',
  id: 2,
  color: '#ff9747',
  avatar: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/coach-woman.png',
  age: 25,
  discipline: 'ABS, Fitball, StepFit',
}];

const data = [
  {
    text: 'Helen',
    employeeID: 2,
    startDate: new Date('2021-06-01T16:30:00.000Z'),
    endDate: new Date('2021-06-01T18:30:00.000Z'),
  }, {
    text: 'Helen',
    employeeID: 2,
    startDate: new Date('2021-06-10T16:30:00.000Z'),
    endDate: new Date('2021-06-11T18:30:00.000Z'),
  }, {
    text: 'Alex',
    employeeID: 1,
    startDate: new Date('2021-06-02T16:30:00.000Z'),
    endDate: new Date('2021-06-02T18:30:00.000Z'),
  }, {
    text: 'Alex',
    employeeID: 1,
    startDate: new Date('2021-06-11T19:00:00.000Z'),
    endDate: new Date('2021-06-11T20:00:00.000Z'),
  }, {
    text: 'Alex',
    employeeID: 2,
    startDate: new Date('2021-06-16T16:30:00.000Z'),
    endDate: new Date('2021-06-16T18:30:00.000Z'),
  }, {
    text: 'Stan',
    employeeID: 1,
    startDate: new Date('2021-06-07T16:30:00.000Z'),
    endDate: new Date('2021-06-07T18:30:00.000Z'),
  }, {
    text: 'Stan',
    employeeID: 1,
    startDate: new Date('2021-06-28T16:30:00.000Z'),
    endDate: new Date('2021-06-28T18:30:00.000Z'),
  }, {
    text: 'Stan',
    employeeID: 1,
    startDate: new Date('2021-06-30T16:30:00.000Z'),
    endDate: new Date('2021-06-30T18:30:00.000Z'),
  }, {
    text: 'Rachel',
    employeeID: 2,
    startDate: new Date('2021-06-04T16:30:00.000Z'),
    endDate: new Date('2021-06-04T18:30:00.000Z'),
  }, {
    text: 'Rachel',
    employeeID: 2,
    startDate: new Date('2021-06-07T16:30:00.000Z'),
    endDate: new Date('2021-06-07T18:30:00.000Z'),
  }, {
    text: 'Rachel',
    employeeID: 1,
    startDate: new Date('2021-06-21T16:30:00.000Z'),
    endDate: new Date('2021-06-21T18:30:00.000Z'),
  }, {
    text: 'Kelly',
    employeeID: 2,
    startDate: new Date('2021-06-15T16:30:00.000Z'),
    endDate: new Date('2021-06-15T18:30:00.000Z'),
  }, {
    text: 'Kelly',
    employeeID: 2,
    startDate: new Date('2021-06-29T16:30:00.000Z'),
    endDate: new Date('2021-06-29T18:30:00.000Z'),
  },
];
