using System.ComponentModel.DataAnnotations.Schema;


namespace API.Entities;
#nullable disable
[Table("Photos")]
public class Photo
{
  public int AppUserID {get;set;}

  public int Id { get; set; }
  public string Url { get; set; }
  public string PublicId { get; set; }
  public bool IsMain { get; set; }
}