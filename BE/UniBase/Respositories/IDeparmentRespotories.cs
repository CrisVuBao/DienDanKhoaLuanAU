using UniBase.Models;

namespace UniBase.Respositories
{
    public interface IDeparmentRespotories
    {
        public Task<List<Department>> getAll();

        
    }
}
