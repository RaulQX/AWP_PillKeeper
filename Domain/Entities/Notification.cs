using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;
using AWP_PillKeeper.Domain.Entities;
namespace Domain.Entities
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Subtitle { get; set; }
        public DateTime Date { get; set; }
        public bool Taken { get; set; }
        public string Color { get; set; } = string.Empty;
        
        public virtual User User { get; set; } = null!;
    }
}
