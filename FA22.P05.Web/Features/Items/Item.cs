using FA22.P05.Web.Features.Authorization;
using FA22.P05.Web.Features.ItemListings;
using FA22.P05.Web.Features.Products;

namespace FA22.P05.Web.Features.Items;

public class Item
{
    public int Id { get; set; }

    public string? Condition { get; set; }

    public int ProductId { get; set; }
    public virtual Product? Product { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }
    public virtual ICollection<ItemListing> ItemListings { get; set; } = new List<ItemListing>();
}
