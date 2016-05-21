using System.Diagnostics;
using Microsoft.AspNet.SignalR;

namespace QuantumTunnel.Server.SignalR
{
    public class Linker : Hub
    {
        public void Broadcast(object args)
        {
            Debug.WriteLine("Inside Broadcast");

            Clients.User(UsersRepository.CurrentUserName()).execListener(args);

            Debug.WriteLine(args);
        }
    }
}