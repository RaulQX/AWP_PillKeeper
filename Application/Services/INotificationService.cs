using AWP_PillKeeper.Domain.Entities;
using Domain.Entities;

namespace AWP_PillKeeper.Application.Services
{
    public interface INotificationService
    {
        Task<IEnumerable<Notification>> GetAllByUserIdAsync(int userId);
        Task<Notification?> GetByIdAsync(int id);
        Task<Notification> CreateAsync(Notification notification);
        Task UpdateAsync(Notification notification);
        Task DeleteAsync(int id);
    }
} 