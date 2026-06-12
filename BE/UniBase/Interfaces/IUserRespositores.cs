using UniBase.DTO;
using UniBase.Models;

namespace UniBase.Interfaces
{
    public interface IUserRespositores
    {
        public Task<List<ApplicationUser>> getAll();
        public Task<bool> addUser(UserDTO newUser);
        public Task<bool> updateUser(int userId, UserDTO updatedUser);

        public Task<bool> updateUserCheckComment(int userId, ApplicationUser updatedUser);
        public Task<int> deleteUser(int[] userIds);
        public Task<ApplicationUser> getById(int userId);
        public Task<ApplicationUser> getByIdCheckComment(int userId);
        public Task<ApplicationUser> getByOnlyUserName(string userName);
        public Task<List<ApplicationUser>> getByName(string userName);
        public Task<ApplicationUser> getByUsername(string username, string pass);

        


    }
}
