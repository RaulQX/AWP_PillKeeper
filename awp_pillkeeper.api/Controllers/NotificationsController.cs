using Microsoft.AspNetCore.Mvc;
using awp_pillkeeper.api.Dtos;
using awp_pillkeeper.api.Models;
using Microsoft.EntityFrameworkCore;
using awp_pillkeeper.api.Services;

namespace awp_pillkeeper.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly NotificationService _notificationService;

        public NotificationsController(AppDbContext context, NotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        [HttpPost]
        public async Task<ActionResult<NotificationDto>> CreateNotification(NotificationDto notificationDto)
        {
            var result = await _notificationService.CreateNotificationAsync(notificationDto);
            return Ok(result);
        }
    }
} 