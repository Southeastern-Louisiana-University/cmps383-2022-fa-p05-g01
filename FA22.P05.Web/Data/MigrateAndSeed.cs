using FA22.P05.Web.Features.Authorization;
using FA22.P05.Web.Features.ItemListings;
using FA22.P05.Web.Features.Listings;
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

        AddProducts(context);
        await AddListings(context);

        await AddRoles(services);
        await AddUsers(services);
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

        services.GetRequiredService<DataContext>().SaveChangesAsync();
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
        var users = context.Set<User>();
        if (listings.Any(x => x.EndUtc > DateTimeOffset.UtcNow))
        {
            return;
        }

        listings.Add(new Listing
        {
            Name = "N64",
            Price = 199.99m,
            Description = "I am selling a mint condition N64",
            StartUtc = DateTimeOffset.UtcNow,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            UserId = users.Select(x => x.Id).FirstOrDefault(),
            ItemsForSale = new List<ItemListing>()
        });
        listings.Add(new Listing
        {
            Name = "Halo ODST",
            Price = 19.99m,
            Description = "I am selling a copy of Halo ODST",
            StartUtc = DateTimeOffset.UtcNow,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            UserId = users.Select(x => x.Id).FirstOrDefault(),
            ItemsForSale = new List<ItemListing>()
        });
        listings.Add(new Listing
        {
            Name = "N64",
            Price = 100.00m,
            Description = "I am selling a slightly used Xbox 360",
            StartUtc = DateTimeOffset.UtcNow,
            EndUtc = DateTimeOffset.UtcNow.AddDays(10),
            UserId = users.Select(x => x.Id).FirstOrDefault(),
            ItemsForSale = new List<ItemListing>()
        });
        await context.SaveChangesAsync();
    }
}
