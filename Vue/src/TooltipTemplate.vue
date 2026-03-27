<template>
  <div>
    <div class="dx-tooltip-appointment-item">
      <div class="dx-tooltip-appointment-item-marker">
        <div
          class="dx-tooltip-appointment-item-marker-body"
          :style="{ backgroundColor: markerColor }"
        />
      </div>

      <div class="dx-tooltip-appointment-item-content">
        <div class="dx-tooltip-appointment-item-content-subject">
          {{ data.appointmentData.text }}
        </div>
        <div class="dx-tooltip-appointment-item-content-date">
          {{ data.appointmentData.startDate.toString() }}
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

<script lang="ts" setup>
import { DxButton } from 'devextreme-vue/button';
import type { ClickEvent } from 'devextreme/ui/button';

defineProps<{
  data: { appointmentData: { text: string; startDate: Date } }
  markerColor: string | undefined;
  isDeleteButtonExist: boolean | undefined;
}>();

const emit = defineEmits<{
  (event: 'delete-button-click', value: ClickEvent): void;
}>();

function onClick(e: ClickEvent) {
  emit('delete-button-click', e);
}
</script>
