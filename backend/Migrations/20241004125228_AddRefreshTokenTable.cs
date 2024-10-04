using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddRefreshTokenTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "215eb94e-804d-4fd1-9bd8-791eadc6cd03");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a62b01bc-1274-43aa-a499-bc1a286aed4f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3d419d09-20ef-466e-b840-8129d173488b", null, "Student", "STUDENT" },
                    { "94bb6be8-866a-4648-9914-dd9b0fb3a2b7", null, "Teacher", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3d419d09-20ef-466e-b840-8129d173488b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "94bb6be8-866a-4648-9914-dd9b0fb3a2b7");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "215eb94e-804d-4fd1-9bd8-791eadc6cd03", null, "Student", "STUDENT" },
                    { "a62b01bc-1274-43aa-a499-bc1a286aed4f", null, "Teacher", "ADMIN" }
                });
        }
    }
}
