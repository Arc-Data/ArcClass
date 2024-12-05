using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MoveAssignmentForeignKeyToPosts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assignments_Posts_PostId",
                table: "Assignments");

            migrationBuilder.DropIndex(
                name: "IX_Assignments_PostId",
                table: "Assignments");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Assignments");

            migrationBuilder.AddColumn<int>(
                name: "AssignmentId",
                table: "Posts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AssignmentId",
                table: "Posts",
                column: "AssignmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Assignments_AssignmentId",
                table: "Posts",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Assignments_AssignmentId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_AssignmentId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "AssignmentId",
                table: "Posts");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Assignments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Assignments_PostId",
                table: "Assignments",
                column: "PostId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Assignments_Posts_PostId",
                table: "Assignments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
