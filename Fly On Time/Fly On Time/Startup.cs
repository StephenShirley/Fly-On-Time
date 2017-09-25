using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Fly_On_Time.Startup))]
namespace Fly_On_Time
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
