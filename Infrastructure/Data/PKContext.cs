using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class PKContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Medication> Medications { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<CheckIn> CheckIns { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Token> Tokens { get; set; }

        public PKContext(DbContextOptions<PKContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.GoogleId)
                .IsUnique();

            modelBuilder.Entity<Medication>()
                .HasOne(m => m.User)
                .WithMany(u => u.Medications)
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reminder>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reminders)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reminder>()
                .Property(r => r.IntervalHours)
                .HasPrecision(18, 4); 

            modelBuilder.Entity<Reminder>()
                .HasOne(r => r.Medication)
                .WithMany(m => m.Reminders)
                .HasForeignKey(r => r.MedicationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CheckIn>()
                .HasOne(c => c.User)
                .WithMany(u => u.CheckIns)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CheckIn>()
                .HasOne(c => c.Medication)
                .WithMany(m => m.CheckIns)
                .HasForeignKey(c => c.MedicationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CheckIn>()
                .HasOne(c => c.Reminder)
                .WithMany(r => r.CheckIns)
                .HasForeignKey(c => c.ReminderId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<CheckIn>()
                .HasOne(c => c.Token)
                .WithMany(t => t.CheckIns)
                .HasForeignKey(c => c.TokenId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.Reminder)
                .WithMany(r => r.Notifications)
                .HasForeignKey(n => n.ReminderId);

            modelBuilder.Entity<Token>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tokens)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Token>()
                .HasOne(t => t.Reminder)
                .WithMany(r => r.Tokens)
                .HasForeignKey(t => t.ReminderId);

            var notificationMethodConverter = new EnumToStringConverter<NotificationMethod>();
            var reminderTypeConverter = new EnumToStringConverter<ReminderType>();
            var notificationStatusConverter = new EnumToStringConverter<NotificationStatus>();

            modelBuilder.Entity<User>()
            .Property(u => u.PreferredNotificationMethod)
            .HasConversion(notificationMethodConverter);

            modelBuilder.Entity<Reminder>()
                .Property(r => r.ReminderType)
                .HasConversion(reminderTypeConverter);

            modelBuilder.Entity<Notification>()
               .Property(n => n.Status)
               .HasConversion(notificationStatusConverter);

            modelBuilder.Entity<Notification>()
                .Property(n => n.NotificationType)
                .HasConversion(notificationMethodConverter);

            modelBuilder.Entity<Token>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tokens)
                .HasForeignKey(t => t.UserId);

            modelBuilder.Entity<Token>()
                .HasOne(t => t.Reminder)
                .WithMany(r => r.Tokens)
                .HasForeignKey(t => t.ReminderId);
        }
    }
}
