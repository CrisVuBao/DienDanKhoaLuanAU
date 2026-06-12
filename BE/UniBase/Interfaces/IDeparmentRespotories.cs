using UniBase.Models;

namespace UniBase.Interfaces
{
    public interface IDeparmentRespotories
    {
        public Task<List<Department>> getAll();

        
    }
}
