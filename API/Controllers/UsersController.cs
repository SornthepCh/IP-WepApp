using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
#nullable disable

[AllowAnonymous]

public class UsersController : BaseApiController
{
    
    private readonly IUserRepository _userRepository;

    private readonly IMapper _mapper;

     public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        this._userRepository = userRepository;

        _mapper = mapper;

    }

    [HttpGet]
         public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        // var users = await _userRepository.GetUsersAsync();
        // return Ok(_mapper.Map<IEnumerable<MemberDto>>(users));
        return Ok(await _userRepository.GetMembersAsync());
    }


    [HttpGet("{id}")]
     public async Task<ActionResult<MemberDto>> GetUser(int id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        return _mapper.Map<MemberDto>(user);
    }


    [HttpGet("username/{username}")]
    public async Task<ActionResult<MemberDto>> GetUserByUserName(string username)
    {
        //  var user = await userRepository.GetUserByUserNameAsync(username);
        //  return _mapper.Map<MemberDto>(user);
        return await _userRepository.GetMemberByUsernameAsync(username);
    }
}