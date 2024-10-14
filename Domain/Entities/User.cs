using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(100)]
        public string GoogleId { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(255)]
        public string Name { get; set; }

        [Phone]
        [StringLength(20)]
        public string PhoneNumber { get; set; }

        [Required]
        public NotificationMethod PreferredNotificationMethod { get; set; } // Enum: Email or SMS

        [StringLength(50)]
        public string TimeZone { get; set; } // e.g., "America/New_York"

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<Medication> Medications { get; set; }

        public ICollection<Reminder> Reminders { get; set; }

        public ICollection<CheckIn> CheckIns { get; set; }

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<Token> Tokens { get; set; }
    }

}
