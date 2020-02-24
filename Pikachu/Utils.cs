using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

namespace Pikachu
{
    public static class Utils
    {
        public static async Task<JObject> ParseRequest(HttpRequest request)
        {
            return JObject.Parse(await new StreamReader(request.Body).ReadToEndAsync());
        }
    }
}