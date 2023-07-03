<template>
  <div>
    <div class="dx-tooltip-appointment-item">

      <div class="dx-tooltip-appointment-item-marker">
        <div
          class="dx-tooltip-appointment-item-marker-body"
          :style="{backgroundColor: markerColor}"
        />
      </div>
      <div class="dx-tooltip-appointment-item-content">
        <div class="dx-tooltip-appointment-item-content">
          <div class="dx-tooltip-appointment-item-content-subject">
            {{ data.appointmentData.text }}
          </div>
          <div class="dx-tooltip-appointment-item-content-date">
            {{ data.appointmentData.startDate.toString() }}
          </div>
        </div>
      </div>
      <div
        v-if="isDeleteButtonExist"
        class="dx-tooltip-appointment-item-delete-button-container"
      >
        <DxButton
          class="dx-tooltip-appointment-item-delete-button"
          icon="trash"
          styling-mode="text"
          @click="onClick"
        />
      </div>
    </div>
  </div>
</template>
<script lang='ts'>

import { DxButton } from 'devextreme-vue/button';
import { employees } from './data.js';
import type { ClickEvent } from 'devextreme/ui/button';

export default {
  components: {
    DxButton,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    markerColor: {
      type: String,
      default: ''
    },
    isDeleteButtonExist: {
      type: Boolean
    }
  },
  data() {
    return {
      employees,
    };
  },
  methods : {
    onClick(e: ClickEvent) {
      this.$emit('delete-button-click', e);
    },

  },
};
</script>
  <style>

  </style>

