using Microsoft.AspNetCore.Mvc;

using UniBase.Respositories;
using UniBase.Interfaces;
using Microsoft.AspNetCore.Cors;
using UniBase.Models;
using Microsoft.EntityFrameworkCore;
using UniBase.DTO;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace UniBase.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRespositores _resp;
        private readonly IConfiguration _config;

        public UserController(IUserRespositores resp, IConfiguration config)
        {
            _resp = resp;
            _config = config;
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> getAll()
        {
            try
            {
                var users = await _resp.getAll();

                return Ok(users);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
       
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> addUser([FromForm] UserDTO newUser)
        {
            try
            {

                if (newUser == null)
                {
                    return BadRequest("Invalid data");
                }
                var rs = await _resp.addUser(newUser);
                if(rs)
                {
                    return Ok("Thành công");
                }
                else
                {
                    return BadRequest();
                }
               
                
            }
            catch (Exception ex)
            {
                // Log hoặc in ra lỗi để xác định nguyên nhân cụ thể
                Console.WriteLine($"Error: {ex}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> updateUser(int id, [FromForm] UserDTO updatedUser)
        {
            var success = await _resp.updateUser(id, updatedUser);

            if (success)
            {
                return Ok("Sửa thông tin thành công");
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPut("checkComment/{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> updateUserCheckComment(int id,  User updatedUser)
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
        [Authorize(Roles = "ADMIN")]
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
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _resp.getById(id);

            if (user == null)
            {
                return NotFound(); 
            }

            return Ok(user); 
        }
        [HttpGet("getOnlyByName/{uesrname}")]
        public async Task<ActionResult<User>> GetUserOnlyByName(string uesrname)
        {
            var user = await _resp.getByOnlyUserName(uesrname);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpGet("getUserIdCheckComment/{userId}")]
        public async Task<ActionResult<User>> GetUserIdCheckComment(int  userId)
        {
            var user = await _resp.getByIdCheckComment(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpGet("getByName/{uesrname}")]
        public async Task<ActionResult<User>> GetUserByName(string uesrname )
        {
            var user = await _resp.getByName(uesrname);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("getByUsername/{username} {pass}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetByUsername(string username, string pass)
        {
            var user = await _resp.getByUsername(username, pass);

            if (user == null)
            {
                return NotFound();
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.UserGroup ?? "USER")
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token), User = user });
        }

    }

}
