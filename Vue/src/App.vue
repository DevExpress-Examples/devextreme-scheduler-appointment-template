<template>
  <DxScheduler
    ref="schedulerRef"
    time-zone="America/Los_Angeles"
    :data-source="dataSource"
    :current-date="currentDate"
    :views="views"
    :groups="groups"
    :height="600"
    :show-all-day-panel="true"
    :first-day-of-week="1"
    :start-day-hour="8"
    :end-day-hour="18"
    current-view="month"
    data-cell-template="dataCellTemplate"
    resource-cell-template="resourceCellTemplate"
    appointment-tooltip-template="appointmentTooltipTemplate"
  >
    <DxResource
      :data-source="employees"
      :allow-multiple="false"
      label="Employee"
      field-expr="employeeID"
    />

    <template #resourceCellTemplate="{ data: employee }">
      <ResourceCell :employee="employee" />
    </template>

    <template #dataCellTemplate="{ data: cellData }">
      <DataCell :cell-data="cellData" />
    </template>

    <template #appointmentTooltipTemplate="{ data }">
      <TooltipTemplate
        :data="data"
        @delete-button-click="onDeleteButtonClick($event, data)"
        :marker-color="getColor(data.appointmentData.employeeID)"
        :is-delete-button-exist="getDeleteButtonStatus(data)"
      />
    </template>
  </DxScheduler>
</template>

<script setup lang="ts">
import './assets/main.css'
import { ref, computed } from 'vue'
import { DxScheduler, DxResource } from 'devextreme-vue/scheduler'
import { employees, data, type Employee } from './data.js'
import DataCell from './DataCell.vue'
import ResourceCell from './ResourceCell.vue'
import TooltipTemplate from './TooltipTemplate.vue'
import type { AppointmentTooltipTemplateData } from 'devextreme/ui/scheduler'
import type { ClickEvent } from 'devextreme/ui/button'
import type dxScheduler from 'devextreme/ui/scheduler'

const schedulerRef = ref<InstanceType<typeof DxScheduler> | null>(null)
const groups = ['employeeID']
const views = ['month']
const currentDate = ref(new Date(2021, 5, 2, 11, 30))
const dataSource = ref(data)

const scheduler = computed<dxScheduler>(() => {
  return schedulerRef.value?.instance as dxScheduler
})

function onDeleteButtonClick(e: ClickEvent, data: AppointmentTooltipTemplateData) {
  scheduler.value.deleteAppointment(data.appointmentData)
  e.event?.stopPropagation()
  scheduler.value.hideAppointmentTooltip()
}

function getColor(employeeID: number): string | undefined {
  return employees.find((employee: Employee) => employee.id === employeeID)?.color
}

function getDeleteButtonStatus(data: AppointmentTooltipTemplateData): boolean | undefined {
  function getDisabled(employeeID: number) {
    return employees.find((employee: Employee) => employee.id === employeeID)?.disabled
  }

  return (
    !getDisabled(data.appointmentData.employeeID) &&
    ((scheduler.value.option('editing') &&
      scheduler.value.option('editing.allowDeleting') === true) ||
      scheduler.value.option('editing') === true)
  )
}
</script>

<style>
.dx-scheduler-group-header,
.dx-scheduler-date-table-cell {
  position: relative;
}

.dx-scheduler-date-table-other-month.dx-scheduler-date-table-cell {
  opacity: 1;
  color: rgba(0, 0, 0, 0.3);
}

.dx-scheduler-date-table-cell .dx-template-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-right: 6px;
}
</style>
