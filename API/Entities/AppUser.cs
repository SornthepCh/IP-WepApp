using System;

namespace Company.ClassLibrary1;

#nullable disable
public class AppUser
{
    public int Id { get; set; }

    public string UserName { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }

}