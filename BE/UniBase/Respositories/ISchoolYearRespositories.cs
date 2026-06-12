using UniBase.Models;

namespace UniBase.Respositories
{
    public interface ISchoolYearRespositories
    {
        public Task<List<SchoolYear>> getAll();
    }
}
