using AWP_PillKeeper.Domain.Entities;
using AWP_PillKeeper.Infrastructure.Data;
using Domain.DTOs;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AWP_PillKeeper.Application.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext _context;

        public NotificationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Notification>> GetAllByUserIdAsync(int userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderBy(n => n.Date)
                .ToListAsync();
        }

        public async Task<Notification?> GetByIdAsync(int id)
        {
            return await _context.Notifications.FindAsync(id);
        }

        public async Task<Notification> CreateAsync(Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            return notification;
        }

        public async Task UpdateAsync(Notification notification)
        {
            _context.Entry(notification).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification != null)
            {
                _context.Notifications.Remove(notification);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<NotificationDTO> CreateNotificationAsync(NotificationDTO notificationDto)
        {
            var notification = new Notification
            {
                UserId = notificationDto.UserId,
                Title = notificationDto.Title,
                Subtitle = notificationDto.Subtitle,
                Date = notificationDto.Date,
                Taken = notificationDto.Taken,
                Color = notificationDto.Color
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            notificationDto.Id = notification.Id;
            return notificationDto;
        }

        public async Task<IEnumerable<NotificationDTO>> GetAllByUserEmailAsync(string email)
        {
            return await _context.Notifications
                .Include(n => n.User)
                .Where(n => n.User.Email == email)
                .Select(n => new NotificationDTO
                {
                    Id = n.Id,
                    UserId = n.UserId,
                    Title = n.Title,
                    Subtitle = n.Subtitle,
                    Date = n.Date,
                    Taken = n.Taken,
                    Color = n.Color
                })
                .ToListAsync();
        }
    }
} 