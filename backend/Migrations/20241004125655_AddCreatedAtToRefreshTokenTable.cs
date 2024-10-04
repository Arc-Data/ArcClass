using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedAtToRefreshTokenTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "3c6b6390-151f-48c0-a7ff-eeeb29bb755e", null, "Student", "STUDENT" },
                    { "40acc3a1-dce1-4f90-996a-65d3264928e0", null, "Teacher", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c6b6390-151f-48c0-a7ff-eeeb29bb755e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "40acc3a1-dce1-4f90-996a-65d3264928e0");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3d419d09-20ef-466e-b840-8129d173488b", null, "Student", "STUDENT" },
                    { "94bb6be8-866a-4648-9914-dd9b0fb3a2b7", null, "Teacher", "ADMIN" }
                });
        }
    }
}
