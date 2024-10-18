using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddStudentClassroomsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "StudentClassrooms",
                columns: table => new
                {
                    StudentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClassroomId = table.Column<string>(type: "nvarchar(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentClassrooms", x => new { x.ClassroomId, x.StudentId });
                    table.ForeignKey(
                        name: "FK_StudentClassrooms_Classrooms_ClassroomId",
                        column: x => x.ClassroomId,
                        principalTable: "Classrooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentClassrooms_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "088a386a-f72f-407c-94d8-72ea97a7a5d3", null, "Student", "STUDENT" },
                    { "12debc9a-4863-41f3-9603-67418de3a39c", null, "Admin", "ADMIN" },
                    { "6c73604f-9771-44b0-ac2e-4f7701cbbf54", null, "Teacher", "TEACHER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentClassrooms_StudentId",
                table: "StudentClassrooms",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentClassrooms");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "088a386a-f72f-407c-94d8-72ea97a7a5d3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "12debc9a-4863-41f3-9603-67418de3a39c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6c73604f-9771-44b0-ac2e-4f7701cbbf54");

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
    }
}
