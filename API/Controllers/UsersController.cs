using API.Data;
using Microsoft.AspNetCore.Mvc;
using Company.ClassLibrary1;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;



//[ApiController]
//[Route("api/[controller]")]
[Authorize]
public class UsersController : BaseApiController
{
    private readonly DataContext _dataContext;

    public UsersController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser?>> GetUser(int id)
    {
        return await _dataContext.Users.FindAsync(id);
    }
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        return await _dataContext.Users.ToListAsync();
    }
}


