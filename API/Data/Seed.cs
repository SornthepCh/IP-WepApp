﻿using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
#nullable disable
public class Seed 
{
    public static async Task ClearConnections(DataContext dataContext)
    {
        await dataContext.Database.ExecuteSqlRawAsync("TRUNCATE TABLE \"Connections\""); //postgres
    }
    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if (await userManager.Users.AnyAsync()) return; //

        var userSeedData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var opt = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var users = JsonSerializer.Deserialize<List<AppUser>>(userSeedData, opt);
        var roles = new List<AppRole> {
            new AppRole { Name = "Member" },
            new AppRole { Name = "Moderator" },
            new AppRole { Name = "Administrator" },
        };
        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }
        foreach (var user in users)
        {
            user.UserName = user.UserName.ToLower();
            user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc); //
            user.LastActive = DateTime.SpecifyKind(user.LastActive, DateTimeKind.Utc); //
            await userManager.CreateAsync(user, "P@ssw0rd");
            if (user.UserName == "menta")
                await userManager.AddToRolesAsync(user, new[] { "Member", "Moderator" }); //
            else if (user.UserName == "manita")
                await userManager.AddToRolesAsync(user, new[] { "Member", "Administrator" }); //
            else
                await userManager.AddToRoleAsync(user, "Member"); //
        }
    }
}