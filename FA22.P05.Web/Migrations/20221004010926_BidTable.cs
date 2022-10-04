using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FA22.P05.Web.Migrations
{
    public partial class BidTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_AspNetUsers_OwnerId",
                table: "Item");

            migrationBuilder.DropForeignKey(
                name: "FK_Listing_AspNetUsers_OwnerId",
                table: "Listing");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Listing",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Listing_OwnerId",
                table: "Listing",
                newName: "IX_Listing_UserId");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Item",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Item_OwnerId",
                table: "Item",
                newName: "IX_Item_UserId");

            migrationBuilder.CreateTable(
                name: "Bid",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BidAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    ListingId1 = table.Column<int>(type: "int", nullable: false),
                    ListingId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bid", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bid_AspNetUsers_ListingId",
                        column: x => x.ListingId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bid_Listing_ListingId1",
                        column: x => x.ListingId1,
                        principalTable: "Listing",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bid_ListingId",
                table: "Bid",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_Bid_ListingId1",
                table: "Bid",
                column: "ListingId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Item_AspNetUsers_UserId",
                table: "Item",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Listing_AspNetUsers_UserId",
                table: "Listing",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_AspNetUsers_UserId",
                table: "Item");

            migrationBuilder.DropForeignKey(
                name: "FK_Listing_AspNetUsers_UserId",
                table: "Listing");

            migrationBuilder.DropTable(
                name: "Bid");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Listing",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Listing_UserId",
                table: "Listing",
                newName: "IX_Listing_OwnerId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Item",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Item_UserId",
                table: "Item",
                newName: "IX_Item_OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Item_AspNetUsers_OwnerId",
                table: "Item",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Listing_AspNetUsers_OwnerId",
                table: "Listing",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
