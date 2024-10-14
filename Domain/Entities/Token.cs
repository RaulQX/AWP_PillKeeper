using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Token
    {
        [Key]
        public Guid TokenId { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid ReminderId { get; set; }

        [Required]
        [StringLength(500)]
        public string TokenValue { get; set; } // The actual token string

        [Required]
        public DateTime Expiration { get; set; }

        [Required]
        public bool IsUsed { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("ReminderId")]
        public Reminder Reminder { get; set; }

        public ICollection<CheckIn> CheckIns { get; set; }
    }
}
