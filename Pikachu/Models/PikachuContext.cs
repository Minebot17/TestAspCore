using Microsoft.EntityFrameworkCore;

namespace Pikachu.Models
{
    public class BaseContext : DbContext
    {
        public DbSet<Post> Posts;
        public DbSet<User> Users;

        public BaseContext(DbContextOptions<BaseContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}