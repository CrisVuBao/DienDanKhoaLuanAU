using Microsoft.AspNetCore.Mvc;
using UniBase.Respositories;
using UniBase.Interfaces;
using Microsoft.AspNetCore.Cors;
using UniBase.Models;
using Microsoft.EntityFrameworkCore;
using UniBase.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace UniBase.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRespositores _resp;
        private readonly IConfiguration _config;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(IUserRespositores resp, IConfiguration config, UserManager<ApplicationUser> userManager)
        {
            _resp = resp;
            _config = config;
            _userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var users = await _resp.getAll();
                var result = new List<object>();

                foreach (var user in users)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    result.Add(new
                    {
                        UserId = user.Id,
                        Username = user.UserName,
                        user.Name,
                        user.Email,
                        user.PhoneNumber,
                        user.Address,
                        user.DateOfBirth,
                        user.Sex,
                        user.Image,
                        user.DepartmentId,
                        user.DepartmentName,
                        user.ClassName,
                        user.checkComment,
                        SpecializedName = "",
                        Role = roles.FirstOrDefault() ?? "Member",
                        UserGroup = roles.FirstOrDefault() ?? "Member",
                        Password = "" // Không trả mật khẩu
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> addUser([FromForm] UserDTO newUser)
        {
            try
            {
                if (newUser == null)
                {
                    return BadRequest("Invalid data");
                }
                var rs = await _resp.addUser(newUser);
                if (rs)
                {
                    // Gán role cho user vừa tạo
                    var createdUser = await _userManager.FindByNameAsync(newUser.Username);
                    if (createdUser != null && !string.IsNullOrEmpty(newUser.Role))
                    {
                        await _userManager.AddToRoleAsync(createdUser, newUser.Role);
                    }
                    else if (createdUser != null)
                    {
                        await _userManager.AddToRoleAsync(createdUser, "Member");
                    }
                    return Ok("Thành công");
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> updateUser(int id, [FromForm] UserDTO updatedUser)
        {
            var success = await _resp.updateUser(id, updatedUser);

            if (success)
            {
                // Cập nhật role nếu có
                if (!string.IsNullOrEmpty(updatedUser.Role))
                {
                    var user = await _userManager.FindByIdAsync(id.ToString());
                    if (user != null)
                    {
                        var currentRoles = await _userManager.GetRolesAsync(user);
                        await _userManager.RemoveFromRolesAsync(user, currentRoles);
                        await _userManager.AddToRoleAsync(user, updatedUser.Role);
                    }
                }
                return Ok("Sửa thông tin thành công");
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("checkComment/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> updateUserCheckComment(int id, ApplicationUser updatedUser)
        {
            var success = await _resp.updateUserCheckComment(id, updatedUser);

            if (success)
            {
                return Ok("Sửa thông tin thành công");
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("delete-multiple")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> deleteUser([FromBody] int[] userIds)
        {
            if (userIds == null || userIds.Length == 0)
            {
                return BadRequest("Mảng ID người dùng không hợp lệ.");
            }

            var deletedCount = await _resp.deleteUser(userIds);

            if (deletedCount > 0)
            {
                return Ok($"Đã xóa {deletedCount} người dùng thành công.");
            }
            else
            {
                return NotFound("Không tìm thấy người dùng để xóa.");
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetUserById(int id)
        {
            var user = await _resp.getById(id);

            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                UserId = user.Id,
                user.UserName,
                Username = user.UserName,
                user.Name,
                user.Email,
                user.PhoneNumber,
                user.Address,
                user.DateOfBirth,
                user.Sex,
                user.Image,
                user.DepartmentId,
                user.DepartmentName,
                user.checkComment,
                Role = roles.FirstOrDefault() ?? "Member",
                UserGroup = roles.FirstOrDefault() ?? "Member",
                Password = ""
            });
        }

        [HttpGet("getOnlyByName/{uesrname}")]
        [AllowAnonymous]
        public async Task<ActionResult<ApplicationUser>> GetUserOnlyByName(string uesrname)
        {
            var user = await _resp.getByOnlyUserName(uesrname);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("getUserIdCheckComment/{userId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetUserIdCheckComment(int userId)
        {
            var user = await _resp.getByIdCheckComment(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("getByName/{uesrname}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetUserByName(string uesrname)
        {
            var users = await _resp.getByName(uesrname);

            if (users == null)
            {
                return NotFound();
            }

            var result = new List<object>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                result.Add(new
                {
                    UserId = user.Id,
                    user.UserName,
                    Username = user.UserName,
                    user.Name,
                    user.Email,
                    user.PhoneNumber,
                    user.Address,
                    user.DateOfBirth,
                    user.Sex,
                    user.Image,
                    user.DepartmentId,
                    user.DepartmentName,
                    user.checkComment,
                    Role = roles.FirstOrDefault() ?? "Member",
                    UserGroup = roles.FirstOrDefault() ?? "Member"
                });
            }

            return Ok(result);
        }
    }
}
