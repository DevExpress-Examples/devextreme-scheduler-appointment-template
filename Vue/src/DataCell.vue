<template>
  <div
    :class="markWeekEnd(cellData)"
  >
    <div :class="markTraining(cellData)">
      {{ cellData.text }}
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  props: {
    cellData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    markWeekEnd(cellData: any): Record<string, boolean> {
      function isWeekEnd(date: Date) {
        const day = date.getDay();
        return day === 0 || day === 6;
      }
      return {
        [`employee-${cellData.groups.employeeID}`]: true,
        [`employee-weekend-${cellData.groups.employeeID}`]: isWeekEnd(cellData.startDate),
      };
    },

    markTraining(cellData: any): Record<string, boolean> {
      const classObject = {
        'day-cell': true,
      } as Record<string, boolean>;

      classObject[
        this.getCurrentTraining(cellData.startDate.getDate(), cellData.groups.employeeID)
      ] = true;
      return classObject;
    },

    getCurrentTraining(date: number, employeeID: number) {
      const result = (date + employeeID) % 3;
      const currentTraining = `training-background-${result}`;

      return currentTraining;
    },
  },
};
</script>
  <style>
  .day-cell {
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .employee-1 {
    background-color: rgba(86, 202, 133, 0.1);
  }

  .employee-2 {
    background-color: rgba(255, 151, 71, 0.1);
  }

  .employee-weekend-1 {
    background-color: rgba(86, 202, 133, 0.2);
  }

  .employee-weekend-2 {
    background-color: rgba(255, 151, 71, 0.2);
  }

  .training-background-0 {
    background-image: url("https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/icon-abs.png");
  }

  .training-background-1 {
    background-image: url("https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/icon-step.png");
  }

  .training-background-2 {
    background-image: url("https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/gym/icon-fitball.png");
  }

  .dx-theme-material .name h2 {
    font-size: 28px;
  }
  </style>

