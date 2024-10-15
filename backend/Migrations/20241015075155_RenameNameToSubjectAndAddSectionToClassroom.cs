using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RenameNameToSubjectAndAddSectionToClassroom : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "27bf7a3b-4af7-4b1c-926e-599c9632a852");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b57ce96d-600d-4d7b-acda-fff46cafff87");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd4f787e-41be-432c-9291-875427ca1baa");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Classrooms",
                newName: "Subject");

            migrationBuilder.AddColumn<string>(
                name: "Section",
                table: "Classrooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3e3dcb17-9902-4a3a-9ba3-852c163695dd", null, "Admin", "ADMIN" },
                    { "5d627794-d705-434e-b040-033e3a1bf83b", null, "Student", "STUDENT" },
                    { "ba917dac-6bc7-4651-be6c-62a6fe013b0b", null, "Teacher", "TEACHER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3e3dcb17-9902-4a3a-9ba3-852c163695dd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5d627794-d705-434e-b040-033e3a1bf83b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ba917dac-6bc7-4651-be6c-62a6fe013b0b");

            migrationBuilder.DropColumn(
                name: "Section",
                table: "Classrooms");

            migrationBuilder.RenameColumn(
                name: "Subject",
                table: "Classrooms",
                newName: "Name");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "27bf7a3b-4af7-4b1c-926e-599c9632a852", null, "Teacher", "TEACHER" },
                    { "b57ce96d-600d-4d7b-acda-fff46cafff87", null, "Admin", "ADMIN" },
                    { "bd4f787e-41be-432c-9291-875427ca1baa", null, "Student", "STUDENT" }
                });
        }
    }
}
