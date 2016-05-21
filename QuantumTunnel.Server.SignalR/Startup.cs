using Owin;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using QuantumTunnel.Server.SignalR;

[assembly: OwinStartup(typeof(Startup))]
namespace QuantumTunnel.Server.SignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var jsonSerializer = JsonSerializer.Create(new JsonSerializerSettings
            {
                ContractResolver = new SignalRContractResolver()
            });

            var userIdProvider = new SignalRUserIdProvider();

            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => jsonSerializer);
            GlobalHost.DependencyResolver.Register(typeof(IUserIdProvider), () => userIdProvider);

            app.Map("", map =>
            {
                map.UseCors(CorsOptions.AllowAll);
                var hubConfiguration = new HubConfiguration
                {
                    EnableDetailedErrors = true,
                    EnableJSONP = true
                };
                map.RunSignalR(hubConfiguration);
            });
        }
    }
}