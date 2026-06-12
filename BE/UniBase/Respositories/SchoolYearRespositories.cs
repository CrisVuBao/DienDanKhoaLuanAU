using UniBase.Models;
using Microsoft.EntityFrameworkCore;

namespace UniBase.Respositories
{
    public class SchoolYearRespositories : ISchoolYearRespositories
    {

        private readonly databaseContext _context;

        public SchoolYearRespositories(databaseContext context)
        {
            _context = context;
        }

        public async Task<List<SchoolYear>> getAll()
        {
            var schoolYears = await _context.SchoolYears.ToListAsync();
            return schoolYears;
        }
    }
}
