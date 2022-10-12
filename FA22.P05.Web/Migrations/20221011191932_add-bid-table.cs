using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FA22.P05.Web.Migrations
{
    public partial class addbidtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ListingId1",
                table: "Bid",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bid_ListingId1",
                table: "Bid",
                column: "ListingId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Bid_Listing_ListingId1",
                table: "Bid",
                column: "ListingId1",
                principalTable: "Listing",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bid_Listing_ListingId1",
                table: "Bid");

            migrationBuilder.DropIndex(
                name: "IX_Bid_ListingId1",
                table: "Bid");

            migrationBuilder.DropColumn(
                name: "ListingId1",
                table: "Bid");
        }
    }
}
