using Microsoft.EntityFrameworkCore;

namespace Pikachu.Models
{
    public class PikachuContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }

        public PikachuContext(DbContextOptions<PikachuContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}