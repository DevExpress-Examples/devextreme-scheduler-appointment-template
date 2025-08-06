using System;
using System.Text.Json.Serialization;

namespace ASP_NET_Core.Models
{
    public class Appointment
    {
        [JsonPropertyName("AppointmentId")]
        public int AppointmentId { get; set; }
        [JsonPropertyName("Text")]
        public string Text { get; set; }
        [JsonPropertyName("Description")]
        public string Description { get; set; }
        [JsonPropertyName("StartDate")]
        public string StartDate { get; set; }
        [JsonPropertyName("EndDate")]
        public string EndDate { get; set; }
        [JsonPropertyName("AllDay")]
        public bool AllDay { get; set; }
        [JsonPropertyName("RecurrenceRule")]
        public string RecurrenceRule { get; set; }
        [JsonPropertyName("RecurrenceException")]
        public string RecurrenceException { get; set; }
    }
}
