using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Mappers
{
    public static class MaterialMappers
    {
        public static MaterialDto ToMaterialDto(this Material material) {
            return new MaterialDto {
                Id = material.Id,
                FileName = material.FileName,
            };
        }
    }
}