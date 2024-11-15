using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;

namespace backend.Repositories
{
    public class MaterialRepository(ApplicationDBContext context) : IMaterialRepository
    {
        private readonly ApplicationDBContext _context = context;

        public async Task<Material> CreateAsync(Material material)
        {
            _context.Materials.Add(material);
            await _context.SaveChangesAsync();
            return material;
        }

        public Task<Material> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IList<Material>> GetByClassroomIdAsync(string id)
        {
            throw new NotImplementedException();
        }
    }
}