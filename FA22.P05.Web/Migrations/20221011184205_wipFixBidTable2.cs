using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FA22.P05.Web.Migrations
{
    public partial class wipFixBidTable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bid_AspNetUsers_ListId",
                table: "Bid");

            migrationBuilder.DropForeignKey(
                name: "FK_Bid_Listing_ListingId",
                table: "Bid");

            migrationBuilder.DropIndex(
                name: "IX_Bid_ListId",
                table: "Bid");

            migrationBuilder.DropColumn(
                name: "ListId",
                table: "Bid");

            migrationBuilder.AlterColumn<int>(
                name: "ListingId",
                table: "Bid",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bid_UserId",
                table: "Bid",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bid_AspNetUsers_UserId",
                table: "Bid",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Bid_Listing_ListingId",
                table: "Bid",
                column: "ListingId",
                principalTable: "Listing",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bid_AspNetUsers_UserId",
                table: "Bid");

            migrationBuilder.DropForeignKey(
                name: "FK_Bid_Listing_ListingId",
                table: "Bid");

            migrationBuilder.DropIndex(
                name: "IX_Bid_UserId",
                table: "Bid");

            migrationBuilder.AlterColumn<int>(
                name: "ListingId",
                table: "Bid",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ListId",
                table: "Bid",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bid_ListId",
                table: "Bid",
                column: "ListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bid_AspNetUsers_ListId",
                table: "Bid",
                column: "ListId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Bid_Listing_ListingId",
                table: "Bid",
                column: "ListingId",
                principalTable: "Listing",
                principalColumn: "Id");
        }
    }
}
