using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Material?> GetByIdAsync(int id)
        {
            return await _context.Materials.FindAsync(id);
        }

        public async Task<IList<Material>> GetByPostIdAsync(int id)
        {
            return await _context.Materials.Where(m => m.PostId == id).ToListAsync();
        }

        public async Task<IList<Material>> GetByAssignmentIdAsync(int assignmentId)
        {
            return await _context.Materials.Where(m => m.AssignmentId == assignmentId).ToListAsync();
        }

        public async Task<bool> DeleteAsync(Material material)
        {
            var existingMaterial = await _context.Materials.FindAsync(material.Id);
            if (existingMaterial == null)
            {
                return false;
            }

            _context.Materials.Remove(existingMaterial);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}