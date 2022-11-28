using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FA22.P05.Web.Migrations
{
    public partial class ListingType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ListingTypeId",
                table: "Listing",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ListingType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Listing_ListingTypeId",
                table: "Listing",
                column: "ListingTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Listing_ListingType_ListingTypeId",
                table: "Listing",
                column: "ListingTypeId",
                principalTable: "ListingType",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listing_ListingType_ListingTypeId",
                table: "Listing");

            migrationBuilder.DropTable(
                name: "ListingType");

            migrationBuilder.DropIndex(
                name: "IX_Listing_ListingTypeId",
                table: "Listing");

            migrationBuilder.DropColumn(
                name: "ListingTypeId",
                table: "Listing");
        }
    }
}
