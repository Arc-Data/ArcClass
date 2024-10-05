using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddNavigationPropertyToRefreshTokenAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0dc32b57-0fe1-4239-9d3d-c7fa38f30eef");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ee93702c-7ab2-48f6-9e42-2933e051b70f");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "RefreshTokens",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "527438e5-39e4-496f-a4b8-2ec7c471e0d1", null, "Teacher", "ADMIN" },
                    { "84afa410-0174-48b6-9313-8ee6da2e002a", null, "Student", "STUDENT" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_AppUserId",
                table: "RefreshTokens",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_AspNetUsers_AppUserId",
                table: "RefreshTokens",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_AspNetUsers_AppUserId",
                table: "RefreshTokens");

            migrationBuilder.DropIndex(
                name: "IX_RefreshTokens_AppUserId",
                table: "RefreshTokens");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "527438e5-39e4-496f-a4b8-2ec7c471e0d1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "84afa410-0174-48b6-9313-8ee6da2e002a");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "RefreshTokens");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0dc32b57-0fe1-4239-9d3d-c7fa38f30eef", null, "Student", "STUDENT" },
                    { "ee93702c-7ab2-48f6-9e42-2933e051b70f", null, "Teacher", "ADMIN" }
                });
        }
    }
}
