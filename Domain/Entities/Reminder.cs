using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain.Entities
{
    public class Reminder
    {
        [Key]
        public Guid ReminderId { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid MedicationId { get; set; }

        [Required]
        public ReminderType ReminderType { get; set; }

        public decimal? IntervalHours { get; set; } 

        public TimeSpan? FixedTime { get; set; } 

        [Required]
        public DateTime NextReminderTime { get; set; }

        public DateTime? LastCheckInTime { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [StringLength(50)]
        public string HangfireJobId { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("MedicationId")]
        public Medication Medication { get; set; }

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<CheckIn> CheckIns { get; set; }

        public ICollection<Token> Tokens { get; set; }
    }
}
