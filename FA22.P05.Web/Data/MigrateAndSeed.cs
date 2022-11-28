using FA22.P05.Web.Features.Authorization;
using FA22.P05.Web.Features.ItemListings;
using FA22.P05.Web.Features.Listings;
using FA22.P05.Web.Features.ListingTypes;
using FA22.P05.Web.Features.Products;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FA22.P05.Web.Data;

public static class MigrateAndSeed
{
    public static async Task Initialize(IServiceProvider services)
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();

        await AddRoles(services);
        await AddUsers(services);

        await AddListingTypes(context);
        AddProducts(context);
        await AddListings(context);
    }

    private static void AddProducts(DataContext context)
    {
        var products = context.Set<Product>();
        if (products.Any())
        {
            return;
        }

        products.Add(new Product
        {
            Name = "Super Mario World",
            Description = "Super Nintendo (SNES) System",
            
        });
        products.Add(new Product
        {
            Name = "Donkey Kong 64",
            Description = "Donkey Kong 64 cartridge for the Nintendo 64",
        });
        products.Add(new Product
        {
            Name = "Half-Life 2: Collector's Edition",
            Description = "PC platform release of the 2004 wonder",
        });
        context.SaveChanges();
    }

    private static async Task AddUsers(IServiceProvider services)
    {
        const string defaultPassword = "Password123!";

        var userManager = services.GetRequiredService<UserManager<User>>();
        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bobUser = new User
        {
            UserName = "bob"
        };
        await userManager.CreateAsync(bobUser, defaultPassword);
        await userManager.AddToRoleAsync(bobUser, RoleNames.User);

        var sueUser = new User
        {
            UserName = "sue"
        };
        await userManager.CreateAsync(sueUser, defaultPassword);
        await userManager.AddToRoleAsync(sueUser, RoleNames.User);

        await services.GetRequiredService<DataContext>().SaveChangesAsync();
    }

    private static async Task AddRoles(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }

    private static async Task AddListings(DataContext context)
    {
        var listings = context.Set<Listing>();

        var listingTypes = context.Set<ListingType>();
        var auctionListingType = listingTypes.Where(x => x.Name == "Auction").Select(x => x.Id).FirstOrDefault();
        var saleListingType = listingTypes.Where(x => x.Name == "Sale").Select(x => x.Id).FirstOrDefault();

        var users = context.Set<User>();
        var userId = users.Select(x => x.Id).FirstOrDefault();

        if (listings.Any(x => x.EndUtc > DateTimeOffset.UtcNow.Date))
        {
            return;
        }

        listings.Add(new Listing
        {
            Name = "N64",
            Price = 199.99m,
            Description = "I am selling a mint condition N64",
            StartUtc = DateTimeOffset.UtcNow.Date,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            ListingTypeId = auctionListingType,
            UserId = userId,
            ItemsForSale = new List<ItemListing>()
        });
        listings.Add(new Listing
        {
            Name = "Halo ODST",
            Price = 19.99m,
            Description = "I am selling a copy of Halo ODST",
            StartUtc = DateTimeOffset.UtcNow.Date,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            ListingTypeId = auctionListingType,
            UserId = userId,
            ItemsForSale = new List<ItemListing>()
        });
        listings.Add(new Listing
        {
            Name = "Xbox 360",
            Price = 100.00m,
            Description = "I am selling a slightly used Xbox 360",
            StartUtc = DateTimeOffset.UtcNow.Date,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            ListingTypeId = saleListingType,
            UserId = userId,
            ItemsForSale = new List<ItemListing>()
        });
        listings.Add(new Listing
        {
            Name = "PlayStation 4",
            Price = 200.00m,
            Description = "I am selling a mint condition PS4",
            StartUtc = DateTimeOffset.UtcNow.Date,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            ListingTypeId = saleListingType,
            UserId = userId,
            ItemsForSale = new List<ItemListing>()
        });
        listings.Add(new Listing
        {
            Name = "CyberPunk 2099",
            Price = 49.99m,
            Description = "Selling a collectors edition Cyberpunk 2099",
            StartUtc = DateTimeOffset.UtcNow.Date,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            ListingTypeId = saleListingType,
            UserId = userId,
            ItemsForSale = new List<ItemListing>()
        });
        listings.Add(new Listing
        {
            Name = "Assassins Creed BlackFlag",
            Price = 24.99m,
            Description = "Selling a never opened copy of Assassins Creed BlackFlag",
            StartUtc = DateTimeOffset.UtcNow.Date,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            ListingTypeId = saleListingType,
            UserId = userId,
            ItemsForSale = new List<ItemListing>()
        });
        await context.SaveChangesAsync();
    }

    private static async Task AddListingTypes(DataContext context)
    {
        var listingTypes = context.Set<ListingType>();
        if (listingTypes.Any())
        {
            return;
        }

        listingTypes.Add(new ListingType
        {
            Name = "Auction"
        });
        listingTypes.Add(new ListingType
        {
            Name = "Sale"
        });

        await context.SaveChangesAsync();
    }
}
