using Microsoft.AspNet.SignalR;

namespace QuantumTunnel.Server.SignalR
{
    public class SignalRUserIdProvider : IUserIdProvider
    {
        public string GetUserId(IRequest request)
        {
            var user = UsersRepository.CurrentUserName();
            return user;
        }
    }
}