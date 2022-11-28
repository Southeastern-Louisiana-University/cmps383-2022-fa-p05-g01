using FA22.P05.Web.Features.Authorization;
using FA22.P05.Web.Features.Bids;
using FA22.P05.Web.Features.ItemListings;
using FA22.P05.Web.Features.ListingTypes;

namespace FA22.P05.Web.Features.Listings;

public class Listing
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int? ListingTypeId { get; set; }
    public int UserId { get; set; }
    public DateTimeOffset StartUtc { get; set; }
    public DateTimeOffset EndUtc { get; set; }

    public ListingType? ListingType { get; set; }
    public User? User { get; set; }
    public ICollection<ItemListing>? ItemsForSale { get; set; }
    public ICollection<Bid>? ListingBids { get; set; }


}
