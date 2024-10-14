using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CheckIn
    {
        [Key]
        public Guid CheckInId { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid MedicationId { get; set; }

        public Guid? ReminderId { get; set; } // Nullable in case check-in is not linked to a reminder

        public Guid? TokenId { get; set; } // Nullable in case check-in is not via a token

        [Required]
        public DateTime CheckInTime { get; set; }

        [StringLength(1000)]
        public string Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("MedicationId")]
        public Medication Medication { get; set; }

        [ForeignKey("ReminderId")]
        public Reminder Reminder { get; set; }

        [ForeignKey("TokenId")]
        public Token Token { get; set; }
    }
}
