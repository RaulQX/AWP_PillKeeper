using Microsoft.AspNetCore.Mvc;
using AWP_PillKeeper.Application.Services;
using AWP_PillKeeper.Domain.Entities;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.DTOs;

namespace AWP_PillKeeper.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetUserNotifications(int userId)
        {
            var notifications = await _notificationService.GetAllByUserIdAsync(userId);
            return Ok(notifications);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Notification>> GetNotification(int id)
        {
            var notification = await _notificationService.GetByIdAsync(id);
            if (notification == null)
            {
                return NotFound();
            }
            return notification;
        }

        [HttpPost]
        public async Task<ActionResult<NotificationDTO>> CreateNotification(NotificationDTO notificationDto)
        {
            var result = await _notificationService.CreateNotificationAsync(notificationDto);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotification(int id, Notification notification)
        {
            if (id != notification.Id)
            {
                return BadRequest();
            }

            await _notificationService.UpdateAsync(notification);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            await _notificationService.DeleteAsync(id);
            return NoContent();
        }
    }
} 